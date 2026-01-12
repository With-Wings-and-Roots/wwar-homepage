'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveCollection } from '@/store/collections';
import { setActiveUmbrella } from '@/store/umbrella';
import { storySelected } from '@/store/selectedStory';
import Image from 'next/image';

const CurriculumPathways = ({ lang, pathways, curriculumData }) => {
  const dispatch = useDispatch();

  const activeCurriculum = useSelector(
    (state) => state.entities.curriculum?.activeCurriculum
  );

  const handleClick = (curriculum) => {
    const mappedCurriculum = pathways.find(
      (item) => item.id === curriculum.pathway
    );

    if (mappedCurriculum) dispatch(setActiveCurriculum(mappedCurriculum));
    dispatch(setActiveCollection(''));
    dispatch(setActiveUmbrella(''));
    dispatch(storySelected(''));

    const archive = document.getElementById('archive-browser');
    if (archive) archive.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='py-16'>
      <h3 className='text-2xl md:text-3xl font-light mb-6'>
        {lang === 'en'
          ? 'For Educators: Curriculum Pathways'
          : 'Für Lehrkräfte: Curriculum-Pfade'}
      </h3>

      {/* STACKED ROWS */}
      <div className='flex flex-col gap-6'>
        {curriculumData.map((curriculum, i) => {
          const isActive = activeCurriculum?.id === curriculum.pathway;

          return (
            <div
              key={i}
              onClick={() => handleClick(curriculum)}
              className={`
                group
                cursor-pointer
                flex flex-col md:flex-row
                border rounded-lg overflow-hidden
                transition-all duration-300
                min-h-[160px] md:min-h-[200px]
                ${
                  isActive
                    ? 'bg-wwr_pink'
                    : 'bg-wwr_pink/20 hover:bg-wwr_pink/30'
                }
              `}
            >
              {/* IMAGE — 1/3 */}
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

              {/* CONTENT — 2/3 */}
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

                {/* VIEW STORIES CTA */}
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
                  {lang === 'en' ? 'View stories →' : 'Ver Geschichten →'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CurriculumPathways;
