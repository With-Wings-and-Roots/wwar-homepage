'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import MobileSubMenuContainer from './mobileSubMenuContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  mobileMenuOpened,
  mobileMenuClosed,
  mobileSubMenuClosed,
} from '@/store/mobileMenu';
import LanguageSelector from './languageSelector';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = ({ topLevelMenuItems, menuItems }) => {
  const dispatch = useDispatch();

  const mobileMenuOpen = useSelector(
    (state) => state.entities.mobileMenu.mobileMenuOpen
  );

  const mobileMenuHandler = () => {
    if (mobileMenuOpen) {
      dispatch(mobileMenuClosed({}));
      dispatch(mobileSubMenuClosed({}));
    } else {
      dispatch(mobileMenuOpened({}));
    }
  };

  return (
    <div>
      <div
        onClick={mobileMenuHandler}
        className={`relative z-[202] pb-2.5 min-h-full cursor-pointer duration-300 transition-all`}
      >
        <div className='relative w-8 h-8'>
          <AnimatePresence>
            {!mobileMenuOpen && (
              <motion.div
                classname='absolute right-0 top-0 origin-center w-8 h-8'
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  width={30}
                  height={30}
                  src='/menu-circle.svg'
                  alt='Menu'
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className='absolute right-0 top-0 origin-center w-8 h-8'
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Image
                  className='transition-all duration-300 hover:rotate-90'
                  width={30}
                  height={30}
                  src='/close-circle.svg'
                  alt='Menu'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0.2 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0.2 }}
            transition={{ ease: 'linear' }}
            className='fixed z-[201] w-screen h-screen bg-wwr_yellow_orange top-0 left-0 flex flex-col items-center justify-center uppercase gap-10 pt-14'
          >
            {topLevelMenuItems.map((item) => {
              return (
                <React.Fragment key={item.ID}>
                  <MobileSubMenuContainer item={item} menuItems={menuItems} />
                </React.Fragment>
              );
            })}
            <div className='absolute bottom-10 right-10 z-[201] flex'>
              <LanguageSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
