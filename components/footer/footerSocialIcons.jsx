import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';

const FooterSocialIcons = ({ footer }) => {
  return (
    <div>
      <div className='flex gap-4 items-center'>
        {footer.socials
          ?.filter((s) => s.icon)
          ?.map((social, index) => {
            return (
              <a
                className='w-10 flex items-center justify-center hover:brightness-75 duration-300'
                href={social.url}
                key={index}
              >
                <Image
                  className='!h-[32px] !w-auto'
                  height={100}
                  width={100}
                  src={social.icon}
                  alt={social.name}
                />
              </a>
            );
          })}
        {footer.footer_logo?.linked_page && footer.footer_logo?.logo ? (
          <Link
            href={createLocalLink(footer.footer_logo.linked_page)}
            className='ml-12 hidden 2xl:block'
          >
            <Image
              src={footer.footer_logo.logo}
              alt=''
              fill={true}
              className='!relative !h-[64px] !w-auto'
            />
          </Link>
        ) : null}
      </div>
      {footer.footer_logo?.linked_page && footer.footer_logo?.logo ? (
        <Link
          href={createLocalLink(footer.footer_logo.linked_page)}
          className='mt-12 2xl:hidden'
        >
          <Image
            src={footer.footer_logo.logo}
            alt=''
            fill={true}
            className='!relative !h-[64px] !w-auto'
          />
        </Link>
      ) : null}
    </div>
  );
};

export default FooterSocialIcons;
