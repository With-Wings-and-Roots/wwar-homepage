import React from "react";
import { getTimelineEvents } from "@/app/utilities/timeline";
import TimelineCardContainer from "./timelineCardContainer";
import RangeSlider from "./rangeSlider";

const TimelinesPageWrapper = async ({ lang, allMedia }) => {
  const unsortedTimeLineEvents = await getTimelineEvents(lang);

  const timeLineEvents = unsortedTimeLineEvents.sort((a, b) => {
    return (
      new Date(a.acf.basic_info.start_date) -
      new Date(b.acf.basic_info.start_date)
    );
  });

  const timeLineEventDatesArray = timeLineEvents.map((timeLineEvent) => {
    return new Date(timeLineEvent.acf.basic_info.start_date).getFullYear();
  });

  // for (let timeLine of timeLineEvents) {
  //   console.log(timeLine.featured_media);
  // }

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
