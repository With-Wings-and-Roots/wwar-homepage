'use client';

import WysiwygContent from '@/components/common/WysiwygContent';
import { useEffect, useState } from 'react';

const WorkshopQuotes = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  if (!quotes?.length) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {quotes.map((quote, qI) => (
        <div
          key={qI}
          className={`absolute left-0 right-0 top-0 transition-opacity duration-[1800ms] ${
            currentIndex % quotes.length !== qI
              ? 'opacity-0'
              : 'opacity-100'
          }`}
        >
          <WysiwygContent content={quote.text} />

          {quote.author?.length > 0 && (
            <div className="font-medium mt-4">
              {quote.author}
            </div>
          )}

          {quote.country?.length > 0 && (
            <div className="font-medium">
              {quote.country}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkshopQuotes;