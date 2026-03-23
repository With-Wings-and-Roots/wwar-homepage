'use client';

import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import { resolvePrimaryUmbrella } from '@/utilities/umbrella';
import { resolvePrimaryCurriculum } from '@/utilities/curriculam';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import Image from 'next/image';

const StoriesTemplate = ({
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  params,
  data,
  subSlugs,
  baseLink,
  timeLineEventsDe,
  timeLineEventsEn,
}) => {
  const allEvents = [...(timeLineEventsDe || []), ...(timeLineEventsEn || [])];

  const topicIdMap = {};
  (topics || []).forEach((t) => {
    topicIdMap[t.id] = t.name;
  });

  const storiesWithUmbrella = (stories || []).map((story) => {
    const storyTopics = (story.acf?.topics || []).map((id) => ({
      name: topicIdMap[id],
    }));
    const theme = story.acf?.theme;
    return {
      ...story,
      primary_umbrella_dimension: resolvePrimaryUmbrella(storyTopics, theme),
    };
  });
  const cities = (stories || [])
    .map((story) => story.acf?.city) // extract city from each story
    .filter(Boolean) // remove undefined/null
    .filter((city, index, self) => self.indexOf(city) === index); // remove duplicates
  const ctaData = data?.acf?.intro.cta_storyteller || [];

  return (
    <div>
      <div className='px-8 md:px-16 xl:px-48 py-16 lg:pt-24 relative bg-wwr_offwhite'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <WysiwygContent
          content={data.acf?.intro?.video}
          className='video mt-12'
        />
        <div className=' mt-12'>
          <div className=''>
            <h2 className='text-2xl lg:text-4xl font-thin'>
              {data.acf?.intro?.title}
            </h2>
            <WysiwygContent
              content={data.acf?.intro?.text}
              className='font-light md:text-lg mt-6'
            />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      {data.acf?.intro?.have_a_story_cta && (
        <div className='px-8 md:px-16 xl:px-48 relative bg-wwr_light text-black py-20'>
          <p className='font-light md:text-lg mt-6'>
            {data.acf?.intro?.have_a_story_cta?.title}
          </p>
          <Link
            key={data.acf?.intro?.have_a_story_cta?.url || 'cta_url'}
            href={createLocalLink(data.acf?.intro?.have_a_story_cta?.url)}
            className='inline-block
      self-start
      mt-8
      px-6 py-3
      uppercase text-sm md:text-lg tracking-wide
      transition-all
      bg-wwr_yellow_orange text-black
      hover:text-white
      rounded-lg
    '
            target='_blank'
          >
            {params?.lang === 'en'
              ? 'Share Your Story'
              : 'Teile deine Geschichte'}
          </Link>
        </div>
      )}
      <div className='px-8 md:px-16 xl:px-48 bg-wwr_offwhite text-black py-20'>
        <div className='flex flex-col lg:flex-row items-start gap-12'>
          {/* Text + CTA */}
          <div className='lg:w-1/2 '>
            <h2 className='text-2xl md:text-3xl font-light mb-8'>
              {params?.lang === 'en'
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

      {subSlugs?.length > 0 &&
        !!stories?.find((s) => s.slug === subSlugs[0]) && (
          <PageComponent
            lang={params.lang}
            paramsStory={subSlugs[0]}
            stories={storiesWithCurriculum}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={baseLink}
            allEvents={allEvents}
          />
        )}
      <StoriesPageWrapper
        lang={params.lang}
        curriculumData={data.acf?.curriculum_pathways || []}
        materialCtaData={data.acf?.education_material_link || []}
        stories={storiesWithUmbrella}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        collections={collections}
        baseLink={baseLink}
        cities={cities}
        exploreArchiveText={data.acf?.explore_archive_text}
      />
      <div className='flex justify-center gap-6 m-10'>
        <Link
          key={ctaData?.cta?.title || 'cta'}
          href={createLocalLink(ctaData?.url)}
          className='
      self-start
      px-6 py-3
      uppercase text-sm md:text-lg tracking-wide
      transition-all
      bg-wwr_yellow_orange text-black
      hover:text-white
      rounded-lg
    '
        >
          {ctaData?.title}
        </Link>
      </div>
    </div>
  );
};

export default StoriesTemplate;
