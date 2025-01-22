import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function VideosLoading({ cards }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mr-20 w-[90%] md:w-full"
            // style={{
            //     marginRight: "40px",
            //     marginLeft: "40px",
            // }}
            >
            {
                Array(cards).fill(0).map((item, index) => (
                    <div className='w-full h-full m-4 space-y-2' key={index}>
                        <div className="w-full h-[50%]">
                            <Skeleton height={180} width={400} />
                        </div>
                        <div className="flex items-start space-x-2">
                            <Skeleton circle height={60} width={60} />
                            <div className="w-full space-y-4 my-2">
                                <Skeleton />
                                <Skeleton />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default VideosLoading