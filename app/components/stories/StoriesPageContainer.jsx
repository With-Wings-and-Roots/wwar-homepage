import StoriesList from "../stories/StoriesList";
import { getAllStories } from "../../utilities/stories";

const StoriesPageContainer = async () => {
  const stories = await getAllStories();

  return (
    <>
      <StoriesList stories={stories} />
    </>
  );
};

export default StoriesPageContainer;
