'use client';
import React, { useState, useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';
import { activatedTopic } from '@/store/topics';
import { activatedEra } from '@/store/timelineEras';

const Tabs = ({ lang: language }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allTabData = useSelector((state) => state.entities.topics.allTopics);

  const selectedTopicSlug = useSelector(
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
    const selectedTopicObj =
      allTopics.allTopics.find((topic) => topic.slug === slug) || null;

    dispatch(
      storySelected({
        selection: slug,
        id: selectedTopicObj?.id || null,
      })
    );

    dispatch(activatedTopic({ topic: selectedTopicObj }));
    dispatch(activatedEra({ era: null }));
    setOpen(false);
  };

  const options = [
    {
      slug: 'all',
      label: language === 'en' ? 'All Topics' : 'Alle Themen',
    },
    ...allTabData.map((tab) => ({
      slug: tab.slug,
      label: parse(tab.name),
    })),
  ];

  const selectedOption =
    options.find((opt) => opt.slug === selectedTopicSlug) || null;

  return (
    <div className='flex'>
      <div className='relative min-w-[240px]' ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='
            w-full text-left px-4 py-2
            bg-wwr_rich_black text-wwr_yellow_orange
            font-light rounded
            flex justify-between items-center cursor-pointer
          '
        >
          {!selectedOption || selectedOption.slug === 'all'
            ? language === 'en'
              ? 'Select a topic'
              : 'Wähle ein Thema'
            : selectedOption.label}

          <span className='ml-2'>▼</span>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div
            className='
              absolute w-full mt-1 bg-white border border-black/20 shadow-lg
              z-[9999] max-h-60 overflow-y-auto rounded
            '
          >
            {options.map((opt, i) => {
              const isActive = selectedTopicSlug === opt.slug;

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
    </div>
  );
};

export default Tabs;
