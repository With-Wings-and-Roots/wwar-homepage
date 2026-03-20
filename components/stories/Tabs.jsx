'use client';
import React, { useState, useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';
import { setActiveCity } from '@/store/cities';
import { setActiveCollection } from '@/store/collections';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import { activatedTopic } from '@/store/topics';

const TabsDropdown = ({
  lang: language,
  cptName,
  isFeature,
  heading = 'Select a topic',
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allTabData = useSelector((state) => state.entities.topics.allTopics);

  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  const allTopics = useSelector((state) => state.entities.topics);

  // ⭐ Star Icon (same style as StoryCard)
  const StarIcon = (
    <span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-wwr_yellow_orange mr-2'>
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
    let selectedTopicId = null;
    let selectedTopicObj = null;

    if (slug !== 'all' && slug !== 'featured') {
      selectedTopicObj =
        allTopics.allTopics.find((topic) => topic.slug === slug) || null;
      selectedTopicId = selectedTopicObj?.id || null;
    }

    dispatch(
      storySelected({
        selection: slug,
        id: selectedTopicId,
      })
    );

    dispatch(activatedTopic({ topic: selectedTopicObj }));
    dispatch(setActiveCity(null));
    dispatch(setActiveCollection(null));
    dispatch(setActiveCurriculum(null));
    dispatch(setActiveUmbrella(null));
    setOpen(false);
  };

  const options = [
    {
      slug: 'all',
      label: cptName,
    },
    ...(isFeature
      ? [
          {
            slug: 'featured',
            label: (
              <span className='flex items-center gap-2'>
                {StarIcon}
                {language === 'en' ? 'Featured' : 'Ausgewählte Geschichten'}
              </span>
            ),
          },
        ]
      : []),
    ...allTabData.map((tab) => ({
      slug: tab.slug,
      label: parse(tab.name),
    })),
  ];

  const selectedOption = options.find((opt) => opt.slug === selectedTopic);

  return (
    <div className='w-full'>
      <div className='relative w-full' ref={dropdownRef}>
        {/* Button */}
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
          {!selectedOption ? heading : selectedOption.label}
          <span className='ml-2'>▼</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className='
              absolute left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg
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
                    px-4 py-3 cursor-pointer transition-colors duration-200 flex items-center
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
    </div>
  );
};

export default TabsDropdown;
