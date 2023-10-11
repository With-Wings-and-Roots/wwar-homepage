import React from "react";
import StoryCards from "@/app/components/stories/storyCards/StoryCards";
import {
  getAllStories,
  getTopicId,
  getTopicStories,
  fetchAllTopics,
} from "@/app/utilities/stories";
import Tabs from "@/app/components/stories/Tabs";
import Header from "@/app/components/header/header";

const Topic = async ({ params }) => {
  let numberOfTopicStories = 0;
  let topicStories = null;

  if (params.topic === "featured") {
    const allStories = await getAllStories(params.lang);
    topicStories = allStories.filter(
      (topic) => topic.acf?.featured_story === true
    );

    numberOfTopicStories = topicStories.length;
  }

  if (params.topic === "all") {
    topicStories = await getAllStories(params.lang);
    numberOfTopicStories = topicStories.length;
  }

  if (params.topic !== "featured" && params.topic !== "all") {
    const topicId = await getTopicId(params.lang, params.topic);

    topicStories = await getTopicStories(params.lang, topicId);

    numberOfTopicStories = topicStories.length;
  }

  return (
    <>
      <Header />
      <div className="w-4/5 m-auto">
        <Tabs
          lang={params.lang}
          selectedTopic={params.topic}
          numberOfTopicStories={numberOfTopicStories}
        />
        <StoryCards stories={topicStories} lang={params.lang} />
      </div>
    </>
  );
};

export default Topic;

export async function generateStaticParams() {
  const topicsEn = await fetchAllTopics("en");
  const topicsDe = await fetchAllTopics("de");

  const topicsSlugEn = topicsEn.map((topic) => ({
    lang: "en",
    topic: topic.slug,
  }));
  const topicsSlugDe = topicsDe.map((topic) => ({
    lang: "de",
    topic: topic.slug,
  }));

  return [
    ...topicsSlugEn,
    ...topicsSlugDe,
    { lang: "en", topic: "all" },
    { lang: "en", topic: "featured" },
    { lang: "de", topic: "all" },
    { lang: "de", topic: "featured" },
  ];
}
