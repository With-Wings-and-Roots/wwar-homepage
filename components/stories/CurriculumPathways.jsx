import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import { create } from 'domain';
import { createLocalLink } from '@/utilities/links';

const CurriculumPathways = ({ lang, curriculumData, baseLink }) => {
  return (
    <section className='py-16'>
      <h3 className='text-2xl md:text-3xl font-light mb-6'>
        {lang === 'en'
          ? 'For Educators: Curriculum Pathways'
          : 'Für Lehrkräfte: Curriculum-Pfade'}
      </h3>

      <div className='flex flex-col gap-6'>
        {curriculumData.map((curriculum, i) => {
          return (
            <Link
              key={i}
              href={createLocalLink(curriculum.material_page_link?.url)}
              className='
                group
                cursor-pointer
                flex flex-col md:flex-row
                border rounded-lg overflow-hidden
                transition-all duration-300
                min-h-[160px] md:min-h-[200px]
                bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered
              '
            >
              {/* IMAGE */}
              {curriculum.thumbnail && (
                <div className='relative w-full md:w-1/3'>
                  <Image
                    src={curriculum.thumbnail}
                    alt={curriculum.title}
                    fill
                    className='object-cover'
                    sizes='(min-width: 768px) 33vw, 100vw'
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className='w-full md:w-2/3 p-6 flex flex-col justify-between'>
                <div>
                  <h4 className='text-lg md:text-xl font-light mb-2'>
                    {curriculum.title}
                  </h4>

                  {curriculum.description && (
                    <p className='text-sm md:text-base text-black/60 max-w-3xl'>
                      {curriculum.description}
                    </p>
                  )}
                </div>

                <div
                  className='
                    mt-4
                    inline-flex
                    items-center
                    font-semibold
                    text-wwr_rich_black
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:scale-105
                  '
                >
                  {lang === 'en' ? 'View Materials →' : 'Ver Materialien →'}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CurriculumPathways;
