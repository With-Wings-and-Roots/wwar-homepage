'use client';
import { motion } from 'framer-motion';

const FullPageBackground = ({ color, animation = true }) => {
  return (
    <motion.div
      initial={animation?{ opacity: 0 }:false}
      animate={animation?{ opacity: 0.8 }: false}
      transition={{ duration: 0 }}
      className={`w-full h-screen fixed top-0 left-0 z-40 ${!animation && "opacity-80"}`}
      style={{ background: color }}
    ></motion.div>
  );
};

export default FullPageBackground;
