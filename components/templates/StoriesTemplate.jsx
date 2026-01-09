'use client';

import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import { resolvePrimaryUmbrella } from '@/utilities/umbrella';
import { resolvePrimaryCurriculum } from '@/utilities/curriculam';

const StoriesTemplate = ({
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  pathways,
  params,
  data,
  subSlugs,
  baseLink,
  timeLineEventsDe,
  timeLineEventsEn,
}) => {
  const allEvents = [...(timeLineEventsDe || []), ...(timeLineEventsEn || [])];
  console.log('StoriesTemplate stories count:', pathways);
  // Build a map of topic ID → topic name
  const topicIdMap = {};
  (topics || []).forEach((t) => {
    topicIdMap[t.id] = t.name;
  });

  // Map story topic IDs → objects with name for resolver
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
  const storiesWithCurriculum = (storiesWithUmbrella || stories || []).map(
    (story) => {
      const storyTopics = (story.acf?.topics || []).map((id) => ({
        name: topicIdMap[id],
      }));
      return {
        ...story,
        primary_curriculum_dimension: resolvePrimaryCurriculum(storyTopics),
      };
    }
  );

  return (
    <div>
      <div className='px-8 md:px-16 xl:px-48 py-16 lg:pt-24 relative'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <div className=' mt-12'>
          <div className=''>
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
        stories={storiesWithCurriculum}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        collections={collections}
        baseLink={baseLink}
        ctaData={data.acf?.intro.cta_storyteller || []}
      />
    </div>
  );
};

export default StoriesTemplate;
