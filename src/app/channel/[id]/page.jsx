"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import PlaylistCard from "@/components/PlaylistCard";
import TweetCard from "@/components/TweetCard";
import SubscriberCard from "@/components/SubscriberCard";
import { MdOutlineEmojiEmotions, MdMoreHoriz } from "react-icons/md";
import ChannelCard from "@/components/ChannelCard";
import UploadVideo from "@/popups/UploadVideoPopup";
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function ChannelPage() {
    const [channel, setChannel] = useState([]);
    const { id } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    useEffect(() => {
        axios.get(`${baseUrl}/users/channel/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        })
            .then(response => {
                setChannel(response.data.data[0]);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, [])

    const menu = [
        {
            id: 0,
            title: "Videos",
            link: `/channel/${id}?tab=videos`
        },
        {
            id: 1,
            title: "Playlists",
            link: `/channel/${id}?tab=playlists`
        },
        {
            id: 2,
            title: "Tweets",
            link: `/channel/${id}?tab=tweets`
        },
        {
            id: 3,
            title: "Subscribed",
            link: `/channel/${id}?tab=subscribed`
        },
    ]

    return (
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="min-h-screen bg-black text-white flex">
                    <Sidebar />
                    <div className="p-4 w-full">
                        <ChannelCard channel={channel} />
                        <div className="mt-6 border-b border-gray-700 ">
                            <ul className="grid grid-cols-4 text-center">
                                {
                                    menu.map((item) => (
                                        <li className={`pb-2 border-b-2 cursor-pointer ${tab === item.title.toLowerCase() ? "border-purple-500" : "text-gray-400"} `}
                                            key={item.id}
                                            onClick={() => router.push(item.link)}
                                        >
                                            {item.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {
                            (tab === 'videos' || !tab) && <ChannelVideos />
                        }
                        {
                            tab === 'playlists' && <ChannelPlayLists />
                        }
                        {
                            tab === 'tweets' && <ChannelTweets />
                        }
                        {
                            tab === 'subscribed' && <ChannelSubscribers />
                        }
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

function ChannelVideos() {
    const [videos, setVideos] = useState([]);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/videos/channel/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                setVideos(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading
            })
    }, []);

    return (
        <>
            {
                videos && videos.length > 0
                    ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ml-3">
                        {
                            videos.map((item, index) => (
                                <VideoCard item={item} key={index} />
                            ))
                        }
                    </div>
                    :
                    <div id="videos" className="mt-4">
                        <div className="text-center text-gray-400">
                            <h1 className="text-lg">No videos uploaded</h1>
                            <p className="text-sm">This page has yet to upload a video. Search another page in order to find more videos.</p>
                            <div className="flex justify-center">
                                {
                                    "234343" === "234343" && (
                                        <button className="hover:bg-purple-700 bg-purple-500 text-white px-4 py-2 rounded-md mt-4"
                                            onClick={() => setUploadModalOpen(true)}
                                        >
                                            New Video
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>

            }

            {
                isUploadModalOpen && <UploadVideo isUploadModalOpen={isUploadModalOpen} setUploadModalOpen={setUploadModalOpen} />
            }
        </>
    )
}


function ChannelPlayLists() {
    const [playlists, setPlaylists] = useState([]);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/playlist/user/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setPlaylists(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, []);


    return (
        <>
            {
                playlists && playlists.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                        {
                            playlists.map((playlist, index) => (
                                <PlaylistCard playlist={playlist} showUserProfile={false} key={index} onClick={() => router.push(`/playlist/${item._id}`)} />
                            ))
                        }
                    </div>
                    :
                    <EmptySectionComp
                        title={"No playlist created"}
                        description={"There are no playlist created on this channel."}
                    />
            }
        </>
    )
}


function ChannelTweets() {
    const [tweets, setTweets] = useState([]);
    const { id } = useParams();
    const { loggedInUser } = useAuth();

    useEffect(() => {
        axios.get(`${baseUrl}/tweets/user/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setTweets(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, [])

    return (
        <>
            {
                tweets && tweets.length > 0 ?
                    <div className="grid grid-cols-1 gap-4 mt-3">
                        {
                            id === loggedInUser._id && (
                                <div className="space-y-1">
                                    <textarea name="tweet" id="tweet" rows={4} placeholder="Write a tweet"
                                        className="w-full mx-2 px-2 py-1 bg-transparent border outline-none rounded">

                                    </textarea>
                                    <div className="flex justify-end items-center space-x-4">
                                        <MdOutlineEmojiEmotions className="text-2xl cursor-pointer" />
                                        <MdMoreHoriz className="text-2xl cursor-pointer" />
                                        <button className="hover:bg-purple-700 bg-purple-500 text-white px-6 py-2 rounded-md">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tweets.map((tweet, index) => (
                                <TweetCard tweet={tweet} setTweets={setTweets} key={index} />
                            ))
                        }
                    </div>
                    :
                    <div id="tweets" className="mt-4">
                        {
                            id === "34343" && (
                                <div className="">
                                    <textarea name="tweet" id="tweet" rows={5} placeholder="Write a tweet">

                                    </textarea>
                                    <div className="flex justify-end items-center">
                                        <MdOutlineEmojiEmotions />
                                        <MdMoreHoriz />
                                        <button className="hover:bg-purple-700 bg-purple-500 text-white px-4 py-2 rounded-md">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        <div className="text-center text-gray-400">
                            <h1 className="text-lg">No Tweets</h1>
                            <p className="text-sm">This channel has yet to make a Tweet.</p>
                        </div>
                    </div>
            }
        </>
    )
}


function ChannelSubscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/subscriptions/c/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data);
                setSubscribers(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, [])

    return (
        <>
            {
                subscribers.length > 0 ?
                    <div className="grid grid-cols-1 gap-4 mt-4 mx-24">
                        <input
                            type="text"
                            placeholder="Search for a subscriber"
                            className="w-full bg-gray-800 text-white p-3 rounded-md outline-none"
                        />
                        {
                            Array.from({ length: 6 }).map((_, idx) => (
                                <SubscriberCard key={idx} />
                            ))
                        }
                    </div>
                    :
                    <EmptySectionComp
                        title={"No Subscribers"}
                        description={"This channel has no subscribers yet."}
                    />
            }
        </>
    )
}


const EmptySectionComp = ({ title, description, icon }) => {

    return (
        <div className="mt-4">
            <div className="text-center text-gray-400">
                <h1 className="text-lg">{title}</h1>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}