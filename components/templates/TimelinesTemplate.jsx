import TimelinesPageWrapper from '@/components/timelines/timelinesPageWrapper';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import TimelineEventPage from '@/components/timelineEvent/timelineEventPage';
import { getAdjacentSlug } from '@/utilities/general';
import { getTimeline, getTimelineTopics } from '@/utilities/timeline';
import { fetchPersonsByIds, fetchStoriesByIds } from '@/utilities/stories';
import { fetchMediaByIds } from '@/utilities/media';

const TimelinesTemplate = async ({ data, params }) => {
  const baseLink = `/${params.lang}/${params.slug}/`;
  const [timeLineEventsDe, timeLineEventsEn, timelineTopics] =
    await Promise.all([
      getTimeline('de', params.lang),
      getTimeline('us', params.lang),
      getTimelineTopics(params.lang),
    ]);
  let country = null;
  let timelineEvents = [...timeLineEventsDe, ...timeLineEventsEn];
  let timelineEvent = null;
  let nextSlug = null;
  let prevSlug = null;
  let relatedEvents = null;
  let allRelatedStories = null;
  let relatedStories = null;
  const relatedStoryIds = [
    ...new Set(
      timelineEvents
        .flatMap((e) => e?.acf?.basic_info?.related_stories || [])
        .filter(Boolean)
    ),
  ];
  allRelatedStories = await fetchStoriesByIds(relatedStoryIds, params.lang);
  const personIds = [
    ...new Set(
      allRelatedStories?.map((story) => story?.acf?.person).filter(Boolean)
    ),
  ];
  const allPersons = await fetchPersonsByIds(personIds, params.lang);
  const mediaIds = [
    ...new Set([
      ...timelineEvents.map((e) => e?.featured_media).filter(Boolean),

      ...allRelatedStories.map((s) => s?.featured_media).filter(Boolean),
    ]),
  ];
  const allMedia = await fetchMediaByIds(mediaIds, params.lang);

  if (
    params?.deepSlug &&
    timelineEvents?.find((te) => te.slug == params.deepSlug)
  ) {
    const germanIdsArray = timeLineEventsDe.map((timeline) => timeline.id);
    const usaIdsArray = timeLineEventsEn.map((timeline) => timeline.id);
    timelineEvent =
      timelineEvents.find(
        (singleEvent) => singleEvent.slug == params.deepSlug
      ) || null;

    const indexInGerman = germanIdsArray.indexOf(timelineEvent.id);
    const indexInUsa = usaIdsArray.indexOf(timelineEvent.id);

    if (indexInGerman !== -1) {
      country = 'de';
    } else if (indexInUsa !== -1) {
      country = 'us';
    }

    nextSlug = getAdjacentSlug(
      (country === 'de' ? indexInGerman : indexInUsa) + 1,
      country === 'de' ? timeLineEventsDe?.length : timeLineEventsEn?.length,
      country === 'de' ? timeLineEventsDe : timeLineEventsEn
    );
    prevSlug = getAdjacentSlug(
      (country === 'de' ? indexInGerman : indexInUsa) - 1,
      country === 'de' ? timeLineEventsDe?.length : timeLineEventsEn?.length,
      country === 'de' ? timeLineEventsDe : timeLineEventsEn
    );

    const {
      acf: {
        basic_info: { related_events },
      },
    } = timelineEvent;

    relatedEvents = related_events
      ? timelineEvents.filter((event) => related_events.includes(event.id))
      : null;
    relatedStories =
      timelineEvent?.acf?.basic_info?.related_stories?.length > 0
        ? allRelatedStories.filter((story) =>
            timelineEvent.acf.basic_info.related_stories.includes(story.id)
          )
        : null;
  }

  return (
    <div>
      <div className='px-8 md:px-16 xl:px-48 pt-16 lg:pt-24 relative'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.page_title || '' }}
          className='text-3xl md:text-6xl font-light'
        />
        <WysiwygContent
          content={data.acf?.intro_text}
          className='font-light md:text-lg mt-1'
        />
      </div>
      {params?.deepSlug &&
        timelineEvents?.find((te) => te.slug == params.deepSlug) && (
          <TimelineEventPage
            timelineEvent={timelineEvent}
            nextSlug={nextSlug}
            prevSlug={prevSlug}
            country={country}
            relatedEvents={relatedEvents}
            relatedStories={relatedStories}
            lang={params.lang?.toLowerCase()}
            baseLink={baseLink}
            timelineTopics={timelineTopics}
            allMedia={allMedia}
            stories={relatedStories}
            allPersons={allPersons}
          />
        )}
      <div className='mt-12'>
        <TimelinesPageWrapper
          lang={params.lang?.toLowerCase()}
          timeLineEventsDe={timeLineEventsDe}
          timeLineEventsEn={timeLineEventsEn}
          allMedia={allMedia}
          baseLink={baseLink}
          timelineTopics={timelineTopics}
        />
      </div>
    </div>
  );
};

export default TimelinesTemplate;
