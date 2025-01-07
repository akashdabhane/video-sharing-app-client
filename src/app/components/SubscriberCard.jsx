import React from 'react';

function SubscriberCard() {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="">
                <Image
                    src={Banner}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="text-sm font-semibold">User Name</h3>
                    <p className="text-xs text-gray-400">@username</p>
                </div>
            </div>
            <button>
                Subscribe
            </button>
        </div>
    )
}

export default SubscriberCard