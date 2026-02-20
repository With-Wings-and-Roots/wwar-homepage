import { fetchMediaFromId } from '@/utilities/media';
import TimelineEventPage from '../timelineEvent/timelineEventPage';
import TimelinesPageWrapper from '../timelines/timelinesPageWrapper';
import TimelinesWrapper from '../timelines/timelineWrapper';
import { getAdjacentSlug } from '@/utilities/general';
import { notFound } from 'next/navigation';

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

const TimelinesTemplate = async ({
  params,
  data,
  subSlugs,
  baseLink,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  timelineTopics,
  timelineEras,
  stories,
  allPersons,
  timelineCountries,
}) => {
  // 1️⃣ Fetch countries with images
  const timelines = await fetchImageForTimelineContries(timelineCountries);
  // 2️⃣ Determine what to render
  if (!subSlugs || subSlugs.length === 0) {
    // /timelines → Render NEW overview component
    return (
      <TimelinesPageWrapper
        data={data}
        timelineCountries={timelines}
        lang={params.lang}
      />
    );
  }
  // Handle /timelines/info
  if (subSlugs[0]?.toLowerCase() === 'info') {
    return (
      <TimelinesPageWrapper
        data={data}
        timelineCountries={timelines}
        lang={params.lang}
      />
    );
  }
  let country;
  if (subSlugs.length === 1) {
    country = subSlugs[0].toLowerCase();
  } else {
    country = subSlugs[1].toLowerCase();
  }
  let selectedCountry = null;
  if (['united-states', 'usa', 'usa-ed'].includes(country)) {
    selectedCountry = 'us';
  } else if (['germany', 'deutschland', 'deutschland-ed'].includes(country)) {
    selectedCountry = 'de';
  }
  const countryData = timelineCountries.find(
    (c) => c.slug.toLowerCase() === country
  );
  if (selectedCountry) {
    if (subSlugs.length === 1) {
      const baseLinkModified = `${baseLink}${subSlugs[0]}/`;
      // /timelines/germany or /timelines/us → Render country timeline listing
      return (
        <TimelinesWrapper
          lang={params.lang}
          selectedCountry={selectedCountry}
          timelines={timelines}
          timeLineEventsDe={timeLineEventsDe}
          timeLineEventsEn={timeLineEventsEn}
          allMedia={allMedia}
          timelineTopics={timelineTopics}
          baseLink={baseLinkModified}
          timelineEras={timelineEras}
          countryData={countryData}
        />
      );
    }

    if (subSlugs.length === 2) {
      const baseLinkModified = `${baseLink}${subSlugs[1]}/`;

      const eventSlug = subSlugs[0];

      const allEvents = [...timeLineEventsDe, ...timeLineEventsEn];
      console.log('eventSlug:', eventSlug);
      const timelineEvent = allEvents.find((te) => te.slug === eventSlug);

      if (!timelineEvent) return notFound();

      // Determine country array for next/prev
      const isGerman = timeLineEventsDe.some((t) => t.id === timelineEvent.id);

      const eventsArray = isGerman ? timeLineEventsDe : timeLineEventsEn;

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

      // Related events from ALL events
      const relatedEvents =
        timelineEvent.acf?.basic_info?.related_events?.length > 0
          ? allEvents.filter((event) =>
              timelineEvent.acf.basic_info.related_events.includes(event.id)
            )
          : null;

      // Related stories from all stories (same as before)
      const relatedStories =
        timelineEvent.acf?.basic_info?.related_stories?.length > 0
          ? stories.filter((story) =>
              timelineEvent.acf.basic_info.related_stories.includes(story.id)
            )
          : null;

      return (
        <TimelineEventPage
          timelineEvent={timelineEvent}
          nextSlug={nextSlug}
          prevSlug={prevSlug}
          country={isGerman ? 'de' : 'us'}
          relatedEvents={relatedEvents}
          relatedStories={relatedStories}
          lang={params.lang?.toLowerCase()}
          baseLink={baseLinkModified}
          timelineTopics={timelineTopics}
          allMedia={allMedia}
          stories={stories}
          allPersons={allPersons}
        />
      );
    }
  }

  // Fallback for unknown subSlugs
  return notFound();
};

export default TimelinesTemplate;
