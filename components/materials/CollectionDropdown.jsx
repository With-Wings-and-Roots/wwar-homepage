'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import { storySelected } from '@/store/selectedStory';

const CollectionsDropdown = ({ heading = 'Select a collection' }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allCollections = useSelector(
    (state) => state.entities.collections?.allCollections
  );

  const activeCollection = useSelector(
    (state) => state.entities.collections?.activeCollection
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

  if (!allCollections?.length) return null;

  const handleSelect = (collection) => {
    dispatch(setActiveCollection(collection));
    dispatch(setActiveCurriculum(null));
    dispatch(activatedTopic('all'));
    dispatch(
      storySelected({
        selection: 'all',
        id: 'all',
      })
    );
    dispatch(setActiveUmbrella(null));

    setOpen(false);

    // Scroll to archive (same behavior)
    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

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
          '
        >
          <span className='truncate block'>
            {activeCollection ? parse(activeCollection.name) : heading}
          </span>
          <span className='ml-2 shrink-0'>▼</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className='
              absolute left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg
              z-[9999] max-h-60 overflow-y-auto rounded
            '
          >
            {allCollections.map((collection, i) => {
              const isActive = activeCollection === collection;

              return (
                <div
                  key={i}
                  onClick={() => handleSelect(collection)}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-wwr_yellow_orange text-wwr_rich_black font-semibold'
                        : 'hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
                    }
                  `}
                >
                  {parse(collection.name)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsDropdown;
