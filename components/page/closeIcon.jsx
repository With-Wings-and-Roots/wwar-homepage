'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CloseIcon = ({ closeLink, onClick }) => {
  const content = (
    <div
      onClick={onClick}
      className='hover:rotate-90 transition-all duration-500 close-icon cursor-pointer'
    >
      <Image
        className='w-full h-full'
        src='/close-icon.svg'
        width={45}
        height={45}
        alt='Close'
      />
    </div>
  );

  // ✅ If link exists → use Link
  if (closeLink) {
    return (
      <Link href={closeLink} scroll={false}>
        {content}
      </Link>
    );
  }

  // ✅ Otherwise → act like button
  return content;
};

export default CloseIcon;
