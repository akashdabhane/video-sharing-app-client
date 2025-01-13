'use client';
import React from 'react';
import Banner from "@/images/banner.png";
import Image from 'next/image';

function SubscriberCard() {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="flex items-center space-x-2">
                <Image
                    src={Banner}
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h3 className="text-sm font-semibold">User Name</h3>
                    <p className="text-xs text-gray-400">@username</p>
                </div>
            </div>
            <button className='bg-purple-500 text-white px-4 py-1 md:px-4 md:py-2 rounded-md'>
                Subscribe
            </button>
        </div>
    )
}

export default SubscriberCard;