'use client';
import React from 'react';
import Image from 'next/image';
import Banner from '../images/banner.png';
import { useRouter } from 'next/navigation';

function VideoCardListView({ video, cross }) {
    const router = useRouter();


    return (
        <div onClick={() => router.push(`/watch/v/${video?._id}`)}>
            <div className={`flex ${cross ? "flex-row" : "flex-col"} md:flex-row mx-2 md:mx-6 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer`}>
                <div className="relative w-full md:w-60 h-32">
                    <Image
                        src={video?.thumbnail}
                        alt="Video Thumbnail"
                        className='w-full h-full'
                        width={1000}
                        height={1000}
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 text-sm rounded text-white">
                        20:45
                    </span>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{video?.title}</h3>
                    <p className="text-sm text-gray-400">10.3k Views • 44 minutes ago</p>
                    <p className="text-sm text-gray-400">Code Master</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardListView