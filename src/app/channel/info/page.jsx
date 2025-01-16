'use client';
import { useState, useEffect } from "react";
import ChannelCard from "@/components/ChannelCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function ChannelInfo() {
    const [channel, setChannel] = useState([]);
    const [tab, setTab] = useState("Personal Information");

    useEffect(() => {
        axios.get(`${baseUrl}/users/current-user`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        })
            .then(response => {
                console.log(response.data.data[0]);
                setChannel(response.data.data[0]);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">

                <div className="flex-1 ">
                    <Navbar />
                    <div className="min-h-screen bg-black text-white flex">
                        <Sidebar />
                        <div className="p-4 w-full">
                            <ChannelCard channel={channel} />

                            {/* Tabs */}
                            <nav className="flex border-b border-gray-700">
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
                                tab === "Personal Information" && <EditPersonalInfoForm
                                    name={channel?.fullName}
                                    email={channel?.email}
                                />
                            }

                            {
                                tab === "Channel Information" && <EditChannelInfoForm
                                    username={channel?.username}
                                    description={channel?.descripition}
                                />
                            }

                            {
                                tab === "Change Password" && <ChangePasswordForm />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </ProtectedRoute>
    );
}


function EditPersonalInfoForm({ name, email }) {
    const [updatePersonalInfo, setUpdatePersonalInfo] = useState(false);
    const [formData, setFormData] = useState({
        name: name,
        email: email
    });

    const updateUserInformation = () => {
        if (formData.name !== name && formData.email !== email) {
            axios.post(`${baseUrl}/users/update-account`, {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    // loading false
                })
        }
    }

    return (
        <section className=" mt-4 flex flex-col md:flex-row justify-center md:space-x-8">
            <div className="">
                <h2 className="text-lg font-semibold">Personal Info</h2>
                <p className="text-gray-400 mb-4">Update your photo and personal details.</p>
            </div>
            <form className="space-y-4" onSubmit={updateUserInformation}>
                <div className="flex items-center space-x-2 w-80">
                    <div className="w-full">
                        <label className="block text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                            placeholder="your name"
                            value={formData.name}
                            disabled={updatePersonalInfo ? false : true}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="patternsreact@gmail.com"
                        value={formData.email}
                        disabled={updatePersonalInfo ? false : true}
                    />
                </div>
                {
                    updatePersonalInfo ?
                        <div className="flex gap-4">
                            <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md" onClick={() => setUpdatePersonalInfo(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="flex-grow bg-purple-500 py-2 rounded-md">
                                Save changes
                            </button>
                        </div>
                        :
                        <button className="w-full bg-purple-500 py-2 rounded-md" onClick={() => setUpdatePersonalInfo(true)}>
                            Update Information
                        </button>
                }
            </form>
        </section>
    )
}

function EditChannelInfoForm({ username, description }) {
    const [updateChannelInfo, setUpdateChannelInfo] = useState(false);


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
                            value={username}
                            disabled={updateChannelInfo ? false : true}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Description</label>
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="I'm a Product Designer based in Melbourne, Australia..."
                        value={description !== "" && description}
                        disabled={updateChannelInfo ? false : true}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm">Timezone</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2" disabled={updateChannelInfo ? false : true}>
                        <option>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    </select>
                </div>
                {
                    updateChannelInfo ?
                        <div className="flex gap-4">
                            <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md" onClick={() => setUpdateChannelInfo(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="flex-grow bg-purple-500 py-2 rounded-md">
                                Save changes
                            </button>
                        </div>
                        :
                        <button className="w-full bg-purple-500 py-2 rounded-md" onClick={() => setUpdateChannelInfo(true)}>
                            Update Information
                        </button>
                }
            </form>
        </section>
    )
}

function ChangePasswordForm() {
    const handleChangePassword = () => {
        axios.post(`${baseUrl}/users/change-password`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }

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