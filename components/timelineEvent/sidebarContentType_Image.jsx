import { fetchMediaFromId } from '@/utilities/media';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SidebarContentTypeImage = async ({ content }) => {
  const {
    sidebar_content_image: {
      image,
      title,
      caption,
      display_credit,
      credit,
      credit_link,
    },
    sidebar_content_quote,
    sidebar_content_sidenote,
    sidebar_content_featured_story,
    text,
  } = content;

  let mediaUrl = image;
  if (typeof mediaUrl === 'number') {
    const media = (await fetchMediaFromId(image)) || null;
    mediaUrl = media.source_url;
  }

  return (
    <div>
      <Image
        className={`w-50 h-50 mb-1`}
        src={mediaUrl}
        height={1000}
        width={1000}
        alt={title}
      />
      {display_credit && (
        <Link
          className='font-thin text-xs hover:underline'
          href={`credit_link`}
        >
          {' '}
          {credit}
        </Link>
      )}
      <div className='text-2xl py-4'>{title}</div>
      <div className='text-base text-wwr_gray_storm font-light leading-6'>
        {caption}
      </div>
    </div>
  );
};

export default SidebarContentTypeImage;
