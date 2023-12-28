import React from 'react';

import TimelineCardContainer from './timelineCardContainer';
import RangeSlider from './rangeSlider';
import TimelineCountry from './timelineCountrySelector';

const TimelinesPageWrapper = ({
  lang,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
}) => {
  const extractYearFromTimeline = (timeLineEvents) =>
    timeLineEvents.map((timeLineEvent) =>
      Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4))
    );

  const timeLineEventDatesArrayDe = extractYearFromTimeline(timeLineEventsDe);
  const timeLineEventDatesArrayEn = extractYearFromTimeline(timeLineEventsEn);
  return (
    <>
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
      />

      <RangeSlider
        timeLineEventDatesArrayObject={{
          de: timeLineEventDatesArrayDe,
          en: timeLineEventDatesArrayEn,
        }}
      />
    </>
  );
};

export default TimelinesPageWrapper;
