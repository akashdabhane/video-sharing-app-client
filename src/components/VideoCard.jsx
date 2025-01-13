'use client';
import { formatTimeAgo } from '@/utils/helper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoCard({ item }) {
    const router = useRouter();
    const [uploadedTime, setUploadedTime] = useState("");
    console.log(item);

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => router.push(`/watch/v/${item._id}`)}>
            <div className="relative w-full h-48">
                <Image
                    src={item.thumbnail}
                    alt="Video Thumbnail"
                    // objectFit="cover"
                    // fill
                    width={1000}
                    height={1000}
                    className='w-full h-full'
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 text-sm rounded text-white">
                    {"20:00"}
                </span>
            </div>
            <div className="p-4 flex items-start space-x-2">
                <Image
                    src={item?.owner?.avatar}
                    alt="User Avatar"
                    width={1000}
                    height={1000}
                    className="rounded-full w-12 h-12"
                />
                <div className="">
                    <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.views} Views • {formatTimeAgo(item?.createdAt)}</p>
                    <p className="text-sm text-gray-400">{item?.owner?.fullName}</p>
                </div>
            </div>
        </div>
    );
}