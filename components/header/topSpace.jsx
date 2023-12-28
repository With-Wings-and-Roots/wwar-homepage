"use client";

import React from "react";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoExpanded, logoShrinked } from "@/store/header";

const TopSpace = () => {
  const dispatch = useDispatch();
  const [shrink, setShrink] = useState(false);
  const { scrollYProgress } = useScroll({});
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
    animate: { height: 20 },
  };

  const shrinkVariant = {
    animate: { height: 6 },
  };
  return (
    <motion.div
      animate="animate"
      variants={shrink ? shrinkVariant : expandVariant}
      className="w-full relative z-[203] bg-wwr_yellow_orange"
    ></motion.div>
  );
};

export default TopSpace;
