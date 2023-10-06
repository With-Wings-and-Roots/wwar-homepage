import React from "react";

const Test = ({ stories, slug }) => {
  const story = stories.filter((story) => story.slug === slug);

  return <div></div>;
};

export default Test;
