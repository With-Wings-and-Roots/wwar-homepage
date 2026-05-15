'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SearchAndFilter = ({
  items = [],
  searchFields = [],
  filters = [],
  placeholder = 'Search...',
  onFiltered = () => {},
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  // Debounce search to improve UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue.trim().toLowerCase());
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleClear = () => {
    setInputValue('');
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClear();
  };

  // Filtering logic
  useEffect(() => {
    const filtered = items.filter((item) => {
      if (searchFields.length > 0 && search) {
        const found = searchFields.some((fieldPath) => {
          const value = fieldPath
            .split('.')
            .reduce((obj, key) => obj?.[key], item);
          return value?.toString().toLowerCase().includes(search);
        });
        if (!found) return false;
      }

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
  }, [items, search, filters, searchFields, onFiltered, filteredItems]);

  return (
    <div className={`max-w-md mb-8 ${className}`}>
      <div className='flex h-10 border-2 border-wwr_rich_black'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='px-3 py-1 border-0 w-full focus:outline-none text-sm'
        />

        {inputValue && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'
            aria-label='Clear search'
          >
            ✕
          </button>
        )}

        <div className='bg-wwr_rich_black px-2 flex items-center'>
          <Image src='/search.svg' width={20} height={20} alt='Search icon' />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
