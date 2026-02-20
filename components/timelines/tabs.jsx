'use client';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

import SingleTabButton from './singleTabButton';

const Tabs = ({ lang: language }) => {
  const allTabData = useSelector((state) => state.entities.topics.allTopics);

  // State to toggle showing all tabs
  const [showAll, setShowAll] = useState(false);

  // Decide which tabs to render
  const tabsToShow = showAll ? allTabData : allTabData.slice(0, 6);

  return (
    <div className='flex px-8 md:px-16 xl:px-48 relative flex-wrap gap-0.5 pt-4 items-center'>
      <SingleTabButton
        buttonText={language === 'en' ? 'All Events' : 'Alle Ereignisse'}
        slug={'all'}
        lang={language}
      />

      {tabsToShow.map((singleTabData, i) => (
        <SingleTabButton
          key={i}
          buttonText={parse(singleTabData.name)}
          slug={singleTabData.slug}
        />
      ))}

      {/* Show more / show less button */}
      {allTabData.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className='ml-2 text-wwr_black font-medium underline hover:text-wwr_yellow_orange transition-colors'
        >
          {showAll
            ? language === 'en'
              ? 'Show Less'
              : 'Weniger anzeigen'
            : language === 'en'
              ? 'Show All'
              : 'Alle anzeigen'}
        </button>
      )}
    </div>
  );
};

export default Tabs;
