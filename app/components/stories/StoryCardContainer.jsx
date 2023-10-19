"use client";

import React from "react";

import StoryCard from "./StoryCard";

const StoryCardContainer = ({
  storiesToRender,
  allMedia,
  allPersons,
  lang,
}) => {
  return (
    <>
      {storiesToRender.map((story, index) => {
        const mediaUrl = allMedia.filter(
          (media) => media.id === story.featured_media
        )[0]?.source_url;

        const person = allPersons.filter(
          (person) => person.id === story.acf.person
        )[0];

        return (
          <React.Fragment key={index}>
            <StoryCard
              title={story.title.rendered}
              mediaUrl={mediaUrl}
              city={story.acf?.city}
              slug={story.slug}
              lang={lang}
              color={story.acf?.color}
              personName={person?.name}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default StoryCardContainer;
