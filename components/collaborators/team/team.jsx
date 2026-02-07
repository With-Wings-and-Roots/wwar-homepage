'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { createLocalLink } from '@/utilities/links';

const socialIcons = {
  website: WeiboIcon,
  youtube: YoutubeIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

const Team = ({ teamMember, subSlugs, baseLink, profile_icon }) => {
  const { slug, title, acf } = teamMember;
  const { city, email, position, description, socials } = acf;

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (subSlugs?.length === 1 && subSlugs[0].localeCompare(slug) === 0) {
      setActive(true);
    }
  }, [subSlugs, slug]);
  useEffect(() => {
    if (active) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = '';
    }
  });
  return (
    <>
      <Link
        href={`${createLocalLink(baseLink)}${slug}`}
        className='hover:text-wwr_yellow_orange transition-all duration-300 z-20 col-span-6 md:col-span-3 lg:col-span-2'
        scroll={false}
      >
        <h3
          className='text-lg font-light'
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        />
        <div className='text-sm font-medium'>
          {position?.length > 0 ? <>{position}</> : null}
          {position?.length > 0 && city?.length > 0 ? <>, </> : null}
          {city?.length > 0 ? <>{teamMember.acf.city}</> : null}
        </div>
      </Link>

      {active && (
        <div
          className={`w-full h-screen overflow-hidden bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 z-[999999]`}
        >
          <div
            className={`fixed top-0 left-0 w-full h-full overflow-y-auto md:py-10 md:px-12 lg:px-28 xl:px-36`}
          >
            <div
              className={`relative bg-wwr_white w-full h-fit px-4 pt-5 pb-24 md:pb-10 md:px-10 lg:px-20 lg:pb-12`}
            >
              <div
                className={
                  'w-full flex justify-end lg:absolute lg:top-4 lg:right-4'
                }
              >
                <CloseIcon closeLink={createLocalLink(baseLink)} />
              </div>
              <div className={`flex flex-col md:flex-row md:gap-8 lg:pt-10`}>
                <div
                  className={`w-[150px] md:w-auto md:min-w-[201px] md:max-w-[300px] lg:min-w-[20vw] shrink-0`}
                >
                  {profile_icon && (
                    <Image
                      className={'pb-4 w-full aspect-auto'}
                      src={profile_icon.source_url}
                      alt={title.rendered}
                      width={201}
                      height={201}
                    />
                  )}
                  <h1
                    className={
                      'text-[28px] text-left font-light md:text-4xl md:pt-2 md:pb-2'
                    }
                    dangerouslySetInnerHTML={{ __html: title.rendered }}
                  />
                  <h2
                    className={
                      'text-2xl text-left font-medium leading-tight -mt-2'
                    }
                  >
                    {position}
                  </h2>
                  {email && (
                    <div className={`py-5 min-w-max`}>
                      <div className={`w-full h-px bg-wwr_black`}></div>
                      <div className={'py-4 text-start text-lg'}>{email}</div>
                      <div className={`w-full h-px bg-wwr_black`}></div>
                    </div>
                  )}
                  <div
                    className={'h-7 flex items-center max-w-max gap-x-4 my-4'}
                  >
                    {socials?.length > 0 &&
                      socials.map((social, sI) => {
                        const Icon = socialIcons[social.type];
                        if (Icon) {
                          return (
                            <Link key={sI} href={social.link} target={'_blank'}>
                              <Icon
                                size={45}
                                round
                                bgStyle={{ fill: '#ffffff' }}
                                iconFillColor='#000000'
                              />
                            </Link>
                          );
                        }
                      })}
                  </div>
                </div>
                <div className='mt-12 md:mt-0'>
                  <div
                    className={`font-thin text-start md:text-lg md:font-light lg:text-xl`}
                  >
                    {parse(description)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
