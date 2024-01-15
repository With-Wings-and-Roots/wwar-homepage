'use client';

import React from 'react';
import { germanySelected, usaSelected } from '@/store/timeline';
import { useDispatch, useSelector } from 'react-redux';
import { rangeDateChanged } from '@/store/rangeSlider';
import SingleButton from '@/components/timelines/singleButton';

const TimelineCountry = ({ firstDate, language }) => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );
  return (
    <div className='w-11/12 lg:w-4/5 2xl:w-[90%] m-auto relative pb-4 lg:pb-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <div
          className={`min-w-max ${
            selectedCountry === 'us' ? 'font-normal' : ' cursor-pointer'
          }`}
          onClick={() => {
            if (selectedCountry !== 'us') {
              dispatch(usaSelected({}));
              dispatch(rangeDateChanged({ date: firstDate.en }));
            }
          }}
        >
          {language === 'de' && <SingleButton title={`USA`}/>}
          {language !== 'de' && <SingleButton title={`EXPLORE UNITED STATES TIMELINE`}/> }
        </div>
        {/*<div className='font-normal px-4'>/</div>*/}
        <div
          className={`min-w-max ${
            selectedCountry === 'de' ? 'font-normal' : ' cursor-pointer'
          }`}
          onClick={() => {
            if (selectedCountry !== 'de') {
              dispatch(germanySelected({}));
              dispatch(rangeDateChanged({ date: firstDate.de }));
            }
          }}
        >
          {language === 'de' && <SingleButton title={`DEUTSCHLAND`} color={`turquoise`}/> }
          {language !== 'de' && <SingleButton title={`EXPLORE GERMANY TIMELINE`} color={`turquoise`}/>}
        </div>
      </div>
    </div>
  );
};

export default TimelineCountry;
