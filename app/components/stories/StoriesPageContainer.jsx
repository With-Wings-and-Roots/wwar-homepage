import React from "react";
import Tabs from "./Tabs";
// import StoryCards from "./storyCards/StoryCards";
import StoryCardContainer from "./storyCards/StoryCardContainer";
// import { getAllStories } from "../../utilities/stories";
import Header from "../header/header";

const StoriesPageContainer = async ({ lang }) => {
  // const stories = await getAllStories(lang);
  // const allStoriesLength = stories.length;
  let stories;
  let allStoriesLength = 0;

  // stories = await getAllStories(lang);

  if (lang === "en") {
    stories = await getStoriesE();
  } else {
    stories = await getStoriesD();
  }
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

async function getStoriesE(offset) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return res.json();
}

async function getStoriesD(offset) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=de&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return res.json();
}

let storiesList = [];
let counter = 0;
let stories = [];

async function getAllStories(lang) {
  counter += 100;

  if (lang === "de") {
    stories = await getStoriesD(counter - 100);
  } else {
    stories = await getStoriesE(counter - 100);
  }

  storiesList = [...storiesList, ...stories];

  if (storiesList.length >= counter) await getAllStories(lang);
  if (storiesList.length < counter) return storiesList;
}
