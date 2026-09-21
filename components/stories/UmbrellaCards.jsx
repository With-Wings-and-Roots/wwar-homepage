'use client';

import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import gfx_bg_blue from '@/public/bg_blue.png';

import { setActiveUmbrella } from '@/store/umbrella';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';
import { setActiveCurriculum } from '@/store/curriculam';
import { storySelected } from '@/store/selectedStory';

import { getTranslatedUmbrella } from '@/utilities/umbrella';
import SingleCollectionButton from './SingleCollectionButton';

const ThemeExplorer = ({ lang }) => {
  const dispatch = useDispatch();

  const allUmbrellas = useSelector(
    (state) => state.entities.umbrella?.allUmbrellas
  );

  const activeUmbrella = useSelector(
    (state) => state.entities.umbrella?.activeUmbrella
  );

  const allCollections = useSelector(
    (state) => state.entities.collections?.allCollections
  );

  const activeCollection = useSelector(
    (state) => state.entities.collections?.activeCollection
  );

  const handleUmbrellaClick = (umbrella) => {
    dispatch(setActiveUmbrella(umbrella));
    dispatch(setActiveCollection(null));
    dispatch(activatedTopic('all'));
    dispatch(setActiveCurriculum(null));

    dispatch(
      storySelected({
        selection: 'all',
        id: 'all',
      })
    );

    requestAnimationFrame(() => {
      document
        .getElementById('archive-browser')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  };

  if (!allUmbrellas?.length) return null;

  return (
    <section
      id="theme-explorer"
      className="relative px-8 md:px-16 xl:px-48 py-20 bg-wwr_teal text-white"
      style={{
        clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
      }}
    >
      <Image
        src={gfx_bg_blue}
        alt=""
        className="fixed inset-0 w-screen h-screen object-cover -z-10 opacity-50"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: Umbrellas */}
        <div className="lg:col-span-1">

          <h2 className="text-2xl md:text-3xl font-light mb-6">
            {lang === 'en'
              ? 'Explore by Theme'
              : 'Entdecken Sie nach Themen'}
          </h2>

          <ul className="flex flex-col divide-y divide-white/20">
            {allUmbrellas.map((umbrella, i) => {
              const isActive = activeUmbrella === umbrella;

              return (
                <li
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleUmbrellaClick(umbrella)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    handleUmbrellaClick(umbrella)
                  }
                  className={`
                    cursor-pointer
                    px-4 py-4
                    text-base md:text-lg
                    font-light
                    transition-all
                    ${
                      isActive
                        ? 'text-wwr_yellow_orange font-medium bg-white/5'
                        : 'hover:bg-white/10 hover:text-wwr_yellow_orange'
                    }
                  `}
                >
                  {i + 1} : {getTranslatedUmbrella(umbrella, lang)}
                </li>
              );
            })}
          </ul>

        </div>


        {/* RIGHT: Collections */}
        <div className="lg:col-span-2">

          <h2 className="text-2xl md:text-3xl font-light mb-6">
            {lang === 'en'
              ? 'Explore by Collection'
              : 'Nach Sammlung entdecken'}
          </h2>

          <div className="flex flex-wrap gap-3">
            {allCollections?.map((collection, i) => (
              <SingleCollectionButton
                key={i}
                collection={collection}
                isActive={activeCollection === collection}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ThemeExplorer;