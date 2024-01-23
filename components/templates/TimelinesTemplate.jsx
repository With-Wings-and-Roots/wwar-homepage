import { getTimeline, getTimelineEvents } from '@/utilities/timeline';
import { getAllMedia } from '@/utilities/stories';
import TimelinesPageWrapper from '@/components/timelines/timelinesPageWrapper';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import TimelineEventPage from '@/components/timelineEvent/timelineEventPage';
import { getAdjacentSlug } from '@/utilities/general';

const TimelinesTemplate = async ({
  params,
  data,
  subSlugs,
  baseLink,
  searchParams,
}) => {
  const [timeLineEventsDe, timeLineEventsEn, allMedia, timelineEvents] =
    await Promise.all([
      getTimeline('de', params.lang),
      getTimeline('us', params.lang),
      getAllMedia('en'),
      getTimelineEvents(params.lang),
    ]);

  let country = null;
  let timelineEvent = null;
  let nextSlug = null;
  let prevSlug = null;
  let relatedEvents = null;

  if (
    subSlugs?.length > 0 &&
    !![...timeLineEventsDe, ...timeLineEventsEn]?.find(
      (te) => te.slug === subSlugs[0]
    )
  ) {
    const germanIdsArray = timeLineEventsDe.map((timeline) => timeline.id);
    const usaIdsArray = timeLineEventsEn.map((timeline) => timeline.id);
    timelineEvent =
      timelineEvents.find((singleEvent) => singleEvent.slug === subSlugs[0]) ||
      null;

    const indexInGerman = germanIdsArray.indexOf(timelineEvent.id);
    const indexInUsa = usaIdsArray.indexOf(timelineEvent.id);

    if (indexInGerman !== -1) {
      country = 'de';
    } else if (indexInUsa !== -1) {
      country = 'us';
    }

    const timelineEventsLength = timelineEvents.length;
    const timelineEventIndex = timelineEvents.indexOf(timelineEvent);

    nextSlug = getAdjacentSlug(
      timelineEventIndex + 1,
      timelineEventsLength,
      timelineEvents
    );
    prevSlug = getAdjacentSlug(
      timelineEventIndex - 1,
      timelineEventsLength,
      timelineEvents
    );

    const {
      acf: {
        basic_info: { related_events },
      },
    } = timelineEvent;

    relatedEvents = related_events
      ? timelineEvents.filter((event) => related_events.includes(event.id))
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
      {subSlugs?.length > 0 &&
        !![...timeLineEventsDe, ...timeLineEventsEn]?.find(
          (te) => te.slug === subSlugs[0]
        ) && (
          <TimelineEventPage
            timelineEvent={timelineEvent}
            nextSlug={nextSlug}
            prevSlug={prevSlug}
            country={country}
            relatedEvents={relatedEvents}
            baseLink={baseLink}
          />
        )}
      <div className='mt-12'>
        <TimelinesPageWrapper
          lang={params.lang.toLowerCase()}
          timeLineEventsDe={timeLineEventsDe}
          timeLineEventsEn={timeLineEventsEn}
          allMedia={allMedia}
          baseLink={baseLink}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default TimelinesTemplate;
