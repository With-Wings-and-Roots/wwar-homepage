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
      <div
        className='hover:text-wwr_white cursor-pointer'
        onClick={() => subMenuHandler(item.ID)}
      >
        {item.title}
      </div>
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
