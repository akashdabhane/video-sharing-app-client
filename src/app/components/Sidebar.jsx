import React from 'react';
import Link from 'next/link';

function Sidebar() {
    const menu = [
        {
            title: 'Home',
            link: '/',
            icon: 'home',
        },
        {
            title: 'Liked Videos',
            link: '/liked-videos',
            icon: 'liked-videos',
        },
        {
            title: 'History',
            link: '/history',
            icon: 'history',
        },
        {
            title: 'My Content',
            link: '/channel',
            icon: 'channel',
        },
        {
            title: 'Collection',
            link: '/collection',
            icon: 'collection',
        },
        {
            title: 'Subscribers',
            link: '/subscribers',
            icon: 'Subscription',
        },  
    ]

    return (
        <nav className="bg-black md:w-64 p-4 border-r border-gray-700">
            <ul className=" m-10 ">
                {
                    menu.map((item, index) => (
                        <Link href={item.link} key={index} className="p-2 hover:text-purple-500 hover:bg-gray-700 cursor-pointer">
                            <li className='flex items-center'>
                                <span className={`material-icons text-white`}/> {item.title}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Sidebar