import Image from 'next/image';
import React from 'react';
import Banner from '@/app/images/banner.png';

function PlaylistCard() {
    return (
        <div className='w-[28rem]'>
            <div className="">
                <Image
                    src={Banner}
                    alt="playlist banner"
                    objectFit="cover"
                    className="w-full h-64"
                />
                <div className="relative -top-12 px-6">
                    <p>
                        <span>Playlist</span>
                        <span>12 videos</span>
                    </p>
                    <p>
                        <span>100k views</span>
                        <span>2 hours ago</span>
                    </p>
                </div>
            </div>
            <div className="">
                <h3>React Mestry</h3>
                <p className='line-clamp-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis autem adipisci deserunt animi nesciunt tempore porro numquam similique veniam maiores?</p>
            </div>
        </div>
    )
}

export default PlaylistCard