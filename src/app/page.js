'use client';
import Head from 'next/head';
import Navbar from '../app/components/Navbar';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import VideoCard from './components/VideoCard';

export default function HomePage() {
  const [videos, setVidoes] = useState([{}]);


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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                  Array.from({ length: 6 }).map((_, idx) => (
                    <VideoCard key={idx} />
                  ))
                }
              </div>
              :
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-400">
                <div className="flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full">
                  <span className="text-white text-3xl ml-1">▶</span>
                </div>
                <h2 className="mt-4 text-lg">No videos available</h2>
                <p>Please try to search something else.</p>
              </div>
          }
        </main>
      </div>
    </div>
  );
}
