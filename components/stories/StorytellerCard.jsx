'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';

const StorytellerCard = ({ person, mediaUrl, lang = 'en' }) => {
  const name = person?.name ?? '';
  const title = person?.city ?? '';
  const slug = person?.slug ?? '';

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
        <div>
          <h3 className='text-xl md:text-2xl font-light leading-snug'>
            {name}
          </h3>

          {title && (
            <p className='text-sm md:text-base font-light mt-2'>{title}</p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={href}
          className='mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black hover:text-white transition-colors'
        >
          {ctaText}
          <span className='block h-px w-6 bg-current' />
        </Link>
      </div>
    </div>
  );
};

export default StorytellerCard;
