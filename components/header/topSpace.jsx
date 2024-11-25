'use client';

import React from 'react';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { logoExpanded, logoShrinked } from '@/store/header';

const TopSpace = () => {
  const dispatch = useDispatch();
  const logoShrink = useSelector((state) => state.entities.header.logoShrink);
  const [shrink, setShrink] = useState(null);
  const { scrollYProgress } = useScroll({});
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.004 && !shrink) {
      setShrink(true);
      dispatch(logoShrinked({}));
    }
    if (latest < 0.004 && shrink) {
      setShrink(false);
      dispatch(logoExpanded({}));
    }
  });

  const expandVariant = {
    initial: { height: 20 },
    animate: { height: 20 },
  };

  const shrinkVariant = {
    initial: { height: 6 },
    animate: { height: 6 },
  };
  return shrink !== null ? (
    <motion.div
      animate='animate'
      variants={shrink ? shrinkVariant : expandVariant}
      className={`w-full relative z-[203] bg-wwr_yellow_orange ${
        logoShrink ? 'h-[6px]' : 'h-5'
      }`}
    ></motion.div>
  ) : (
    <div
      className={`w-full relative z-[203] bg-wwr_yellow_orange ${
        logoShrink ? 'h-[6px]' : 'h-5'
      }`}
    />
  );
};

export default TopSpace;
