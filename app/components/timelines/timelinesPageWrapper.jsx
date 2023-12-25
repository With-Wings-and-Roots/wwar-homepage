import React from "react";
import { getTimeline } from "@/app/utilities/timeline";
import TimelineCardContainer from "./timelineCardContainer";
import RangeSlider from "./rangeSlider";
import { getAllMedia } from "@/app/utilities/stories";
import TimelineCountry from "./timelineCountrySelector";

const TimelinesPageWrapper = async ({ lang }) => {
  // const timeLineEvents = await getTimelineEvents(lang);

  const timeLineEventsDe = await getTimeline("de", lang);
  const timeLineEventsEn = await getTimeline("us", lang);

  const allMedia = await getAllMedia("en");

  const timeLineEventDatesArrayDe = timeLineEventsDe.map((timeLineEvent) => {
    return Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4));
  });
  const timeLineEventDatesArrayEn = timeLineEventsEn.map((timeLineEvent) => {
    return Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4));
  });

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
