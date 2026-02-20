'use client';
import React, { useState, useEffect } from 'react';

const SearchAndFilter = ({
  items = [], // Array of items to filter
  searchFields = [], // Array of field paths to search, e.g. ['acf.title', 'acf.description']
  filters = [], // Array of { value, predicate } objects for extra filtering
  placeholder = 'Search...',
  onFiltered = () => {}, // callback when filtered items change
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = () => setSearch(inputValue.trim().toLowerCase());
  const handleClear = () => {
    setInputValue('');
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') handleClear();
  };

  // Filtering logic
  useEffect(() => {
    const filtered = items.filter((item) => {
      // Search across specified fields
      if (searchFields.length > 0 && search) {
        const found = searchFields.some((fieldPath) => {
          const value = fieldPath
            .split('.')
            .reduce((obj, key) => obj?.[key], item);
          return value?.toString().toLowerCase().includes(search);
        });
        if (!found) return false;
      }

      // Apply extra filters
      if (filters.length > 0) {
        const passesAll = filters.every(({ value, predicate }) =>
          predicate(item, value)
        );
        if (!passesAll) return false;
      }

      return true;
    });
    if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
      setFilteredItems(filtered);
      onFiltered(filtered);
    }
  }, [items, search, filters, searchFields, onFiltered]);

  return (
    <div className={`max-w-xl mx-auto mb-8 ${className}`}>
      <div className='relative rounded-full p-[2px] bg-gradient-to-r from-wwr_yellow_orange to-black'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='
            w-full
            bg-white
            rounded-full
            px-6
            py-4
            pr-20
            text-xl
            focus:outline-none
            focus:ring-0
            placeholder:text-gray-400
          '
        />

        {inputValue && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-wwr_rich_black'
            aria-label='Clear search'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}

        <button
          type='button'
          onClick={handleSearch}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-wwr_yellow_orange hover:opacity-80'
          aria-label='Search'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
