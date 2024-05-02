import TimelinesPageWrapper from '@/components/timelines/timelinesPageWrapper';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import TimelineEventPage from '@/components/timelineEvent/timelineEventPage';
import { getAdjacentSlug } from '@/utilities/general';

const TimelinesTemplate = ({
  params,
  data,
  subSlugs,
  baseLink,
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  timelineEvents,
  timelineTopics,
  stories,
  allPersons,
}) => {
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
            timelineTopics={timelineTopics}
            allMedia={allMedia}
            stories={stories}
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
        />
      </div>
    </div>
  );
};

export default TimelinesTemplate;
