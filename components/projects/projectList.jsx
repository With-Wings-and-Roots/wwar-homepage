'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';

const ProjectList = ({ project }) => {
  const title = project?.title?.rendered ?? '';
  const tagline = project?.acf?.tagline ?? '';
  const link = project?.link;
  const banner = project?.bannerMedia;
  const projectType = project?.acf?.project_type;
  const geography = project?.acf?.geography;
  const years = project?.acf?.years;
  const tags = project?.acf?.tags;

  return (
    <Link
      href={createLocalLink(link)}
      className='group block bg-wwr_yellow_orange flex flex-col md:flex-row overflow-hidden cursor-pointer no-underline'
    >
      {/* Image */}
      {banner && (
        <div className='relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden'>
          <Image
            src={banner?.source_url}
            alt={banner?.alt_text || 'Project Banner'}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}

      {/* Content */}
      <div className='flex flex-col justify-between p-6 md:p-8 border border-black/10 flex-grow bg-wwr_yellow_orange md:w-2/3'>
        <div>
          <h3
            className='text-2xl md:text-3xl font-light leading-snug'
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Meta */}
          {(projectType || geography || years) && (
            <p className='text-sm font-light mt-2 opacity-80'>
              {[projectType?.join(' / '), geography?.join(' / '), years]
                .filter(Boolean)
                .join(' | ')}
            </p>
          )}

          {/* Tagline */}
          {tagline && <p className='text-base font-light mt-4'>{tagline}</p>}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className='text-sm font-light mt-3 opacity-70'>
              {tags.join(' · ')}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className='mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black group-hover:text-white transition-colors'>
          Learn more
          <span className='block h-px w-6 bg-current' />
        </div>
      </div>
    </Link>
  );
};

export default ProjectList;
