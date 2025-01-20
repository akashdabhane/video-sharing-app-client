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
import { MdOutlineEdit } from "react-icons/md";
import { toast } from 'react-toastify';

function ChannelCard({ channel, setChannel }) {
    const [editChannelInfo, setEditChannelInfo] = useState(false);
    const { id } = useParams();
    const { loggedInUser } = useAuth();
    const pathname = usePathname();

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


    const handleUpdateAvatar = (file) => {
        if(id !== loggedInUser._id) {
            toast("You can't update this channel", {
                theme: "dark"
            })
            return;
        }

        if (file) {
            // Create a FormData object to properly send the file
            const formData = new FormData();
            formData.append("avatar", file);

            axios.patch(`${baseUrl}/users/avatar`, formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                    setChannel({
                        ...channel,
                        avatar: response.data.data.avatar
                    })
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    // loading false
                })
        } else {
            toast("File is not selected", {
                theme: "dark"
            })
        }
    }


    const handleUpdateCoverImage = (file) => {
        if(id !== loggedInUser._id) {
            toast("You can't update this channel", {
                theme: "dark"
            })
            return;
        }

        if (file) {
            // Create a FormData object to properly send the file
            const formData = new FormData();
            formData.append("coverImage", file);

            axios.patch(`${baseUrl}/users/cover-image`, formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                    setChannel({
                        ...channel,
                        coverImage: response.data.data.coverImage
                    })
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    // loading false
                })
        } else {
            toast("File is not selected", {
                theme: "dark"
            })
        }
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
        <div className="w-full relative">
            <input type="file" name="coverImageInput" id="coverImageInput" className='hidden'
                onChange={(e) => handleUpdateCoverImage(e.target.files[0])} />
            <label
                htmlFor="coverImageInput"
                className={`${editChannelInfo === false && "hidden"} text-white md:text-base absolute top-[7rem] right-2 w-10 h-10 bg-gray-400 cursor-pointer hover:bg-gray-500 rounded-full flex justify-center items-center`}
            >
                <MdOutlineEdit className='text-2xl' />
            </label>
            <Image
                src={channel?.coverImage || Banner}
                alt="Cover Picture"
                className="w-full h-40 "
                width={1000}
                height={1000}
            />
            <div className="flex items-start md:items-center gap-4 m-6 relative">
                <Image
                    src={channel?.avatar || Banner}
                    alt="Profile Picture"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                    width={1000}
                    height={1000}
                />
                <input type="file" name="avatarInput" id="avatarInput" className='hidden'
                    onChange={(e) => handleUpdateAvatar(e.target.files[0])} />
                <label
                    htmlFor="avatarInput"
                    className={`${editChannelInfo === false && "hidden"} text-white md:text-base absolute top-[3rem] right-[70rem] w-7 h-7 bg-gray-400 cursor-pointer hover:bg-gray-500 rounded-full flex justify-center items-center`}
                >
                    <MdOutlineEdit className='text-lg' />
                </label>
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