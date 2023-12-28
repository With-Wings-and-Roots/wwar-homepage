"use client";

import React from "react";

import StoryCard from "./StoryCard";

const StoryCardContainer = ({
  storiesToRender,
  allMedia,
  allPersons,
  lang,
  hoverZoom = true,
}) => {
  return (
    <>
      {storiesToRender &&
        storiesToRender.map((story, index) => {
          const mediaUrl = allMedia.find(
            (media) => media.id === story.featured_media
          )?.source_url;

          const person = allPersons.find(
            (person) => person.id === story.acf.person
          );

          return (
            <React.Fragment key={index}>
              <StoryCard
                title={story.title?.rendered}
                mediaUrl={mediaUrl}
                city={story.acf?.city}
                slug={story.slug}
                lang={lang}
                color={story.acf?.color}
                personName={person?.name}
                hoverZoom={hoverZoom}
              />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default StoryCardContainer;
