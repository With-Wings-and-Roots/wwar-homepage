import Link from 'next/link';
import React from 'react';
import { createVideoEmbedLink } from '@/utilities/links';

const SidebarContentTypeVideo = async ({ content }) => {
  const {
    sidebar_content_video: {
      video,
      title,
      caption,
      display_credit,
      credit,
      credit_link,
    },
  } = content;

  const youtubelink = video && video.replace('youtu.be', 'youtube.com/embed');

  return (
    <div>
      <iframe
        className='w-full aspect-video'
        src={createVideoEmbedLink(youtubelink)}
      ></iframe>

      {display_credit && (
        <Link className='font-thin text-xs hover:underline' href={credit_link}>
          {' '}
          {credit}
        </Link>
      )}
      {title ? <div className='text-2xl py-4'>{title}</div> : null}
      <div className='text-base text-wwr_gray_storm font-light leading-6'>
        {caption}
      </div>
    </div>
  );
};

export default SidebarContentTypeVideo;
