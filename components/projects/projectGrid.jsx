'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';

const ProjectGrid = ({ project }) => {
  const title = project?.title?.rendered ?? '';
  const excerpt = project?.acf?.tagline ?? '';
  const link = project?.link;
  const banner = project?.bannerMedia; // Use pre-fetched media

  return (
    <div className='group bg-wwr_yellow_orange flex flex-col h-full overflow-hidden'>
      {/* Image */}
      {banner && (
        <div className='relative aspect-[4/3] overflow-hidden'>
          <Image
            src={banner?.source_url}
            alt={banner?.alt_text || 'Project Banner'}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}

      {/* Content */}
      <div className='flex flex-col justify-between p-6 border border-black/10 flex-grow bg-wwr_yellow_orange'>
        <div>
          {/* Title */}
          <h3
            className='text-xl md:text-2xl font-light leading-snug'
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Excerpt */}
          {excerpt && (
            <p className='text-sm md:text-base font-light mt-3'>{excerpt}</p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={createLocalLink(link)}
          className='mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black hover:text-white transition-colors'
        >
          Learn more
          <span className='block h-px w-6 bg-current' />
        </Link>
      </div>
    </div>
  );
};

export default ProjectGrid;
