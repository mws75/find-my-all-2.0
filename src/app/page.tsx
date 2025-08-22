"use client"; 
import Image from "next/image";
import {useState, useEffect} from "react" 
import Dashboard from "@/app/components/dashboard";
export default function Home(){
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  
  // Button Searchh 

  // Button New Item Implementation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Find My All</h1>
          <Dashboard/>

      </div>

    </div>
  )


}
