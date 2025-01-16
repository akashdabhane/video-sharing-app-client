'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import VideoCardListView from '@/components/VideoCardListView';
import axios from 'axios';
import { baseUrl } from '@/utils/helper';
import Cookies from 'js-cookie';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Search() {
  const [searchResultVideos, setSearchResultVideos] = useState([]);

  useEffect(() => {
    // hit search api when ready
    axios.get(`${baseUrl}/videos/channel/66843834742908baa9ef75d0`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
    })
      .then(response => {
        console.log(response.data.data);
        setSearchResultVideos(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // loading false
      })
  }, [])

  return (
    <ProtectedRoute>
      <div className="bg-black text-white min-h-screen">
        <Navbar />

        <div className="flex flex-col md:flex-row">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-4">
            {
              searchResultVideos.length < 0 ?
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
                    searchResultVideos.map((video) => (
                      <VideoCardListView video={video} key={video._id} />
                    ))
                  }
                </div>
            }
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
