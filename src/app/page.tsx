"use client"; 
import Dashboard from "@/app/components/dashboard";
import {useUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default function Home(){
  const {isLoaded, isSignedIn, user} = useUser();
  
  if(!isLoaded){
    return null;
  }

  if(!isSignedIn){
    redirect("/signin");
  }
  
  // Button Searchh 

  // Button New Item Implementation

  return (
    <div className="flex flex-col items-center justify-center 
                    min-h-screen 
                    bg-gray-100 
                    dark:bg-gray-900">
      <div className="p-8 max-w-2xl 
                      bg-white rounded-lg shadow-md 
                      text-center 
                      dark:bg-gray-800">
        <h1 className="mb-4 
                       text-3xl font-bold 
                       text-gray-900 
                       dark:text-white">
          Welcome to Find My All {user?.firstName}
        </h1>
          <Dashboard clerkId={user?.id}/>
      </div>

    </div>
  )
}
