import React from 'react';
import StoryCardContainer from '../stories/StoryCardContainer';

const RelatedStoriesContainer = ({
  relatedStories,
  lang,
  allMedia,
  allPersons,
  hoverZoom,
  baseLink,
  person,
}) => {
  const modifiedBaseLink = baseLink.replace('/timelines/', '/stories/');

  return (
    <div className={`w-full bg-wwr_yellow_orange px-4 md:px-8 lg:px-20 pb-10`}>
      <div className={`py-6 text-wwr_white text-xl font-light`}>
        {lang === 'en' ? 'More From ' : 'Mehr von '}
        {person}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        <StoryCardContainer
          storiesToRender={relatedStories}
          lang={lang}
          allMedia={allMedia}
          allPersons={allPersons}
          hoverZoom={hoverZoom}
          baseLink={modifiedBaseLink}
        />
      </div>
    </div>
  );
};

export default RelatedStoriesContainer;
