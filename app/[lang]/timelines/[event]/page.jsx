import { getTimeline, getTimelineEvents } from '@/utilities/timeline';
import TimelineEventPage from '../../../../components/timelineEvent/timelineEventPage';
import { getAdjacentSlug } from '@/utilities/general';
import { getAllMedia } from '@/utilities/stories';

const Event = async ({ params }) => {
  let country = null;
  const lang = params.lang.toLowerCase();

  const [timelineEvents, timeLineEventsDe, timeLineEventsUs] = await Promise.all([
    getTimelineEvents(lang),
    getTimeline('de', lang),
    getTimeline('us', lang),
  ]);
  const germanIdsArray = timeLineEventsDe.map(timeline=>timeline.id)
  const usaIdsArray = timeLineEventsUs.map(timeline=>timeline.id)


  const timelineEvent =
    timelineEvents.find((singleEvent) => singleEvent.slug === params.event) ||
    null;


  if(germanIdsArray.includes(timelineEvent.id)){
    country = "de"
  }else if (usaIdsArray.includes(timelineEvent.id)){
    country = "us"
  }

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

  return (
    <>
      <TimelineEventPage
        timelineEvent={timelineEvent}
        nextSlug={nextSlug}
        prevSlug={prevSlug}
        lang={lang}
        country={country}
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
    getTimeline('de', 'de'),
    getTimeline('de', 'en'),
    getTimeline('us', 'de'),
    getTimeline('us', 'en'),
  ]);

  const mapEvents = (events, lang) =>
    events.map((singleEvent) => {
      return { lang, event: singleEvent.slug };
    });

  const eventsGermanyDe = mapEvents(timelineEventsGermanyDe, 'de');
  const eventsGermanyEn = mapEvents(timelineEventsGermanyEn, 'en');
  const eventsUsaDe = mapEvents(timelineEventsUsaDe, 'de');
  const eventsUsaEn = mapEvents(timelineEventsUsaEn, 'en');

  return eventsUsaEn.concat(eventsUsaDe, eventsGermanyEn, eventsGermanyDe);
}
