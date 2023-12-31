import Link from 'next/link';
import React from 'react';

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
    sidebar_content_quote,
    sidebar_content_sidenote,
    sidebar_content_featured_story,
    text,
  } = content;

  const youtubelink = video && video.replace('youtu.be', 'youtube.com/embed');

  return (
    <div>
      <iframe
        className='w-full h-full min-h-fit'
        src={youtubelink}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>

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

export default SidebarContentTypeVideo;
