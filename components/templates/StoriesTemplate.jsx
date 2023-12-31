import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import {
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';

const StoriesTemplate = async ({ params, data, subSlugs, baseLink }) => {
  const [stories, allMedia, allPersons, topics] = await Promise.all([
    getAllStories(params.lang),
    getAllMedia(params.lang),
    getAllPersons(),
    fetchAllTopics(params.lang),
  ]);

  return (
    <div>
      {subSlugs?.length > 0 &&
        !!stories?.find((s) => s.slug === subSlugs[0]) && (
          <PageComponent
            lang={params.lang}
            paramsStory={subSlugs[0]}
            stories={stories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={baseLink}
          />
        )}
      <StoriesPageWrapper
        lang={params.lang}
        stories={stories}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        baseLink={baseLink}
      />
    </div>
  );
};

export default StoriesTemplate;
