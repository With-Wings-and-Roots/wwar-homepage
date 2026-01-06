'use client';
import React from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';

const TabsDropdown = ({ lang: language }) => {
  const dispatch = useDispatch();
  const allTabData = useSelector((state) => state.entities.topics.allTopics);
  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const allTopics = useSelector((state) => state.entities.topics);

  const handleChange = (e) => {
    const slug = e.target.value;
    const selectedTopicId =
      allTopics.allTopics.find((topic) => topic.slug === slug)?.id || null;

    dispatch(
      storySelected({
        selection: slug,
        id: selectedTopicId,
      })
    );
  };

  const options = [
    {
      slug: 'featured',
      label: language === 'en' ? 'Featured' : 'Ausgewählte Geschichten',
    },
    ...allTabData.map((tab) => ({
      slug: tab.slug,
      label: parse(tab.name),
    })),
    {
      slug: 'all',
      label: language === 'en' ? 'All Stories' : 'Alle Geschichten',
    },
  ];

  return (
    <div className='flex items-center gap-4'>
      {/* Dropdown */}
      <div className='relative'>
        <select
          value={selectedTopic || ''}
          onChange={handleChange}
          className='
            border border-black
            bg-white
            px-4 py-2
            text-base md:text-lg font-light
            focus:outline-none focus:ring-0
            cursor-pointer
            appearance-none
          '
        >
          <option value='' disabled>
            {language === 'en' ? 'Select a topic' : 'Wähle ein Thema'}
          </option>
          {options.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50'>
          ▼
        </div>
      </div>

      {/* Stories count */}
      <div className='text-md md:text-lg text-wwr_yellow_orange font-medium'>
        {language === 'en' ? 'Stories:' : 'Geschichten:'} {storiesCount}
      </div>
    </div>
  );
};

export default TabsDropdown;
