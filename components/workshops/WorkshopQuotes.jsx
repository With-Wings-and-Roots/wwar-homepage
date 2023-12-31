'use client';

import WysiwygContent from '@/components/common/WysiwygContent';
import { useEffect, useState } from 'react';

const WorkshopQuotes = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {quotes?.map((quote, qI) => (
        <div
          key={qI}
          className={`absolute left-0 right-0 top-0 transition-opacity duration-[1800ms]${
            currentIndex % quotes?.length !== qI ? ' opacity-0' : ''
          }`}
        >
          <WysiwygContent content={quote.text} />
          {quote.author?.length > 0 && (
            <div className='font-medium'>{quote.author}</div>
          )}
          {quote.country?.length > 0 && (
            <div className='font-medium'>{quote.country}</div>
          )}
        </div>
      ))}
    </>
  );
};

export default WorkshopQuotes;
