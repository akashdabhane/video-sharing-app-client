'use client';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import VideoCardListView from '@/app/components/VideoCardListView';

export default function Search() {
  const [videos, setVidoes] = useState([]);


  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>Video Sharing Platform</title>
      </Head>

      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4">
          {
            videos.length > 0 ?
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
                <div className="flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full">
                  <span className="text-white text-3xl">▶</span>
                </div>
                <h2 className="mt-4 text-lg">No videos available</h2>
                <p>Please try to search something else.</p>
              </div>
              :
              <div className="grid grid-cols-1 gap-4 mt-4">
                {
                  Array.from({ length: 6 }).map((_, idx) => (
                    <VideoCardListView key={idx} />
                  ))
                }
              </div>
          }
        </main>
      </div>
    </div>
  );
}
