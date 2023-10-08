import Tabs from "./Tabs";
import StoryCards from "./storyCards/StoryCards";
import { getAllStories } from "../../utilities/stories";

const StoriesPageContainer = async ({ lang }) => {
  const stories = await getAllStories();
  const allStoriesLength = stories.length;

  return (
    <div className="w-4/5 m-auto">
      <>
        <Tabs
          numberOfTopicStories={allStoriesLength}
          selectedTopic={"all"}
          lang={lang}
        />
        <StoryCards stories={stories} lang={lang} />
      </>
    </div>
  );
};

export default StoriesPageContainer;
