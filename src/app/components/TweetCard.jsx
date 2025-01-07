"use client";
import Image from 'next/image';
import React from 'react';
import Banner from '@/app/images/banner.png';

function TweetCard() {
    return (
        <div>
            <Image
                src={Banner}
                alt="profile image"
                className='w-20 h-20 rounded-full'
            />
            <div className="">
                <p>
                    React Patterns
                    <span>5 hours ago</span>
                </p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia placeat veniam recusandae mollitia, a non.</p>
                <div className="">
                    <p>

                        <span></span>
                    </p>
                    <p>

                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TweetCard