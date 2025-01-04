"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import VideoCard from "@/app/components/VideoCard";
import Banner from "@/app/images/banner.png";
import Image from "next/image";
import Link from "next/link";
import PlaylistCard from "@/app/components/PlaylistCard";
import VideoCardListView from "@/app/components/VideoCardListView";

export default function ChannelPage() {
    return (
        <div className="flex-1 ">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar />
                <div className="p-4 w-full flex">
                    <PlaylistCard />
                    <div className="grid grid-cols-1 gap-4 mt-8">
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