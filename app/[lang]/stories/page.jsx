import StoriesPageWrapper from "@/app/components/stories/StoriesPageWrapper";
import {
  fetchAllTopics,
  getAllStories,
  getAllMedia,
  getAllPersons,
} from "@/app/utilities/stories";

const Stories = async ({ params }) => {
  const language = params.lang;
  const [stories, allMedia, allPersons, topics] = await Promise.all([
    getAllStories(language),
    getAllMedia(language),
    getAllPersons(),
    fetchAllTopics(language),
  ]);

  return (
    <StoriesPageWrapper
      lang={language.toLowerCase()}
      stories={stories}
      allMedia={allMedia}
      allPersons={allPersons}
      topics={topics}
    />
  );
};

export default Stories;

export function generateStaticParams() {
  return [
    {
      lang: "en",
    },
    { lang: "de" },
  ];
}
