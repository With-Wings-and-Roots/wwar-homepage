'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storiesCounted, storySelected } from '@/store/selectedStory';
import { activatedStories } from '@/store/stories';
import StoryCardContainer from './StoryCardContainer';
import Image from 'next/image';
import TabsDropdown from './Tabs';
import CitiesDropdown from './CitiesDropdown';
import WysiwygContent from '../common/WysiwygContent';

const STORIES_PER_PAGE = 12;

const StoriesContainer = ({ baseLink, lang: language, exploreArchiveText }) => {
  const dispatch = useDispatch();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(null);

  // Redux selectors
  const allStories = useSelector((state) => state.entities.stories.allStories);
  const allMedia = useSelector((state) => state.entities.media.allMedia);
  const allPersons = useSelector((state) => state.entities.persons.allPersons);
  const allTopics = useSelector((state) => state.entities.topics);
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const selectedTopicId = useSelector(
    (state) => state.entities.selectedStory.selectedStoryId
  );
  const activeUmbrella = useSelector(
    (state) => state.entities.umbrella.activeUmbrella
  );
  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );
  const activeCity = useSelector((state) => state.entities.cities.activeCity);
  const storiesToRender = useSelector(
    (state) => state.entities.stories.activeStories
  );
  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );

  /**
   * FILTER STORIES
   */
  useEffect(() => {
    let filteredStories = allStories;
    let newFilter = null; // start with null

    if (activeUmbrella) {
      filteredStories = filteredStories.filter(
        (story) => story.primary_umbrella_dimension === activeUmbrella
      );
      newFilter = activeUmbrella;
    }

    if (activeCollection) {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.collection === activeCollection.id
      );
      newFilter = activeCollection.name;
    }

    if (activeCity) {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.city === activeCity
      );
      newFilter = activeCity;
    }

    if (selectedTopic === 'featured') {
      filteredStories = filteredStories.filter(
        (story) => story.acf?.featured_story === true
      );
      newFilter = 'Featured';
    } else if (selectedTopic && selectedTopic !== 'all') {
      filteredStories = filteredStories.filter((story) => {
        const topics = story.acf?.topics;
        if (!topics) return false;
        const topicArray = Array.isArray(topics) ? topics : [topics];
        return topicArray.includes(selectedTopicId);
      });
      newFilter = allTopics.allTopics.find(
        (t) => t.id === selectedTopicId
      )?.name;
    }

    // If everything is cleared (All Stories), newFilter stays null
    setCurrentFilter(newFilter);

    setCurrentPage(1);
    dispatch(activatedStories({ stories: filteredStories }));
  }, [
    selectedTopic,
    selectedTopicId,
    activeUmbrella,
    activeCollection,
    activeCity,
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
      <WysiwygContent
        content={exploreArchiveText}
        className='font-light md:text-lg mt-4'
      />
      {/* SEARCH + TABS + CITIES + PAGINATION */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6  items-center my-10'>
        {/* Tabs */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <TabsDropdown
            lang={language}
            isFeature={true}
            cptName={language === 'en' ? 'All Stories' : 'Alle Geschichten'}
            heading={language === 'en' ? 'Select a topic' : 'Wähle ein Thema'}
          />
        </div>

        {/* Cities */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <CitiesDropdown
            lang={language}
            cptName={
              language === 'en' ? 'Select a City' : 'Wählen Sie eine Stadt'
            }
          />
        </div>
        {/* Search */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none'
              placeholder={language === 'en' ? 'Search' : 'Suchen'}
              type='text'
              onChange={handleInput}
            />
            <div className='bg-wwr_rich_black px-4 flex items-center'>
              <Image
                src='/search.svg'
                width={20}
                height={20}
                alt='Search icon'
              />
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className='col-span-2 sm:col-span-1 flex justify-end items-center gap-2'>
          {totalPages > 0 && (
            <>
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='pl-3 py-1 border border-white/30 disabled:opacity-40'
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>

      <div className='text-md md:text-lg text-wwr_rich_black font-medium mb-4 flex justify-between'>
        <div>
          {currentFilter ? (
            <>
              {language === 'en'
                ? 'You are viewing stories based on filter: '
                : 'Sie sehen Geschichten basierend auf: '}

              <span
                className='font-bold text-wwr_yellow_orange ml-1'
                dangerouslySetInnerHTML={{
                  __html: currentFilter,
                }}
              />
            </>
          ) : (
            <span>
              <StarIcon />
              {language === 'en'
                ? 'Featured Stories'
                : 'Ausgewählte Geschichten'}
            </span>
          )}
        </div>

        <span>
          {language === 'en' ? 'Stories:' : 'Geschichten:'} {storiesCount} /{' '}
          {allStories.length}
        </span>
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
      {paginatedStories.length === 0 && (
        <div className='text-center text-wwr_rich_black/70 mt-20'>
          {language === 'en'
            ? `No stories found ;(`
            : 'Keine Geschichten gefunden'}
        </div>
      )}
    </div>
  );
};

export default StoriesContainer;
// ⭐ Star Icon (same style as StoryCard)
const StarIcon = () => (
  <span
    title='⭐ Indicates Featured Stories — our top picks!'
    className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-wwr_yellow_orange mr-2'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='w-3 h-3 text-white'
    >
      <path d='M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z' />
    </svg>
  </span>
);
