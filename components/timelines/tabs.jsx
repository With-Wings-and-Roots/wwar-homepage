'use client';
import React from 'react';
import parse from 'html-react-parser';

import SingleTabButton from './singleTabButton';
import { useSelector } from 'react-redux';

const Tabs = ({ lang: language }) => {
  const allTabData = useSelector((state) => state.entities.topics.allTopics);

  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );

  return (
    <div className='flex px-8 md:px-16 xl:px-48 relative flex-wrap gap-0.5 my-8 pt-8 pb-8'>
      {allTabData.map((singleTabData, i) => {
        return (
          <React.Fragment key={i}>
            <SingleTabButton
              buttonText={parse(singleTabData.name)}
              slug={singleTabData.slug}
            />
          </React.Fragment>
        );
      })}
      <SingleTabButton
        buttonText={language === 'en' ? 'All Events' : 'Alle Ereignisse'}
        slug={'all'}
        lang={language}
      />

      <div className='text-md px-2 py-1 lg:text-xl text-wwr_yellow_orange flex items-center lg:py-2'>
        Stories: {storiesCount}
      </div>
    </div>
  );
};

export default Tabs;
