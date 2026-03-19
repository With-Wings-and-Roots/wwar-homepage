'use client';
import React from 'react';
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
      }  w-max px-3 py-1.5 lg:py-3 hover:cursor-pointer transition-all duration-300 font-extralight`}
    >
      {era ? parse(era.name) : language === 'en' ? 'All Eras' : 'Alle Epochen'}
    </div>
  );
};

const ErasTabs = ({ lang: language }) => {
  const allEras = useSelector((state) => state.entities.timelineEras.allEras);

  return (
    <div className='flex px-8 md:px-16 xl:px-48 relative flex-wrap gap-0.5 my-8 pb-4 items-center'>
      <SingleEraButton era={null} lang={language} />

      {allEras.map((era, i) => (
        <SingleEraButton key={i} era={era} lang={language} />
      ))}
    </div>
  );
};

export default ErasTabs;
