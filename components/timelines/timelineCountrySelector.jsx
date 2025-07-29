'use client';

import React from 'react';
import { germanySelected, usaSelected } from '@/store/timeline';
import { useDispatch, useSelector } from 'react-redux';
import { rangeDateChanged } from '@/store/rangeSlider';

const TimelineCountry = ({ language }) => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );
  return (
    <div className='px-8 md:px-16 xl:px-48 relative'>
      <div className='flex flex-wrap gap-y-2 mb-4 text-2xl lg:text-4xl font-extralight'>
        <div
          className={`min-w-max ${
            selectedCountry === 'us' ? 'font-normal' : ' cursor-pointer'
          }`}
          onClick={() => {
            if (selectedCountry !== 'us') {
              dispatch(usaSelected({}));
            }
          }}
        >
          {language === 'de' && <>USA</>}
          {language !== 'de' && <>UNITED STATES</>}
        </div>
        <div className='font-normal px-4'>/</div>
        <div
          className={`min-w-max ${
            selectedCountry === 'de' ? 'font-normal' : ' cursor-pointer'
          }`}
          onClick={() => {
            if (selectedCountry !== 'de') {
              dispatch(germanySelected({}));
            }
          }}
        >
          {language === 'de' && <>DEUTSCHLAND</>}
          {language !== 'de' && <>GERMANY</>}
        </div>
      </div>
    </div>
  );
};

export default TimelineCountry;
