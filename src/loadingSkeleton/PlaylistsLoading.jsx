import React from 'react'
import Skeleton from 'react-loading-skeleton'

function PlaylistsLoading({ cards, showUserProfile }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
            {
                Array(cards).fill(0).map((item, index) => (
                    <div className='md:m-4 w-full' key={index}>
                        <div className="w-full">
                            <Skeleton className='w-full h-60' />
                            <div className="px-4 bg-gray-800/50 backdrop-blur-md w-full">
                                <p className='flex items-center justify-between'>
                                    <Skeleton width={80} />
                                    <Skeleton width={80} />
                                </p>
                                <p className='space-x-4'>
                                    <Skeleton count={2} />
                                </p>
                            </div>
                        </div>
                        {/* <div className={`${showUserProfile === false && "hidden"} flex items-center space-x-2 relative -top-10`}>
                            <Skeleton circle width={30} height={30} />
                            <Skeleton count={2} />
                        </div> */}
                    </div>
                ))
            }
        </div>
    )
}

export default PlaylistsLoading