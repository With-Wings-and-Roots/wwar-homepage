import { Fragment } from 'react';
import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';

const EventsList = ({ events }) => (
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

export default EventsList;
