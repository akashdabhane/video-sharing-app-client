'use client';
import Sidebar from '@/app/components/Sidebar';
import Navbar from '@/app/components/Navbar';
import VideoCardListView from '@/app/components/VideoCardListView';
import { useRouter } from 'next/navigation';

export default function WatchVideo() {
    const router = useRouter();

    return (
        <div className="flex-1">
            <Navbar />
            <div className="h-screen w-full bg-black text-white flex ">
                <Sidebar />
                <div className="p-4 flex flex-col md:flex-row w-full">
                    <div className="w-full mt-4 mx-2">
                        <video className='border ' width={1000} height={1000}>
                            <source src="/path/to/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <VideoCardListView />
                        <VideoCardListView />
                        <VideoCardListView />
                        <VideoCardListView />
                        <VideoCardListView />
                    </div>
                </div>
            </div>
        </div>
    );
}
