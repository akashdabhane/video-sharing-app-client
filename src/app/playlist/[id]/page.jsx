"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import PlaylistCard from "@/app/components/PlaylistCard";
import VideoCardListView from "@/app/components/VideoCardListView";

export default function ChannelPage() {
    return (
        <div className="flex-1 ">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar />
                <div className="p-2 md:p-4 w-full flex flex-col md:flex-row">
                    <>
                        <PlaylistCard />

                    </>
                    <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4">
                        <VideoCardListView cross={true} />
                        <VideoCardListView cross={true} />
                        <VideoCardListView cross={true} />
                        <VideoCardListView cross={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}