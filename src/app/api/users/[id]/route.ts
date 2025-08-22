import client from "@/lib/mongoose";
import {ObjectID, ReturnDocument} from "mongodb"
import {NextResponse} from "next/server" 

export async function GET(
  _req: Request, 
  {params}: {params: {clerkId: string}}
){
  try{
    // Get Parameters
    const {clerkId} = await {params}
    if(!ObjectId.isValid(id)){
      return NextResponse.json({error: "invalid id"}, {status: 400})
    }

    // connect to db 
    await client.connect()
    const db = client.db("find_all_database")
    // Get Data 
    const movie = await db
      .collection("find_all_users")
      .findOne({clerkId: new ObjectId(clerkId)});

    if(!movie){
      NextResponse.json({error: "Page not found"}, {status: 404});
    }
    // Return Data 
    return NextResponse.json(movie);
  }
  catch(error){
    return NextReponse.json({error: "Unable to manange request"}, {status: 400})
  }




