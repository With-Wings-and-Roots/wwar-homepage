'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUmbrella } from '@/store/umbrella';
import gfx_bg_blue from '@/public/bg_blue.png';
import Image from 'next/image';

const UmbrellaCards = ({ lang }) => {
  const dispatch = useDispatch();

  const allUmbrellas = useSelector(
    (state) => state.entities.umbrella?.allUmbrellas
  );
  const activeUmbrella = useSelector(
    (state) => state.entities.umbrella?.activeUmbrella
  );

  const handleClick = (umbrella) => {
    dispatch(setActiveUmbrella(umbrella));

    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  if (!allUmbrellas?.length) return null;

  return (
    <div
      className='px-8 md:px-16 xl:px-48 relative bg-black text-white py-20'
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
      id='theme-explorer'
    >
      <Image
        src={gfx_bg_blue}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-50'
      />

      <h2 className='text-2xl md:text-3xl font-light mb-6'>Explore by Theme</h2>

      {/* Table of contents list */}
      <ul className='flex flex-col divide-y divide-white/20'>
        {allUmbrellas.map((umbrella, i) => {
          const isActive = activeUmbrella === umbrella;

          return (
            <li
              key={i}
              role='button'
              tabIndex={0}
              onClick={() => handleClick(umbrella)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(umbrella)}
              className={`
                cursor-pointer
                px-2 md:px-4
                py-3 md:py-4
                transition-all duration-200
                text-base md:text-lg font-light
                focus:outline-none focus:ring-2 focus:ring-wwr_yellow_orange
                ${
                  isActive
                    ? 'text-wwr_yellow_orange bg-wwr_rich_black'
                    : 'text-white hover:bg-white/10 hover:text-wwr_yellow_orange'
                }
              `}
            >
              {i + 1} : {umbrella}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UmbrellaCards;
