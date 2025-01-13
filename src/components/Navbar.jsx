'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Banner from "@/images/banner.png";
import { useAuth } from '../contexts/AuthContext';
import { FaSearch } from "react-icons/fa";


function Navbar() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const router = useRouter();
  const { isAuthenticated, loggedInUser } = useAuth();

  const handleSearchButtonClick = () => {
    if (searchText.trim() !== "") {
      router.push(`/search?q=${searchText}`);
    } else {
      inputRef.current.focus();
    }
  }

  return (
    <div className="h-16">
      <header className="flex justify-between items-center px-2 md:px-6 py-4 bg-black border-b border-gray-700 fixed w-full z-40">
        <div className="flex items-center mx-4 md:mx-8 cursor-pointer" onClick={() => router.push('/')}>
          <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <span className="text-xl font-bold">PLAY</span>
          </div>
        </div>
        <div className="flex items-center bg-gray-800 rounded-full focus:ring-purple-500 focus:outline-none focus:ring-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 w-[30rem] text-sm px-4 py-2 rounded-full mr-2 md:mr-0 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' && searchText.trim() !== "") && router.push(`/search?q=${searchText}`)}
            ref={inputRef}
          />
          <FaSearch className='hover:bg-gray-700 text-4xl rounded-full px-2 py-2 mx-[0.10rem] cursor-pointer'
            onClick={handleSearchButtonClick} />
        </div>
        {
          isAuthenticated ?
            <Image
              src={Banner}
              alt='profile image'
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={() => router.push(`/channel/info`)}  // ${loggedInUser?._id}
            />
            :
            <div className="flex items-center space-x-8">
              <button className="" onClick={() => router.push("/login")}>Log in</button>
              <button className=" bg-purple-500 px-4 py-2 rounded-lg"
                onClick={() => router.push("/register")}>
                Sign up
              </button>
            </div>
        }
      </header>
    </div>
  )
}

export default Navbar