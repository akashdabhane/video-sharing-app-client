'use client';
import React from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const DeleteVideoModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="w-[100vw] h-[100vh] inset-0 flex items-center justify-center px-20 bg-black/50 backdrop-blur-sm">
            <div className="z-60 absolute top-0 right-0 bg-black text-white rounded-lg shadow-lg p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    <FiX className="w-5 h-5" />
                </button>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Icon */}
                    <div className="flex justify-center items-center text-red-500">
                        <FiTrash2 className="w-12 h-12" />
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 text-xl font-semibold text-center">
                        Delete Video
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-center text-gray-400">
                        Are you sure you want to delete this video? Once it's deleted, you
                        will not be able to recover it.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-400 border border-gray-600 rounded hover:text-white hover:border-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteVideoModal;
