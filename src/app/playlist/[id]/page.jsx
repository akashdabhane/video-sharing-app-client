"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import PlaylistCard from "@/components/PlaylistCard";
import VideoCardListView from "@/components/VideoCardListView";
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function PlaylistPage() {
    const [playlistVideos, setPlaylistVideos] = useState([]);   // temporary solution
    const { id } = useParams();

    useEffect(() => {
        axios.post(`${baseUrl}/playlist/${id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setPlaylistVideos(response.data.data);
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
                        <>
                            <PlaylistCard />

                        </>
                        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4 w-full">
                            {
                                playlistVideos.length > 0
                                    ?
                                    playlistVideos.map(video => (
                                        <VideoCardListView cross={true} video={video} key={video._id} />
                                    ))
                                    :
                                    <div className="text-center mt-40">
                                        <p>
                                            No videos in this playlist yet.
                                        </p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}