'use client';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storiesAdded, activatedStories } from '@/store/stories';
import { mediaAdded } from '@/store/media';
import { personsAdded } from '@/store/persons';
import { topicsAdded } from '@/store/topics';
import StoriesContainer from './StoriesContainer';
import CurriculumPathways from './CurriculumPathways';
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';
import CollectionsDropdown from './CollectionsDropdown';
import { collectionsAdded } from '@/store/collections';
import TabsDropdown from './Tabs';
import { curriculumAdded } from '@/store/curriculam';
import { citiesAdded } from '@/store/cities';

const StoriesPageContainer = ({
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  baseLink,
  lang,
  ctaData,
  materialCtaData,
  curriculumData,
  pathways,
  cities,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storiesAdded({ stories }));
    dispatch(activatedStories({ stories }));
  }, [stories, dispatch]);

  useEffect(() => {
    dispatch(mediaAdded({ allMedia }));
  }, [allMedia, dispatch]);

  useEffect(() => {
    dispatch(personsAdded({ allPersons }));
  }, [allPersons, dispatch]);

  useEffect(() => {
    dispatch(topicsAdded({ topics }));
  }, [topics, dispatch]);
  useEffect(() => {
    dispatch(collectionsAdded({ collections }));
  }, [collections, dispatch]);
  useEffect(() => {
    dispatch(curriculumAdded({ pathways }));
  }, [pathways, dispatch]);
  useEffect(() => {
    dispatch(citiesAdded({ cities }));
  }, [cities, dispatch]);
  return (
    <>
      <CurriculumPathways
        lang={lang}
        pathways={pathways}
        curriculumData={curriculumData}
      />

      {/* CTA Button */}
      <div className='flex flex-wrap gap-6 '>
        {materialCtaData?.url && (
          <Link
            href={createLocalLink(materialCtaData.url)}
            className='
              px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all
              bg-wwr_yellow_orange text-black hover:text-white
            '
          >
            {materialCtaData?.title}
          </Link>
        )}
      </div>
      <div className='flex flex-wrap gap-6 mt-10'>
        <Link
          key={ctaData?.cta?.title || 'cta'}
          href={createLocalLink(ctaData?.url)}
          className={`
                  px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all
                  bg-wwr_yellow_orange text-black hover:text-white
                `}
        >
          {ctaData?.title}
        </Link>
      </div>
      <CollectionsDropdown lang={lang} />

      {/* ✅ Stories grid / Archive */}
      <StoriesContainer baseLink={baseLink} lang={lang} />
    </>
  );
};

export default StoriesPageContainer;
