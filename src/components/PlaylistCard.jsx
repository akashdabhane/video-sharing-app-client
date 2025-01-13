"use client";
import Image from 'next/image';
import React from 'react';
import Banner from '@/images/banner.png';
import { useRouter } from 'next/navigation';

function PlaylistCard({ playlist, showUserProfile }) {
    const navigate = useRouter();

    return (
        <div className='w-full md:w-[28rem] md:m-4 cursor-pointer' onClick={() => navigate.push(`/playlist/${playlist._id}`)}>
            <div className="">
                <Image
                    src={Banner}
                    alt="playlist banner"
                    className="w-full h-64"
                />
                <div className="relative -top-20 px-4 py-6 bg-gray-800/50 backdrop-blur-md">
                    <p className='flex items-center justify-between'>
                        <span>Playlist</span>
                        <span>12 videos</span>
                    </p>
                    <p className='space-x-4'>
                        <span>100k views</span>
                        <span>2 hours ago</span>
                    </p>
                </div>
            </div>
            <div className="relative -top-[4.5rem] left-2">
                <h3 className='text-lg'>{playlist?.name}</h3>
                <p className='line-clamp-1'>{playlist?.description}</p>
            </div>
            <div className={`${showUserProfile === false && "hidden"} flex items-center space-x-2 relative -top-10`}>
                <Image
                    src={Banner}
                    alt="Profile Picture"
                    className="w-14 h-14 rounded-full"
                />
                <div>
                    <h1 className="text-xl font-bold">React Patterns</h1>
                    <p className="text-sm text-gray-400">600k Subscribers</p>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard