'use client';

import gfx_bg_blue from '@/public/bg_blue.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PersonImageSlider = ({ imageUrls, height = 80, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`relative h-[${height}vh] bg-wwr_yellow_orange`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_blue}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10'
      />
      {imageUrls?.map((image, iI) => (
        <Image
          src={image}
          alt=''
          key={iI}
          fill={true}
          className={`absolute bottom-0 !top-auto !left-[5%] !w-[90%] !h-5/6 object-contain object-bottom transition-opacity duration-[1800ms]${
            currentIndex % imageUrls.length !== iI ? ' opacity-0' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default PersonImageSlider;
