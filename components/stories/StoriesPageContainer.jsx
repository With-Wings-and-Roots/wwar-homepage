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

const StoriesPageContainer = ({
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  baseLink,
  lang,
  ctaData,
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
  return (
    <>
      {/* ✅ Umbrella cards section */}
      <CurriculumPathways lang={lang} />
      <CollectionsDropdown lang={lang} />
      {/* ✅ Topic tabs section */}
      {/* <Tabs lang={lang} /> */}
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

      {/* ✅ Stories grid / Archive */}
      <StoriesContainer baseLink={baseLink} lang={lang} />
    </>
  );
};

export default StoriesPageContainer;
