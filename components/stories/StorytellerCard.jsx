'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';

const StorytellerCard = ({
  person,
  mediaUrl,
  countStories = 0,
  lang = 'en',
}) => {
  const name = person?.name ?? '';
  const city = person?.city ?? '';
  const slug = person?.slug ?? '';
  const description = person?.description;
  const ctaText = lang === 'en' ? 'View Stories' : 'Erzähler ansehen';

  const href = createLocalLink(
    lang === 'en'
      ? `/${lang}/storytellers/${slug}`
      : `/${lang}/erzaehler/${slug}`
  );

  return (
    <div className='group bg-wwr_yellow_orange flex flex-col h-full overflow-hidden'>
      {/* Image */}
      {mediaUrl && (
        <div className='relative aspect-[4/3] overflow-hidden'>
          <Image
            src={mediaUrl}
            alt={name}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}

      {/* Content */}
      <div className='flex flex-col justify-between p-6 border border-black/10 flex-grow bg-wwr_yellow_orange'>
        <div className='flex flex-col gap-2'>
          {/* Name + City */}
          <div className='flex items-center justify-between'>
            <h3 className='text-xl md:text-2xl font-light leading-snug'>
              {name}
            </h3>
            {city && (
              <span className='flex items-center text-sm md:text-base font-light text-black/70 gap-1'>
                {/* Location marker */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 md:h-5 md:w-5 text-black/50'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z' />
                </svg>
                {city}
              </span>
            )}
          </div>
          {description && (
            <p className='text-sm md:text-base font-light text-black/80 line-clamp-2'>
              {description}
            </p>
          )}

          {/* Number of stories */}
          {countStories > 0 && (
            <p className='text-sm md:text-base font-light text-black/80'>
              {lang === 'en'
                ? `${countStories} stor${countStories > 1 ? 'ies' : 'y'}`
                : `${countStories} Geschichte${countStories > 1 ? 'n' : ''}`}
            </p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={href}
          className='mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black hover:text-white transition-colors'
        >
          {ctaText}
          <span className='block h-px w-6 bg-current' />
        </Link>
      </div>
    </div>
  );
};

export default StorytellerCard;
