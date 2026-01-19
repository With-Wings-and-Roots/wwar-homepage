import Link from 'next/link';
import Image from 'next/image';
import { getPostById } from '@/utilities/posts';
import EventsList from './EventsList';

const RelatedEvents = async ({ relatedEventIds, lang = 'en', person }) => {
  if (!relatedEventIds?.length) return null;

  const events = await Promise.all(
    relatedEventIds.map((id) => getPostById(id, lang, 'publicevent'))
  );

  return (
    <section className='px-8 md:px-16 xl:px-48 py-10 text-black'>
      <h2 className='text-3xl md:text-5xl font-light mb-8'>
        {lang === 'en' ? 'More from ' : 'Mehr von '}
        {person}
      </h2>
      <div>
        <EventsList events={events} />
      </div>
    </section>
  );
};

export default RelatedEvents;
