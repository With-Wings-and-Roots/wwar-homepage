import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import Header from "@/app/components/header/header";

const StoriesPageWrapper = async ({
  lang,
  stories,
  allMedia,
  allPersons,
  topics,
}) => {
  const language = lang || "en";

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
