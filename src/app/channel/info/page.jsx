'use client';
import ChannelCard from "@/app/components/ChannelCard";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";

export default function SettingsPage() {
    const [tab, setTab] = useState("Personal Information");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">

            <div className="flex-1 ">
                <Navbar />
                <div className="min-h-screen bg-black text-white flex">
                    <Sidebar />
                    <div className="p-4 w-full">
                        <ChannelCard />

                        {/* Tabs */}
                        <nav className="flex">
                            {["Personal Information", "Channel Information", "Change Password"].map((label, index) => (
                                <button
                                    key={index}
                                    onClick={() => setTab(label)}
                                    className={`flex-grow py-2 text-center ${tab === label ? "border-b-2 border-purple-500" : "text-gray-400"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>

                        {/* Forms */}
                        {
                            tab === "Personal Information" && <EditPersonalInfoForm />
                        }

                        {
                            tab === "Channel Information" && <EditChannelInfoForm />
                        }

                        {
                            tab === "Change Password" && <ChangePasswordForm />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}


function EditPersonalInfoForm() {

    return (
        <section className=" mt-4 flex flex-col md:flex-row justify-center md:space-x-8">
            <div className="">
                <h2 className="text-lg font-semibold">Personal Info</h2>
                <p className="text-gray-400 mb-4">Update your photo and personal details.</p>
            </div>
            <form className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div>
                        <label className="block text-sm">First name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                            placeholder="React"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Last name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                            placeholder="Patterns"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Email address</label>
                    <input
                        type="email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="patternsreact@gmail.com"
                    />
                </div>
                <div className="flex gap-4">
                    <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="flex-grow bg-purple-500 py-2 rounded-md">
                        Save changes
                    </button>
                </div>
            </form>
        </section>
    )
}

function EditChannelInfoForm() {

    return (
        <section className="mt-4 flex flex-col md:flex-row justify-center md:space-x-8">
            <div className="">
                <h2 className="text-lg font-semibold">Channel Info</h2>
                <p className="text-gray-400 mb-4">Update your Channel details here.</p>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm">Username</label>
                    <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                        <span className="px-3">vidplay.com/</span>
                        <input
                            type="text"
                            className="flex-grow bg-transparent py-2"
                            placeholder="reactpatterns"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Description</label>
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="I'm a Product Designer based in Melbourne, Australia..."
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm">Timezone</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2">
                        <option>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="flex-grow bg-purple-500 py-2 rounded-md">
                        Save changes
                    </button>
                </div>
            </form>
        </section>
    )
}

function ChangePasswordForm() {

    return (
        <section className="mt-4 flex flex-col md:flex-row justify-center md:space-x-8">
            <div className="">
                <h2 className="text-lg font-semibold">Password</h2>
                <p className="text-gray-400 mb-4">Please enter your current password to change your password.</p>
            </div>
            <form className="space-y-4 md:w-[30rem]">
                <div>
                    <label className="block text-sm">Current password</label>
                    <input
                        type="password"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm">New password</label>
                    <input
                        type="password"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="Your new password must be more than 8 characters."
                    />
                </div>
                <div>
                    <label className="block text-sm">Confirm password</label>
                    <input
                        type="password"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="flex-grow bg-purple-500 py-2 rounded-md">
                        Update Password
                    </button>
                </div>
            </form>
        </section>
    )
}