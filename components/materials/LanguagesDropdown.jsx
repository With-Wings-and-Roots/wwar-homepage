'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCity } from '@/store/cities';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';

const LanguagesDropdown = ({ cptName = 'All Languages' }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allLanguages = useSelector((state) => state.entities.cities?.allCities);

  const activeLanguage = useSelector(
    (state) => state.entities.cities?.activeCity
  );

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (language) => {
    dispatch(setActiveCity(language));

    // reset dependent filters
    dispatch(setActiveCollection(null));
    dispatch(activatedTopic('all'));

    setOpen(false);

    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  if (!allLanguages?.length) return null;

  return (
    <section className='py-16 max-w-3xl z-10'>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='w-full text-left px-4 py-3 bg-wwr_rich_black text-wwr_yellow_orange font-light rounded border border-black/20 flex justify-between items-center cursor-pointer'
        >
          {activeLanguage ? activeLanguage.name : cptName}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div className='absolute left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg max-h-60 overflow-y-auto rounded z-[9999]'>
            {allLanguages.map((language) => (
              <div
                key={language.id}
                onClick={() => handleSelect(language)}
                className='px-4 py-3 cursor-pointer hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
              >
                {language.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguagesDropdown;
