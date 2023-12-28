import React from "react";
import PageComponent from "@/components/page/storyPageComponent";
import {
  getAllStories,
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
} from "@/utilities/stories";

const Story = async ({ params }) => {
  const { lang, story } = params;
  const [stories, topics, allMedia, allPersons] = await Promise.all([
    getAllStories(lang),
    fetchAllTopics(lang),
    getAllMedia(lang),
    getAllPersons(),
  ]);

  return (
    <PageComponent
      lang={lang.toLowerCase()}
      paramsStory={story}
      stories={stories}
      topics={topics}
      allMedia={allMedia}
      allPersons={allPersons}
    />
  );
};

export default Story;

// export async function generateStaticParams() {
//   const [storiesEn, storiesDe] = await Promise.all([
//     getAllStories("en"),
//     getAllStories("de"),
//   ]);

//   const mapStories = (stories, lang) =>
//     stories.map((story) => ({ lang, story: story.slug }));

//   const enStories = mapStories(storiesEn, "en");
//   const deStories = mapStories(storiesDe, "de");

//   return enStories.concat(deStories);
// }
