'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import MaterialGridCard from '../materials/MaterialGridCard';
import MaterialListCard from '../materials/MaterialListCard';

import TabsDropdown from '../stories/Tabs';
import CollectionsDropdown from '../materials/CollectionDropdown';
import LanguagesDropdown from '../materials/LanguagesDropdown';

import { FiGrid, FiList } from 'react-icons/fi';

const getIds = (value) => {
  if (value == null || value === '') return [];

  const values = Array.isArray(value) ? value : [value];

  return values
    .map((item) => {
      if (typeof item === 'object' && item !== null) {
        return Number(item.id);
      }

      return Number(item);
    })
    .filter(Number.isFinite);
};

const PostsGrid = ({
  posts,
  topics,
  collections,
  languages,
  tags,
  lang = 'en',
  readMoreLabel,
  noEntriesText,
  params,
}) => {
  const activeTopic = useSelector((state) => state.entities.topics.activeTopic);

  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );

  const activeLanguage = useSelector(
    (state) => state.entities.cities.activeCity
  );

  const [searchValue, setSearchValue] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredPosts = useMemo(() => {
    const search = searchValue.trim().toLowerCase();
    const allPosts = Array.isArray(posts) ? posts : [];
    const allTags = Array.isArray(tags) ? tags : [];

    return allPosts.filter((post) => {
      const title = String(
        post?.acf?.title || post?.title?.rendered || ''
      ).toLowerCase();

      const excerpt = String(
        post?.acf?.excerpt || post?.excerpt?.rendered || ''
      ).toLowerCase();

      // Search tags
      const postTagIds = getIds(post?.tags);

      const tagNames = allTags
        .filter((tag) => postTagIds.includes(Number(tag?.id)))
        .map((tag) => String(tag?.name || '').toLowerCase())
        .join(' ');

      if (
        search &&
        !title.includes(search) &&
        !excerpt.includes(search) &&
        !tagNames.includes(search)
      ) {
        return false;
      }

      // Topic filter
      const postTopics = getIds(post?.acf?.blog_topics ?? post?.acf?.topics);

      if (
        activeTopic?.id != null &&
        !postTopics.includes(Number(activeTopic.id))
      ) {
        return false;
      }

      // Format filter
      const postFormats = getIds(post?.acf?.format);

      if (
        activeCollection?.id != null &&
        !postFormats.includes(Number(activeCollection.id))
      ) {
        return false;
      }

      // Medium filter
      const postMediums = getIds(post?.acf?.medium);

      if (
        activeLanguage?.id != null &&
        !postMediums.includes(Number(activeLanguage.id))
      ) {
        return false;
      }

      return true;
    });
  }, [posts, tags, searchValue, activeTopic, activeCollection, activeLanguage]);

  return (
    <div className='mt-16'>
      <div className='mb-4 text-lg lg:text-xl font-medium text-wwr_rich_black'>
        {lang === 'en'
          ? 'Search Posts or filter by Post Topic / Format'
          : 'Posts durchsuchen oder nach Post-Thema / Format filtern'}
      </div>

      {/* Search and filters */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 items-center'>
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black rounded-lg'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none rounded-lg'
              placeholder={lang === 'en' ? 'Search posts' : 'Rechercher'}
              type='text'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
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

        <div className='col-span-2 sm:col-span-1 w-full'>
          <TabsDropdown
            lang={lang}
            isFeature={false}
            cptName={lang === 'en' ? 'All Posts' : 'Alle Beiträge'}
            heading={lang === 'en' ? 'Select a Topic' : 'Wähle ein Thema'}
          />
        </div>

        <div className='col-span-2 sm:col-span-1 w-full'>
          <CollectionsDropdown
            lang={lang}
            heading={lang === 'en' ? 'Select a Format' : 'Wähle ein Format'}
          />
        </div>

        <div className='col-span-2 sm:col-span-1 w-full'>
          <LanguagesDropdown
            lang={lang}
            cptName={
              lang === 'en' ? 'Select a Medium' : 'Wählen Sie ein Medium'
            }
          />
        </div>

        <div className='hidden md:block' />
      </div>

      {/* View toggle */}
      <div className='flex justify-end mb-8'>
        <div className='flex gap-3'>
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
      {filteredPosts.length > 0 ? (
        <div
          className={`grid gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredPosts.map((post, index) =>
            viewMode === 'grid' ? (
              <MaterialGridCard
                key={post.id || index}
                index={index}
                material={post}
                title='posts'
                params={params}
              />
            ) : (
              <MaterialListCard
                key={post.id || index}
                index={index}
                material={post}
                title='posts'
                params={params}
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
