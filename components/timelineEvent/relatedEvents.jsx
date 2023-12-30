import { getAllMedia } from '@/utilities/stories';
import React from 'react';
import TimeLineCard from '@/components/timelines/timelineCard';
import TimelineCardInternal from '@/components/timelines/timelineCardInternal';

const RelatedEvents = async ({relatedEvents})=>{

  const allMedia = await getAllMedia('en')


  return<div className={`w-full bg-wwr_yellow_orange px-4 md:px-8 lg:px-20 pb-10`}>
    <div className={`py-6 text-wwr_white text-xl font-light`}>Related Events</div>
  <div className={`grid grid-cols-4 gap-2`}>
    {relatedEvents.map((relatedEvent, index) => {
      const mediaUrl = allMedia.find(
        (media) => media.id === relatedEvent.featured_media
      )?.source_url;

      return (
        <div key={index}>
          <TimelineCardInternal timeLineEvent={relatedEvent} mediaUrl={mediaUrl} link={`./${relatedEvent.slug}`}/>

        </div>
      );
    })}
  </div>

  </div>
}

export default  RelatedEvents;