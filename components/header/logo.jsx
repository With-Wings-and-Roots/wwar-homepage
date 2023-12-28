'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Logo = () => {
  const mobileMenuOpen = useSelector(
    (state) => state.entities.mobileMenu.mobileMenuOpen
  );

  const logoShrink = useSelector((state) => state.entities.header.logoShrink);
  return (
    <div
      className={`transition-all duration-500 z-[203] ${
        mobileMenuOpen
          ? 'fixed left-1/2 -translate-x-1/2'
          : 'relative left-0 translate-x-0'
      } ${logoShrink ? ' w-44 pb-3.5 ' : ' w-56 xl:w-72 pb-3'}`}
    >
      <Image
        className={`w-full h-full`}
        src='/wwr-logo.svg'
        alt='logo'
        width={200}
        height={200}
      ></Image>
    </div>
  );
};

export default Logo;
