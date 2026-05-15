import TimelinesWrapper from '@/components/timelines/timelineWrapper';
import TimelineEventPage from '@/components/timelineEvent/timelineEventPage';
import { notFound } from 'next/navigation';

import { getAdjacentSlug } from '@/utilities/general';
import {
  getTimeline,
  getTimelineTopics,
  getTimelineEras,
  getTimelineCountries,
} from '@/utilities/timeline';

import { fetchPersonsByIds, fetchStoriesByIds } from '@/utilities/stories';
import { fetchMediaByIds, fetchMediaFromId } from '@/utilities/media';
import TimelineLandingTemplate from './TimelineLandingTemplate';

const fetchImageForTimelineContries = async (timelineCountries) => {
  const countriesWithImages = await Promise.all(
    timelineCountries.map(async (country) => {
      const mediaId = country.acf?.image;
      if (mediaId) {
        const i = await fetchMediaFromId(mediaId);
        return { ...country, imageUrl: i.source_url };
      } else {
        return { ...country, imageUrl: null };
      }
    })
  );
  return countriesWithImages;
};
const TimelinesTemplate = async ({ params, data }) => {
  const baseLink = `/${params.lang}/${params.slug}/${params.deepSlug}/`;
  const timelineCountries = await getTimelineCountries(params.lang);
  const timelines = await fetchImageForTimelineContries(timelineCountries);
  // =========================
  // FETCH CORE DATA
  // =========================
  const [timeLineEventsDe, timeLineEventsEn, timelineTopics] =
    await Promise.all([
      getTimeline('de', params.lang),
      getTimeline('us', params.lang),
      getTimelineTopics(params.lang),
    ]);

  const timelineEras = await getTimelineEras(params.lang);

  const timelineEvents = [...timeLineEventsDe, ...timeLineEventsEn];

  // =========================
  // SHARED DATA
  // =========================
  const relatedStoryIds = [
    ...new Set(
      timelineEvents
        .flatMap((e) => e?.acf?.basic_info?.related_stories || [])
        .filter(Boolean)
    ),
  ];

  const allRelatedStories = await fetchStoriesByIds(
    relatedStoryIds,
    params.lang
  );

  const personIds = [
    ...new Set(allRelatedStories.map((s) => s?.acf?.person).filter(Boolean)),
  ];

  const allPersons = await fetchPersonsByIds(personIds, params.lang);

  const mediaIds = [
    ...new Set([
      ...timelineEvents.map((e) => e?.featured_media).filter(Boolean),
      ...allRelatedStories.map((s) => s?.featured_media).filter(Boolean),
    ]),
  ];

  const allMedia = await fetchMediaByIds(mediaIds, params.lang);

  // =========================
  // ROUTING SAFE GUARD
  // =========================

  const countrySlug = params.deepSlug;

  const isCountry = [
    'united-states',
    'usa',
    'usa-ed',
    'germany',
    'deutschland',
    'deutschland-ed',
  ].includes(countrySlug);

  if (!isCountry) return notFound();

  const selectedCountry = ['germany', 'deutschland', 'deutschland-ed'].includes(
    countrySlug
  )
    ? 'de'
    : 'us';

  // =========================
  // 📌 EVENT PAGE (/country/event)
  // =========================

  if (params.relatedPosts) {
    const eventSlug = params.relatedPosts[0];

    const timelineEvent = timelineEvents.find((e) => e.slug === eventSlug);

    if (!timelineEvent) return notFound();

    const eventsArray =
      selectedCountry === 'de' ? timeLineEventsDe : timeLineEventsEn;

    const currentIndex = eventsArray.findIndex(
      (t) => t.id === timelineEvent.id
    );

    const nextSlug = getAdjacentSlug(
      currentIndex + 1,
      eventsArray.length,
      eventsArray
    );

    const prevSlug = getAdjacentSlug(
      currentIndex - 1,
      eventsArray.length,
      eventsArray
    );

    const relatedEvents =
      timelineEvent.acf?.basic_info?.related_events?.length > 0
        ? timelineEvents.filter((event) =>
            timelineEvent.acf.basic_info.related_events.includes(event.id)
          )
        : null;

    const relatedStories =
      timelineEvent.acf?.basic_info?.related_stories?.length > 0
        ? allRelatedStories.filter((story) =>
            timelineEvent.acf.basic_info.related_stories.includes(story.id)
          )
        : null;
    const baseLinkForRelated = `/${params.lang}/${params.slug}/`;
    return (
      <TimelineEventPage
        timelineEvent={timelineEvent}
        nextSlug={nextSlug}
        prevSlug={prevSlug}
        country={selectedCountry}
        relatedEvents={relatedEvents}
        relatedStories={relatedStories}
        lang={params.lang?.toLowerCase()}
        baseLink={baseLink}
        baseLinkForRelated={baseLinkForRelated}
        timelineTopics={timelineTopics}
        allMedia={allMedia}
        stories={relatedStories}
        allPersons={allPersons}
      />
    );
  }

  // =========================
  // 🌍 COUNTRY PAGE (/country)
  // =========================
  if (params.deepSlug) {
    const countryData = timelineCountries.find(
      (c) => c.slug.toLowerCase() === params.deepSlug.toLowerCase()
    );
    return (
      <TimelinesWrapper
        lang={params.lang}
        selectedCountry={selectedCountry}
        timelines={timelines}
        timeLineEventsDe={timeLineEventsDe}
        timeLineEventsEn={timeLineEventsEn}
        allMedia={allMedia}
        timelineTopics={timelineTopics}
        baseLink={baseLink}
        timelineEras={timelineEras}
        countryData={countryData}
      />
    );
  }

  return notFound();
};

export default TimelinesTemplate;
