'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Banner from "@/app/images/banner.png";

function Navbar() {
  const router = useRouter();
  const login = true; // temporarily

  return (
    <div className="h-16">
      <header className="flex justify-between items-center px-2 md:px-6 py-4 bg-black border-b border-gray-700 fixed w-full z-40">
        <div className="flex items-center mx-4 md:mx-8 cursor-pointer" onClick={() => router.push('/')}>
          <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <span className="text-xl font-bold">PLAY</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 w-[30rem] text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2 md:mr-0"
        />
        {
          login ?
            <Image
              src={Banner}
              alt='profile image'
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={() => router.push("/channel/343")}
            />
            :
            <div className="flex items-center space-x-8">
              <button className="" onClick={() => router.push("/login")}>Log in</button>
              <button className=" bg-purple-500 px-4 py-2 rounded-lg" onClick={() => router.push("/register")}>Sign up</button>
            </div>
        }
      </header>
    </div>
  )
}

export default Navbar