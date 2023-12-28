import Link from 'next/link';
import React from 'react';
import NewsLetter from './newsLetter';
import { getMenuItems, getPrimaryMenuId } from '@/utilities/menu';
import { getFooter } from '@/utilities/footer';

const Footer = async ({ lang }) => {
  const menuId = await getPrimaryMenuId(lang);
  const menuItems = await getMenuItems(menuId, lang);
  const footerData = await getFooter(lang);

  // Media, Content, Education, Take part, About
  const topLevelMenuItems = menuItems.filter((item) => {
    return ['0', ''].includes(item.menu_item_parent);
  });

  const subMenuItems = (parentId) => {
    return menuItems.filter((item) => {
      return item.menu_item_parent.localeCompare(parentId) === 0;
    });
  };

  return (
    <div className='bg-wwr_rich_black w-full text-wwr_white p-10'>
      <div className='w-10/12 m-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {topLevelMenuItems.map((item, index) => {
            return (
              <div key={index}>
                <div className='pb-4 text-xl font-medium uppercase'>
                  {item.title}
                </div>
                <div className='grid grid-cols-1 gap-2'>
                  {subMenuItems(item.ID).map((subItem, index) => {
                    return (
                      <div key={index} className='font-thin text-lg'>
                        <Link href={subItem.url}>
                          {subItem.title.localeCompare('FROM HERE FILM') === 0
                            ? 'FROM HERE film >'
                            : subItem.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <NewsLetter footerData={footerData} />
      </div>
    </div>
  );
};

export default Footer;
