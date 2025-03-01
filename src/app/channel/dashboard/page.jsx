"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaHeart, FaUser, FaTrashAlt, FaEdit } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import { baseUrl } from "@/utils/helper";
import UploadVideo from "@/popups/UploadVideoPopup";
import ProtectedRoute from "@/utils/ProtectedRoute";
import DeleteVideoModal from "@/popups/DeleteVideoPopup";
import ToggleButton from "@/components/ToggleButton";

const Dashboard = () => {
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [stats, setStats] = useState({});
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/dashboard/stats`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setStats(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })


        axios.get(`${baseUrl}/dashboard/videos`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setVideos(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, []);


    return (
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="min-h-screen bg-black text-white flex">
                    <Sidebar />
                    <div className="bg-black text-white min-h-screen w-full px-4 md:px-8 lg:px-16">
                        <header className="py-6">
                            <h1 className="text-2xl font-bold">Welcome Back, React Patterns</h1>
                            <p className="text-gray-400 text-sm">Seamless Video Management, Elevated Results.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <Card icon={<FaEye size={24} />} label="Total views" value={stats.totalViews} />
                            <Card icon={<FaUser size={24} />} label="Total subscribers" value={stats.totalSubscribers} />
                            <Card icon={<FaHeart size={24} />} label="Total likes" value={stats.totalLikes} />
                        </div>

                        <div className="mt-10 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Videos</h2>
                            <button
                                className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
                                onClick={() => setUploadModalOpen(true)}
                            >
                                <HiPlus size={20} /> Upload video
                            </button>
                        </div>

                        <VideoList videos={videos} setVideos={setVideos} />
                        {
                            isUploadModalOpen && <UploadVideo isUploadModalOpen={isUploadModalOpen} setUploadModalOpen={setUploadModalOpen} />
                        }
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;



const Card = ({ icon, label, value }) => {
    return (
        <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="text-purple-500">{icon}</div>
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <h3 className="text-lg font-bold">{value}</h3>
            </div>
        </div>
    );
};



const VideoList = ({ videos, setVideos }) => {
    const [video, setVideo] = useState({
        deleteVideo: false,
        videoId: null,
    });

    const handleDeleteVideo = () => {
        axios.delete(`${baseUrl}/videos/${video.videoId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then((response) => {
                console.log(response.data);
                setVideos(prevVideos => prevVideos.filter(v => v._id !== video.videoId));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setVideo({ videoId: null });
            })
    }


    return (
        <div className="my-6 relative">
            {
                video.deleteVideo === true && <DeleteVideoModal
                    isOpen={true}
                    onClose={() => setVideo({ deleteVideo: false })}
                    onDelete={handleDeleteVideo}
                />
            }
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Rating</th>
                        <th className="py-2 px-4 text-left">Date Uploaded</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map((video) => (
                            <tr key={video._id} className="border-t border-gray-600 hover:bg-gray-800">
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <ToggleButton
                                        isPublished={video?.isPublished}
                                        videoId={video?._id}
                                        videos={videos}
                                        setVideos={setVideos}
                                    />
                                    <span
                                        className={`inline-block px-3 py-1 text-sm rounded-md font-medium ${video?.isPublished
                                            ? "bg-green-700 text-green-200"
                                            : "bg-orange-700 text-orange-200"
                                            }`}
                                    >
                                        {video?.isPublished ? 'published' : 'unpublished'}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{video.title}</td>
                                <td className="py-2 px-4">
                                    <span className="text-green-400 mr-2">{video?.likes} likes</span>
                                    <span className="text-red-400">{video?.dislikes} dislikes</span>
                                </td>
                                <td className="py-2 px-4">{new Date(video.createdAt).getDate() + "/" + new Date(video.createdAt).getMonth() + "/" + new Date(video.createdAt).getFullYear()}</td>
                                <td className="py-2 px-4 flex items-center gap-4">
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEdit />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <FaTrashAlt onClick={() => setVideo({ deleteVideo: true, videoId: video._id })} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};