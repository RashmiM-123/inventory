import React from 'react'
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation'

const Page = () => {
  const router=useRouter();
  const [userName, setUsername] = useState("");


  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogout=()=>{
     localStorage.removeItem("username");
      router.push("/login");

  }

  return (
    <div className=" rounded-bl-2xl rounded-tl-2xl  p-4 w-[200px] flex flex-col justify-between bg-white border-r border-gray-200">
      {/* top */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-medium text-gray-600 mb-4">STOCK HUB</h1>

        <ul className="flex flex-col text-left  px-6 space-y-4 text-gray-700 font-medium text-sm tracking-wider">
          <li className="hover:bg-purple-900 hover:text-white p-2 rounded-md cursor-pointer transition-colors">Dashboard</li>
          <li className="hover:bg-purple-900 hover:text-white p-2 rounded-md cursor-pointer transition-colors">Products</li>
          <li className="hover:bg-purple-900 hover:text-white p-2 rounded-md cursor-pointer transition-colors">Orders</li>
        </ul>
      </div>

      {/* bottom */}
      <div>
        <ul className="flex flex-col  text-center space-y-6 text-gray-700 font-medium text-sm tracking-wider">
          {/* <li>{userName}</li> */}
          <li className="flex gap-2 justify-center text-gray-700 ">
            {/* User Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a8.25 8.25 0 0 1 15 0"
              />
            </svg>

            {/* Display Username */}
            {userName}
          </li>

          <li>
            <button className="p-3 rounded-md  bg-purple-900 text-white  hover:bg-purple-800 transition"
            onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Page



