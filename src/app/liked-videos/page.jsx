'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import PlaylistCard from '@/components/PlaylistCard';
import Sidebar from '@/components/Sidebar';
import VideoCardListView from '@/components/VideoCardListView';
import axios from 'axios';
import { baseUrl } from '@/utils/helper';
import Cookies from 'js-cookie';

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
        <div className="flex-1 ">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar />
                <div className="p-2 md:p-4 w-full flex flex-col md:flex-row">
                    <>
                        <PlaylistCard />

                    </>
                    <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4 w-full">
                        {
                            likedVideos.length > 0
                                ?
                                likedVideos.map(video => (
                                    <VideoCardListView cross={true} key={video._id} video={video} />
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
    )
}

export default LikedVideosPage