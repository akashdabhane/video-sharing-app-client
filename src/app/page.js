'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../utils/helper';

export default function HomePage() {
  const [videos, setVidoes] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/videos`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
    })
      .then(response => {
        console.log(response.data.data);
        setVidoes(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // loading false
      })
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4">
          {
            videos.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                  videos.map((item, index) => (
                    <VideoCard item={item} key={index} />
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
