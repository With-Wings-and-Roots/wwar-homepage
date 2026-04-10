'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createLocalLink } from '@/utilities/links';
import ProductionTypesDropdown from '../films/productionTypesDropdown';
import FilmLanguagesDropdown from '../films/filmLanguagesDropdown';
import FilmTypeDropdown from '../films/filmTypesDropdown';

const WorkshopsClientWrapper = ({
  workshops = [],
  workshopProductionTypes = [],
  workshopsAudience = [],
  workshopsTopics = [],
  lang = 'en',
}) => {
  const [activeType, setActiveType] = useState(null);
  const [activeAudience, setActiveAudience] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔥 Handlers (NO resets)
  const handleTypeChange = (type) => setActiveType(type);
  const handleAudienceChange = (audience) => setActiveAudience(audience);
  const handleTopicChange = (topic) => setActiveTopic(topic);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // 🔥 Filtering (ALL filters combined)
  const filteredWorkshops = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return workshops?.filter((workshop) => {
      const title = workshop?.title?.rendered?.toLowerCase() || '';
      const synopsis = workshop?.acf?.short_synopsis?.toLowerCase() || '';

      const productionType = workshop?.acf?.workshop_type || [];
      const audience = workshop?.acf?.audience || [];
      const topic = workshop?.acf?.topic || [];

      // 🔍 Search
      if (search && !title.includes(search) && !synopsis.includes(search)) {
        return false;
      }

      // 🎬 Production Type
      if (
        activeType &&
        !workshopProductionTypes.map(String).includes(String(activeType))
      ) {
        return false;
      }

      // 🌍 Language
      if (
        activeAudience &&
        !workshopsAudience.map(String).includes(String(activeAudience))
      ) {
        return false;
      }

      // 🎞 Film Type
      if (
        activeTopic &&
        !workshopsTopics.map(String).includes(String(activeTopic))
      ) {
        return false;
      }

      return true;
    });
  }, [workshops, activeType, activeAudience, activeTopic, searchTerm]);

  return (
    <>
      {/* 🔥 Filters Row */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 items-center'>
        {/* 🔍 Search */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black rounded-lg'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none rounded-lg'
              placeholder={
                lang === 'en' ? 'Search workshops' : 'Workshops suchen'
              }
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
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

        {/* 🎬 Production Type */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <ProductionTypesDropdown
            productionTypes={workshopProductionTypes}
            activeType={activeType}
            onChange={handleTypeChange}
            heading={
              lang === 'en' ? 'Select a workshop type' : 'Produktionstyp wählen'
            }
            allLabel={lang === 'en' ? 'All Workshops' : 'Alle Workshops'}
          />
        </div>

        {/* 🎞 Film Type */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <FilmLanguagesDropdown
            languages={workshopsAudience}
            activeLanguage={activeAudience}
            onChange={handleAudienceChange}
            heading={lang === 'en' ? 'Select an audience' : 'Zielgruppe wählen'}
            allLabel={lang === 'en' ? 'All Ages' : 'Alle Altersgruppen'}
          />
        </div>

        {/* 🌍 Language */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <FilmTypeDropdown
            topics={workshopsTopics}
            activeTopic={activeTopic}
            onChange={handleTopicChange}
            heading={lang === 'en' ? 'Select a topic' : 'Thema wählen'}
            allLabel={lang === 'en' ? 'All Topics' : 'Alle Themen'}
          />
        </div>

        {/* Empty column */}
        <div className='hidden md:block'></div>
      </div>

      {/* 🔥 Clear Filters */}
      {(activeAudience || activeTopic || activeType || searchTerm) && (
        <div className='mb-8 flex justify-end'>
          <button
            onClick={() => {
              setActiveType(null);
              setActiveAudience(null);
              setActiveTopic(null);
              setSearchTerm('');
            }}
            className='text-sm text-gray-600 hover:text-black underline transition'
          >
            {lang === 'en' ? 'Clear Filters' : 'Filter zurücksetzen'}
          </button>
        </div>
      )}

      {/* 🎞 Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20'>
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <a
              key={workshop.id}
              href={createLocalLink(`/${lang}/workshops/${workshop.slug}`)}
              className='group cursor-pointer bg-wwr_yellow_orange rounded-md shadow-md overflow-hidden pb-4'
            >
              <div>
                <div className='relative overflow-hidden  shadow-md aspect-video'>
                  {workshop.posterUrl && (
                    <Image
                      src={workshop.posterUrl}
                      alt={workshop?.title?.rendered}
                      fill
                      className='object-cover transition duration-300 group-hover:brightness-75'
                    />
                  )}

                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40'>
                    <span className='text-white text-sm uppercase tracking-wide'>
                      View Workshop
                    </span>
                  </div>
                </div>

                <div className='mt-3 px-2'>
                  <h3 className='font-semibold'>{workshop?.title?.rendered}</h3>

                  <p className='text-sm text-gray-500'>
                    {workshop?.acf?.year?.slice(0, 4)}
                    {workshop?.acf?.duration && ` • ${workshop.acf.duration}`}
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>
            {lang === 'en'
              ? 'No workshops found.'
              : 'Keine Workshops gefunden.'}
          </p>
        )}
      </div>
    </>
  );
};

export default WorkshopsClientWrapper;
