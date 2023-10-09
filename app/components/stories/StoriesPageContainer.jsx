import React from "react";
import Tabs from "./Tabs";
import StoryCardContainer from "./storyCards/StoryCardContainer";
import { getAllStories } from "../../utilities/stories";
import Header from "../header/header";

const StoriesPageContainer = async ({ lang }) => {
  let stories;
  let allStoriesLength = 0;

  stories = await getAllStories(lang);

  allStoriesLength = stories.length;

  return (
    <>
      <Header />
      <div className="w-4/5 m-auto">
        <Tabs
          numberOfTopicStories={allStoriesLength}
          selectedTopic={"all"}
          lang={lang}
        />
        {/* <StoryCards stories={stories} lang={lang} /> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {stories?.map((story, index) => {
            return (
              <React.Fragment key={index}>
                <StoryCardContainer
                  title={story.title.rendered}
                  slug={story.slug}
                  city={story.acf?.city}
                  color={story.acf?.color}
                  personId={story.person[0]}
                  lang={lang}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StoriesPageContainer;
