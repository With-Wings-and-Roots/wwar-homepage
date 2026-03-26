'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import CloseIcon from '@/components/page/closeIcon';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  WeiboIcon,
} from 'next-share';
import Link from 'next/link';

const socialIcons = {
  website: WeiboIcon,
  youtube: YoutubeIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

const Team = ({ member, mediaUrl, baseLink }) => {
  const { title, acf } = member;
  const { city, email, position, description, socials } = acf;

  const [active, setActive] = useState(false);
  let link;
  const openFullProfile = member?.acf?.team?.includes(913); // ID of "Full Team" team;
  if (openFullProfile) {
    link = `${baseLink}${member.slug}/`;
  }

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
  }, [active]);

  return (
    <li key={member.id} className='flex justify-center'>
      {/* ✅ Clickable Card */}
      <div
        onClick={() => setActive(true)}
        className='group flex flex-col items-center text-center cursor-pointer'
      >
        {/* Profile Icon */}
        <div className='w-40 h-40 rounded-full overflow-hidden border border-gray-200 group-hover:border-wwr_yellow_orange transition-colors duration-200'>
          {mediaUrl ? (
            <Image
              src={mediaUrl}
              alt={member.title?.rendered || ''}
              width={160}
              height={160}
              className='w-full h-full object-contain bg-white'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gray-100 text-gray-400'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0'
                />
              </svg>
            </div>
          )}
        </div>

        {/* Name */}
        <p className='mt-3 text-sm font-light leading-snug group-hover:text-wwr_yellow_orange transition-colors duration-200'>
          {member.title?.rendered}
        </p>
      </div>

      {/* ✅ MODAL */}
      {active && (
        <div
          className='w-full h-screen bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 z-[999999]'
          onClick={() => setActive(false)}
        >
          <div className='fixed top-0 left-0 w-full h-full overflow-y-auto md:py-10 md:px-12 lg:px-28 xl:px-36'>
            <div
              className='relative bg-wwr_white w-full h-fit px-4 pt-5 pb-24 md:pb-10 md:px-10 lg:px-20 lg:pb-12'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className='w-full flex justify-end lg:absolute lg:top-4 lg:right-4'>
                <button onClick={() => setActive(false)}>
                  <CloseIcon />
                </button>
              </div>

              {/* Content stays SAME */}
              <div className='flex flex-col md:flex-row md:gap-8 lg:pt-10'>
                <div className='w-[150px] md:w-auto md:min-w-[201px] md:max-w-[300px] lg:min-w-[20vw] shrink-0'>
                  {mediaUrl && (
                    <Image
                      className='pb-4 w-full aspect-auto'
                      src={mediaUrl}
                      alt={title.rendered}
                      width={201}
                      height={201}
                    />
                  )}

                  <h1
                    className='text-[28px] font-light md:text-4xl md:pt-2 md:pb-2'
                    dangerouslySetInnerHTML={{ __html: title.rendered }}
                  />

                  <h2 className='text-2xl font-medium leading-tight -mt-2'>
                    {position}
                  </h2>

                  {email && (
                    <div className='py-5 min-w-max'>
                      <div className='w-full h-px bg-wwr_black'></div>
                      <div className='py-4 text-lg'>{email}</div>
                      <div className='w-full h-px bg-wwr_black'></div>
                    </div>
                  )}

                  <div className='h-7 flex items-center max-w-max gap-x-4 my-4'>
                    {socials?.map((social, i) => {
                      const Icon = socialIcons[social.type];
                      if (!Icon) return null;

                      return (
                        <a
                          key={i}
                          href={social.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Icon
                            size={45}
                            round
                            bgStyle={{ fill: '#ffffff' }}
                            iconFillColor='#000000'
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className='mt-12 md:mt-0'>
                  <div className='font-thin md:text-lg lg:text-xl'>
                    {parse(description)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default Team;
