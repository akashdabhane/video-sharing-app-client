'use client';
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ToggleButton({ isPublished, videoId, videos, setVideos }) {

    const handleTogglePublishClick = () => {
        axios.patch(`${baseUrl}/videos/toggle/publish/${videoId}`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.statusCode === 200) {
                    const updatedVideos = videos.map(v => (v._id === videoId ? response.data.data : v));
                    setVideos(updatedVideos);
                    toast.success('Video publish status toggled', {
                        theme: "dark"
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }

    return (
        <div
            onClick={handleTogglePublishClick}
            className={`w-12 h-6 flex items-center rounded-full  cursor-pointer transition-colors ${isPublished ? "bg-green-500" : "bg-gray-400"}`}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transform transition-transform ${isPublished ? "translate-x-6" : "translate-x-0"}`}
            >
                {isPublished ? "✓" : "✗"}
            </div>
        </div>
    );
}
