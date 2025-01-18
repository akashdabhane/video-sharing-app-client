'use client';
import { useAuth } from '@/contexts/AuthContext';
import { baseUrl, formatTimeAgo } from '@/utils/helper';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function VideoCard({ item }) {
    const router = useRouter();
    const { id } = useParams();
    const { loggedInUser } = useAuth();


    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => router.push(`/watch/v/${item?._id}`)}>
            <div className="relative w-full h-48">
                <Image
                    src={item?.thumbnail}
                    alt="Video Thumbnail"
                    width={1000}
                    height={1000}
                    className='w-full h-full'
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 text-sm rounded text-white">
                    {item?.duration}
                </span>
            </div>
            <div className="p-4 flex items-start space-x-2">
                {
                    item?.owner?.avatar && (
                        <Image
                            src={item?.owner?.avatar}
                            alt="User Avatar"
                            width={1000}
                            height={1000}
                            className="rounded-full w-12 h-12"
                        />
                    )
                }
                <div className="">
                    <h3 className="text-lg font-semibold line-clamp-1">{item?.title}</h3>
                    <p className="text-sm text-gray-400">{item?.views} Views • {formatTimeAgo(item?.createdAt)}</p>
                    <p className="text-sm text-gray-400">{item?.owner?.fullName}</p>
                </div>
            </div>
        </div>
    );
}