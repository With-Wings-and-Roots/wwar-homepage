'use client';
import React, { useEffect, useState } from 'react';
import TimelineCardInternal from '@/components/timelines/timelineCardInternal';
import { createLocalLink } from '@/utilities/links';
import { getTimelineCountryById } from '@/utilities/timeline';

const RelatedEvents = ({ relatedEvents, baseLink, allMedia, lang }) => {
  const [eventsWithLinks, setEventsWithLinks] = useState([]);
  const link = createLocalLink(`/${lang}/timelines`);

  useEffect(() => {
    const enrichEvents = async () => {
      const updatedEvents = (
        await Promise.all(
          relatedEvents.map(async (event) => {
            if (!event) return null; // skip undefined events

            const timelineId = event?.acf?.basic_info?.timelines?.[0];
            if (!timelineId) return null; // skip events without timeline

            const timeline = await getTimelineCountryById(timelineId, lang);
            if (!timeline) return null; // skip if timeline fetch failed

            const timelineSlug = timeline.slug;
            const eventLink = `${link}/${timelineSlug}/${event?.slug}`;

            return { ...event, link: eventLink };
          })
        )
      ).filter(Boolean); // remove nulls

      setEventsWithLinks(updatedEvents);
    };

    if (relatedEvents?.length > 0) {
      enrichEvents();
    }
  }, [relatedEvents, baseLink, lang]);

  if (eventsWithLinks.length === 0) return null; // nothing to show

  return (
    <div className='w-full bg-wwr_yellow_orange px-4 md:px-8 lg:px-20 pb-10'>
      <div className='py-6 text-wwr_white text-xl font-light'>
        {lang === 'en' ? 'Related Events' : 'Ähnliche Ereignisse'}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {eventsWithLinks.map((event, index) => {
          const mediaUrl = allMedia.find(
            (media) => media.id === event?.featured_media
          )?.source_url;

          return (
            <div key={index}>
              <TimelineCardInternal
                timeLineEvent={event}
                mediaUrl={mediaUrl}
                link={event.link}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedEvents;
