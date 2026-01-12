'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import { set } from 'date-fns';
import { setActiveCity } from '@/store/cities';
import { storySelected } from '@/store/selectedStory';

const CitiesDropdown = ({ lang }) => {
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
    dispatch(setActiveCity(city));
    dispatch(setActiveCollection(null));
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

  if (!allCities?.length) return null;

  const selectedCity = allCities.find((c) => c === activeCity);

  return (
    <section className='py-16 max-w-3xl z-10'>
      {/* 👇 attach ref here */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='w-full text-left px-4 py-3 bg-wwr_rich_black text-wwr_yellow_orange font-light rounded border border-black/20 flex justify-between items-center cursor-pointer'
        >
          {selectedCity
            ? parse(selectedCity)
            : lang === 'en'
              ? 'Select a city'
              : 'Wählen Sie eine Stadt aus'}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div className='absolute left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg max-h-60 overflow-y-auto rounded z-[9999]'>
            {allCities.map((city, i) => (
              <div
                key={i}
                onClick={() => handleSelect(city)}
                className='px-4 py-3 cursor-pointer hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
              >
                {parse(city)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CitiesDropdown;
