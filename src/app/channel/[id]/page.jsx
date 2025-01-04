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


export default function ChannelPage() {
    const router = useRouter();
    const { id } = router;


    return (
        <div className="flex-1 ">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar />
                <div className="p-4 w-full">
                    <ChannelCard />
                    <div className="mt-6 lg:px-40 border-b border-gray-700 ">
                        <nav className="grid grid-cols-4 text-center">
                            <Link href="#videos" className="pb-2 border-b-2 border-purple-500">Videos</Link>
                            <Link href="#playlist" className="pb-2 text-gray-400">Playlist</Link>
                            <Link href="#tweets" className="pb-2 text-gray-400">Tweets</Link>
                            <Link href="#subscribed" className="pb-2 text-gray-400">Subscribed</Link>
                        </nav>
                    </div>
                    <ChannelVideos />
                </div>
            </div>
        </div>
    );
}

function ChannelVideos() {
    const [videos, setVideos] = useState([]);
    const router = useRouter();
    const { id } = router;

    return (
        <>
            {
                videos.length > 0 ?
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
                            <h className="text-lg">No videos uploaded</h>
                            <p className="text-sm">This page has yet to upload a video. Search another page in order to find more videos.</p>
                            <div className="flex justify-center">
                                {
                                    id === "234343" && (
                                        <button className="hover:bg-purple-700 bg-purple-500 text-white px-4 py-2 rounded-md mt-4"

                                        >
                                            New Video
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>

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
                    <div id="videos" className="mt-4">
                        <div className="text-center text-gray-400">
                            <h className="text-lg">No playlist created</h>
                            <p className="text-sm">There are no playlist created on this channel.</p>
                        </div>
                    </div>

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
                            <h className="text-lg">No Tweets</h>
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
                    <div id="subscribed" className="mt-4">
                        <div className="text-center text-gray-400">
                            <h className="text-lg">No Subscribers</h>
                            <p className="text-sm">This channel has no subscribers yet.</p>
                        </div>
                    </div>
            }
        </>
    )
}