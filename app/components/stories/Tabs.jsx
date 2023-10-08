import React from "react";
import parse from "html-react-parser";

import { fetchAllTopics } from "@/app/utilities/stories";

import SingleTabButton from "./SingleTabButton";

const Tabs = async ({ selectedTopic, numberOfTopicStories = 0, lang }) => {
  const tabData = await fetchAllTopics();

  return (
    <div className="flex flex-wrap gap-0.5 my-8">
      <SingleTabButton
        buttonText={"Featured"}
        slug={"featured"}
        selectedTopic={selectedTopic}
        lang={lang}
      />
      {tabData.map((singleTabData, i) => (
        <React.Fragment key={i}>
          <SingleTabButton
            buttonText={parse(singleTabData.name)}
            slug={singleTabData.slug}
            selectedTopic={selectedTopic}
            lang={lang}
          />
        </React.Fragment>
      ))}
      <SingleTabButton
        buttonText={"All Stories"}
        slug={"all"}
        selectedTopic={selectedTopic}
        lang={lang}
      />
      <div className="text-xl text-wwr_yellow_orange flex items-center p-2">
        Stories: {numberOfTopicStories}
      </div>
    </div>
  );
};

export default Tabs;
