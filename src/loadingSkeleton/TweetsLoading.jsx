import React from 'react'
import Skeleton from 'react-loading-skeleton'

function TweetsLoading({ cards, isSubscribers }) {
    return (
        <div className={`${isSubscribers && "md:mx-28"} space-y-4`}>
            {
                Array(cards).fill(0).map((_, index) => (
                    <div className='flex items-start space-x-4 mx-4 border-b my-8 p-2' key={index}>
                        <Skeleton circle width={60} height={60} className='w-14 h-14 rounded-full' />
                        <div className="w-full">
                            <Skeleton count={2.5} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TweetsLoading