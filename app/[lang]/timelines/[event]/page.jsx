
import { getTimeline, getTimelineEvents } from "../../../../utilities/timeline";
import TimelineEventPage from "../../../../components/timelineEvent/timelineEventPage";
import { getAdjacentSlug } from "../../../../utilities/general";


const Event = async ({ params }) => {
  const lang = params.lang.toLowerCase();

  const timelineEvents = await getTimelineEvents(lang);

  const timelineEvent =
    timelineEvents.find((singleEvent) => singleEvent.slug === params.event) ||
    null;

  const timelineEventsLength = timelineEvents.length;
  const timelineEventIndex = timelineEvents.indexOf(timelineEvent);

  const nextSlug = getAdjacentSlug(
    timelineEventIndex + 1,
    timelineEventsLength,
    timelineEvents
  );
  const prevSlug = getAdjacentSlug(
    timelineEventIndex - 1,
    timelineEventsLength,
    timelineEvents
  );

  getTimeline


  return (
    <>

      <TimelineEventPage
        timelineEvent={timelineEvent}
        nextSlug={nextSlug}
        prevSlug={prevSlug}
      />
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
