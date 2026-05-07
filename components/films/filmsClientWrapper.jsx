'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createLocalLink } from '@/utilities/links';
import ProductionTypesTabs from './productionTypesTabs';
import ProductionTypesDropdown from './productionTypesDropdown';
import FilmLanguagesDropdown from './filmLanguagesDropdown';
import FilmTypeDropdown from './filmTypesDropdown';

const FilmsClientWrapper = ({
  films = [],
  filmProductionTypes = [],
  filmLanguages = [],
  filmTypes = [],
  lang = 'en',
}) => {
  const [activeType, setActiveType] = useState(
    filmProductionTypes.length > 0 ? filmProductionTypes[0].id : null
  );
  const [activeLanguage, setActiveLanguage] = useState(null);
  const [activeFilmType, setActiveFilmType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔥 Handlers (NO resets)
  const handleTypeChange = (type) => setActiveType(type);
  const handleLanguageChange = (language) => setActiveLanguage(language);
  const handleFilmTypeChange = (filmType) => setActiveFilmType(filmType);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // 🔥 Filtering (ALL filters combined)
  const filteredFilms = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return films.filter((film) => {
      const title = film?.title?.rendered?.toLowerCase() || '';
      const synopsis = film?.acf?.short_synopsis?.toLowerCase() || '';

      const productionType = film?.acf?.film_production_type || [];
      const language = film?.acf?.language || [];
      const filmType = film?.acf?.film_type || [];

      // 🔍 Search
      if (search && !title.includes(search) && !synopsis.includes(search)) {
        return false;
      }

      // 🎬 Production Type
      if (
        activeType &&
        !productionType.map(String).includes(String(activeType))
      ) {
        return false;
      }

      // 🌍 Language
      if (
        activeLanguage &&
        !language.map(String).includes(String(activeLanguage))
      ) {
        return false;
      }

      // 🎞 Film Type
      if (
        activeFilmType &&
        !filmType.map(String).includes(String(activeFilmType))
      ) {
        return false;
      }

      return true;
    });
  }, [films, activeType, activeLanguage, activeFilmType, searchTerm]);

  return (
    <>
      {/* Timeline Tabs */}
      <ProductionTypesTabs
        productionTypes={filmProductionTypes}
        activeType={activeType}
        onChange={handleTypeChange}
      />

      {/* Workshop description */}
      {activeType === 'workshop' && (
        <p className='mb-6 text-gray-600'>
          These films were created through our workshops.
        </p>
      )}

      {/* 🔥 Filters Row */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 items-center'>
        {/* 🔍 Search */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <div className='flex h-12 border-2 border-wwr_rich_black rounded-lg'>
            <input
              className='px-3 py-1 border-0 w-full focus:outline-none rounded-lg'
              placeholder={lang === 'en' ? 'Search films' : 'Filme suchen'}
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
            productionTypes={filmProductionTypes}
            activeType={activeType}
            onChange={handleTypeChange}
            heading={
              lang === 'en'
                ? 'Select a production type'
                : 'Produktionstyp wählen'
            }
            allLabel={lang === 'en' ? 'All Films' : 'Alle Filme'}
          />
        </div>

        {/* 🎞 Film Type */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <FilmTypeDropdown
            filmTypes={filmTypes}
            activeFilmType={activeFilmType}
            onChange={handleFilmTypeChange}
            heading={lang === 'en' ? 'Select a type' : 'Typ wählen'}
            allLabel={lang === 'en' ? 'All Types' : 'Alle Typen'}
          />
        </div>

        {/* 🌍 Language */}
        <div className='col-span-2 sm:col-span-1 w-full'>
          <FilmLanguagesDropdown
            languages={filmLanguages}
            activeLanguage={activeLanguage}
            onChange={handleLanguageChange}
            heading={lang === 'en' ? 'Select a language' : 'Sprache wählen'}
            allLabel={lang === 'en' ? 'All Languages' : 'Alle Sprachen'}
          />
        </div>

        {/* Empty column */}
        <div className='hidden md:block'></div>
      </div>

      {/* 🔥 Clear Filters */}
      {(activeLanguage || activeFilmType || searchTerm) && (
        <div className='mb-8 flex justify-end'>
          <button
            onClick={() => {
              setActiveType(
                filmProductionTypes.length > 0
                  ? filmProductionTypes[0].id
                  : null
              );
              setActiveLanguage(null);
              setActiveFilmType(null);
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
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <a
              key={film.id}
              href={createLocalLink(`/${lang}/films/${film.slug}`)}
              className='group cursor-pointer bg-wwr_yellow_orange rounded-md shadow-md overflow-hidden pb-4'
            >
              <div>
                <div className='relative overflow-hidden  shadow-md aspect-video'>
                  {film.posterUrl && (
                    <Image
                      src={film.posterUrl}
                      alt={film?.title?.rendered}
                      fill
                      className='object-cover transition duration-300 group-hover:brightness-75'
                    />
                  )}

                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40'>
                    <span className='text-white text-sm uppercase tracking-wide'>
                      View Film
                    </span>
                  </div>
                </div>

                <div className='mt-3 px-2'>
                  <h3 className='font-semibold'>{film?.title?.rendered}</h3>

                  <p className='text-sm text-gray-500'>
                    {film?.acf?.year?.slice(0, 4)}
                    {film?.acf?.duration && ` • ${film.acf.duration}`}
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>
            {lang === 'en' ? 'No films found.' : 'Keine Filme gefunden.'}
          </p>
        )}
      </div>
    </>
  );
};

export default FilmsClientWrapper;
