'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import { storySelected } from '@/store/selectedStory';

const CollectionsDropdown = ({ lang }) => {
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

    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  if (!allCollections?.length) return null;

  const selectedCollection = allCollections.find((c) => c === activeCollection);

  return (
    <section className=' py-16 max-w-3xl z-10'>
      {/* 👇 attach ref here */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='w-full text-left px-4 py-3 bg-wwr_rich_black text-wwr_yellow_orange font-light rounded border border-black/20 flex justify-between items-center cursor-pointer'
        >
          {selectedCollection
            ? parse(selectedCollection.name)
            : lang === 'en'
              ? 'Select a collection'
              : 'Wählen Sie eine Sammlung aus'}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div className='absolute w-full mt-1 bg-white border border-black/20 shadow-lg z-10 max-h-60 overflow-y-auto rounded'>
            {allCollections.map((collection, i) => (
              <div
                key={i}
                onClick={() => handleSelect(collection)}
                className='px-4 py-3 cursor-pointer hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
              >
                {parse(collection.name)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionsDropdown;
