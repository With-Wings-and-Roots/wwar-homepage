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
import { FaCalendarCheck, FaGift, FaEnvelope } from 'react-icons/fa';

const Header = async ({ lang }) => {
  const menuIds = await getPrimaryMenuId(lang);
  const mainMenuId = menuIds?.primary;
  const secondaryMenuId = menuIds?.footer;
  const menuItems = await getMenuItems(mainMenuId, lang);
  const secondaryMenuItems = await getMenuItems(secondaryMenuId, lang);
  const frontpageId = await getFrontpageId(lang);
  const frontpageData = await getPage(lang, frontpageId);

  // Media, Content, Education, Take part, About
  const topLevelMenuItems = menuItems.filter((item) => {
    return ['0', ''].includes(item.menu_item_parent);

  });
const secondaryMenuConfig = [
  { color: 'bg-wwr_teal', icon: FaCalendarCheck },
  { color: 'bg-wwr_gray_storm', icon: FaGift },
  { color:'bg-wwr_majorelle_blue', icon: FaEnvelope },
];
  return (
    <div
      className='fixed top-0 left-0 z-[200] bg-wwr_yellow_orange w-screen max-w-full text-base'
      id='header'
    >
      <div className="relative top-0 right-0 z-[300] w-full flex justify-end bg-black">
  <ul className="global_header_width flex  text-white text-[11px]  justify-end uppercase tracking-wide">
  {secondaryMenuItems?.map((item, index) => {
  const config = secondaryMenuConfig[index] || secondaryMenuConfig[0];
  const Icon = config.icon;

  return (
    <li key={index}>
      <a
        href={createLocalLink(item.url)}
className={`flex items-center gap-2 px-2 py-1 text-white hover:opacity-80 transition text-outline-thin`}      >
        <Icon className="text-sm" />
        {item.title}
      </a>
    </li>
  );
})}<li className='flex items-center gap-2 px-2 py-1 text-white hover:opacity-80 transition text-outline-thin'>
            <LanguageSelector lang={lang} />
          </li>

  </ul>
</div>

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
            lang={lang}
          />
        </div>
        <ul className='hidden md:flex uppercase min-w-max md:tracking-tight lg:tracking-widest min-h-full'>
          <li className='z-30 w-20 bg-wwr_yellow_orange relative'></li>
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

          
        </ul>
      </div>
    </div>
  );
};

export default Header;
