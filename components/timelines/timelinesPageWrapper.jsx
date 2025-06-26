'use client';
import React, { Suspense, useEffect } from 'react';

import TimelineCardContainer from './timelineCardContainer';
import TimelineCountry from './timelineCountrySelector';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import LearnTimelines from '@/components/timelines/learnTimelines';
import Tabs from './tabs';
import { useDispatch } from 'react-redux';
import { topicsAdded } from '@/store/topics';
import Image from 'next/image';

const TimelinesPageWrapper = ({
  lang,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  baseLink,
  timelineTopics,
}) => {
  const extractYearFromTimeline = (timeLineEvents) =>
    timeLineEvents.map((timeLineEvent) =>
      Number(timeLineEvent.acf.basic_info?.start_date?.slice(0, 4))
    );

  const timeLineEventDatesArrayDe = extractYearFromTimeline(timeLineEventsDe);
  const timeLineEventDatesArrayEn = extractYearFromTimeline(timeLineEventsEn);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topicsAdded({ topics: timelineTopics }), [
      timelineTopics,
      dispatch,
    ]);
  });

  return (
    <>
      <LearnTimelines />
      <Tabs lang={lang} />
      <div className='flex flex-nowrap items-center h-10 border-2 border-wwr_rich_black max-w-max mb-8'>
        <input
          className='my-4 p-1  h-full border-0 focus:outline-none'
          placeholder='Search all timelines'
          type='text'
          // onChange={handleInput}
        />
        <div className='text-2xl text-wwr_white cursor-pointer h-full bg-wwr_rich_black px-2  flex items-center p-2'>
          <Image src='/search.svg' width={24} height={24} alt='Search icon' />
        </div>
      </div>
      <TimelineCountry
        firstDate={{
          de: timeLineEventDatesArrayDe[0],
          en: timeLineEventDatesArrayEn[0],
        }}
        language={lang}
      />
      <TimelineCardContainer
        timeLineEventsDe={timeLineEventsDe}
        timeLineEventsEn={timeLineEventsEn}
        allMedia={allMedia}
        timeLineEventDatesArrayDe={timeLineEventDatesArrayDe}
        timeLineEventDatesArrayEn={timeLineEventDatesArrayEn}
        lang={lang}
        baseLink={baseLink}
      />

      <Suspense>
        <RangeSliderWrapper
          timeLineEventDatesArrayObject={{
            de: timeLineEventDatesArrayDe,
            en: timeLineEventDatesArrayEn,
          }}
        />
      </Suspense>
    </>
  );
};

export default TimelinesPageWrapper;
