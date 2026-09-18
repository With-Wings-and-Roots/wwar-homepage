'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MaterialGridCard from '../materials/MaterialGridCard';
import MaterialListCard from '../materials/MaterialListCard';

import TabsDropdown from '../stories/Tabs';
import CollectionsDropdown from '../materials/CollectionDropdown';
import LanguagesDropdown from '../materials/LanguagesDropdown';

import { FiGrid, FiList } from 'react-icons/fi';

const PostsGrid = ({ materials = [], tags = [], lang = 'en' }) => {
  // Redux selectors
  const activeTopic = useSelector((state) => state.entities.topics.activeTopic);

  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );

  const activeLanguage = useSelector(
    (state) => state.entities.cities.activeCity
  );

  const [searchValue, setSearchValue] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [viewMode, setViewMode] = useState('grid');

  /**
   * FILTER + SEARCH
   */
  useEffect(() => {
    const search = searchValue.trim().toLowerCase();

    const filtered = materials.filter((material) => {
      /**
       * -------------------------
       * SEARCH BY TITLE
       * -------------------------
       */
      const title =
        material?.acf?.title?.toLowerCase() ||
        material?.title?.rendered?.toLowerCase() ||
        '';
      const excerpt =
        material?.acf?.excerpt?.toLowerCase() ||
        material?.excerpt?.rendered?.toLowerCase() ||
        '';

      /**
       * -------------------------
       * SEARCH BY TAGS
       *
       * tags example:
       * [
       *   { id: 123, name: 'Education' },
       *   { id: 456, name: 'Environment' }
       * ]
       * -------------------------
       */
      const materialTagIds = (material?.tags || []).map(Number);

      const materialTags = tags.filter((tag) =>
        materialTagIds.includes(Number(tag.id))
      );

      const tagNames = materialTags
        .map((tag) => tag?.name?.toLowerCase() || '')
        .join(' ');

      /**
       * Search can match either:
       * - title
       * - tag name
       */
      if (search && !title.includes(search) && !tagNames.includes(search) && !excerpt.includes(search)) {
        return false;
      }

      /**
       * -------------------------
       * TOPIC FILTER
       * -------------------------
       */
      const materialTopics =
        material?.acf?.material_type || material?.acf?.topics || [];

      if (activeTopic?.id && !materialTopics.includes(activeTopic.id)) {
        return false;
      }

      /**
       * -------------------------
       * FORMAT / COLLECTION FILTER
       * -------------------------
       */
      const materialCollection = material?.acf?.format || [];

      if (
        activeCollection?.id &&
        !materialCollection.includes(activeCollection.id)
      ) {
        return false;
      }

      /**
       * -------------------------
       * MEDIUM / LANGUAGE FILTER
       * -------------------------
       */
      const materialLanguage = material?.acf?.medium
        ? [material.acf.medium]
        : [];

      if (activeLanguage?.id && !materialLanguage.includes(activeLanguage.id)) {
        return false;
      }

      return true;
    });

    setFilteredMaterials(filtered);
  }, [
    materials,
    tags,
    searchValue,
    activeTopic,
    activeCollection,
    activeLanguage,
  ]);

  /**
   * SEARCH INPUT
   */
  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='mt-16'>
      {/* Heading */}
      <div className='mb-4 text-lg lg:text-xl font-medium text-wwr_rich_black'>
        {lang === 'en'
          ? 'Search Posts or filter by Post Topic / Format'
          : 'Posts durchsuchen oder nach Post-Thema / Format filtern'}
      </div>

      {/* Filters */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 items-center'>
        {/* Search */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black rounded-lg'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none rounded-lg'
              placeholder={lang === 'en' ? 'Search posts' : 'Rechercher'}
              type='text'
              value={searchValue}
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
            cptName={lang === 'en' ? 'All Posts' : 'Alle Beiträge'}
            heading={lang === 'en' ? 'Select a Topic' : 'Wähle ein Thema'}
          />
        </div>

        {/* Collections */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <CollectionsDropdown
            lang={lang}
            heading={lang === 'en' ? 'Select a Format' : 'Wähle ein Format'}
          />
        </div>

        {/* Languages */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <LanguagesDropdown
            lang={lang}
            cptName={
              lang === 'en' ? 'Select a Medium' : 'Wählen Sie ein Medium'
            }
          />
        </div>

        <div className='hidden md:block'></div>
      </div>

      {/* View Toggle */}
      <div className='flex justify-end mb-8'>
        <div className='flex gap-3'>
          {/* Grid */}
          <button
            type='button'
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition ${
              viewMode === 'grid'
                ? 'bg-wwr_yellow_orange text-black'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            aria-label='Grid view'
          >
            <FiGrid size={20} />
          </button>

          {/* List */}
          <button
            type='button'
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition ${
              viewMode === 'list'
                ? 'bg-wwr_yellow_orange text-black'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            aria-label='List view'
          >
            <FiList size={20} />
          </button>
        </div>
      </div>

      {/* Posts */}
      {filteredMaterials.length > 0 ? (
        <div
          className={`grid gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredMaterials.map((material, index) =>
            viewMode === 'grid' ? (
              <MaterialGridCard
                key={material.id || index}
                index={index}
                material={material}
                title='posts'
              />
            ) : (
              <MaterialListCard
                key={material.id || index}
                index={index}
                material={material}
                title='posts'
              />
            )
          )}
        </div>
      ) : (
        <p className='text-center text-gray-500'>
          {lang === 'en' ? 'No posts found.' : 'Aucun post trouvé.'}
        </p>
      )}
    </div>
  );
};

export default PostsGrid;
