"use client";
import React from "react";
import parse from "html-react-parser";

import SingleTabButton from "./SingleTabButton";
import { useSelector } from "react-redux";

const Tabs = ({}) => {
  const language = useSelector((state) => state.entities.language.language);

  const allTabData = useSelector((state) => state.entities.topics.allTopics);

  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );

  return (
    <div className="flex flex-wrap gap-0.5 my-8">
      <SingleTabButton
        buttonText={language === "de" ? "Ausgewählte Geschichten" : "Featured"}
        slug={"featured"}
      />
      {allTabData.map((singleTabData, i) => {
        return (
          <React.Fragment key={i}>
            <SingleTabButton
              buttonText={parse(singleTabData.name)}
              slug={singleTabData.slug}
            />
          </React.Fragment>
        );
      })}
      <SingleTabButton
        buttonText={language === "en" ? "All Stories" : "Alle Geschichten"}
        slug={"all"}
      />

      <div className="text-md px-2 py-1 lg:text-xl text-wwr_yellow_orange flex items-center lg:py-2">
        Stories: {storiesCount}
      </div>
    </div>
  );
};

export default Tabs;
