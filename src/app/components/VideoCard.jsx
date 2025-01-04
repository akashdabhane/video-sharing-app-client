'use client';
import Image from 'next/image';
import Banner from '../images/banner.png';
import { useRouter } from 'next/navigation';

export default function VideoCard() {
    const router = useRouter();

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => router.push(`/watch/v/${"234"}`)}>
            <div className="relative w-full h-48">
                <Image
                    src={Banner}
                    alt="Video Thumbnail"
                    layout="fill"
                    objectFit="cover"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 text-sm rounded text-white">
                    20:45
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">JavaScript Fundamentals: Variables and Data Types</h3>
                <p className="text-sm text-gray-400">10.3k Views • 44 minutes ago</p>
                <p className="text-sm text-gray-400">Code Master</p>
            </div>
        </div>
    );
}