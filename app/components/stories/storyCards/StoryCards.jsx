import React from "react";

import StoryCardContainer from "./StoryCardContainer";

const StoryCards = ({ stories }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {stories?.map((story, index) => {
        console.log(story);
        return (
          <React.Fragment key={index}>
            <StoryCardContainer
              title={story.title.rendered}
              slug={story.slug}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StoryCards;
