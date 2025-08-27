"use client";
import { FaTrashAlt } from "react-icons/fa";
import {useState, useEffect} from "react"
import {Item} from "@/types/item";
/*
  Trash Icon - <FaTrashAlt />

 */

const FAKEDATA = {
  items: [
      {
        name: 'Backpack',
        location: 'Closet',
        image: 'https://example.com/backpack.jpg',
        _id: "6894f79eb73893ff9ac399a6",
        createdAt: "2025-08-07T18:59:42.488Z",
        updatedAt: "2025-08-07T18:59:42.488Z"
      },
      {
        name: 'Passport',
        location: 'Desk Drawer',
        image: null,
        _id: "6894f79eb73893ff9ac399a7",
        createdAt: "2025-08-07T18:59:42.488Z",
        updatedAt: "2025-08-07T18:59:42.488Z"
      },
    ]
}

export default function Dashboard({clerkId} : {clerkId: string}){
  const [items, setItems] = useState([]);
  const [newItemForm, setNewItemForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemLocation, setNewItemLocation] = useState("");
  console.log(`User Id success: ${clerkId}`);

  
  // Fetch Items: 
  const fetchItems = async () => {
    console.log("fetching Items");
    const res = await fetch(`api/users/${clerkId}`);
    const data = await res.json();
    console.log("data fetch success: ", data);
    setItems(data.items); 
    console.log(items);
  }

  useEffect(() => {
    fetchItems();
  },[]);

  const insertItem = async (item : Item) => {
    try{
      console.log("inserting item");
      const res = await fetch(`api/users/${clerkId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if(data.success){
        console.log("item successfully added");
        await fetchItems();
      } else { 
        console.error("Failed to add item: ", data.error);
      }
    } catch (error){
      console.log("error: ", error);
      console.log("error message: ", error.message);
    }
  }
  
  const submitNewItem = async (newItemName: string, newItemLocation: string) => {
    try{
      // TODO - check that NewItem and ItemLocation are strings? 
      
      // Call insert New Item 
      insertItem({name: newItemName, location: newItemLocation});
      // Rest State 
      setNewItemForm(false);
      setNewItemName("");
      setNewItemLocation(""); 

      console.log(`New Item: ${newItemName} successfully inserted`); 

    } catch (error){
      console.log("error on submitNewItem", error)
    }
  }


  // Fetch Data 
  return (
    <div className="m-4 p-4 rounded-lg shadow-md justify-center border-2 border-slate-700" >
      <form id="searchBar" className="justify-center flex">
        <input type="text" placeholder="Search..." className="w-full px-4 py-2 mr-2 font-black rounded-md border border-slate-700"/>
        <button type="submit" className="px-4 py-2 bg-emerald-100 hover:bg-emerald-300 rounded-md font-slate-50 shadow-sm border border-slate-700"> 
          Search 
        </button>        
      </form>

      <button className="w-full px-4 py-2 mt-2 mb-4 bg-blue-200 hover:bg-blue-400 text-slate-700 rounded-md shadow-sm border border-slate-700"
        onClick={() => setNewItemForm(true)}>
        New Item
      </button>
      {newItemForm === true && (
        <form className="mt-4">
          <input className="w-full my-2 px-4 py-2 mr-2 font-black rounded-md border border-slate-700"
            type="text" 
            placeholder="item..." 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}/>
          <input className="w-full my-2 px-4 py-2 mr-2 font-black rounded-md border border-slate-700"
            type="text" 
            placeholder="location..." 
            value={newItemLocation}
            onChange={(e) => setNewItemLocation(e.target.value)}/>
          <button type="submit" className="my-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-300 rounded-md border border-slate-700"
            onClick={() => submitNewItem(newItemName, newItemLocation)}>
            Submit
          </button>
        </form>
      )}
      {items.length === 0 ? (
        <p> Click New Item to add your first! </p> 
      ) : (
        <ul className="w-full px-4 py-2 mt-2 bg-fuchsia-300 border-2 rounded-xl shadow-md">
          {items.map((item) => (
            <li key={item._id} className="flex w-full items-center px-4 py-2">
              <button className="bg-fuchsia-100 hover:bg-fuchsia-200 text-slate-700 px-4 py-2 rounded-md shadow-sm">
                  edit
              </button> 
              <p className="w-full bg-slate-50 rounded-md px-4 py-2 border border-slate-700 mx-2">
                {item.name} - {item.location}
              </p> 
              <button className="bg-fuchsia-200 hover:bg-fuchsia-100 px-4 py-3 rounded-md shadow-sm"><FaTrashAlt /></button> </li>
          ))}
        </ul>
      )}
    </div>
  );
}
