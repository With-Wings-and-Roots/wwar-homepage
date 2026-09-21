import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import WysiwygContent from '@/components/common/WysiwygContent';
import { resolvePrimaryUmbrella } from '@/utilities/umbrella';

import {
  fetchAllTopics,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import { fetchTimelinesByIds } from '@/utilities/timeline';
import { fetchMediaByIds } from '@/utilities/media';
import { fetchAllCollections } from '@/utilities/collections';

const StoriesTemplate = async ({ params, data }) => {
  const currentSlug = params.deepSlug;
  const [stories, allPersons, topics] = await Promise.all([
    getAllStories(params.lang),
    getAllPersons(),
    fetchAllTopics(params.lang),
  ]);
  const relatedEventsIds = [
    ...new Set(
      stories.flatMap((e) => e?.acf?.related_events || []).filter(Boolean)
    ),
  ];
  const allRelatedEvents = await fetchTimelinesByIds(
    relatedEventsIds,
    params.lang
  );
  const mediaIds = [
    ...new Set([
      ...stories.map((e) => e?.featured_media).filter(Boolean),

      ...allRelatedEvents.map((s) => s?.featured_media).filter(Boolean),
    ]),
  ];
  const allMedia = await fetchMediaByIds(mediaIds, params.lang);
  
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
  // console.table(
  //   (stories || []).map((story) => ({
  //     title: story.title?.rendered,
  //     theme: story.acf?.theme,
  //     lang: params?.lang,
  //   }))
  // );
  const cities = (stories || [])
    .map((story) => story.acf?.city) // extract city from each story
    .filter(Boolean) // remove undefined/null
    .filter((city, index, self) => self.indexOf(city) === index); // remove duplicates
  const ctaData = data?.acf?.intro.cta_storyteller || [];

  const collections = await fetchAllCollections( params.lang);
  return (
    <div>
      <div className='px-8 md:px-16 xl:px-48 py-16 lg:pt-24 relative'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <div className='grid grid-cols-5 mt-12 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <WysiwygContent
              content={data.acf?.intro?.video}
              className='video'
            />
          </div>
          <div className='col-span-5 xl:col-span-2'>
            <h2 className='text-2xl lg:text-4xl font-thin'>
              {data.acf?.intro?.title}
            </h2>
            <WysiwygContent
              content={data.acf?.intro?.text}
              className='font-light md:text-lg mt-4'
            />
          </div>
        </div>
      </div>
      {currentSlug && !!stories?.find((s) => s.slug == currentSlug) && (
        <PageComponent
          lang={params.lang}
          paramsStory={currentSlug}
          stories={stories}
          topics={topics}
          allMedia={allMedia}
          allPersons={allPersons}
          baseLink={`/${params.lang}/${params.slug}/`}
          closeLink={`/${params.lang}/${params.slug}/`}
          allEvents={allRelatedEvents}
        />
      )}
       <StoriesPageWrapper
        lang={params.lang}
        data={data}
        curriculumData={data.acf?.curriculum_pathways || []}
        materialCtaData={data.acf?.education_material_link || []}
        stories={storiesWithUmbrella}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        collections={collections}
          baseLink={`/${params.lang}/${params.slug}/`}
        cities={cities}
        exploreArchiveText={data.acf?.explore_archive_text}
      />
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
    </div>
  );
};

export default StoriesTemplate;
