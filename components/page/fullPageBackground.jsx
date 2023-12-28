'use client';
import { motion } from 'framer-motion';

const FullPageBackground = ({ color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className='w-full h-screen fixed top-0 left-0 z-40 '
      style={{ background: color }}
    ></motion.div>
  );
};

export default FullPageBackground;
