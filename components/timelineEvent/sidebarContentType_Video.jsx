import Link from 'next/link';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';

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
      <WysiwygContent content={youtubelink} className='video' />

      {display_credit && (
        <Link
          className='font-thin text-xs hover:underline'
          href={`credit_link`}
        >
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
