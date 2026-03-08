'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';
import { activatedTopic } from '@/store/topics';
import { setActiveCity } from '@/store/cities';
import { setActiveCollection } from '@/store/collections';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import parse from 'html-react-parser';

const CitiesDropdown = ({ lang, cptName }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const allCities = useSelector((state) => state.entities.cities?.allCities);
  const activeCity = useSelector((state) => state.entities.cities?.activeCity);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    dispatch(activatedTopic('all'));
    dispatch(
      storySelected({
        selection: 'all',
        id: 'all',
      })
    );
    dispatch(setActiveCity(city)); // null for All Cities
    dispatch(setActiveCollection(null));
    dispatch(setActiveCurriculum(null));
    dispatch(setActiveUmbrella(null));
    setOpen(false);

    const archive = document.getElementById('archive-browser');
    if (archive) archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!allCities?.length) return null;

  const options = ['all', ...allCities];
  const selectedCityLabel = activeCity === null ? cptName : parse(activeCity);

  return (
    <section className='py-16 max-w-3xl z-10'>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='
            w-full text-left px-4 py-3 bg-wwr_rich_black text-wwr_yellow_orange
            font-light rounded border border-black/20 flex justify-between items-center
          '
        >
          {selectedCityLabel}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div className='absolute left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg max-h-60 overflow-y-auto rounded z-[9999]'>
            {options.map((city, i) => (
              <div
                key={i}
                onClick={() => handleSelect(city === 'all' ? null : city)}
                className='px-4 py-3 cursor-pointer hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
              >
                {city === 'all'
                  ? lang === 'en'
                    ? 'All Cities'
                    : 'Alle Städte'
                  : parse(city)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CitiesDropdown;
