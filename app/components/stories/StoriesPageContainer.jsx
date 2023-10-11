import Tabs from "./Tabs";
import { getAllStories } from "../../utilities/stories";
import StoryCards from "./storyCards/StoryCards";
import Header from "../header/header";

const StoriesPageContainer = async ({ lang }) => {
  const stories = await getAllStories(lang);

  const allStoriesLength = stories.length;

  return (
    <>
      <Header />
      <div className="w-4/5 m-auto">
        <Tabs
          numberOfTopicStories={allStoriesLength}
          selectedTopic={"all"}
          lang={lang}
        />
        {stories.length > 1 && <StoryCards stories={stories} lang={lang} />}
      </div>
    </>
  );
};

export default StoriesPageContainer;
