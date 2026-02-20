'use client';
import React, { Suspense, use, useEffect } from 'react';

import TimelineCardContainer from './timelineCardContainer';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import { useDispatch } from 'react-redux';
import { topicsAdded } from '@/store/topics';
import {
  activatedTimeLineDates,
  activatedTimelines,
  timelinesAdded,
  timelinesDatesAdded,
} from '@/store/timelines';
import Link from 'next/link';
import { germanySelected, usaSelected } from '@/store/timeline';
import { erasAdded } from '@/store/timelineEras';

const TimelinesWrapper = ({
  lang,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  baseLink,
  timelineTopics,
  timelineEras,
  selectedCountry,
  countryData,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topicsAdded({ topics: timelineTopics }));
  }, [timelineTopics, dispatch]);

  useEffect(() => {
    dispatch(erasAdded({ eras: timelineEras }));
  }, [dispatch, timelineEras]);

  useEffect(() => {
    if (selectedCountry == 'us') {
      dispatch(usaSelected({}));
    } else {
      dispatch(germanySelected({}));
    }
  }, [selectedCountry, dispatch]);

  useEffect(() => {
    if (selectedCountry == 'us') {
      dispatch(timelinesAdded({ timelines: timeLineEventsEn }));
      dispatch(activatedTimelines({ timelines: timeLineEventsEn }));
      dispatch(timelinesDatesAdded({ timelines: timeLineEventsEn }));
      dispatch(activatedTimeLineDates({ timelines: timeLineEventsEn }));
    } else {
      dispatch(timelinesAdded({ timelines: timeLineEventsDe }));
      dispatch(activatedTimelines({ timelines: timeLineEventsDe }));
      dispatch(timelinesDatesAdded({ timelines: timeLineEventsDe }));
      dispatch(activatedTimeLineDates({ timelines: timeLineEventsDe }));
    }
  }, [timeLineEventsEn, timeLineEventsDe, selectedCountry, dispatch]);

  return (
    <>
      <div className='px-8 md:px-16 xl:px-48 py-16 lg:pt-24 relative'>
        <div className='mb-6 text-sm flex flex-wrap items-center gap-2 text-gray-600'>
          <Link
            href={`/${lang}/timelines/`}
            className='hover:underline text-wwr_rich_black'
          >
            Timelines
          </Link>

          <span className='mx-1'>/</span>
          <span className='font-medium text-wwr_yellow_orange'>
            {lang === 'en' ? countryData?.name : countryData?.name}
          </span>
        </div>
        {/* PAGE HEADER */}
        <h1 className='text-3xl md:text-5xl font-light mb-2 mt-10'>
          {`${countryData?.name} ${
            lang === 'en'
              ? 'Immigration History Timeline'
              : 'Zeitstrahl der Einwanderungsgeschichte'
          }`}
        </h1>
        <p className='text-gray-700 mb-6'>{countryData?.description}</p>
      </div>

      <TimelineCardContainer
        selectedCountry={selectedCountry}
        allMedia={allMedia}
        lang={lang}
        baseLink={baseLink}
      />

      <Suspense>
        <RangeSliderWrapper />
      </Suspense>
    </>
  );
};

export default TimelinesWrapper;
