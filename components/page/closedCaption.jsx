import React from 'react';
import Image from 'next/image';

const translations = {
  en: {
    title: 'Closed Captions available',
    body: 'We have subtitles available for this video! Turn on subtitles by clicking the CC (closed captions) icon in the video player and enjoy the content in English.',
  },
  de: {
    title: 'Untertitel verfügbar',
    body: 'Für dieses Video sind Untertitel verfügbar! Aktivieren Sie die Untertitel, indem Sie auf das CC-Symbol (Untertitel) im Videoplayer klicken und genießen Sie den Inhalt auf Deutsch.',
  },
};

const ClosedCaption = ({ language = 'en' }) => {
  const t = translations[language] ?? translations.en;

  return (
    <div>
      <Image
        className='mb-3'
        src='/closed-captions.svg'
        width={30}
        height={30}
        alt='closed caption'
      />
      <div className='text-base font-bold'>{t.title}</div>
      <div className='text-xs font-light text-wwr_gray_storm py-3'>
        <div className='leading-[17px]'>{t.body}</div>
      </div>
    </div>
  );
};

export default ClosedCaption;
