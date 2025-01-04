import React from 'react';

function page() {
    return (
        <div className='flex justify-center my-32 h-screen'>
            <form action="post" className='space-y-3 w-80'>
                <div className="flex justify-center my-8">
                    <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                        <span className="text-xl font-bold">PLAY</span>
                    </div>
                </div>

                <div className="">
                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" id="email" placeholder='Enter your email' required
                        className='block p-2 bg-black outline-none border rounded w-full' />
                </div>

                <div className="">
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" id="password" placeholder='Enter your password' required
                        className='block p-2 bg-black outline-none border rounded w-full' />
                </div>

                <button type="submit" className='bg-purple-600 p-2 px-6 w-full'>Login</button>
            </form>
        </div>
    )
}

export default page;