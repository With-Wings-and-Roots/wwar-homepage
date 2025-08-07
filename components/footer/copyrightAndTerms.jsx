'use client';

import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import React from 'react';

const CopyrightAndTerms = ({ footer, lang: language }) => {
  return (
    <div className='pt-10 text-wwr_gray_storm flex flex-wrap gap-2'>
      <div>
        {footer?.copyright_text?.replace('YEAR', new Date().getFullYear())}
      </div>
      <Link
        href={createLocalLink(footer.terms_page)}
        className='hover:brightness-75 duration-300'
      >
        {language === 'de' ? 'Impressum' : 'Terms and Conditions'}
      </Link>
    </div>
  );
};

export default CopyrightAndTerms;
