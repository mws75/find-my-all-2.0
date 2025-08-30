"use client" 
import {useState, useEffect} from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark')
    setDarkMode(darkMode)
  }, [])

  const toggleDarkMode = () => {
    console.log("dark Mode toggle clicked")
    const newDarkMode = !darkMode 
    setDarkMode(newDarkMode)
    if(!darkMode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log("dark Mode toggle enabled");
  }
  
  return (
    <button
      className="p-2 mr-4 rounded-md text-gray-900 
                 hover:bg-gray-100 
                 dark:text-white dark:hover:bg-gray-700"
      onClick={toggleDarkMode}
      >
      {darkMode ? '☀️' : '🌙'}
    </button>
  )
}
