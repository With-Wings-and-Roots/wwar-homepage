'use client';
import { useState } from 'react';

const LanguageSelector = ({ lang }) => {
  const [hovered, setHovered] = useState(false);
  let languages = null;
  if (lang == 'en') {
    languages = [
      { code: 'en', label: 'English', href: '/en' },
      { code: 'de', label: 'German', href: '/de' },
      { code: 'ed', label: 'Easy German', href: '/ed' },
    ];
  } else {
    languages = [
      { code: 'en', label: 'Englisch', href: '/en' },
      { code: 'de', label: 'Deutsch', href: '/de' },
      { code: 'ed', label: 'Einfache Sprache (dt)', href: '/ed' },
    ];
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='hover:text-wwr_white cursor-pointer relative border-2 border-wwr_rich_black hover:border-wwr_white transition-colors duration-300'
    >
      {/* Main Language Button */}
      <div
        className={`px-2 lg:px-3 relative z-20 bg-wwr_yellow_orange h-full flex items-end`}
      >
        Language
      </div>

      {/* Dropdown Menu */}
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
