"use client";
import Image from 'next/image';
import React from 'react';
import Banner from '@/images/banner.png';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function TweetCard() {
    return (
        <div className='flex items-start space-x-4 mx-4 border-b'>
            <Image
                src={Banner}
                alt="profile image"
                className='w-14 h-14 rounded-full'
            />
            <div className="">
                <p className='flex items-center space-x-4'>
                    <span>React Patterns</span>
                    <span>5 hours ago</span>
                </p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia placeat veniam recusandae mollitia, a non.</p>
                <div className="flex items-center space-x-5 text-2xl my-2">
                    <p className='flex items-center space-x-1'>
                        <AiOutlineLike className='cursor-pointer text-purple-400' />
                        <span className='text-base'>{"1"}</span>
                    </p>
                    <p className='flex items-center space-x-1'>
                        <AiOutlineDislike className='cursor-pointer' />
                        <span className='text-base'>{"0"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TweetCard