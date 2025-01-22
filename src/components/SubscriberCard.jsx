'use client';
import React from 'react';
import Banner from "@/images/banner.png";
import Image from 'next/image';

function SubscriberCard({ subscriber }) {
    return (
        <div className="flex justify-between items-center gap-2 px-2 md:px-0 md:mx-28 border-b p-2">
            <div className="flex items-center space-x-2">
                <Image
                    src={subscriber?.subscriber?.avatar}
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full"
                    width={1000}
                    height={1000}
                />
                <div>
                    <h3 className="text-sm font-semibold">{subscriber?.subscriber?.fullName}</h3>
                    <p className="text-xs text-gray-400">@{subscriber?.subscriber?.username}</p>
                </div>
            </div>
            {/* <button className='bg-purple-500 text-white px-4 py-1 md:px-4 md:py-2 rounded-md'>
                Subscribe
            </button> */}
        </div>
    )
}

export default SubscriberCard;