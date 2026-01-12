'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storiesCounted, storySelected } from '@/store/selectedStory';
import { activatedStories } from '@/store/stories';
import StoryCardContainer from './StoryCardContainer';
import Image from 'next/image';
import TabsDropdown from './Tabs';

const STORIES_PER_PAGE = 12;

const StoriesContainer = ({ baseLink, lang: language }) => {
  const dispatch = useDispatch();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Redux selectors
  const allStories = useSelector((state) => state.entities.stories.allStories);
  const allMedia = useSelector((state) => state.entities.media.allMedia);
  const allPersons = useSelector((state) => state.entities.persons.allPersons);
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const selectedTopicId = useSelector(
    (state) => state.entities.selectedStory.selectedStoryId
  );
  const activeUmbrella = useSelector(
    (state) => state.entities.umbrella.activeUmbrella
  );
  const activeCurriculum = useSelector(
    (state) => state.entities.curriculum.activeCurriculum
  );
  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );
  const storiesToRender = useSelector(
    (state) => state.entities.stories.activeStories
  );

  /**
   * FILTER STORIES
   */
  useEffect(() => {
    let filteredStories = allStories;

    if (selectedTopic === 'featured') {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.featured_story === true
      );
    } else if (selectedTopic && selectedTopic !== 'all') {
      filteredStories = filteredStories.filter((story) =>
        story.acf?.topics?.includes(selectedTopicId)
      );
    }

    if (activeUmbrella) {
      filteredStories = filteredStories.filter(
        (story) => story.primary_umbrella_dimension === activeUmbrella
      );
    }

    if (activeCurriculum) {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.curriculum_pathway === activeCurriculum.id
      );
    }
    if (activeCollection) {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.collection === activeCollection.id
      );
    }

    setCurrentPage(1);
    dispatch(activatedStories({ stories: filteredStories }));
  }, [
    selectedTopic,
    selectedTopicId,
    activeUmbrella,
    activeCurriculum,
    activeCollection,
    allStories,
    dispatch,
  ]);

  /**
   * SEARCH
   */
  const handleInput = (e) => {
    setCurrentPage(1);

    dispatch(
      storySelected({
        selection: 'all',
        id: null,
      })
    );

    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length > 0) {
      const searchedStories = allStories.filter((story) => {
        const person = allPersons.find((p) => p.id === story.acf.person);
        return `${story.title.rendered}${person?.name}`
          .toLowerCase()
          .includes(searchValue);
      });
      dispatch(activatedStories({ stories: searchedStories }));
    } else {
      dispatch(activatedStories({ stories: allStories }));
    }
  };

  /**
   * COUNT
   */
  useEffect(() => {
    dispatch(storiesCounted({ count: storiesToRender.length }));
  }, [dispatch, storiesToRender]);

  /**
   * SORT FEATURED FIRST
   */
  const sortedStories = [...storiesToRender].sort((a, b) => {
    const aFeatured = a?.acf?.featured_story === true;
    const bFeatured = b?.acf?.featured_story === true;
    return aFeatured === bFeatured ? 0 : aFeatured ? -1 : 1;
  });

  /**
   * PAGINATION LOGIC
   */
  const totalPages = Math.ceil(sortedStories.length / STORIES_PER_PAGE);
  const paginatedStories = sortedStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  );

  return (
    <div className='py-10'>
      <h2 className='text-2xl md:text-3xl font-light mb-6'>
        {language === 'en' ? 'Explore the Archive' : 'Entdecken Sie das Archiv'}
      </h2>
      {/* SEARCH + TABS + PAGINATION */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-6 mb-8 justify-between items-center'>
        {/* Search */}
        <div className='flex h-10 border-2 border-wwr_rich_black'>
          <input
            className='px-3 py-1 border-0 focus:outline-none'
            placeholder='Search'
            type='text'
            onChange={handleInput}
          />
          <div className='bg-wwr_rich_black px-2 flex items-center'>
            <Image src='/search.svg' width={20} height={20} alt='Search icon' />
          </div>
        </div>

        {/* Tabs */}
        <div className='w-auto'>
          <TabsDropdown lang={language} />
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className='px-3 py-1 border border-white/30 disabled:opacity-40'
            >
              Prev
            </button>

            <span className='text-sm'>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='px-3 py-1 border border-white/30 disabled:opacity-40'
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* STORIES GRID */}
      <div
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
        id='archive-browser'
      >
        <StoryCardContainer
          storiesToRender={paginatedStories}
          lang={language}
          allMedia={allMedia}
          allPersons={allPersons}
          baseLink={baseLink}
        />
      </div>
    </div>
  );
};

export default StoriesContainer;
