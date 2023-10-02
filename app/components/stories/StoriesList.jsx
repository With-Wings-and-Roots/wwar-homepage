import StoryCards from "./storyCards/StoryCards";
import Tabs from "./Tabs";

export default function StoriesList({ stories }) {
  const allStoriesLength = stories?.length;

  return (
    <>
      <Tabs allStoriesLength={allStoriesLength} />
      <StoryCards stories={stories} />
    </>
  );
}
