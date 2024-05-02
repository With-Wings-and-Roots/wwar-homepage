'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createLocalLink, isExternalLink } from '@/utilities/links';

const HeaderMenuItems = ({ item, menuItems, index }) => {
  const [hovered, setHovered] = useState(false);

  const subMenuItems = (parentId) => {
    const subMenuItems = menuItems.filter((item) => {
      return item.menu_item_parent.localeCompare(parentId) === 0;
    });

    return subMenuItems;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='hover:text-wwr_white cursor-pointer relative'
    >
      {subMenuItems(item.ID)?.length > 0 ? (
        <div
          className={`px-2 py-2 lg:px-3 relative z-20 bg-wwr_yellow_orange h-full flex items-end`}
        >
          {item.title}
        </div>
      ) : (
        <Link
          className={`px-2 py-2 lg:px-3 relative z-20 bg-wwr_yellow_orange h-full flex items-end`}
          href={isExternalLink(item.url) ? item.url : createLocalLink(item.url)}
          target={isExternalLink(item.url) ? '_blank' : '_self'}
          rel={isExternalLink(item.url) ? 'noreferrer noopener' : ''}
        >
          AA{item.title}
        </Link>
      )}

      {hovered && subMenuItems(item.ID)?.length > 0 && (
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className='hidden md:block relative z-10'
        >
          <div className='absolute text-wwr_white left-1/2 -translate-x-1/2'>
            <div className='flex flex-col gap-px bg-wwr_outer_space'>
              {subMenuItems(item.ID).map((subItem, index) => {
                return (
                  <div
                    key={index}
                    className='min-w-full py-3 px-3 bg-wwr_rich_black text-center hover:text-wwr_yellow_orange duration-300'
                  >
                    <Link
                      href={
                        isExternalLink(subItem.url)
                          ? subItem.url
                          : createLocalLink(subItem.url)
                      }
                      target={isExternalLink(subItem.url) ? '_blank' : '_self'}
                      rel={
                        isExternalLink(subItem.url) ? 'noreferrer noopener' : ''
                      }
                      className='min-w-max whitespace-nowrap'
                    >
                      {subItem.title.localeCompare('FROM HERE FILM') === 0
                        ? 'FROM HERE film >'
                        : subItem.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeaderMenuItems;
