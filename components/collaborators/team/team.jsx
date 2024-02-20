'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import CloseIcon from '@/components/page/closeIcon';
import Button from '@/components/page/button';

const Team = ({ teamMember }) => {
  const {
    city,
    e_mail,
    facebook_link,
    image,
    instagram_link,
    linkedin_link,
    twitter_link,
    name,
    phone,
    position,
    show_lightbox_popup,
    tags,
    text,
    website,
  } = teamMember;

  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const lastPath = pathname.split('/').pop();
  const teamMemberSlug = name.replace(/ /g, '-');

  useEffect(() => {
    if (lastPath.localeCompare(teamMemberSlug) === 0) {
      setActive(true);
    }
  }, [lastPath, teamMemberSlug]);
  useEffect(() => {
    if (active) {
      document.getElementsByTagName('body')[0].style.position = 'fixed';
    } else {
      document.getElementsByTagName('body')[0].style.position = 'relative';
    }
  });
  return (
    <>
      <Link
        href={`./collaborators/${teamMemberSlug}`}
        className='hover:text-wwr_yellow_orange transition-all duration-300 z-20 col-span-6 md:col-span-3 lg:col-span-2'
      >
        <h3 className='text-lg font-light'>{name}</h3>
        <div className='text-sm font-medium'>
          {position?.length > 0 ? <>{position}</> : null}
          {position?.length > 0 && city?.length > 0 ? <>, </> : null}
          {city?.length > 0 ? <>{teamMember.city}</> : null}
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
                <CloseIcon closeLink={'./'} />
              </div>
              <div className={`flex flex-col md:flex-row md:gap-8 lg:pt-10`}>
                <div
                  className={`w-[150px] md:w-auto md:min-w-[201px] md:max-w-[300px] lg:min-w-[20vw] shrink-0`}
                >
                  <Image
                    className={'pb-4 w-full aspect-auto'}
                    src={image}
                    alt={name}
                    width={201}
                    height={201}
                  />
                  <h1
                    className={
                      'text-[28px] text-left font-light md:text-4xl md:pt-2 md:pb-2'
                    }
                  >
                    {name}
                  </h1>
                  <h2
                    className={
                      'text-2xl text-left font-medium leading-tight -mt-2'
                    }
                  >
                    {position}
                  </h2>
                  {e_mail && (
                    <div className={`py-5 min-w-max`}>
                      <div className={`w-full h-px bg-wwr_black`}></div>
                      <div className={'py-4 text-start text-lg'}>{e_mail}</div>
                      <div className={`w-full h-px bg-wwr_black`}></div>
                    </div>
                  )}
                  <div
                    className={'h-7 flex items-center max-w-max gap-x-7 my-4'}
                  >
                    <Link href={facebook_link} target={'_blank'}>
                      <Image
                        className={'h-7 w-auto'}
                        src={'/social-icons/facebook-black.svg'}
                        alt={'Facebook Icon'}
                        width={40}
                        height={40}
                      />
                    </Link>
                    <Link href={instagram_link} target={'_blank'}>
                      <Image
                        className={'h-7 w-auto'}
                        src={'/social-icons/instagram-black.svg'}
                        alt={'Instagram Icon'}
                        width={40}
                        height={40}
                      />
                    </Link>
                    <Link href={twitter_link} target={'_blank'}>
                      <Image
                        className={'h-7 w-auto'}
                        src={'/social-icons/twitter-black.svg'}
                        alt={'Twitter Icon'}
                        width={40}
                        height={40}
                      />
                    </Link>
                  </div>
                </div>
                <div className='mt-12 md:mt-0'>
                  <div
                    className={`font-thin text-start md:text-lg md:font-light lg:text-xl`}
                  >
                    {parse(text)}
                  </div>
                  <div className={'flex gap-4 justify-end mt-5'}>
                    {tags.map((tag, i) => (
                      <Button name={tag?.name} textDark={true} key={i} />
                    ))}
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
