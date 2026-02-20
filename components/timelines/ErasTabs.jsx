'use client';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { activatedEra } from '@/store/timelineEras';
import { storySelected } from '@/store/selectedStory';

const SingleEraButton = ({ era, lang: language }) => {
  const dispatch = useDispatch();
  const selectedEra = useSelector(
    (state) => state.entities.timelineEras.activeEra
  );

  const selectEra = () => {
    dispatch(activatedEra({ era }));
    dispatch(storySelected({ selection: 'all', id: null }));
  };

  const isActive = selectedEra?.slug === era?.slug || (!era && !selectedEra);

  return (
    <div
      onClick={selectEra}
      className={`${
        isActive
          ? 'bg-wwr_rich_black text-wwr_yellow_orange'
          : 'bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered text-wwr_rich_black hover:text-wwr_white'
      } text-sm lg:text-xl w-max px-3 py-1.5 lg:py-3 hover:cursor-pointer transition-all duration-300 font-extralight`}
    >
      {era ? parse(era.name) : language === 'en' ? 'All Eras' : 'Alle Epochen'}
    </div>
  );
};

const ErasTabs = ({ lang: language, allStoriesCount }) => {
  const allEras = useSelector((state) => state.entities.timelineEras.allEras);
  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );

  const [showAll, setShowAll] = useState(false);

  const erasToShow = showAll ? allEras : allEras.slice(0, 3);

  return (
    <div className='flex px-8 md:px-16 xl:px-48 relative flex-wrap gap-0.5 my-8 pb-4 items-center'>
      <SingleEraButton era={null} lang={language} />
      {erasToShow.map((era, i) => (
        <SingleEraButton key={i} era={era} lang={language} />
      ))}

      {/* Show All / Show Less button */}
      {allEras.length > 6 && (
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

      {/* Story count */}
      <div className='text-md lg:text-xl text-wwr_yellow_orange ml-4'>
        {language === 'en' ? 'Stories:' : 'Geschichten:'} {storiesCount}/
        {allStoriesCount}
      </div>
    </div>
  );
};

export default ErasTabs;
