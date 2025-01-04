'use client';
import React, { useState } from 'react';

function UploadVideo() {
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [isUploading, setUploading] = useState(false);
    const [isUploadComplete, setUploadComplete] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = () => {
        setUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setUploadComplete(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex">

                <main className="flex-1">
                    {/* Main Content */}
                    <div className="p-6">
                        <button
                            onClick={() => setUploadModalOpen(true)}
                            className="bg-purple-500 px-4 py-2 rounded"
                        >
                            Upload Video
                        </button>
                    </div>

                    {/* Upload Modal */}
                    {
                        isUploadModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                                <div className="bg-gray-800 p-6 rounded-lg w-96">
                                    {
                                        (!isUploading && !isUploadComplete) && (
                                            <UploadVideoPopup />
                                        )
                                    }

                                    {
                                        isUploading && (
                                            <UploadingVideoPopup />
                                        )
                                    }

                                    {
                                        isUploadComplete && (
                                            <UploadedVideoPopup />
                                        )
                                    }
                                </div>
                            </div>
                        )}
                </main>
            </div>
        </div>
    );
}

export default App;


function UploadVideoPopup() {

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Upload Videos</h2>
            <div className="border-2 border-dashed border-gray-600 h-40 flex items-center justify-center">
                <p className="text-gray-400">Drag and drop video files to upload</p>
            </div>
            <input
                type="file"
                className="mt-4 text-sm"
                onChange={handleFileUpload}
            />
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => setUploadModalOpen(false)}
                    className="bg-gray-600 px-4 py-2 rounded mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleFileUpload}
                    className="bg-purple-500 px-4 py-2 rounded"
                >
                    Upload
                </button>
            </div>
        </div>
    )
}

function UploadingVideoPopup() {

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Uploading Video...</h2>
            <p className="text-gray-400 mb-2">Dashboard prototype recording.mp4</p>
            <p className="text-gray-400 mb-4">16 MB</p>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                ></div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={() => {
                        setUploading(false);
                        setUploadModalOpen(false);
                    }}
                    className="bg-gray-600 px-4 py-2 rounded mr-2"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

function UploadedVideoPopup() {

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Uploaded Video</h2>
            <p className="text-gray-400 mb-2">Dashboard prototype recording.mp4</p>
            <p className="text-gray-400 mb-4">16 MB</p>
            <div className="text-purple-500 font-bold mb-4">Uploaded Successfully</div>
            <div className="flex justify-end">
                <button
                    onClick={() => setUploadModalOpen(false)}
                    className="bg-purple-500 px-4 py-2 rounded"
                >
                    Finish
                </button>
            </div>
        </div>
    )
}