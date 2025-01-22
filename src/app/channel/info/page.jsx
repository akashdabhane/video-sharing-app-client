'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect, Suspense } from "react";
import ChannelCard from "@/components/ChannelCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChannelInfoMain() {
    return (
        <Suspense>
            <ChannelInfo />
        </Suspense>
    )
}

function ChannelInfo() {
    const [channel, setChannel] = useState({});
    const navigate = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const menu = [
        {
            id: 0,
            title: "Personal Information",
            link: "/channel/info?tab=personal-information"
        },
        {
            id: 1,
            title: "Channel Information",
            link: "/channel/info?tab=channel-information"
        },
        {
            id: 2,
            title: "Change Password",
            link: "/channel/info?tab=change-password"
        }
    ]

    useEffect(() => {
        axios.get(`${baseUrl}/users/current-user`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        })
            .then(response => {
                console.log(response.data.data);
                setChannel(response.data.data);
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
                        <div className="p-3 md:p-4 w-full">
                            <ChannelCard channel={channel} setChannel={setChannel} />

                            {/* Tabs */}
                            <nav className="flex border-b border-gray-700">
                                {
                                    menu.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => navigate.push(item.link)}
                                            className={`flex-grow py-2 text-center ${tab === item.title.replace(" ", "-").toLowerCase() ? "border-b-2 border-purple-500" : "text-gray-400"}`}
                                        >
                                            {item.title}
                                        </button>
                                    ))
                                }
                            </nav>

                            {/* Forms */}
                            {
                                tab === "personal-information" && <EditPersonalInfoForm
                                    name={channel?.fullName}
                                    email={channel?.email}
                                />
                            }

                            {
                                tab === "channel-information" && <EditChannelInfoForm
                                    username={channel?.username}
                                    description={channel?.descripition}
                                />
                            }

                            {
                                tab === "change-password" && <ChangePasswordForm />
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const updateUserInformation = (e) => {
        e.preventDefault();
        setUpdatePersonalInfo(false);

        if (formData.name !== name || formData.email !== email) {
            axios.patch(`${baseUrl}/users/update-account`, formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                    console.log('personal information updated successfully')
                    setFormData({ name: response.data.data.fullName, email: response.data.data.email })
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
            <form className="space-y-4" onSubmit={(e) => updateUserInformation(e)}>
                <div className="flex items-center space-x-2 w-full md:w-[27rem]">
                    <div className="w-full">
                        <label className="block text-sm">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                            placeholder="your name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            disabled={updatePersonalInfo ? false : true}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="example@gmail.com"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        disabled={updatePersonalInfo ? false : true}
                    />
                </div>
                {
                    updatePersonalInfo ?
                        <div className="flex gap-4">
                            <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md" onClick={() => {
                                setFormData({ name: name, email: email })
                                setUpdatePersonalInfo(false);
                            }}>
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

    const [formData, setFormData] = useState({
        username: username,
        description: description,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleUpdateChannelInfo = (e) => {
        e.preventDefault();
        setUpdateChannelInfo(false);

        if (formData.username !== username || formData.description !== description) {
            // no api end point available for this
            axios.patch(`${baseUrl}/users/update-account`, {
                username: formData.username,
                description: formData.description
            }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data.data);
                    console.log('channel info updated');
                    setFormData({ username: response.data.data.username, description: response.data.data?.descripition }); // Reset the form
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
        <section className="mt-4 flex flex-col md:flex-row justify-center md:space-x-8">
            <div className="">
                <h2 className="text-lg font-semibold">Channel Info</h2>
                <p className="text-gray-400 mb-4">Update your Channel details here.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleUpdateChannelInfo(e)}>
                <div className="w-full md:w-[27rem]">
                    <label className="block text-sm">Username</label>
                    <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                        <span className="px-3">vidplay.com/</span>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="flex-grow bg-transparent py-2"
                            placeholder="reactpatterns"
                            value={formData.username || ""}
                            onChange={handleInputChange}
                            disabled={updateChannelInfo ? false : true}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Description</label>
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="I'm a Product Designer based in Melbourne, Australia..."
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
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
                            <button type="button" className="flex-grow bg-gray-700 py-2 rounded-md" onClick={() => {
                                setFormData({ username: username, description: description })
                                setUpdateChannelInfo(false);
                            }}>
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
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleChangePassword = (e) => {
        e.preventDefault();

        // Validation: Check if newPassword and confirmPassword match
        if (formData.newPassword !== formData.confirmPassword) {
            console.log("New password and confirm password do not match.");
            return;
        }

        if (formData.newPassword.length < 8) {
            console.log("Password must be at least 8 characters long.");
            return;
        }

        axios.post(`${baseUrl}/users/change-password`, {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data);
                console.log('password updated');
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset the form
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
            <form className="space-y-4" onSubmit={(e) => handleChangePassword(e)}>
                <div className="w-full md:w-[27rem]">
                    <label className="block text-sm">Current password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        value={formData.oldPassword || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="block text-sm">New password</label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        placeholder="Your new password must be more than 8 characters."
                        value={formData.newPassword || ""}
                        onChange={handleInputChange}
                        minLength={8}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                        value={formData.confirmPassword || ""}
                        onChange={handleInputChange}
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