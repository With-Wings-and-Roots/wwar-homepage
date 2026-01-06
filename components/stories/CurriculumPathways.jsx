'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCurriculum } from '@/store/curriculam';
import { CURRICULUM_DESCRIPTIONS } from '@/utilities/curriculam';

const CurriculumPathways = ({ lang }) => {
  const dispatch = useDispatch();

  const allCurriculum = useSelector(
    (state) => state.entities.curriculum?.allCurriculum
  );
  const activeCurriculum = useSelector(
    (state) => state.entities.curriculum?.activeCurriculum
  );

  const handleClick = (curriculum) => {
    dispatch(setActiveCurriculum(curriculum));

    const archive = document.getElementById('archive-browser');
    if (archive) archive.scrollIntoView({ behavior: 'smooth' });
  };

  if (!allCurriculum?.length) return null;

  return (
    <section className='py-16'>
      <h3 className='text-xl md:text-2xl font-light mb-8 text-wwr_rich_black/80'>
        For Educators: Curriculum Pathways
      </h3>

      <div className='flex flex-col divide-y divide-black/10'>
        {allCurriculum.map((curriculum, i) => {
          const isActive = activeCurriculum === curriculum;

          return (
            <div
              key={i}
              onClick={() => handleClick(curriculum)}
              className={`
                cursor-pointer
                px-6 md:px-10
                py-6 md:py-8
                transition-colors duration-300
                ${isActive ? 'bg-black/5' : 'hover:bg-black/5'}
              `}
            >
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6'>
                <div>
                  <div className='text-lg md:text-xl font-light mb-1'>
                    {curriculum}
                  </div>
                  <div className='text-sm md:text-base text-black/60 max-w-3xl'>
                    {CURRICULUM_DESCRIPTIONS[curriculum]}
                  </div>
                </div>

                <div className='text-sm md:text-base text-black/60 whitespace-nowrap'>
                  View stories →
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
