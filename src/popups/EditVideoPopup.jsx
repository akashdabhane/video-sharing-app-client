// components/EditVideoModal.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const EditVideoModal = ({ isOpen, onClose, videoData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6">Edit Video</h2>
                <p className="text-gray-400 text-sm mb-4">Share where you've worked on your profile.</p>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Thumbnail*</label>
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                        <img
                            src={videoData.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Title*</label>
                    <input
                        type="text"
                        defaultValue={videoData.title}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Description*</label>
                    <textarea
                        defaultValue={videoData.description}
                        rows="4"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditVideoModal;
