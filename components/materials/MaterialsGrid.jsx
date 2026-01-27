'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialGridCard from './MaterialGridCard';
import TabsDropdown from '../stories/Tabs';
import CollectionsDropdown from '../stories/CollectionsDropdown';
import LanguagesDropdown from './LanguagesDropdown';

const MaterialsGrid = ({ materials, lang = 'en' }) => {
  const dispatch = useDispatch();

  // Search state
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState(materials);

  const handleSearch = () => setSearch(inputValue.trim());

  const handleClearSearch = () => {
    setInputValue('');
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') handleClearSearch();
  };

  // Redux selectors
  const activeTopic = useSelector((state) => state.entities.topics.activeTopic);
  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );
  const activeLanguage = useSelector(
    (state) => state.entities.cities.activeCity
  );

  // Filtering logic
  useEffect(() => {
    const filtered = materials.filter((material) => {
      const title = material?.acf?.title?.toLowerCase() || '';
      const materialTopics = material?.acf?.material_type || [];
      const materialCollection = material?.acf?.material_collection || [];
      const materialLanguage = material?.acf?.language || [];

      if (search && !title.includes(search.toLowerCase())) return false;

      if (
        activeTopic &&
        activeTopic?.id &&
        !materialTopics.includes(activeTopic.id)
      )
        return false;

      if (activeCollection && !materialCollection.includes(activeCollection.id))
        return false;

      if (activeLanguage && !materialLanguage.includes(activeLanguage.id))
        return false;

      return true;
    });

    setFilteredMaterials(filtered);
  }, [materials, search, activeTopic, activeCollection, activeLanguage]);

  return (
    <div className='mt-16'>
      {/* Search */}
      <div className='relative max-w-xl mx-auto mb-10'>
        <div className='relative rounded-full p-[2px] bg-gradient-to-r from-wwr_yellow_orange to-black'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              lang === 'en' ? 'Search materials' : 'Rechercher des matériaux'
            }
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

          {/* Clear (X) */}
          {inputValue && (
            <button
              type='button'
              onClick={handleClearSearch}
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

          {/* Search icon */}
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

      {/* Filters */}
      <div className='flex flex-wrap gap-4 mb-8 relative max-w-3xl mx-auto justify-center'>
        <TabsDropdown
          lang={lang}
          isFeature={false}
          cptName={lang === 'en' ? 'All Materials' : 'Alle Materialien'}
        />
        <CollectionsDropdown lang={lang} />
        <LanguagesDropdown
          lang={lang}
          cptName={
            lang === 'en' ? 'Select a Language' : 'Wählen Sie eine Sprache'
          }
        />
      </div>

      {/* Materials Grid */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material, index) => (
            <MaterialGridCard key={index} material={material} />
          ))
        ) : (
          <p className='col-span-full text-gray-500 text-center'>
            {lang === 'en' ? 'No materials found.' : 'Aucun matériau trouvé.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default MaterialsGrid;
