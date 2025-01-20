'use client';
import React, { useEffect, useState } from 'react';
import Banner from "@/images/banner.png";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from 'axios';
import { baseUrl } from '../utils/helper';
import Cookies from 'js-cookie';
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from 'next/navigation';

function ChannelCard({ channel }) {
    const [editChannelInfo, setEditChannelInfo] = useState(false);
    const { id } = useParams();
    const { loggedInUser } = useAuth();
    const pathname = usePathname();

    console.log(channel)
    const handleUpdateChannelInfo = () => {
        axios.patch(`${baseUrl}/users/update-account`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }


    const handleUpdateAvatar = () => {
        axios.patch(`${baseUrl}/users/avatar`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }


    const handleUpdateCoverImage = () => {
        axios.patch(`${baseUrl}/users/cover-image`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }

    const handleOnSubscribeClick = () => {
        axios.post(`${baseUrl}/subscriptions/c/${channel?._id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);

                setVideo({
                    ...channel,
                    isSubscribed: response.data.statusCode === 201 ? true : false,
                    subscribersCount: response.data.statusCode === 201 ? channel.subscribersCount + 1 : channel.subscribersCount - 1
                })

                if (response.data.statusCode === 201) {
                    toast.success("Subscribed!", {
                        theme: "dark"
                    });
                }
                if (response.data.statusCode === 200) {
                    toast.success("Unsubscribed!", {
                        theme: "dark"
                    });
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Failed to subscribe/unsubscribe!", {
                    theme: "dark"
                });
            })
    }

    return (
        <div className="w-full">
            <Image
                src={channel?.coverImage || Banner}
                alt="Cover Picture"
                className="w-full h-40 "
                width={1000}
                height={1000}
            />
            <div className="flex items-start md:items-center gap-4 m-6">
                <Image
                    src={channel?.avatar || Banner}
                    alt="Profile Picture"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                    width={1000}
                    height={1000}
                />
                <div className='flex flex-col'>
                    <input
                        type='text'
                        placeholder='your name'
                        value={channel?.fullName || ""}
                        className="text-lg md:text-xl font-bold bg-transparent border-none outline-none"
                        disabled={editChannelInfo ? false : true}
                    />
                    <input
                        type='text'
                        placeholder='username'
                        value={("@" + channel?.username) || ""}
                        className="text-sm text-gray-400 bg-transparent border-none outline-none"
                        disabled={editChannelInfo ? false : true}
                    />
                    {
                        pathname !== "/channel/info" && (
                            <ul className='space-x-4 flex items-center text-sm text-gray-400'>
                                <li>
                                    {channel?.subscribersCount} {channel?.subscribersCount > 1 ? "Subscribers" : "Subscriber"}
                                </li>
                                <li >
                                    {channel?.channelsSubscribedToCount} Subscribed
                                </li>
                            </ul>
                        )
                    }
                </div>
                {
                    (id === loggedInUser?._id || pathname === "/channel/info")
                        ?
                        (
                            editChannelInfo ?
                                <button
                                    className="ml-auto bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md w-40"
                                    onClick={() => setEditChannelInfo(false)}
                                >
                                    Save
                                </button>
                                :
                                <button
                                    className="ml-auto bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md w-40"
                                    onClick={() => setEditChannelInfo(true)}
                                >
                                    Edit
                                </button>
                        )
                        :
                        (
                            <button
                                className="ml-auto bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                                onClick={handleOnSubscribeClick}
                            >
                                {
                                    channel?.isSubscribed ? "Unsubscribe" : "Subscribe"
                                }
                            </button>
                        )
                }
            </div>
        </div >
    )
}

export default ChannelCard