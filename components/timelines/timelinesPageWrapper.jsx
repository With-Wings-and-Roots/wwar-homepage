import React from 'react';

import TimelineCardContainer from './timelineCardContainer';
import TimelineCountry from './timelineCountrySelector';
import NewTimelineCountrySelector from '@/components/timelines/newTimelineCountrySelector';
import RangeSliderWrapper from '@/components/timelines/rangeSliderWrapper';
import LearnTimelines from '@/components/timelines/learnTimelines';
import { getTimelineCountryIds, sortedData } from '@/utilities/timeline';

const TimelinesPageWrapper =async ({
                                     lang,
                                     timeLineEventsDe,
                                     timeLineEventsEn,
                                     allMedia,
                                     baseLink,
                                     searchParams,
                                     skip=false
                                   }) => {

  const timeLineEventsAll = sortedData( [...timeLineEventsEn, ...timeLineEventsDe])

  const extractYearFromTimeline = (timeLineEvents) =>
    timeLineEvents.map((timeLineEvent) =>
      Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4))
    );

  const timeLineEventDatesArrayDe = extractYearFromTimeline(timeLineEventsDe);
  const timeLineEventDatesArrayEn = extractYearFromTimeline(timeLineEventsEn);
  const timeLineEventDatesArrayAll = extractYearFromTimeline(timeLineEventsAll);

  const countriesId = await getTimelineCountryIds(lang)

  return (
    <>
      {!skip && <LearnTimelines />}
      <div className={`pt-4`}>
        <NewTimelineCountrySelector
          firstDate={{
            de: timeLineEventDatesArrayDe[0],
            en: timeLineEventDatesArrayEn[0],
          }}
          language={lang}
        />
      </div>
      <TimelineCardContainer
        timeLineEventsDe={timeLineEventsDe}
        timeLineEventsEn={timeLineEventsEn}
        timeLineEventsAll={timeLineEventsAll}
        allMedia={allMedia}
        timeLineEventDatesArrayDe={timeLineEventDatesArrayDe}
        timeLineEventDatesArrayEn={timeLineEventDatesArrayEn}
        timeLineEventDatesArrayAll={timeLineEventDatesArrayAll}
        lang={lang}
        baseLink={baseLink}
        skip={skip}
        countriesId={countriesId}
      />

      <RangeSliderWrapper
        timeLineEventDatesArrayObject={{
          de: timeLineEventDatesArrayDe,
          us: timeLineEventDatesArrayEn,
          all: timeLineEventDatesArrayAll

        }}
        searchParams={searchParams}
      />
    </>
  );
};

export default TimelinesPageWrapper;
