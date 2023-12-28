import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import {
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';

const StoriesTemplate = async ({ params, data }) => {
  const [stories, allMedia, allPersons, topics] = await Promise.all([
    getAllStories(params.lang),
    getAllMedia(params.lang),
    getAllPersons(),
    fetchAllTopics(params.lang),
  ]);

  return (
    <div>
      <StoriesPageWrapper
        lang={params.lang}
        stories={stories}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
      />
    </div>
  );
};

export default StoriesTemplate;
