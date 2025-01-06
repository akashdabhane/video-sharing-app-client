"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import VideoCard from "@/app/components/VideoCard";
import Banner from "@/app/images/banner.png";
import PlaylistCard from "@/app/components/PlaylistCard";
import TweetCard from "@/app/components/TweetCard";
import SubscriberCard from "@/app/components/SubscriberCard";
import { MdOutlineEmojiEmotions, MdMoreHoriz } from "react-icons/md";
import ChannelCard from "@/app/components/ChannelCard";
import UploadVideo from "@/app/popups/UploadVideoPopup";


export default function ChannelPage() {
    const [nav, setNav] = useState(0);
    const router = useRouter();
    const { id } = router;

    const menu = [
        {
            id: 0,
            title: "Videos",
        },
        {
            id: 1,
            title: "Playlist",
        },
        {
            id: 2,
            title: "Tweets",
        },
        {
            id: 3,
            title: "Subscribed",
        },

    ]

    return (
        <div className="flex-1 ">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar />
                <div className="p-4 w-full">
                    <ChannelCard />
                    <div className="mt-6 border-b border-gray-700 ">
                        <ul className="grid grid-cols-4 text-center">
                            {
                                menu.map((item) => (
                                    <li className={`pb-2 border-b-2 cursor-pointer ${nav === item.id ? "border-purple-500" : "text-gray-400"} `}
                                        key={item.id}
                                        onClick={() => setNav(item.id)}
                                    >
                                        {item.title}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        nav === 0 && <ChannelVideos />
                    }
                    {
                        nav === 1 && <ChannelPlayLists />
                    }
                    {
                        nav === 2 && <ChannelTweets />
                    }
                    {
                        nav === 4 && <ChannelSubscribers />
                    }
                </div>
            </div>
        </div>
    );
}

function ChannelVideos() {
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const router = useRouter();
    const { id } = router;

    return (
        <>
            {
                videos.length > 0
                    ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {
                            Array.from({ length: 6 }).map((_, idx) => (
                                <VideoCard key={idx} />
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


    return (
        <>
            {
                playlists.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {
                            Array.from({ length: 6 }).map((_, idx) => (
                                <PlaylistCard key={idx} />
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
    const router = useRouter();
    const { id } = router;

    return (
        <>
            {
                tweets.length > 0 ?
                    <div className="grid grid-cols-1 gap-4 mt-8">
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
                        {
                            Array.from({ length: 6 }).map((_, idx) => (
                                <TweetCard key={idx} />
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

    return (
        <>
            {
                subscribers.length > 0 ?
                    <div className="grid grid-cols-1 gap-4 mt-8">
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