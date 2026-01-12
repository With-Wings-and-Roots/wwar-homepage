'use client';
import React, { useState, useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';
import { setActiveCity } from '@/store/cities';
import { setActiveCollection } from '@/store/collections';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';

const TabsDropdown = ({ lang: language }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allTabData = useSelector((state) => state.entities.topics.allTopics);
  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );
  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );
  const allTopics = useSelector((state) => state.entities.topics);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug) => {
    const selectedTopicId =
      allTopics.allTopics.find((topic) => topic.slug === slug)?.id || null;

    dispatch(
      storySelected({
        selection: slug,
        id: selectedTopicId,
      })
    );
    dispatch(setActiveCity(null));
    dispatch(setActiveCollection(null));
    dispatch(setActiveCurriculum(null));
    dispatch(setActiveUmbrella(null));
    setOpen(false);
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

  const selectedOption = options.find((opt) => opt.slug === selectedTopic);

  return (
    <div className='flex items-center gap-4'>
      {/* Dropdown */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='
            w-full text-left px-4 py-3
            bg-wwr_rich_black text-wwr_yellow_orange
            font-light rounded border border-black/20
            flex justify-between items-center cursor-pointer
            min-w-[200px]
          '
        >
          {selectedOption
            ? selectedOption.label
            : language === 'en'
              ? 'Select a topic'
              : 'Wähle ein Thema'}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div
            className='
            absolute w-full mt-1 bg-white border border-black/20 shadow-lg
            z-[9999] max-h-60 overflow-y-auto rounded
          '
          >
            {options.map((opt, i) => {
              const isActive = selectedTopic === opt.slug;
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(opt.slug)}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-wwr_yellow_orange text-wwr_rich_black font-semibold'
                        : 'hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
                    }
                  `}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stories count */}
      <div className='text-md md:text-lg text-wwr_yellow_orange font-medium'>
        {language === 'en' ? 'Stories:' : 'Geschichten:'} {storiesCount}
      </div>
    </div>
  );
};

export default TabsDropdown;
