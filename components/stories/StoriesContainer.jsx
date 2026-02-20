'use client';

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { storiesCounted, storySelected } from '@/store/selectedStory';

import { activatedStories } from '@/store/stories';
import { getTopicIds } from '@/utilities/general';

import StoryCardContainer from './StoryCardContainer';
import Image from 'next/image';

const StoriesContainer = ({ baseLink, lang: language }) => {
  const dispatch = useDispatch();

  // useSelectors
  const allStories = useSelector((state) => state.entities.stories.allStories);
  const allMedia = useSelector((state) => state.entities.media.allMedia);
  const allPersons = useSelector((state) => state.entities.persons.allPersons);
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const selectedTopicId = useSelector(
    (state) => state.entities.selectedStory.selectedStoryId
  );

  const storiesToRender = useSelector(
    (state) => state.entities.stories.activeStories
  );

  useEffect(() => {
    if (selectedTopic === 'all') {
      dispatch(activatedStories({ stories: allStories }));
    }

    if (selectedTopic !== 'all' && selectedTopic !== 'featured') {
      dispatch(
        activatedStories({
          stories: allStories.filter((story) =>
            getTopicIds(story.acf?.topics).includes(selectedTopicId)
          ),
        })
      );
    }
    if (selectedTopic === 'featured') {
      dispatch(
        activatedStories({
          stories: allStories.filter(
            (story) => story.acf.featured_story === true
          ),
        })
      );
    }
  }, [selectedTopic, dispatch, allStories, selectedTopicId]);

  const handleInput = (e) => {
    dispatch(
      storySelected({
        selection: 'all',
        id: null,
      })
    );
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.length > 0) {
      dispatch(
        activatedStories({
          stories: allStories.filter((story) => {
            const person = allPersons.find(
              (person) => person.id === story.acf.person
            );
            return `${story.title.rendered}${person?.name}`
              .toLowerCase()
              .includes(searchValue?.toLowerCase());
          }),
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
    <div className='pb-20'>
      <div className='flex flex-nowrap items-center h-10 border-2 border-wwr_rich_black max-w-max mb-8'>
        <input
          className='my-4 p-1  h-full border-0 focus:outline-none'
          placeholder='Search all stories'
          type='text'
          onChange={handleInput}
        />
        <div className='text-2xl text-wwr_white cursor-pointer h-full bg-wwr_rich_black px-2  flex items-center p-2'>
          <Image src='/search.svg' width={24} height={24} alt='Search icon' />
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {storiesToRender && (
          <StoryCardContainer
            storiesToRender={storiesToRender}
            lang={language}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={baseLink}
          />
        )}
      </div>
    </div>
  );
};

export default StoriesContainer;
