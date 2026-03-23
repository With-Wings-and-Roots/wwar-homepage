'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MaterialGridCard from './MaterialGridCard';
import TabsDropdown from '../stories/Tabs';
import CollectionsDropdown from './CollectionDropdown';
import LanguagesDropdown from './LanguagesDropdown';

const MaterialsGrid = ({ materials, lang = 'en' }) => {
  // Redux selectors
  const activeTopic = useSelector((state) => state.entities.topics.activeTopic);
  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );
  const activeLanguage = useSelector(
    (state) => state.entities.cities.activeCity
  );

  const [filteredMaterials, setFilteredMaterials] = useState(materials);

  /**
   * SEARCH
   */
  const handleInput = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filtered = materials.filter((material) => {
      const title = material?.acf?.title?.toLowerCase() || '';
      const materialTopics = material?.acf?.material_type || [];
      const materialCollection = material?.acf?.material_collection || [];
      const materialLanguage = material?.acf?.language || [];

      if (searchValue && !title.includes(searchValue)) return false;

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
  };

  /**
   * FILTERING
   */
  useEffect(() => {
    const filtered = materials.filter((material) => {
      const materialTopics = material?.acf?.material_type || [];
      const materialCollection = material?.acf?.material_collection || [];
      const materialLanguage = material?.acf?.language || [];

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
  }, [materials, activeTopic, activeCollection, activeLanguage]);

  return (
    <div className='mt-16'>
      <div className='mb-4 text-lg lg:text-xl font-medium text-wwr_rich_black'>
        {lang === 'en'
          ? 'Search Materials or filter by Materials Collection / format'
          : 'Zeitstrahle durchsuchen oder nach Materialsammlung / Format filtern'}
      </div>

      {/* Filters (Aligned like Stories) */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 items-center'>
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black rounded-lg'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none rounded-lg'
              placeholder={lang === 'en' ? 'Search materials' : 'Rechercher'}
              type='text'
              onChange={handleInput}
            />

            <div className='bg-wwr_rich_black px-3 flex items-center'>
              <svg
                className='w-6 h-6 text-white'
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
            </div>
          </div>
        </div>
        {/* Topics */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <TabsDropdown
            lang={lang}
            isFeature={false}
            cptName={lang === 'en' ? 'All Materials' : 'Alle Materialien'}
            heading={lang === 'en' ? 'Select a format' : 'Wähle ein Format'}
          />
        </div>

        {/* Collections */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <CollectionsDropdown lang={lang} />
        </div>
        {/* Languages */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <LanguagesDropdown
            lang={lang}
            cptName={
              lang === 'en' ? 'Select a Language' : 'Wählen Sie eine Sprache'
            }
          />
        </div>

        {/* Empty column to match Stories layout */}
        <div className='hidden md:block'></div>
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
