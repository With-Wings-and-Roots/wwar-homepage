'use client';

import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import React, { useState } from 'react';

const TimelineCardInternal = ({
  timeLineEvent,
  selectedCountry,
  mediaUrl,
  link,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={link}
      className='relative aspect-square w-full flex flex-col justify-end cursor-pointer'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      scroll={false}
    >
      <Image
        className={`absolute min-w-full min-h-full ${hovered ? 'blur' : ''}`}
        src={mediaUrl ? mediaUrl : '/colors.png'}
        fill={true}
        style={{ objectFit: 'cover' }}
        alt={timeLineEvent.title.rendered}
        quality={80}
        sizes='100%'
        priority={true}
      ></Image>
      <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-wwr_rich_black'></div>
      <div
        className={`px-[10%] sm:px-8 cursor-pointer relative transition-all text-[4.4vw] leading-tight lg:leading-snug sm:text-lg duration-500 text-wwr_white ${
          hovered ? 'pb-[20%] sm:pb-16' : 'pb-[10%]'
        }`}
      >
        <div
          className={`scale-90 font-extralight tracking-wider mb-2  w-max px-2 py-1 transition-all duration-300 ${
            selectedCountry === 'de'
              ? 'bg-wwr_turquoise'
              : 'bg-wwr_yellow_orange'
          }`}
        >
          {timeLineEvent.acf?.basic_info?.start_date?.slice(0, 4)}
        </div>

        <div className='font-light'>{parse(timeLineEvent.title.rendered)}</div>
      </div>
    </Link>
  );
};

export default TimelineCardInternal;
