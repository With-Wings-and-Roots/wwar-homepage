import {
  fetchAllTopics,
  getAllStories,
  getAllMedia,
  getAllPersons,
} from "@/app/utilities/stories";
import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import Header from "@/app/components/header/header";

const StoriesPageWrapper = async (props) => {
  const language = props.lang || "en";

  const stories = await getAllStories(language);

  const allMedia = await getAllMedia(language);

  const allPersons = await getAllPersons();

  const topics = await fetchAllTopics(language);

  return (
    <>
      <Header />
      <div className="global_width">
        <StoriesPageContainer
          stories={stories}
          allMedia={allMedia}
          allPersons={allPersons}
          topics={topics}
          lang={language}
        />
      </div>
    </>
  );
};

export default StoriesPageWrapper;
