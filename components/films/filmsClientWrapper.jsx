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
