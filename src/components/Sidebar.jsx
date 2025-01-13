"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaRegThumbsUp, FaHistory, FaVideo, FaBookmark, FaUsers, FaLifeRing, FaCog } from "react-icons/fa";
import { useAuth } from '@/contexts/AuthContext';

function Sidebar() {
    const [minSidebar, setMinSidebar] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { loggedInUser } = useAuth();

    const menu = [
        {
            title: 'Home',
            link: '/',
            icon: <FaHome className='text-xl' />,
        },
        {
            title: 'Liked Videos',
            link: '/liked-videos',
            icon: <FaRegThumbsUp className='text-xl' />,
        },
        {
            title: 'History',
            link: '/watch-history',
            icon: <FaHistory className='text-xl' />,
        },
        {
            title: 'My Content',
            link: `/channel/${loggedInUser?._id}`,
            icon: <FaVideo className='text-xl' />,
        },
        {
            title: 'Collection',
            link: '/collection',
            icon: <FaBookmark className='text-xl' />,
        },
        {
            title: 'Subscribers',
            link: '/subscribers',
            icon: <FaUsers className='text-xl' />,
        },
    ]

    const menu2 = [
        {
            title: 'Support',
            link: '/',
            icon: <FaLifeRing className='text-xl' />,
        },
        {
            title: 'Settings',
            link: '/',
            icon: <FaCog className='text-xl' />,
        },
    ]


    useEffect(() => {
        if (pathname.startsWith("/watch/v/")) {
            setMinSidebar(true);
        }
    }, []);


    return (
        <div className={`${minSidebar ? "w-20" : "w-72"} hidden md:block group transition-all duration-300 ease-in-out`}>
            <nav className={`${minSidebar ? "md:w-20" : "md:w-64"} bg-black p-4 border-r border-gray-700 fixed z-30 w-full h-[90vh] flex flex-col justify-between group transition-all duration-300 ease-in-out`}
                onMouseEnter={() => {
                    pathname.startsWith("/watch/v/") && setMinSidebar(false)
                }}
                onMouseLeave={() => {
                    pathname.startsWith("/watch/v/") && setMinSidebar(true)
                }}
            >
                <ul className="m-1 my-4 space-y-2">
                    {
                        menu.map((item, index) => (
                            <li className="w-full p-2 cursor-pointer border hover:text-gray-700 hover:bg-purple-500 flex items-center space-x-3"
                                key={index}
                                onClick={() => router.push(item.link)}
                            >
                                <span>
                                    {item.icon}
                                </span>
                                <span className={`${minSidebar && "hidden"}`}> {item.title} </span>
                            </li>
                        ))
                    }
                </ul>
                <ul className="m-1 my-4 space-y-2">
                    {
                        menu2.map((item, index) => (
                            <li className="w-full p-2 cursor-pointer border hover:text-gray-700 hover:bg-purple-500 flex items-center space-x-3"
                                key={index}
                                onClick={() => router.push(item.link)}
                            >
                                {item.icon}
                                <span className={`${minSidebar && "hidden"}`}>{item.title}</span>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar