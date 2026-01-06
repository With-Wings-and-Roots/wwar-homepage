'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { setActiveCollection } from '@/store/collections';

const CollectionsDropdown = ({ lang }) => {
  const dispatch = useDispatch();

  const allCollections = useSelector(
    (state) => state.entities.collections?.allCollections
  );

  const activeCollection = useSelector(
    (state) => state.entities.collections?.activeCollection
  );

  const [open, setOpen] = useState(false);

  const handleSelect = (slug) => {
    dispatch(setActiveCollection(slug));
    setOpen(false);

    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  if (!allCollections?.length) return null;

  const selectedCollection = allCollections.find(
    (c) => c.slug === activeCollection
  );

  return (
    <section className='py-16 max-w-3xl'>
      <h2 className='text-2xl md:text-3xl font-light mb-6'>
        Explore Lived Experiences
      </h2>

      <div className='relative'>
        <button
          onClick={() => setOpen(!open)}
          className='w-full text-left px-4 py-3 bg-wwr_rich_black text-wwr_yellow_orange font-light rounded border border-black/20 flex justify-between items-center cursor-pointer'
        >
          {selectedCollection
            ? parse(selectedCollection.name)
            : lang === 'de'
              ? 'Eine Sammlung auswählen'
              : 'Select a collection'}
          <span className='ml-2'>▼</span>
        </button>

        {open && (
          <div className='absolute w-full mt-1 bg-white border border-black/20 shadow-lg z-10 max-h-60 overflow-y-auto rounded'>
            {allCollections.map((collection, i) => {
              const isActive = activeCollection === collection.slug;
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(collection.slug)}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? ''
                      : 'hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
                  }`}
                >
                  {parse(collection.name)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionsDropdown;
