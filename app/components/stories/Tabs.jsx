import React from "react";
import parse from "html-react-parser";

import { fetchAllTopics } from "@/app/utilities/stories";

import SingleTabButton from "./SingleTabButton";

const Tabs = async ({ selectedTopic, numberOfTopicStories = 0, lang }) => {
  const tabData = await fetchAllTopics(lang);

  return (
    <div className="flex flex-wrap gap-0.5 my-8">
      <SingleTabButton
        buttonText={lang === "de" ? "Ausgewählte Geschichten" : "Featured"}
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
        buttonText={lang === "en" ? "All Stories" : "Alle Geschichten"}
        slug={"all"}
        selectedTopic={selectedTopic}
        lang={lang}
      />
      <div className="text-md px-2 py-1 lg:text-xl text-wwr_yellow_orange flex items-center lg:py-2">
        Stories: {numberOfTopicStories}
      </div>
    </div>
  );
};

export default Tabs;
