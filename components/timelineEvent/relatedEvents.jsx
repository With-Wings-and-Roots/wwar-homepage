import React from 'react';
import TimelineCardInternal from '@/components/timelines/timelineCardInternal';
import { createLocalLink } from '@/utilities/links';

const RelatedEvents = ({ relatedEvents, baseLink, allMedia, lang }) => {
  const modifiedBaseLink = baseLink.replace('/stories/', '/timelines/');

  return (
    <div className={`w-full bg-wwr_yellow_orange px-4 md:px-8 lg:px-20 pb-10`}>
      <div className={`py-6 text-wwr_white text-xl font-light`}>
        {lang === 'en' ? 'Related Events' : 'Ähnliche Ereignisse'}
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
        {relatedEvents.map((relatedEvent, index) => {
          const mediaUrl = allMedia.find(
            (media) => media.id === relatedEvent.featured_media
          )?.source_url;

          return (
            <div key={index}>
              <TimelineCardInternal
                timeLineEvent={relatedEvent}
                mediaUrl={mediaUrl}
                link={`${createLocalLink(modifiedBaseLink)}${
                  relatedEvent.slug
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedEvents;
