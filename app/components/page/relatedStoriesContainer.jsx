import React from "react";
import StoryCardContainer from "../stories/StoryCardContainer";

const RelatedStoriesContainer = ({
  relatedStories,
  lang,
  allMedia,
  allPersons,
  hoverZoom,
}) => {
  return (
    <div>
      <h3 className="mb-8 mt-16 text-xl font-light">
        {lang === "de" ? "Ähnliche Beiträge" : "Related Stories"}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <StoryCardContainer
          storiesToRender={relatedStories}
          lang={lang}
          allMedia={allMedia}
          allPersons={allPersons}
          hoverZoom={hoverZoom}
        />
      </div>
    </div>
  );
};

export default RelatedStoriesContainer;
