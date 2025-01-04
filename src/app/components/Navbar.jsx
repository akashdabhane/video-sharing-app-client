import React from 'react'

function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black border-b border-gray-700">
      <div className="flex items-center mx-8">
        <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
          <span className="text-xl font-bold">PLAY</span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-800 w-[30rem] text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex items-center space-x-8">
        <button className="">Log in</button>
        <button className=" bg-purple-500 px-4 py-2 rounded-lg">Sign up</button>
      </div>
    </header>
  )
}

export default Navbar