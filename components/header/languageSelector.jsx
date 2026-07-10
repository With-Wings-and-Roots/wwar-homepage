'use client';
import { createLocalLink } from '@/utilities/links';
import { useState } from 'react';

const LanguageSelector = ({ lang, translations }) => {
  const [hovered, setHovered] = useState(false);

  const labels =
    lang === 'en'
      ? { en: 'English', de: 'German', ed: 'Easy German' }
      : { en: 'Englisch', de: 'Deutsch', ed: 'Einfache Sprache (dt)' };

  const languages = [
    {
      code: 'en',
      label: labels.en,
      href: createLocalLink(translations?.en ?? '/en'),
    },
    {
      code: 'de',
      label: labels.de,
      href: createLocalLink(translations?.de ?? '/de'),
    },
    {
      code: 'ed',
      label: labels.ed,
      href: createLocalLink(translations?.ed ?? '/ed'),
    },
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='hover:text-wwr_white cursor-pointer relative border-2 border-wwr_white hover:border-wwr_white transition-colors duration-300'
    >
      <div className='px-2 lg:px-3 relative z-20  h-full flex items-end'>
        Language
      </div>

      {hovered && (
        <div className='hidden md:block absolute top-full left-0 w-full z-10 pt-2'>
          <div className='text-wwr_white'>
            <div className='flex flex-col gap-px bg-wwr_outer_space w-full'>
              {languages.map((language, index) => (
                <div
                  key={index}
                  className='py-3 px-4 bg-wwr_rich_black text-center hover:text-wwr_yellow_orange duration-300 w-full'
                >
                  <a
                    href={language.href}
                    className={`${lang === language.code ? 'font-bold' : ''}`}
                  >
                    {language.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
