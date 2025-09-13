import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { mobileMenuClosed, mobileSubMenuClosed } from '@/store/mobileMenu';
import { createLocalLink, isExternalLink } from '@/utilities/links';

const MobileSubMenu = ({ menuItems }) => {
  const dispatch = useDispatch();
  const activeSubMenuId = useSelector(
    (state) => state.entities.mobileMenu.activeSubMenuId
  );
  const activeSubMenuTitle = useSelector(
    (state) => state.entities.mobileMenu.activeSubMenuTitle
  );

  return (
    <React.Fragment>
      <div
        className='absolute left-[4%] top-5 cursor-pointer'
        onClick={() => dispatch(mobileSubMenuClosed({}))}
      >
        <Image
          src={`/arrow-left-circle.svg`}
          height={30}
          width={30}
          alt='arrow-left-circle'
        />
      </div>
      <div className='text-2xl pb-4'>{activeSubMenuTitle}</div>
      {menuItems
        .filter(
          (subItem) =>
            subItem.menu_item_parent.localeCompare(activeSubMenuId) === 0
        )
        .map((subItem, index) => {
          return (
            <div
              key={index}
              className='hover:text-wwr_white'
              onClick={() => dispatch(mobileMenuClosed({}))}
            >
              <Link
                href={
                  isExternalLink(subItem.url)
                    ? subItem.url
                    : createLocalLink(subItem.url)
                }
                target={isExternalLink(subItem.url) ? '_blank' : '_self'}
                rel={isExternalLink(subItem.url) ? 'noreferrer noopener' : ''}
                className='min-w-max'
              >
                {subItem.title.localeCompare('FROM HERE FILM') === 0
                  ? 'FROM HERE film >'
                  : subItem.title}
              </Link>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default MobileSubMenu;
