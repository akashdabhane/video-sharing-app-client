import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function VideosListViewLoading({ cross, cards }) {
    return (
        <div className='space-y-4 mt-2 w-full'>
            {
                Array(cards).fill(0).map((item, index) => (
                    <div className={`flex flex-col md:flex-row w-full md:w-[70%]`} key={index}>
                        <Skeleton width={240} height={130} />
                        <div className="w-full px-2">
                            <Skeleton count={4.5} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default VideosListViewLoading