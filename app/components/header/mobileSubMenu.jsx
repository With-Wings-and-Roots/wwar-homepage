"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  mobileSubMenuClosed,
  mobileSubMenuOpened,
} from "@/app/store/mobileMenu";

const MobileSubMenu = ({ item, menuItems }) => {
  const dispatch = useDispatch();
  const subMenuOpen = useSelector(
    (state) => state.entities.mobileMenu.subMenuOpen
  );

  const subMenuItems = (parentId) => {
    const subMenuItems = menuItems.filter((item) => {
      return item.menu_item_parent.localeCompare(parentId) === 0;
    });

    return subMenuItems;
  };

  const subMenuHandler = () => {
    if (subMenuOpen) {
      dispatch(mobileSubMenuClosed({}));
    } else {
      dispatch(mobileSubMenuOpened({}));
    }
  };
  return (
    <>
      <div
        className="hover:text-wwr_white cursor-pointer"
        onClick={subMenuHandler}
      >
        {item.title}
      </div>
      <AnimatePresence>
        {subMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "110%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "110%" }}
            transition={{ duration: 0.3 }}
            className="fixed w-screen h-screen top-0 left-0 flex flex-col gap-4 items-center justify-center bg-wwr_yellow_orange"
          >
            <div className="text-2xl pb-4">{item.title}</div>
            {subMenuItems(item.ID).map((subItem, index) => {
              return (
                <div key={index} className="hover:text-wwr_white">
                  <Link href={subItem.url} className="min-w-max">
                    {subItem.title.localeCompare("FROM HERE FILM") === 0
                      ? "FROM HERE film >"
                      : subItem.title}
                  </Link>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSubMenu;
