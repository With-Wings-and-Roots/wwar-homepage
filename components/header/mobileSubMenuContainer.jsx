'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  mobileSubMenuClosed,
  mobileSubMenuOpened,
  subMenuActivated,
} from '@/store/mobileMenu';
import MobileSubMenu from './mobileSubMenu';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createLocalLink, isExternalLink } from '@/utilities/links';

const MobileSubMenuContainer = ({ item, menuItems }) => {
  const dispatch = useDispatch();

  const subMenuOpen = useSelector(
    (state) => state.entities.mobileMenu.subMenuOpen
  );

  const subMenuHandler = (id) => {
    dispatch(subMenuActivated({ id, title: item.title }));
    if (subMenuOpen) {
      dispatch(mobileSubMenuClosed({}));
    } else {
      dispatch(mobileSubMenuOpened({}));
    }
  };

  return (
    <>
      {menuItems?.filter(
        (mi) => mi.menu_item_parent.localeCompare(item.ID) === 0
      )?.length > 0 ? (
        <div
          className='hover:text-wwr_white cursor-pointer'
          onClick={() => subMenuHandler(item.ID)}
        >
          {item.title}
        </div>
      ) : (
        <Link
          className='hover:text-wwr_white cursor-pointer'
          href={isExternalLink(item.url) ? item.url : createLocalLink(item.url)}
          target={isExternalLink(item.url) ? '_blank' : '_self'}
          rel={isExternalLink(item.url) ? 'noreferrer noopener' : ''}
        >
          {item.title}
        </Link>
      )}
      <AnimatePresence>
        {subMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '110%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '110%' }}
            transition={{ duration: 0.3 }}
            className='fixed w-screen h-screen top-0 left-0 flex flex-col gap-4 items-center justify-center bg-wwr_yellow_orange'
          >
            <MobileSubMenu item={item} menuItems={menuItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSubMenuContainer;
