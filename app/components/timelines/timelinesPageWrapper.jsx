import React from "react";
import { getTimelineEvents } from "@/app/utilities/timeline";
import TimelineCardContainer from "./timelineCardContainer";
import RangeSlider from "./rangeSlider";
import { getAllMedia } from "@/app/utilities/stories";

const TimelinesPageWrapper = async ({ lang }) => {
  const unsortedTimeLineEvents = await getTimelineEvents(lang);
  const allMedia = await getAllMedia("en");

  const timeLineEvents = unsortedTimeLineEvents.sort((a, b) => {
    // return (
    //   new Date(a.acf.basic_info.start_date) -
    //   new Date(b.acf.basic_info.start_date)
    // );

    return (
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
    );
  });

  const timeLineEventDatesArray = timeLineEvents.map((timeLineEvent) => {
    // return new Date(timeLineEvent.acf.basic_info.start_date).getFullYear();
    return Number(timeLineEvent.acf.basic_info.start_date.slice(0, 4));
  });

  return (
    <>
      <TimelineCardContainer
        timeLineEvents={timeLineEvents}
        allMedia={allMedia}
        timeLineEventDatesArray={timeLineEventDatesArray}
      />

      <RangeSlider timeLineEventDatesArray={timeLineEventDatesArray} />
    </>
  );
};

export default TimelinesPageWrapper;
