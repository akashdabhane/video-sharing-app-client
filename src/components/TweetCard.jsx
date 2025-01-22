"use client";
import Image from 'next/image';
import React from 'react';
import Banner from '@/images/banner.png';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { baseUrl, formatTimeAgo } from '@/utils/helper';
import axios from 'axios';
import Cookies from 'js-cookie';

function TweetCard({ tweet, setTweets }) {
    const handleOnTweetToggleLikeClick = (tweetObj) => {
        axios.post(`${baseUrl}/likes/toggle/t/${tweetObj._id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);

                // Update the specific comment in the comments state
                setTweets(prevTweets =>
                    prevTweets.map(tweet =>
                        tweet._id === tweetObj._id
                            ? {
                                ...tweet,
                                isLiked: !tweet.isLiked,
                                totalLikes: tweet.isLiked ? tweet.totalLikes - 1 : tweet.totalLikes + 1,
                            }
                            : tweet
                    )
                );
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div className='flex items-start space-x-4 mx-2 px-2 md:px-0 md:mx-4 border-b'>
            <Image
                src={tweet?.owner[0]?.avatar || tweet?.owner?.avatar}
                alt="profile image"
                className='w-14 h-14 rounded-full'
                width={1000}
                height={1000}
            />
            <div className="overflow-hidden">
                <p className='flex items-center space-x-4'>
                    <span>{tweet?.owner[0]?.fullName || tweet?.owner?.fullName}</span>
                    <span>{formatTimeAgo(tweet?.createdAt)}</span>
                </p>
                <p>{tweet?.content}</p>
                <div className="flex items-center space-x-5 text-2xl my-2">
                    <p className='flex items-center space-x-1'>
                        <AiOutlineLike
                            className={`${tweet?.isLiked ? "text-purple-400" : "text-gray-400"}  cursor-pointer`}
                            onClick={() => handleOnTweetToggleLikeClick(tweet)}
                        />
                        <span className='text-base'>{tweet?.totalLikes}</span>
                    </p>
                    {/* <p className='flex items-center space-x-1'>
                        <AiOutlineDislike className='cursor-pointer' />
                        <span className='text-base'>{"0"}</span>
                    </p> */}
                </div>
            </div>
        </div>
    )
}

export default TweetCard