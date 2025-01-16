'use client';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import VideoCardListView from '@/components/VideoCardListView';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, formatTimeAgo } from '@/utils/helper';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Banner from "@/images/banner.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function WatchVideo() {
    const [video, setVideo] = useState({});
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/videos/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setVideo(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, []);

    useEffect(() => {
        if (Object.keys(video).length > 0) {
            axios.get(`${baseUrl}/videos/channel/${video?.owner?._id}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                    setSuggestedVideos(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    // loading false
                })
        }
    }, [video]);

    return (
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="h-screen w-full bg-black text-white flex ">
                    <Sidebar />
                    <div className="p-4 flex flex-col md:flex-row w-full">
                        {
                            Object.keys(video).length > 0 && (
                                <div className="w-full mt-4 md:mx-2">
                                    <video className='border w-full h-[30rem]' width={1000} height={1000} poster={video?.thumbnail} autoPlay controls>
                                        <source
                                            src={video?.videoFile}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* video details  */}
                                    <div className="bg-gray-900 text-white p-4 rounded-md shadow-md mt-4">
                                        <div className="flex justify-between items-start">
                                            <div className="">
                                                <h1 className="text-2xl font-bold">{video?.title}</h1>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {video?.views} Views • {formatTimeAgo(video?.createdAt)}
                                                </p>
                                            </div>
                                            {/* Like, Dislike, and Save */}
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                                                    <AiOutlineLike /> 3050
                                                </button>
                                                <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                                                    <AiOutlineDislike /> 20
                                                </button>
                                                <button className="ml-auto bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4">
                                            <Image
                                                src={Banner}
                                                alt="React Patterns"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h2 className="font-semibold">{video?.owner?.fullName}</h2>
                                                <p className="text-gray-400 text-sm">757K Subscribers</p>
                                            </div>
                                            <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                                                Subscribe
                                            </button>
                                        </div>
                                        <p className="text-gray-300 mt-4 line-clamp-1">
                                            {video?.description}
                                        </p>
                                    </div>
                                    <CommentsSection />
                                </div>
                            )
                        }

                        <div className="grid grid-cols-1 gap-4 mt-4 w-[60%]">
                            {
                                suggestedVideos.map(video => (
                                    <VideoCardListView key={video._id} video={video} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}


const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/comments/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setComments(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, []);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-md mt-4">
            <h2 className="text-xl font-bold">{comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}</h2>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a Comment"
                    className="w-full bg-gray-800 text-white p-3 rounded-md outline-none"
                />
            </div>
            <div className="mt-6">
                {
                    comments.map((comment, index) => (
                        <div className="flex items-start gap-3 py-4 border-b border-gray-700" key={index}>
                            <Image
                                src={comment?.owner?.avatar}
                                alt={comment?.owner?.fullName}
                                className="w-10 h-10 rounded-full"
                                width={1000}
                                height={1000}
                            />
                            <div>
                                <h3 className="font-semibold text-white">{comment?.owner?.fullName}</h3>
                                <p className="text-gray-400 text-xs">@{comment?.owner?.username} • {formatTimeAgo(comment?.createdAt)}</p>
                                <p className="text-gray-300 mt-2">{comment?.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};