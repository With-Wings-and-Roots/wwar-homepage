'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const LanguageSelector = () => {
  const language = useSelector((state) => state.entities.language.language);

  const [lang, setLang] = useState();

  useEffect(() => {
    setLang(language);
  }, [language]);

  return (
    <>
      <a
        href={`/de/stories`}
        className={`${
          lang === 'de' ? 'font-bold ' : ''
        } hover:text-wwr_white cursor-pointer`}
      >
        DE
      </a>
      <div className='px-2'>/</div>
      <a
        className={`${
          lang === 'en' ? 'font-bold ' : ''
        } hover:text-wwr_white cursor-pointer`}
        href={`/en/stories`}
      >
        EN
      </a>
    </>
  );
};

export default LanguageSelector;
