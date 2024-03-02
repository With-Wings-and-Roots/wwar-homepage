import WysiwygContent from '@/components/common/WysiwygContent';
import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import { getAllPosts } from '@/utilities/posts';
import { Fragment } from 'react';
import EventsList from '@/components/publicEvents/EventsList';

const EventsTemplate = async ({ data, params }) => {
  const events = await getAllPosts(params.lang, 'publicevent');
  const upcomingEvents = [...events]
    .filter((e) => new Date(e.acf?.date_sorting) > new Date())
    ?.sort(
      (a, b) => new Date(a.acf?.date_sorting) - new Date(b.acf?.date_sorting)
    );
  const pastEvents = [...events]
    .filter((e) => new Date(e.acf?.date_sorting) < new Date())
    ?.sort(
      (a, b) => new Date(b.acf?.date_sorting) - new Date(a.acf?.date_sorting)
    );

  return (
    <div className='px-8 md:px-16 xl:px-48 mb-16 relative'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        className='text-center text-3xl md:text-6xl font-light mt-8'
        dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
      />
      {pastEvents?.length > 0 && (
        <div className='text-center text-lg font-light'>
          <a
            href='#upcoming'
            className='hover:text-wwr_yellow_orange_hovered transition-all'
          >
            {data.acf?.label_upcoming}
          </a>
          {' | '}
          <a
            href='#past'
            className='hover:text-wwr_yellow_orange_hovered transition-all'
          >
            {data.acf?.label_past}
          </a>
        </div>
      )}
      <div className='mt-16'>
        <div id='upcoming'>
          <h3 className='text-xl md:text-3xl font-medium'>
            {data.acf?.label_upcoming}
          </h3>
          {upcomingEvents?.length > 0 ? (
            <div>
              <EventsList events={upcomingEvents} />
            </div>
          ) : (
            <div className='md:text-xl font-light my-8'>
              {data.acf?.no_upcoming_events_text}
            </div>
          )}
        </div>
      </div>
      {pastEvents?.length > 0 && (
        <div className='mt-16'>
          <div id='past'>
            <h3 className='text-xl md:text-3xl font-medium'>
              {data.acf?.label_past}
            </h3>
            <div>
              <EventsList events={pastEvents} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTemplate;
