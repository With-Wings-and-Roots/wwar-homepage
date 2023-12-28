import TimelineEventPage from "@/components/timelineEvent/timelineEventPage";
import { getTimeline, getTimelineEvents } from "@/utilities/timeline";
import React from "react";

const Event = async ({ params }) => {
  const lang = params.lang.toLowerCase();

  const timelineEvents = await getTimelineEvents(lang);

  const timelineEvent =
    timelineEvents.find((singleEvent) => singleEvent.slug === params.event) ||
    null;

  return (
    <>
      <TimelineEventPage timelineEvent={timelineEvent} />
    </>
  );
};

export default Event;

export async function generateStaticParams() {
  const [
    timelineEventsGermanyDe,
    timelineEventsGermanyEn,
    timelineEventsUsaDe,
    timelineEventsUsaEn,
  ] = await Promise.all([
    getTimeline("de", "de"),
    getTimeline("de", "en"),
    getTimeline("us", "de"),
    getTimeline("us", "en"),
  ]);

  const mapEvents = (events, lang) =>
    events.map((singleEvent) => {
      return { lang, event: singleEvent.slug };
    });

  const eventsGermanyDe = mapEvents(timelineEventsGermanyDe, "de");
  const eventsGermanyEn = mapEvents(timelineEventsGermanyEn, "en");
  const eventsUsaDe = mapEvents(timelineEventsUsaDe, "de");
  const eventsUsaEn = mapEvents(timelineEventsUsaEn, "en");

  return eventsUsaEn.concat(eventsUsaDe, eventsGermanyEn, eventsGermanyDe);
}
