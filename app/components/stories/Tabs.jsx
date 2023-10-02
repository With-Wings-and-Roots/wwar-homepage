"use client";
import React from "react";
import { useSelector } from "react-redux";

import SingleTabButton from "./SingleTabButton";
import tabData from "../../data/Stories/tabData.json";

const Tabs = ({ allStoriesLength }) => {
  const selectedStory = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  return (
    <div className="flex flex-wrap gap-0.5">
      {tabData.map((singleTabData, i) => (
        <React.Fragment key={i}>
          <SingleTabButton buttonText={singleTabData.toString()} />
        </React.Fragment>
      ))}
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
