'use client';

import { FacebookShareButton, TwitterShareButton } from 'next-share';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SocialShareIcons = ({
  lang,
  url = 'https://wwar.backslashseven.com/',
}) => {
  if (typeof window !== 'undefined') url = window.location.href;

  const [message, setMessage] = useState(false);
  const icon = { width: 30, height: 30 };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const imageClass =
    'border border-transparent hover:border-wwr_yellow_orange border-solid rounded-full hover:opacity-70 transition-all duration-300 ease-in-out';

  return (
    <div className='max-w-max transition-all duration-500'>
      <div className='font-light text-xl flex flex-wrap lg:flex-nowrap gap-4 items-center text-wwr_gray_storm pb-4'>
        <div className='w-max'>
          {lang === 'de' ? 'GESCHICHTE TEILEN:' : 'SHARE STORY:'}
        </div>
        <div className='flex gap-2'>
          <FacebookShareButton url={url}>
            <Image
              src='/social-icons/facebook-circle.svg'
              width={icon.width}
              height={icon.height}
              alt={'Facebook icon'}
              className={imageClass}
            />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={'Story'}>
            <Image
              src='/social-icons/twitter-circle.svg'
              width={icon.width}
              height={icon.height}
              alt={'Twitter icon'}
              className={imageClass}
            />
          </TwitterShareButton>
          <div onClick={copyLink} className='cursor-pointer'>
            <Image
              src='/social-icons/link-circle.svg'
              width={icon.width}
              height={icon.height}
              alt={'Share icon'}
              className={imageClass}
            />
          </div>
        </div>
      </div>
      {message && (
        <div className='text-sm font-medium text-right'>
          LINK COPIED TO CLIPBOARD.
        </div>
      )}
    </div>
  );
};

export default SocialShareIcons;
