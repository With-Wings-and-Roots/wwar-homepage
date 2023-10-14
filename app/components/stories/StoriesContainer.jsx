"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import { storiesCounted } from "@/app/store/selectedStory";
import { storySelected } from "@/app/store/selectedStory";

import StoryCard from "./StoryCard";

const StoriesContainer = () => {
  const dispatch = useDispatch();
  const [storiesToRender, setStoriesToRender] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const language = useSelector((state) => state.entities.language.language);
  const allStories = useSelector((state) => state.entities.stories.allStories);

  let stories = allStories;

  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  const selectedTopicId = useSelector(
    (state) => state.entities.selectedStory.selectedStoryId
  );

  const allMedia = useSelector((state) => state.entities.media.allMedia);

  const allPersons = useSelector((state) => state.entities.persons.allPersons);

  if (selectedTopic !== "all" && selectedTopic !== "featured") {
    stories = allStories.filter((story) =>
      story.story_topic.includes(selectedTopicId)
    );
  }
  if (selectedTopic === "featured") {
    stories = allStories.filter((story) => story.acf.featured_story === true);
  }

  const handleInput = (e) => {
    setSearchValue(e.target.value.toLowerCase());
    dispatch(
      storySelected({
        selection: "all",
        id: null,
      })
    );
  };

  useEffect(() => {
    if (searchValue.length > 1) {
      setStoriesToRender(
        allStories.filter((story) =>
          story.title.rendered.toLowerCase().includes(searchValue)
        )
      );
    } else {
      setStoriesToRender(stories);
    }

    dispatch(storiesCounted({ count: storiesToRender.length }));
  }, [searchValue, dispatch, stories, allStories, storiesToRender.length]);

  return (
    <div>
      <div className="flex flex-nowrap items-center h-10 border-2 border-wwr_rich_black max-w-max mb-8">
        <input
          className="my-4 p-1  h-full border-0 focus:outline-none"
          placeholder="Search all stories"
          type="text"
          onChange={handleInput}
        />
        <div className="text-2xl text-wwr_white  h-full bg-wwr_rich_black px-2  flex items-center p-0">
          <BsSearch />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {storiesToRender.length > 0 &&
          storiesToRender.map((story, index) => {
            const mediaUrl = allMedia.filter(
              (media) => media.id === story.featured_media
            )[0]?.source_url;

            const person = allPersons.filter(
              (person) => person.id === story.acf.person
            )[0];

            return (
              <React.Fragment key={index}>
                <div className="relative hover:scale-105 cursor-pointer transition-all duration-500 w-full min-h-[170px] lg:min-h-[12vw] p-4 font-light text-wwr_white overflow-hidden">
                  <Image
                    className="absolute left-0 top-0 min-w-full min-h-full"
                    src={mediaUrl}
                    width={200}
                    height={100}
                    alt={"Cover "}
                  ></Image>
                  <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent to-wwr_yellow_orange opacity-30"></div>

                  <StoryCard
                    title={story.title.rendered}
                    mediaURL={mediaUrl}
                    city={story.acf?.city}
                    slug={story.slug}
                    lang={language}
                    color={story.acf?.color}
                    personName={person?.name}
                  />
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default StoriesContainer;
