
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createLocalLink } from '@/utilities/links';

import FilmLanguagesDropdown from './filmLanguagesDropdown';
import FilmTypeDropdown from './filmTypesDropdown';
import ProductionTypesDropdown from './productionTypesDropdown';

const FilmsClientWrapper = ({
  films = [],
  filmCollections = [],
  filmLanguages = [],
  filmTypes = [],
  lang = 'en',
  pageLink = '',
}) => {
  const [activeLanguage, setActiveLanguage] = useState(null);
  const [activeFilmType, setActiveFilmType] = useState(null);
  const [activeFilmCollection, setActiveFilmCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLanguageChange = (language) => {
    setActiveLanguage(language);
  };

  const handleFilmTypeChange = (filmType) => {
    setActiveFilmType(filmType);
  };

  const handleCollectionChange = (collection) => {
    setActiveFilmCollection(collection);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get a searchable plain-text synopsis
  const getSynopsis = (film) => {
    const synopsis = film?.acf?.short_synopsis || '';

    return synopsis
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Normalize taxonomy values into IDs
  const getIds = (value) => {
    if (!value) return [];

    const values = Array.isArray(value) ? value : [value];

    return values.map((item) =>
      typeof item === 'object' && item !== null
        ? String(item.id ?? item.ID ?? item.term_id)
        : String(item)
    );
  };

  // Filter films
  const filteredFilms = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return films.filter((film) => {
      const title = film?.title?.rendered?.toLowerCase() || '';
      const synopsis = getSynopsis(film).toLowerCase();

      const languageIds = getIds(film?.acf?.language);
      const filmTypeIds = getIds(film?.acf?.film_type);

      // Change this field if your ACF collection field has another name
      const collectionIds = getIds(film?.acf?.film_collection);

      // Search
      if (
        search &&
        !title.includes(search) &&
        !synopsis.includes(search)
      ) {
        return false;
      }

      // Language
      if (
        activeLanguage &&
        !languageIds.includes(String(activeLanguage))
      ) {
        return false;
      }

      // Film Type
      if (
        activeFilmType &&
        !filmTypeIds.includes(String(activeFilmType))
      ) {
        return false;
      }

      // Film Collection
      if (
        activeFilmCollection &&
        !collectionIds.includes(String(activeFilmCollection))
      ) {
        return false;
      }

      return true;
    });
  }, [
    films,
    activeLanguage,
    activeFilmType,
    activeFilmCollection,
    searchTerm,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setActiveLanguage(null);
    setActiveFilmType(null);
    setActiveFilmCollection(null);
    setSearchTerm('');
  };

  const hasActiveFilters =
    activeLanguage ||
    activeFilmType ||
    activeFilmCollection ||
    searchTerm;

  return (
    <>
      {/* Filters Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 items-center">

        {/* Search */}
        <div className="col-span-2 sm:col-span-1 w-full">
          <div className="flex h-12 border-2 border-wwr_rich_black rounded-lg">
            <input
              className="px-3 py-1 border-0 w-full focus:outline-none rounded-lg"
              placeholder={
                lang === 'en' ? 'Search films' : 'Filme suchen'
              }
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="bg-wwr_rich_black px-3 flex items-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Film Collections */}
        <div className="col-span-2 sm:col-span-1 w-full">
          <ProductionTypesDropdown
            productionTypes={filmCollections}
            activeType={activeFilmCollection}
            onChange={handleCollectionChange}
            heading={
              lang === 'en'
                ? 'Select a collection'
                : 'Sammlung wählen'
            }
            allLabel={
              lang === 'en'
                ? 'All Collections'
                : 'Alle Sammlungen'
            }
          />
        </div>

        {/* Film Type */}
        <div className="col-span-2 sm:col-span-1 w-full">
          <FilmTypeDropdown
            filmTypes={filmTypes}
            activeFilmType={activeFilmType}
            onChange={handleFilmTypeChange}
            heading={lang === 'en' ? 'Select a type' : 'Typ wählen'}
            allLabel={lang === 'en' ? 'All Types' : 'Alle Typen'}
          />
        </div>

        {/* Language */}
        <div className="col-span-2 sm:col-span-1 w-full">
          <FilmLanguagesDropdown
            languages={filmLanguages}
            activeLanguage={activeLanguage}
            onChange={handleLanguageChange}
            heading={
              lang === 'en'
                ? 'Select a language'
                : 'Sprache wählen'
            }
            allLabel={
              lang === 'en'
                ? 'All Languages'
                : 'Alle Sprachen'
            }
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mb-8 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-black underline transition"
          >
            {lang === 'en'
              ? 'Clear Filters'
              : 'Filter zurücksetzen'}
          </button>
        </div>
      )}

      {/* Film Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => {
            const synopsis = getSynopsis(film);

            const runtime =
              film?.acf?.runtime || film?.acf?.duration || '';

            const year = film?.acf?.year?.slice(0, 4) || '';

            return (
              <a
                key={film.id}
                href={createLocalLink(`${pageLink}/${film.slug}`)}
                className="group block bg-[#171717] text-white overflow-hidden shadow-md rounded-lg"
              >
                {/* Film Image */}
                <div className="relative aspect-video overflow-hidden bg-[#242424]">
                  {film.posterUrl && (
                    <Image
                      src={film.posterUrl}
                      alt={film?.title?.rendered || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.35]"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">

                    {/* Runtime */}
                    {runtime && (
                      <p className="text-xs uppercase tracking-widest text-white/80 mb-3">
                        {runtime}
                      </p>
                    )}

                    {/* Short Synopsis */}
                    {synopsis && (
                      <p className="text-sm text-white leading-relaxed line-clamp-3 mb-5">
                        {synopsis}
                      </p>
                    )}

                    {/* View Film */}
                    <div className="flex items-center gap-2 text-wwr_yellow_orange text-sm uppercase tracking-widest font-semibold">
                      <span>
                        {lang === 'en' ? 'View Film' : 'Film ansehen'}
                      </span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>

                  {/* Play Cue */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-wwr_yellow_orange flex items-center justify-center text-wwr_yellow_orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 ml-0.5"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Film Information */}
                <div className="px-4 py-4 min-h-[100px] flex flex-col justify-center">
                  <h3 className="font-semibold text-base md:text-lg leading-snug line-clamp-2 min-h-[3rem] group-hover:text-wwr_yellow_orange transition-colors duration-300">
                    {film?.title?.rendered}
                  </h3>

                  <div className="flex items-center justify-between gap-3 mt-2">
                    <p className="text-sm text-white/60">
                      {year}
                    </p>

                    {runtime && (
                      <p className="text-xs text-white/60 md:hidden">
                        {runtime}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {lang === 'en'
              ? 'No films found.'
              : 'Keine Filme gefunden.'}
          </p>
        )}
      </div>
    </>
  );
};

export default FilmsClientWrapper;
