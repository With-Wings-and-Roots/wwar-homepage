import WysiwygContent from '@/components/common/WysiwygContent';
import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import { getAllPosts } from '@/utilities/posts';
import { Fragment } from 'react';

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

  const renderEvents = (events) => (
    <div className='grid grid-cols-12 gap-8 my-8'>
      {events.map((event, eI) => (
        <Fragment key={eI}>
          <div className='col-span-12 md:col-span-4 xl:col-span-3'>
            {event.acf?.image?.length > 0 && (
              <Image
                src={event.acf?.image}
                alt={event.title?.rendered}
                width={600}
                height={600}
                className='aspect-square object-cover'
              />
            )}
          </div>
          <div className='col-span-12 md:col-span-8 xl:col-span-9'>
            <h2 className='text-2xl font-medium'>{event.title?.rendered}</h2>
            {event.acf?.date_string?.length > 0 && (
              <div className='mt-2 text-lg font-medium'>
                {event.acf?.date_string}
              </div>
            )}
            {event.acf?.location?.length > 0 && (
              <div className='-mt-1 text-lg font-medium'>
                {event.acf?.location}
              </div>
            )}
            {event.acf?.text?.length > 0 && (
              <WysiwygContent content={event.acf?.text} className='mt-2' />
            )}
            {event.acf?.external_links?.length > 0 && (
              <div className='flex mt-3 gap-x-3'>
                {event.acf?.external_links?.map((link, lI) => (
                  <a
                    key={lI}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className='px-8 md:px-16 lg:px-64 mb-16 relative'>
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
            <div>{renderEvents(upcomingEvents)}</div>
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
            <div>{renderEvents(pastEvents)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTemplate;
