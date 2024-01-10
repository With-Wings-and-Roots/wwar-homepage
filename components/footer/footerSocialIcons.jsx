import Image from 'next/image';
import React from 'react';

const FooterSocialIcons = ({footer})=>{
  return (
  <div className='flex gap-4 items-end'>
    {footer.socials.map((social, index) => {
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
  </div>

  )
}

export default FooterSocialIcons