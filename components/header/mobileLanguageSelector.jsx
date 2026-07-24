'use client';

import { createLocalLink } from '@/utilities/links';

const MobileLanguageSelector = ({ lang, translations }) => {
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
    <div className="flex items-center justify-center gap-3 text-base">
      {languages.map((language, index) => (
        <div key={language.code} className="flex items-center">
          <a
            href={language.href}
            className={`transition-colors hover:text-wwr_white ${
              lang === language.code ? 'font-bold' : ''
            }`}
          >
            {language.label}
          </a>

          {index < languages.length - 1 && (
            <span className="px-3">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileLanguageSelector;