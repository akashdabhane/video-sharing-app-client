'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PlaylistCard from '@/components/PlaylistCard';
import Sidebar from '@/components/Sidebar';
import VideoCardListView from '@/components/VideoCardListView';
import { baseUrl } from '@/utils/helper';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProtectedRoute from '@/utils/ProtectedRoute';
import VideosListViewLoading from '@/loadingSkeleton/VideosListViewLoading';

function WatchHistoryPage() {
    const [watchedVideos, setWatchedVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/users/watch-history`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setWatchedVideos(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])


    return (
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="min-h-screen bg-black text-white flex w-full">
                    <Sidebar />
                    <div className="p-2 md:p-4 w-full flex flex-col md:flex-row">
                        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4 md:w-[50rem] md:mx-6">
                            {
                                loading
                                ?
                                <VideosListViewLoading cross={true} cards={10}/>
                                :
                                <>
                                {
                                    watchedVideos.length > 0
                                        ?
                                        watchedVideos.map((video) => (
                                            <VideoCardListView key={video._id} video={video} cross={true} />
                                        ))
                                        :
                                        <div className='text-center mt-40'>
                                            <h2>No videos watched</h2>
                                        </div>
                                }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default WatchHistoryPage