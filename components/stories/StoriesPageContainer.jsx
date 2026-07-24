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
import { collectionsAdded } from '@/store/collections';
import { citiesAdded } from '@/store/cities';
import { storySelected } from '@/store/selectedStory';
import Image from 'next/image';

const StoriesPageContainer = ({
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  baseLink,
  lang,
  materialCtaData,
  curriculumData,
  cities,
  exploreArchiveText,
  data,
}) => {
  const dispatch = useDispatch();
  const ctaData = data?.acf?.intro.cta_storyteller || [];

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
    dispatch(citiesAdded({ cities }));
  }, [cities, dispatch]);
  useEffect(() => {
    dispatch(storySelected({ selection: 'all', id: null }));
  }, [storySelected, dispatch]);

  return (
    <>
      {/* ✅ Stories grid / Archive */}
      <StoriesContainer
        baseLink={baseLink}
        lang={lang}
        exploreArchiveText={exploreArchiveText}
      />
      <div className=' bg-wwr_offwhite text-black py-20'>
        <div className='flex flex-col lg:flex-row items-start gap-12'>
          {/* Text + CTA */}
          <div className='lg:w-1/2 '>
            <h2 className='text-2xl md:text-3xl font-light mb-8'>
              {lang === 'en'
                ? 'Explore by Storytellers'
                : 'Explorar por Narradores'}
            </h2>
            <p className='font-light md:text-lg mt-6'>
              {data.acf?.intro?.storyteller_cta_description}
            </p>
            <Link
              key={ctaData?.title || 'cta'}
              href={createLocalLink(ctaData?.url)}
              className='inline-block rounded-lg mt-8 px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all bg-wwr_yellow_orange text-black hover:text-white'
            >
              {ctaData?.title}
            </Link>
          </div>

          {/* Image */}
          <div className='lg:w-1/2'>
            <Image
              src={data.acf?.intro?.storyteller_image}
              alt='Storyteller'
              width={600}
              height={400}
              className='w-full h-[350px] object-cover rounded'
            />
          </div>
        </div>
      </div>
      <CurriculumPathways
        lang={lang}
        curriculumData={curriculumData}
        baseLink={
          materialCtaData.url ? createLocalLink(materialCtaData.url) : '#'
        }
      />

      {/* CTA Button */}
      <div className='flex flex-wrap gap-6 '>
        {materialCtaData?.url && (
          <Link
            href={createLocalLink(materialCtaData.url)}
            className='
              px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all
              bg-wwr_yellow_orange text-black hover:text-white rounded-lg
            '
          >
            {materialCtaData?.title}
          </Link>
        )}
      </div>
    </>
  );
};

export default StoriesPageContainer;
