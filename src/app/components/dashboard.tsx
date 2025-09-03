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
  const [items, setItems] = useState<Item[]>([]);
  const [newItemForm, setNewItemForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemLocation, setNewItemLocation] = useState("");
  const [noItemsFound, setNoItemsFound] = useState(false);
  const [searchInput, setSearchInput] = useState("");
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
  
  const cleanText = (text: string): string => {
    return text 
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[\x00-\x1F\x17F]/g, '');
  };

  const submitNewItem = async (newItemName: string, newItemLocation: string) => {
    try{
      // TODO - check that NewItem and ItemLocation are strings? 
      const newItemNameClean = cleanText(newItemName);
      const newItemLocationClean = cleanText(newItemLocation);
      
      // Call insert New Item 
      insertItem({name: newItemNameClean, location: newItemLocationClean});
      // Rest State 
      setNewItemForm(false);
      setNewItemName("");
      setNewItemLocation(""); 

      console.log(`New Item: ${newItemName} successfully inserted`); 

    } catch (error){
      console.log("error on submitNewItem", error)
    }
  }
  
  const cancelSubmit = () => {
    console.log("User Canceled New Item creation");
    setNewItemForm(false);
    setNewItemName("");
    setNewItemLocation("");
  }
  //
  // const searchItem = async (searchInput: string) => {
  //   try{
  //     const res = await fetch(`api/users/${clerkId}`, {
  //  method: 'GET',
  //       header:{'Content-Type': 'application/json'},
  //       body: JSON.stringify({itemName: searchInput});
  //     })
  //     if (!res.ok){
  //       throw new Error(`Search Failed: ${res.status}`);
  //     }
  //   } catch (error) {
  //     console.log(`Error unable to search: ${error.message}`);
  //   }
  // }
  //
  
  const handleSearch = () => {
    console.log("handleSearch() running");
    try{
      const filtered = items.filter(item => 
                                    item.name.toLowerCase().includes(searchInput.toLowerCase())
                                    || item.location.toLowerCase().includes(searchInput.toLowerCase())
                                    );
      if(filtered.length === 0) {
        alert("no items found");
        setNoItemsFound(true);
      } else {
        setNoItemsFound(false);
        setItems(filtered);
      }   
    } catch (error){
      throw new Error(`search failed: ${error.message}`); 
    }
  }


  const clickSearchItem = () => {
    console.log(`Searching for item: ${searchInput}`);
    try{
      if(searchInput === "")
        throw new Error();
      const item_array = handleSearch();
      console.log(`Search successfull`);
    } catch (error)
    {
      fetchItems(); 
    }
  }

  const deleteItem = async (item: string) => {
    try{
      const res = await fetch(`api/users/${clerkId}`, {
         method: 'DELETE',
         headers:{'Content-Type': 'application/json'},
         body: JSON.stringify({itemName: item})
      })
      if (!res.ok){
          throw new Error(`Delete failed: ${res.status}`);
      }
    } catch (error){
      console.log("error on deleteItem function: ", error.message);
    }
  }


  const clickDeleteItem = async (itemName: string) => {
    console.log(`Deleting item: ${itemName}`);
    // deleting item 
    await deleteItem(itemName); // this will wait for delete to complete 
    console.log("Deleted Item");
    fetchItems(); 
  }

  // Fetch Data 
  return (
    <div className="m-4 p-4 rounded-lg shadow-md justify-center 
                    border-2 border-slate-700 
                    dark:bg-gray-800 dark:border-slate-600" >
      <form id="searchBar" className="justify-center flex"
            onSubmit={(e) => e.preventDefault()}>
        <input className="w-full px-4 py-2 mr-2 font-black 
                          rounded-md border border-slate-700 
                          dark:text-white dark:bg-slate-800" 
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."/>
        <button className="px-4 py-2 bg-emerald-100 hover:bg-emerald-300 
                           rounded-md font-slate-50 shadow-sm border border-slate-700 
                           dark:bg-emerald-700 dark:hover:emerald-900" 
          type="submit"
          onClick={() => clickSearchItem()}> 
          Search 
        </button>        
      </form>

      <button className="w-full px-4 py-2 mt-2 mb-4 
                         bg-blue-200 hover:bg-blue-400 
                         border border-slate-700 rounded-md shadow-sm 
                         text-slate-700 
                         dark:bg-blue-700 dark:hover:bg-blue-900 dark:text-white"
        onClick={() => setNewItemForm(true)}>
        New Item
      </button>
      {newItemForm === true && (
        <form className="mt-4">
          <input className="w-full my-2 px-4 py-2 mr-2 
                            font-black rounded-md 
                            border border-slate-700 
                            dark:bg-slate-800 dark:text-white"
            type="text" 
            placeholder="item..." 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}/>
          <input className="w-full my-2 px-4 py-2 mr-2 font-black 
                            rounded-md border border-slate-700 
                            dark:bg-slate-800 dark:text-white"
            type="text" 
            placeholder="location..." 
            value={newItemLocation}
            onChange={(e) => setNewItemLocation(e.target.value)}/>
          <div className="flex items-center justify-center">
            <button type="submit" className="my-2 mx-2 px-4 py-2 
                                   bg-emerald-100 hover:bg-emerald-300 
                                   border border-slate-700 rounded-md 
                                   text-slate-700 
                                   dark:bg-emerald-700 dark:hover:bg-emerald-900 dark:text-white"
              onClick={() => submitNewItem(newItemName, newItemLocation)}>
              Submit
            </button>
            <button type="button" className="my-2 px-4 py-2 
                                    bg-emerald-100 hover:bg-emerald-300 
                                    border border-slate-700 rounded-md 
                                    text-slate-700 
                                    dark:bg-emerald-700 dark:hover:bg-emerald-900 dark:text-white"
              onClick={() => cancelSubmit()}>
              Cancel
            </button> 
          </div> 
        </form>
      )}
      {items.length === 0 ? (
        <p> Click New Item to add your first! </p> 
      ) : (
        <ul className="w-full px-4 py-2 mt-2 
                       bg-fuchsia-300 border-2 rounded-xl shadow-md 
                       dark:bg-fuchsia-800 dark:border-fuchsia-600">
          {items.map((item) => (
            <li key={item.name} className="flex w-full items-center px-4 py-2">
              <button className="px-4 py-2 
                                 bg-fuchsia-100 hover:bg-fuchsia-200 
                                 text-slate-700 rounded-md shadow-sm 
                                 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:text-white">
                  edit
              </button> 
              <p className="w-full px-4 py-2 mx-2 
                            bg-slate-50 border border-slate-700 rounded-md 
                            text-slate-700 
                            dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                {item.name} - {item.location}
              </p> 
              <button className="px-4 py-3 
                                 bg-fuchsia-200 hover:bg-fuchsia-100 
                                 text-slate-700 rounded-md shadow-sm 
                                 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-500 dark:text-white"
                onClick={()=> clickDeleteItem(item.name)}>
                <FaTrashAlt />
              </button> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
