import React from 'react';

import TimelineCardContainer from './timelineCardContainer';
import TimelineCountry from './timelineCountrySelector';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import LearnTimelines from '@/components/timelines/learnTimelines';

const TimelinesPageWrapper = ({
  lang,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  baseLink,
  searchParams
}) => {

  const extractYearFromTimeline = (timeLineEvents) =>
    timeLineEvents.map((timeLineEvent) =>
      Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4))
    );

  const timeLineEventDatesArrayDe = extractYearFromTimeline(timeLineEventsDe);
  const timeLineEventDatesArrayEn = extractYearFromTimeline(timeLineEventsEn);
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

      <RangeSliderWrapper
        timeLineEventDatesArrayObject={{
          de: timeLineEventDatesArrayDe,
          en: timeLineEventDatesArrayEn,

        }}
        searchParams={searchParams}
      />
    </>
  );
};

export default TimelinesPageWrapper;
