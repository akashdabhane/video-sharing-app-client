"use client";
import React from "react";
import { FaEye, FaHeart, FaUser, FaTrashAlt, FaEdit } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";


const Dashboard = () => {
    return (
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
                        <Card icon={<FaEye size={24} />} label="Total views" value="221,234" />
                        <Card icon={<FaUser size={24} />} label="Total subscribers" value="4,053" />
                        <Card icon={<FaHeart size={24} />} label="Total likes" value="63,021" />
                    </div>

                    <div className="mt-10 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Videos</h2>
                        <button className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
                            <HiPlus size={20} /> Upload video
                        </button>
                    </div>

                    <VideoList />
                </div>
            </div>
        </div>
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



const VideoList = () => {
    const videos = [
        {
            id: 1,
            title: "JavaScript Fundamentals: Variables and Data Types",
            status: "Published",
            likes: 921,
            dislikes: 49,
            date: "9/22/2023",
        },
        {
            id: 2,
            title: "React Hooks Explained: useState and useEffect",
            status: "Unpublished",
            likes: 2520,
            dislikes: 279,
            date: "9/21/2023",
        },
        {
            id: 3,
            title: "Mastering Async Await in JavaScript",
            status: "Unpublished",
            likes: 943,
            dislikes: 244,
            date: "9/20/2023",
        },
        {
            id: 4,
            title: "JavaScript Fundamentals: Variables and Data Types",
            status: "Published",
            likes: 921,
            dislikes: 49,
            date: "9/22/2023",
        },
        {
            id: 5,
            title: "React Hooks Explained: useState and useEffect",
            status: "Unpublished",
            likes: 2520,
            dislikes: 279,
            date: "9/21/2023",
        },
    ];


    return (
        <div className="mt-6 overflow-x-auto">
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
                            <tr key={video.id} className="border-t border-gray-600 hover:bg-gray-800">
                                <td className="py-2 px-4">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm rounded-md font-medium ${video.status === "Published"
                                            ? "bg-green-700 text-green-200"
                                            : "bg-orange-700 text-orange-200"
                                            }`}
                                    >
                                        {video.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{video.title}</td>
                                <td className="py-2 px-4">
                                    <span className="text-green-400 mr-2">{video.likes} likes</span>
                                    <span className="text-red-400">{video.dislikes} dislikes</span>
                                </td>
                                <td className="py-2 px-4">{video.date}</td>
                                <td className="py-2 px-4 flex items-center gap-4">
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEdit />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <FaTrashAlt />
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