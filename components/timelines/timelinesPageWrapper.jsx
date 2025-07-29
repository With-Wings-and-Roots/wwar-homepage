'use client';
import React, { Suspense, useEffect } from 'react';

import TimelineCardContainer from './timelineCardContainer';
import TimelineCountry from './timelineCountrySelector';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import LearnTimelines from '@/components/timelines/learnTimelines';
import { useDispatch, useSelector } from 'react-redux';
import { topicsAdded } from '@/store/topics';
import {
  activatedTimeLineDates,
  activatedTimelines,
  timelinesAdded,
  timelinesDatesAdded,
} from '@/store/timelines';

const TimelinesPageWrapper = ({
  lang,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  baseLink,
  timelineTopics,
}) => {
  const {
    timeline: { country },
  } = useSelector((state) => state.entities);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topicsAdded({ topics: timelineTopics }));
  }, [timelineTopics, dispatch]);

  useEffect(() => {
    if (country == 'us') {
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
  }, [timeLineEventsEn, timeLineEventsDe, country, dispatch]);

  return (
    <>
      <LearnTimelines />
      <TimelineCountry language={lang} />
      <TimelineCardContainer
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

export default TimelinesPageWrapper;
