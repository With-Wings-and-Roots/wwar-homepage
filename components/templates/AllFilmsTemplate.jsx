import Image from 'next/image';

import gfx_bg_orange from '@/public/bg_orange.png';

import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';

import FilmsClientWrapper from '../films/filmsClientWrapper';
import WorkshopFilmsCarousel from '../films/workshopFilmsCarousel';

import {
  getAllFilms,
  getFilmLanguages,
  getFilmProductionTypes,
  getFilmTypes,
  getFilmCollections,
} from '@/utilities/films';

const AllFilmsTemplate = async ({ data, lang = 'en' }) => {
  // --------------------------------------------------
  // FETCH DATA
  // --------------------------------------------------

  const [
    films,
    filmProductionTypes,
    filmLanguages,
    filmTypes,
    filmCollections,
  ] = await Promise.all([
    getAllFilms(lang),
    getFilmProductionTypes(lang),
    getFilmLanguages(lang),
    getFilmTypes(lang),
    getFilmCollections(lang),
  ]);

  const headerIntro = data?.acf?.short_intro || '';

  // --------------------------------------------------
  // NORMALIZE TAXONOMY VALUES
  // --------------------------------------------------

  const normalizeTerm = (value) => {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&amp;/g, '&')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Get IDs from ACF taxonomy fields.
  // Supports numbers, strings and term objects.
  const getTermIds = (value) => {
    const values = Array.isArray(value) ? value : value ? [value] : [];

    return values
      .map((term) => {
        if (typeof term === 'object' && term !== null) {
          return Number(term.id ?? term.term_id ?? term.ID);
        }

        return Number(term);
      })
      .filter((id) => Number.isFinite(id) && id > 0);
  };

  // Get slug/name values from ACF taxonomy objects.
  const getTermNames = (value) => {
    const values = Array.isArray(value) ? value : value ? [value] : [];

    return values.flatMap((term) => {
      if (typeof term !== 'object' || term === null) {
        return [];
      }

      return [
        normalizeTerm(term.slug),
        normalizeTerm(term.name),
        normalizeTerm(term.label),
      ].filter(Boolean);
    });
  };

  // Check whether a film has a particular taxonomy term.
  const filmHasTerm = (film, field, term) => {
    if (!term) return false;

    const assignedIds = getTermIds(film?.acf?.[field]);
    const assignedNames = getTermNames(film?.acf?.[field]);

    const termId = Number(term.id ?? term.term_id ?? term.ID);

    if (Number.isFinite(termId) && assignedIds.includes(termId)) {
      return true;
    }

    const termNames = [
      normalizeTerm(term.slug),
      normalizeTerm(term.name),
      normalizeTerm(term.label),
    ].filter(Boolean);

    return termNames.some((name) => assignedNames.includes(name));
  };

  // --------------------------------------------------
  // PRODUCTION TYPE LOOKUP
  // --------------------------------------------------

  const ourFilmsAliases = [
    'our-films',
    'our-film',
    'unsere-filme',
    'unsere-film',
  ];

  const workshopFilmsAliases = [
    'workshop-films',
    'workshop-film',
    'workshop-filme',
    'werkstatt-filme',
    'werkstattfilme',
  ];

  const findProductionType = (aliases) => {
    return filmProductionTypes.find((type) => {
      const slug = normalizeTerm(type.slug);
      const name = normalizeTerm(type.name);

      return aliases.includes(slug) || aliases.includes(name);
    });
  };

  const ourFilmsType = findProductionType(ourFilmsAliases);
  const workshopFilmsType = findProductionType(workshopFilmsAliases);

  // Debug information if translated terms do not match.
  if (!ourFilmsType || !workshopFilmsType) {
    console.warn('Film production types could not be matched:', {
      language: lang,
      availableTypes: filmProductionTypes.map((type) => ({
        id: type.id,
        name: type.name,
        slug: type.slug,
      })),
      ourFilmsType: ourFilmsType?.id,
      workshopFilmsType: workshopFilmsType?.id,
    });
  }

  // --------------------------------------------------
  // FEATURED FILM
  // --------------------------------------------------

  const featuredFilmId = data?.acf?.featured_film?.[0];

  const featuredFilm = films.find(
    (film) => Number(film.id) === Number(featuredFilmId)
  );

  let featuredMedia = null;

  if (featuredFilm?.acf?.poster_image) {
    if (typeof featuredFilm.acf.poster_image === 'number') {
      featuredMedia = await fetchMediaFromId(featuredFilm.acf.poster_image);
    } else {
      featuredMedia = featuredFilm.acf.poster_image;
    }
  }

  // --------------------------------------------------
  // FILTER HIDDEN FILMS
  // --------------------------------------------------

  const visibleFilms = films.filter((film) => {
    const hide = film?.acf?.hide_from_archive;

    const isHidden = Array.isArray(hide)
      ? hide.includes('yes')
      : hide === 'yes';

    return !isHidden;
  });

  // --------------------------------------------------
  // SORTING
  // --------------------------------------------------

  const getFilmYear = (film) => {
    return Number(film?.acf?.year?.slice(0, 4)) || 0;
  };

  const sortFilms = (a, b) => {
    const yearDifference = getFilmYear(b) - getFilmYear(a);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return (a?.title?.rendered || '').localeCompare(b?.title?.rendered || '');
  };

  // --------------------------------------------------
  // OUR FILMS
  // --------------------------------------------------

  const ourFilms = ourFilmsType
    ? visibleFilms
        .filter((film) =>
          filmHasTerm(film, 'film_production_type', ourFilmsType)
        )
        .sort(sortFilms)
    : [];

  // --------------------------------------------------
  // WORKSHOP FILMS
  // --------------------------------------------------

  const workshopFilms = workshopFilmsType
    ? visibleFilms
        .filter((film) =>
          filmHasTerm(film, 'film_production_type', workshopFilmsType)
        )
        .sort(sortFilms)
    : [];

  // --------------------------------------------------
  // COLLECTION HELPERS
  // --------------------------------------------------

  const getCollectionIds = (film) => {
    return getTermIds(film?.acf?.film_collection_type);
  };

  const filmHasCollection = (film, collection) => {
    return filmHasTerm(film, 'film_collection_type', collection);
  };

  // --------------------------------------------------
  // FETCH FILM POSTER IMAGES
  // --------------------------------------------------

  const addFilmMedia = async (film) => {
    let poster = film?.acf?.hero_image || film?.acf?.poster_image;

    if (typeof poster === 'number') {
      poster = await fetchMediaFromId(poster);
    }

    return {
      ...film,
      posterUrl: poster?.source_url || poster?.url || null,
    };
  };

  const ourFilmsWithMedia = await Promise.all(ourFilms.map(addFilmMedia));

  const workshopFilmsWithMedia = await Promise.all(
    workshopFilms.map(addFilmMedia)
  );

  // --------------------------------------------------
  // GROUP WORKSHOP FILMS BY COLLECTION
  // --------------------------------------------------

  const workshopCollections = filmCollections
    .map((collection) => {
      const collectionFilms = workshopFilmsWithMedia
        .filter((film) => filmHasCollection(film, collection))
        .sort(sortFilms);

      if (collectionFilms.length === 0) {
        return null;
      }

      return {
        ...collection,
        films: collectionFilms,
      };
    })
    .filter(Boolean);

  // --------------------------------------------------
  // WORKSHOP FILMS WITHOUT A COLLECTION
  // --------------------------------------------------

  const moreWorkshopFilms = workshopFilmsWithMedia
    .filter((film) => {
      return !filmCollections.some((collection) =>
        filmHasCollection(film, collection)
      );
    })
    .sort(sortFilms);


  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className='px-8 md:px-16 xl:px-48 py-16 relative'>
      {/* Hero Background */}
      <div className='absolute top-0 left-0 w-full h-[500px] -z-10 opacity-10'>
        <Image src={gfx_bg_orange} alt='' fill className='object-cover' />
      </div>

      {/* Header */}
      <div className='text-lg font-light mt-6 mb-16'>
        <h1 className='text-3xl md:text-6xl font-bold mb-6'>
          {data?.title?.rendered || 'FILMS'}
        </h1>

        <WysiwygContent content={headerIntro} />
      </div>

      {/* --------------------------------------------------
          FEATURED FILM
      -------------------------------------------------- */}

      {featuredFilm && (
        <div className='mb-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center'>
            {/* Featured Film Image */}
            <div className='relative w-full'>
              {(featuredMedia?.source_url || featuredMedia?.url) && (
                <Image
                  src={featuredMedia?.source_url || featuredMedia?.url}
                  alt={featuredFilm?.title?.rendered || ''}
                  width={featuredMedia?.media_details?.width || 1200}
                  height={featuredMedia?.media_details?.height || 800}
                  className='w-full h-auto rounded-md shadow-lg'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              )}
            </div>

            {/* Featured Film Information */}
            <div className='flex flex-col items-start'>
              {/* Featured Label */}
              <div className='flex items-center gap-3 mb-4'>
                <span className='w-10 h-1 bg-wwr_yellow_orange'></span>

                <p className='text-sm uppercase tracking-widest text-wwr_teal'>
                  {lang === 'en' ? 'Featured Film' : 'Vorgestellter Film'}
                </p>
              </div>

              {/* Title */}
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>
                {featuredFilm?.title?.rendered}
              </h2>

              {/* Runtime and Year */}
              <p className='text-sm text-gray-500 font-light mb-5'>
                {[
                  featuredFilm?.acf?.runtime,
                  featuredFilm?.acf?.year?.slice(0, 4),
                ]
                  .filter(Boolean)
                  .join('  •  ')}
              </p>

              {/* Short Synopsis */}
              {featuredFilm?.acf?.short_synopsis && (
                <div className='text-lg font-light leading-relaxed'>
                  <WysiwygContent content={featuredFilm.acf.short_synopsis} />
                </div>
              )}

              {/* Featured Press Quote */}
              {featuredFilm?.acf?.selected_press?.[0] && (
                <div className='mt-8 border-l-2 border-wwr_yellow_orange pl-5'>
                  <p className='text-base md:text-lg font-light italic leading-relaxed'>
                    <span className='text-wwr_yellow_orange text-2xl font-semibold mr-1'>
                      “
                    </span>

                    {featuredFilm.acf.selected_press[0].quote
                      ?.replace(/^["“]|["”]$/g, '')
                      .trim()}

                    <span className='text-wwr_yellow_orange text-2xl font-semibold ml-1'>
                      ”
                    </span>
                  </p>

                  <p className='mt-2 text-xs uppercase tracking-widest text-gray-500 font-medium'>
                    — {featuredFilm.acf.selected_press[0].news_outlet?.trim()}
                  </p>
                </div>
              )}

              {/* Award */}
              {featuredFilm?.acf?.award_list?.[0]?.award_name && (
                <div className='mt-6 flex items-start gap-3'>
                  <span className='text-wwr_yellow_orange text-lg'>✦</span>

                  <p className='text-sm text-gray-700 font-light'>
                    {featuredFilm.acf.award_list[0].award_name}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className='mt-8 flex gap-4 flex-wrap'>
                {featuredFilm?.acf?.trailer && (
                  <a
                    href={createLocalLink(
                      `/${lang}/${data.slug}/${featuredFilm.slug}#trailer`
                    )}
                    className='bg-wwr_yellow_orange text-black text-sm lg:text-base font-normal px-5 py-3 hover:text-white transition-all uppercase inline-flex'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {lang === 'en' ? 'Watch Trailer' : 'Trailer ansehen'}
                  </a>
                )}

                <a
                  href={createLocalLink(`/${lang}/films/${featuredFilm.slug}`)}
                  className='border border-black text-black text-sm lg:text-base font-normal px-5 py-3 hover:bg-black hover:text-white transition-all uppercase inline-flex'
                >
                  {lang === 'en' ? 'View Film' : 'Film ansehen'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          OUR FILMS
      -------------------------------------------------- */}

      {ourFilmsWithMedia.length > 0 && (
        <section className='mb-20'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            <span className='relative inline-block px-2 py-1 z-0'>
              <span
                className='absolute inset-x-0 top-[55%] -translate-y-1/2 h-[65%] bg-[#F4B942] -rotate-1 -z-10'
                style={{
                  clipPath:
                    'polygon(2% 18%, 96% 5%, 100% 72%, 5% 100%, 0% 75%)',
                }}
              />

              {lang === 'en' ? 'Our Films' : 'Unsere Filme'}
            </span>
          </h2>

          <FilmsClientWrapper
            films={ourFilmsWithMedia}
            filmProductionTypes={filmProductionTypes}
            lang={lang}
            filmLanguages={filmLanguages}
            filmTypes={filmTypes}
            filmCollections={filmCollections}
            pageLink={`/${lang}/${data.slug}`}
          />
        </section>
      )}

      {/* --------------------------------------------------
          WORKSHOP FILMS
      -------------------------------------------------- */}

      {workshopFilmsWithMedia.length > 0 && (
        <section className='mb-20'>
          {/* Plain heading - no brush background */}
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            {lang === 'en' ? 'Workshop Films' : 'Workshop-Filme'}
          </h2>

          {/* Collection Groups */}
          {workshopCollections.map((collection) => (
            <div key={collection.id} className='mb-16'>
              {/* Collection Heading */}
              <h3 className='text-xl md:text-2xl font-semibold mb-3'>
                {collection.name?.replace(/&amp;/g, '&')}
              </h3>

              {/* Collection Description */}
              {collection.description && (
                <p className='text-base md:text-lg font-light text-gray-600 leading-relaxed max-w-4xl mb-8'>
                  {collection.description}
                </p>
              )}

              {/* Collection Films */}
              <WorkshopFilmsCarousel
                films={collection.films}
                lang={lang}
                pageLink={`/${lang}/${data.slug}`}
              />
            </div>
          ))}

          {/* Films Without a Collection */}
          {moreWorkshopFilms.length > 0 && (
            <div className='mb-16'>
              <h3 className='text-xl md:text-2xl font-semibold mb-8'>
                {lang === 'en'
                  ? 'More Workshop Films'
                  : 'Weitere Workshop-Filme'}
              </h3>

              <WorkshopFilmsCarousel
                films={moreWorkshopFilms}
                lang={lang}
                pageLink={`/${lang}/${data.slug}`}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AllFilmsTemplate;
