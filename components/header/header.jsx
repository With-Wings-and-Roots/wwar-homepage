import React from 'react';
import HeaderMenuItems from './headerMenuItems';
import LanguageSelector from './languageSelector';
import MobileMenu from './mobileMenu';
import Logo from './logo';
import TopSpace from './topSpace';
import { getPrimaryMenuId, getMenuItems } from '@/utilities/menu';
import Link from 'next/link';
import { getFrontpageId, getPage } from '@/utilities/pages';
import { createLocalLink } from '@/utilities/links';

const Header = async ({ lang }) => {
  const menuId = await getPrimaryMenuId(lang);
  const menuItems = await getMenuItems(menuId, lang);
  const frontpageId = await getFrontpageId(lang);
  const frontpageData = await getPage(lang, frontpageId);

  // Media, Content, Education, Take part, About
  const topLevelMenuItems = menuItems.filter((item) => {
    return ['0', ''].includes(item.menu_item_parent);
  });

  return (
    <div className='fixed top-0 left-0 z-[200] bg-wwr_yellow_orange w-screen max-w-full text-base'>
      <TopSpace />
      <div className='global_header_width flex justify-between items-stretch relative'>
        <Link
          href={createLocalLink(frontpageData.link)}
          className={`flex items-end min-h-full`}
        >
          <Logo />
        </Link>

        <div className='relative flex items-end justify-end min-h-full md:hidden z-[202]'>
          <MobileMenu
            topLevelMenuItems={topLevelMenuItems}
            menuItems={menuItems}
          />
        </div>
        <ul className='hidden md:flex uppercase min-w-max md:tracking-tight lg:tracking-widest min-h-full'>
          <li className='z-30 w-10 bg-wwr_yellow_orange relative'></li>
          {topLevelMenuItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <HeaderMenuItems
                  item={item}
                  menuItems={menuItems}
                  index={index}
                />
              </React.Fragment>
            );
          })}

          <li className='pb-2 pl-3 relative z-30 bg-wwr_yellow_orange h-full flex items-end'>
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
