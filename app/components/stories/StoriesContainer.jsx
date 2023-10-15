"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import { storiesCounted, storySelected } from "@/app/store/selectedStory";

import { activatedStories } from "@/app/store/stories";

import StoryCard from "./StoryCard";

const StoriesContainer = () => {
  const dispatch = useDispatch();

  // useSelectors
  const language = useSelector((state) => state.entities.language.language);
  const allStories = useSelector((state) => state.entities.stories.allStories);
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const selectedTopicId = useSelector(
    (state) => state.entities.selectedStory.selectedStoryId
  );
  const allMedia = useSelector((state) => state.entities.media.allMedia);
  const allPersons = useSelector((state) => state.entities.persons.allPersons);
  const storiesToRender = useSelector(
    (state) => state.entities.stories.activeStories
  );

  useEffect(() => {
    if (selectedTopic === "all") {
      dispatch(activatedStories({ stories: allStories }));
    }

    if (selectedTopic !== "all" && selectedTopic !== "featured") {
      dispatch(
        activatedStories({
          stories: allStories.filter((story) =>
            story.story_topic.includes(selectedTopicId)
          ),
        })
      );
    }
    if (selectedTopic === "featured") {
      dispatch(
        activatedStories({
          stories: allStories.filter(
            (story) => story.acf.featured_story === true
          ),
        })
      );
    }
  }, [selectedTopic, dispatch]);

  const handleInput = (e) => {
    dispatch(
      storySelected({
        selection: "all",
        id: null,
      })
    );
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.length > 0) {
      dispatch(
        activatedStories({
          stories: allStories.filter((story) =>
            story.title.rendered.toLowerCase().includes(searchValue)
          ),
        })
      );
    } else {
      dispatch(activatedStories({ stories: allStories }));
    }
  };

  useEffect(() => {
    dispatch(storiesCounted({ count: storiesToRender.length }));
  }, [dispatch, storiesToRender]);

  return (
    <div>
      <div className="flex flex-nowrap items-center h-10 border-2 border-wwr_rich_black max-w-max mb-8">
        <input
          className="my-4 p-1  h-full border-0 focus:outline-none"
          placeholder="Search all stories"
          type="text"
          onChange={handleInput}
        />
        <div className="text-2xl text-wwr_white cursor-pointer h-full bg-wwr_rich_black px-2  flex items-center p-0">
          <BsSearch />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {storiesToRender &&
          storiesToRender.map((story, index) => {
            const mediaUrl = allMedia.filter(
              (media) => media.id === story.featured_media
            )[0]?.source_url;

            const person = allPersons.filter(
              (person) => person.id === story.acf.person
            )[0];

            return (
              <React.Fragment key={index}>
                <div className="relative hover:scale-105 aspect-square cursor-pointer transition-all duration-500 w-full p-4 font-light text-wwr_white overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full min-w-full flex justify-start w-[136%]`}
                  >
                    <Image
                      className="min-w-full min-h-full -ml-[18%]"
                      src={mediaUrl}
                      width={1024}
                      height={768}
                      alt={"Cover-" + story.slug}
                      placeholder="blur"
                      blurDataURL="/colors.png"
                      quality={100}
                    ></Image>
                  </div>
                  <div
                    className="absolute left-0 top-0 w-full h-full opacity-40"
                    style={{
                      background: `linear-gradient(to bottom, transparent 0%, ${story.acf?.color} 100%)`,
                    }}
                  ></div>

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
