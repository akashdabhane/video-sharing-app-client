'use client';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import VideoCardListView from '@/components/VideoCardListView';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseUrl, formatTimeAgo } from '@/utils/helper';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Banner from "@/images/banner.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import ProtectedRoute from '@/utils/ProtectedRoute';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import VideosListViewLoading from '@/loadingSkeleton/VideosListViewLoading';
import Skeleton from 'react-loading-skeleton';

export default function WatchVideo() {
    const [video, setVideo] = useState({});
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const { id } = useParams();
    const navigate = useRouter(null);
    const [loading, setLoading] = useState({
        video: true,
        suggestedVideos: true
    });

    useEffect(() => {
        axios.get(`${baseUrl}/videos/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data.data[0]);
                setVideo(response.data.data[0]);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading({ ...loading, video: false })
            })
    }, []);

    useEffect(() => {
        if (Object.keys(video).length > 0) {
            axios.get(`${baseUrl}/videos/channel/${video?.owner[0]?._id}`, {
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
                    setLoading({ ...loading, suggestedVideos: false });
                })
        }
    }, [video]);

    const handleOnLikeClick = () => {
        axios.post(`${baseUrl}/likes/toggle/v/${id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
                setVideo({
                    ...video,
                    totalLikes: video.isLiked === true ? video.totalLikes - 1 : video.totalLikes + 1,
                    isLiked: video.isLiked === true ? false : true,
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleOnSubscribeClick = () => {
        axios.post(`${baseUrl}/subscriptions/c/${video?.owner[0]?._id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);

                setVideo({
                    ...video,
                    isSubscribed: response.data.statusCode === 201 ? true : false,
                    totalSubscribers: response.data.statusCode === 201 ? video.totalSubscribers + 1 : video.totalSubscribers - 1
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
        <ProtectedRoute>
            <div className="flex-1 ">
                <Navbar />
                <div className="h-screen w-full bg-black text-white flex ">
                    <Sidebar />
                    <div className="p-2 md:p-4 flex flex-col md:flex-row w-full">
                        <div className="w-full">
                            {
                                Object.keys(video).length > 0 ? (
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
                                                <div className="flex items-center gap-8">
                                                    <button className={`flex items-center gap-1 text-gray-400 hover:text-white`}>
                                                        <AiOutlineLike
                                                            className={`${video?.isLiked ? "text-purple-400" : "text-gray-400"} text-xl`}
                                                            onClick={handleOnLikeClick}
                                                        />
                                                        {video?.totalLikes}
                                                    </button>
                                                    {/* <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                                                    <AiOutlineDislike /> 20
                                                </button> */}
                                                    <button className="ml-auto bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 mt-4">
                                                <Image
                                                    src={video?.owner[0]?.avatar}
                                                    alt="React Patterns"
                                                    className="w-12 h-12 rounded-full cursor-pointer"
                                                    width={1000}
                                                    height={1000}
                                                    onClick={() => navigate.push(`/channel/${video?.owner[0]?._id}?tab=videos`)}
                                                />
                                                <div onClick={() => navigate.push(`/channel/${video?.owner[0]?._id}?tab=videos`)} className='cursor-pointer'>
                                                    <h2 className="font-semibold">{video?.owner[0]?.fullName}</h2>
                                                    <p className="text-gray-400 text-sm">{video?.totalSubscribers} {video?.totalSubscribers > 1 ? "Subscribers" : "Subscriber"} </p>
                                                </div>
                                                {
                                                    video?.isSubscribed ?
                                                        <button
                                                            className="ml-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                                            onClick={handleOnSubscribeClick}
                                                        >
                                                            Subscribed
                                                        </button>
                                                        :
                                                        <button
                                                            className="ml-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                                            onClick={handleOnSubscribeClick}
                                                        >
                                                            Subscribe
                                                        </button>
                                                }
                                            </div>
                                            <p className={`text-gray-300 mt-4 cursor-pointer ${!showDescription && 'line-clamp-1'}`} onClick={() => setShowDescription(!showDescription)}>
                                                {video?.description}
                                                <span className='text-blue-600 mx-1' onClick={() => setShowDescription(false)}>hide</span>
                                            </p>
                                        </div>
                                        <CommentsSection />
                                    </div>
                                )
                                    :
                                    <div className='w-full h-[30rem]'>
                                        <Skeleton height={500} />
                                        <Skeleton height={100} className='my-4' />
                                        <Skeleton height={100} className='my-4' count={2} />
                                    </div>
                            }

                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 w-full md:w-[60%]">
                            {
                                loading.suggestedVideos
                                    ?
                                    <div className="-mt-4 mx-4">
                                        <VideosListViewLoading cross={true} cards={10} />
                                    </div>
                                    :
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
    const [inputFocus, setInputFocus] = useState(false);
    const [comment, setComment] = useState("");
    const [editComment, setEditComment] = useState({ commentId: null, updatedComment: "" });
    const { id } = useParams();
    const { loggedInUser } = useAuth();

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


    const handleAddCommentClick = () => {
        if (comment.length > 0) {
            axios.post(`${baseUrl}/comments/${id}`, { content: comment }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    const updatedData = {
                        ...response.data.data,
                        owner: {
                            ...response.data.data.owner,
                            fullName: loggedInUser.fullName,
                            avatar: loggedInUser.avatar,
                            username: loggedInUser.username,
                            _id: loggedInUser._id,
                        },
                    };

                    setComments([...comments, updatedData]);
                    setComment("");
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            toast.error('Please enter a comment.', {
                theme: "dark"
            });
        }
    }

    const handleDeleteCommentClick = (commentId) => {
        axios.delete(`${baseUrl}/comments/channel/${commentId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then((response) => {
                console.log(response.data);
                setComments(comments.filter(c => c._id !== commentId));
                toast.success('Comment deleted successfully.', {
                    theme: "dark"
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleUpdateCommentClick = () => {
        console.log(editComment);

        axios.patch(`${baseUrl}/comments/channel/${editComment.commentId}`, { content: editComment.updatedComment }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then((response) => {
                const updatedComments = comments.map(c => (c._id === editComment.commentId ? { ...c, content: editComment.updatedComment } : c));
                setComments(updatedComments);
                setEditComment({ commentId: null, updatedComment: "" });
                toast.success('Comment updated successfully.', {
                    theme: "dark"
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleOnCommentToggleLikeClick = (commentObj) => {
        axios.post(`${baseUrl}/likes/toggle/c/${commentObj._id}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);

                // Update the specific comment in the comments state
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment._id === commentObj._id
                            ? {
                                ...comment,
                                isLiked: !comment.isLiked,
                                totalLikes: comment.isLiked ? comment.totalLikes - 1 : comment.totalLikes + 1,
                            }
                            : comment
                    )
                );
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="bg-gray-900 text-white p-4 rounded-md mt-4">
            <h2 className="text-xl font-bold">{comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}</h2>
            <div className="mt-4 flex flex-col">
                <input
                    type="text"
                    placeholder="Add a Comment"
                    className="w-full bg-gray-800 text-white p-3 rounded-md outline-none"
                    onFocus={() => setInputFocus(true)}
                    // onBlur={() => setInputFocus(false)}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className={`${inputFocus ? " " : "hidden"} text-end space-x-2 m-2 text-sm`}>
                    <button className='bg-transparent border text-white px-3 py-1 rounded hover:bg-gray-700'>Cancel</button>
                    <button
                        className={`bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700`}
                        onClick={handleAddCommentClick}
                    >
                        Comment
                    </button>
                </div>
            </div>
            <div className="mt-6">
                {
                    comments.map((comment, index) => (
                        <div className='py-4 border-b border-gray-700 flex justify-between' key={index}>
                            <div className="flex items-start gap-3 w-[92%]">
                                <Image
                                    src={comment?.owner[0]?.avatar}
                                    alt={comment?.owner[0]?.fullName}
                                    className="w-10 h-10 rounded-full"
                                    width={1000}
                                    height={1000}
                                />
                                <div className='w-full'>
                                    <h3 className="font-semibold text-white">{comment?.owner[0]?.fullName}</h3>
                                    <p className="text-gray-400 text-xs">@{comment?.owner[0]?.username} • {formatTimeAgo(comment?.createdAt)}</p>
                                    {
                                        editComment.commentId === comment._id
                                            ?
                                            <div className="border">
                                                <textarea
                                                    type="text"
                                                    className='text-gray-300 bg-transparent outline-none rounded p-2 w-full'
                                                    defaultValue={comment?.content}
                                                    onChange={(e) => setEditComment({ ...editComment, updatedComment: e.target.value })}
                                                />
                                                <div className="space-x-2 text-sm flex justify-end m-1">
                                                    <button
                                                        className='bg-transparent border text-white px-3 py-1 rounded hover:bg-gray-700'
                                                        onClick={() => setEditComment({ commentId: null })}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className={`bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700`}
                                                        onClick={() => editComment?.updatedComment !== comment?.content && handleUpdateCommentClick()}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <p className="text-gray-300 mt-1">{comment?.content}</p>
                                    }

                                    <div className="flex items-center space-x-1 my-1">
                                        <AiOutlineLike
                                            className={`${comment?.isLiked ? "text-purple-400" : "text-gray-400"} cursor-pointer text-lg`}
                                            onClick={() => handleOnCommentToggleLikeClick(comment)}
                                        />
                                        <span className='text-xs '>
                                            {comment?.totalLikes}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {
                                loggedInUser._id === comment?.owner[0]?._id &&
                                <div className="space-x-2">
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEdit onClick={() => setEditComment({ commentId: comment._id, updatedComment: comment?.content })} />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <FaTrashAlt onClick={() => handleDeleteCommentClick(comment._id)} />
                                    </button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};