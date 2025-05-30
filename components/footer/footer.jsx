import Link from 'next/link';
import React from 'react';
import NewsLetter from './newsLetter';
import { getMenuItems, getPrimaryMenuId } from '@/utilities/menu';
import { getPageSettings } from '@/utilities/pageSettings';
import { createLocalLink, isExternalLink } from '@/utilities/links';
import CopyrightAndTerms from '@/components/footer/copyrightAndTerms';

const Footer = async ({ lang }) => {
  const menuId = await getPrimaryMenuId(lang);
  const menuItems = await getMenuItems(menuId, lang);
  const footerData = await getPageSettings(lang);

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
    <div className='bg-wwr_rich_black w-full text-wwr_white p-10 relative'>
      <div className='w-10/12 m-auto'>
        <div className={`flex flex-col xl:flex-row`}>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 xl:flex xl:gap-10 xl:pr-12 xl:min-w-max xl:shrink-0 xl:justify-between'>
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
                          <Link
                            href={
                              isExternalLink(subItem.url)
                                ? subItem.url
                                : createLocalLink(subItem.url)
                            }
                            target={
                              isExternalLink(subItem.url) ? '_blank' : '_self'
                            }
                            rel={
                              isExternalLink(subItem.url)
                                ? 'noreferrer noopener'
                                : ''
                            }
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
              );
            })}
          </div>
          <NewsLetter footerData={footerData} />
        </div>
        <CopyrightAndTerms footer={footerData} lang={lang} />
      </div>
    </div>
  );
};

export default Footer;
