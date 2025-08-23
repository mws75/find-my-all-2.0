import client from "@/lib/mongodb";
import {ObjectID, ReturnDocument} from "mongodb"; 
import {NextResponse} from "next/server"; 
import {clerkClient} from "@clerk/nextjs/server"; 

export async function GET(
  _req: Request, 
  {params}: {params: {id: string}}
){
  console.log(`Attempting to get user data for ${params}`);
  try{
    // Get Parameters
    const clerkId = (await params).id; 
    console.log("clerkId recieved: ", clerkId);
    console.log("clerkId type: ", typeof(clerkId));
    if(!clerkId){
      return NextResponse.json({error: "invalid id"}, {status: 400})
    }

    // connect to db 
    await client.connect()
    const db = client.db("find_all_database")
    console.log("Connected to Database: find_all_database, now getting user data.")
    
    // Get Data 
    let user = await db
      .collection("find_all_users")
      .findOne({clerkId});

    console.log("User Found")
    // If user doesn't exist, create record 
    if(!user){
      console.log("user did not exist, going to create new record")
      // Create user
      try{
        const clerkUser = await (await clerkClient()).users.getUser(clerkId);
        // console.log("ClerkUser: ", clerkUser);
        const emailAddress = clerkUser.emailAddresses[0]?.emailAddress;
        // Inserting New User in Mongo DB.  
        await db.collection("find_all_users").insertOne({
          clerkId: clerkId,
          email: emailAddress, 
          items: []
        });
        console.log(`User ${clerkId} successfully added to mongodb`);
        user = {clerkId, email: emailAddress, items: []};
      } catch (clerkError) {
        console.log("Clerk API Error: ", clerkError);
        throw clerkError; 
      }
    }          
    console.log("User Items: ", user);
    return NextResponse.json({
      success: true, 
      items: user.items || []
    });
  }
  catch(error){
    console.log("error caught: ", error);
    console.log("error message:", error.message);
    return NextResponse.json({error: "Unable to manage request"}, {status: 400})
  }
}





