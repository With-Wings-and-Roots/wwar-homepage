import React from "react";

import StoryCardContainer from "./StoryCardContainer";

const StoryCards = ({ stories, lang }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {stories.map((story, index) => {
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
  );
};

export default StoryCards;
