import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';
import {
  fetchAllTopics,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import { fetchTimelinesByIds } from '@/utilities/timeline';
import { fetchMediaByIds } from '@/utilities/media';

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
        stories={stories}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        baseLink={`/${params.lang}/${params.slug}/`}
      />
    </div>
  );
};

export default StoriesTemplate;
