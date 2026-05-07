import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';
import FilmsClientWrapper from '../films/filmsClientWrapper';

const AllFilmsTemplate = async ({
  data,
  films = [],
  lang = 'en',
  filmProductionTypes = [],
  filmLanguages = [],
  filmTypes = [],
}) => {
  const headerIntro = data?.acf?.short_intro || '';

  // Featured film
  const featuredFilmId = data?.acf?.featured_film?.[0];
  const featuredFilm = films.find((f) => f.id === featuredFilmId);

  // Fetch featured media
  let featuredMedia = null;
  if (featuredFilm?.acf?.hero_image) {
    if (typeof featuredFilm.acf.hero_image === 'number') {
      featuredMedia = await fetchMediaFromId(featuredFilm.acf.hero_image);
    } else {
      featuredMedia = featuredFilm.acf.hero_image;
    }
  }
  const visibleFilms = films.filter((film) => {
    const hide = film?.acf?.hide_from_archive;

    const isHidden = Array.isArray(hide)
      ? hide.includes('yes')
      : hide === 'yes';

    return !isHidden;
  });

  // Fetch posters
  const filmsWithMedia = await Promise.all(
    visibleFilms.map(async (film) => {
      let poster = film?.acf?.hero_image || film?.acf?.poster_image;

      if (typeof poster === 'number') {
        poster = await fetchMediaFromId(poster);
      }

      return {
        ...film,
        posterUrl: poster?.source_url || poster?.url || null,
      };
    })
  );

  return (
    <div className='px-8 md:px-16 xl:px-48 py-16 relative'>
      {/* HERO BACKGROUND ONLY */}
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

      {/* Featured Film */}
      {featuredFilm && (
        <div className='mb-24'>
          <div className='relative w-full md:w-4/5 mx-auto mb-8 aspect-video'>
            {(featuredMedia?.source_url || featuredMedia?.url) && (
              <Image
                src={featuredMedia?.source_url || featuredMedia?.url}
                alt={featuredFilm?.title?.rendered || ''}
                fill
                className='object-cover rounded-md shadow-lg'
                sizes='(max-width: 768px) 100vw, 80vw'
              />
            )}
          </div>

          <div className='text-center max-w-2xl mx-auto'>
            <p className='text-sm uppercase tracking-wide text-wwr_teal text-center mb-3'>
              Featured Film
            </p>

            <h2 className='text-2xl md:text-3xl font-semibold'>
              {featuredFilm?.title?.rendered}{' '}
              {featuredFilm?.acf?.year &&
                `(${featuredFilm.acf.year.slice(0, 4)})`}
            </h2>

            {featuredFilm?.acf?.short_synopsis && (
              <WysiwygContent
                className='mt-3 text-lg'
                content={featuredFilm.acf.short_synopsis}
              />
            )}

            <div className='mt-6 flex justify-center gap-4 flex-wrap'>
              {featuredFilm?.acf?.trailer && (
                <a
                  href={createLocalLink(
                    `/${lang}/films/${featuredFilm.slug}#trailer`
                  )}
                  className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Watch Trailer
                </a>
              )}

              <a
                href={createLocalLink(`/${lang}/films/${featuredFilm.slug}`)}
                className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
              >
                View Film
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid Title */}
      <h1 className='text-xl md:text-2xl font-bold mb-6'>
        {lang === 'en' ? 'All Films' : 'Alle Filme'}
      </h1>

      {/* Film Grid */}
      <FilmsClientWrapper
        films={filmsWithMedia}
        filmProductionTypes={filmProductionTypes}
        lang={lang}
        filmLanguages={filmLanguages}
        filmTypes={filmTypes}
      />
    </div>
  );
};

export default AllFilmsTemplate;
