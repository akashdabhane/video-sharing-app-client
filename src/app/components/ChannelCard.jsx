import React from 'react'
import Banner from "@/app/images/banner.png";
import { useRouter } from "next/navigation";
import Image from "next/image";


function ChannelCard() {
    const router = useRouter();
    const { id } = router;


    return (
        <div className="w-full">
            <Image
                src={Banner}
                alt="Profile Picture"
                className="w-full h-40 "
            />
            <div className="flex items-center gap-4 m-6">
                <Image
                    src={Banner}
                    alt="Profile Picture"
                    className="w-20 h-20 rounded-full"
                />
                <div>
                    <h1 className="text-xl font-bold">React Patterns</h1>
                    <p className="text-sm text-gray-400">@reactpatterns</p>
                    <p className="text-sm text-gray-400">600k Subscribers · 220 Subscribed</p>
                </div>
                {
                    id === "234343"
                        ?
                        <button className="ml-auto bg-purple-500 text-white px-4 py-2 rounded-md">Edit</button>
                        :
                        <button className="ml-auto bg-purple-500 text-white px-4 py-2 rounded-md">Subscribe</button>
                }
            </div>
        </div>
    )
}

export default ChannelCard