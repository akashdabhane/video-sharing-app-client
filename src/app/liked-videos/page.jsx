'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import PlaylistCard from '@/components/PlaylistCard';
import Sidebar from '@/components/Sidebar';
import VideoCardListView from '@/components/VideoCardListView';
import axios from 'axios';
import { baseUrl } from '@/utils/helper';
import Cookies from 'js-cookie';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Banner from "@/images/banner.png";
import Image from 'next/image';

function LikedVideosPage() {
    const [likedVideos, setLikedvideos] = useState([]);

    useEffect(() => {
        //---------------    /videos/channel/66843834742908baa9ef75d0
        axios.get(`${baseUrl}/likes/videos`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setLikedvideos(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, [])


    return (
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="min-h-screen bg-black text-white flex">
                    <Sidebar />
                    <div className="p-2 md:p-4 w-full flex flex-col md:flex-row">
                        <div className='w-full md:w-[28rem] md:m-4 cursor-pointer'>
                            <div className="">
                                <Image
                                    src={"https://res.cloudinary.com/domlldpib/image/upload/v1737391634/videotube/huftftsar2unqiiitauk.webp"}
                                    alt="playlist banner"
                                    className="w-full h-60 mb-10"
                                    width={1000} 
                                    height={1000}
                                />
                                <div className="relative -top-16 px-4 py-6 bg-gray-800/50 backdrop-blur-md">
                                    <p className='flex items-center justify-between'>
                                        <span>{"Akash Dabhane"}</span>
                                        <span>2385 videos</span>
                                    </p>
                                </div>
                            </div>
                            <div className="relative -top-[3.8rem] left-2">
                                <h3 className='text-lg'>{"Liked videos"}</h3>
                                <p className='line-clamp-1'>{"videos that are liked by you"}</p>
                            </div>
                        </div>
                        <div className="space-y-3  mt-4 w-full">
                            {
                                likedVideos.length > 0
                                    ?
                                    likedVideos.map(video => (
                                        <VideoCardListView cross={true} key={video._id} video={video?.video} />
                                    ))
                                    :
                                    <div className='text-white text-center my-40'>
                                        <h2>No Liked Videos</h2>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default LikedVideosPage