'use client';
import React, { Suspense, useEffect } from 'react';

import TimelineCardContainer from './timelineCardContainer';
import TimelineCountry from './timelineCountrySelector';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import LearnTimelines from '@/components/timelines/learnTimelines';
import { useDispatch } from 'react-redux';
import { topicsAdded } from '@/store/topics';

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
