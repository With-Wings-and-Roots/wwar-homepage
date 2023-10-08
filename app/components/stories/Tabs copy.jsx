"use client";
import React from "react";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { fetchAllTopics } from "@/app/utilities/stories";

import SingleTabButton from "./SingleTabButton";
// import tabData from "../../data/Stories/tabData.json";

const Tabs = async ({ allStoriesLength }) => {
  const selectedStory = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  const tabData = await fetchAllTopics();

  return (
    <div className="flex flex-wrap gap-0.5">
      <SingleTabButton buttonText={"Featured"} slug={"featured"} />
      {tabData.map((singleTabData, i) => (
        <React.Fragment key={i}>
          <SingleTabButton
            buttonText={parse(singleTabData.name)}
            slug={singleTabData.slug}
          />
        </React.Fragment>
      ))}
      <SingleTabButton buttonText={"All Stories"} slug={"all"} />
      <div className="text-xl text-wwr_yellow_orange flex items-center p-2">
        Stories:{" "}
        {selectedStory.localeCompare("All Stories") === 0
          ? allStoriesLength
          : ""}
      </div>
    </div>
  );
};

export default Tabs;
