// components/timelines/TimelineCards.jsx

import { createLocalLink } from '@/utilities/links';
import Card from '../common/Card';

export default function TimelineCountriesSection({
  timelineCountries = [],
  language,
}) {
  if (!timelineCountries.length) return null;
  const link = createLocalLink(`/${language}/timelines/`);

  return (
    <div className='px-20 md:px-16 xl:px-48 relative pb-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {timelineCountries.map((timeline) => (
          <Card
            key={timeline.id}
            title={timeline.name}
            description={timeline.description}
            image={timeline.imageUrl}
            href={createLocalLink(`${link}${timeline.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
