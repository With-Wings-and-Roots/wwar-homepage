import React from "react";

import StoryCardContainer from "./StoryCardContainer";

const StoryCards = ({ stories, lang }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {stories?.map((story, index) => {
        return (
          <React.Fragment key={index}>
            <StoryCardContainer
              title={story.title.rendered}
              slug={story.slug}
              city={story.acf?.city}
              lang={lang}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StoryCards;
