import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';

const AllFilmsTemplate = async ({ data, films = [], lang = 'en' }) => {
  const headerIntro = data?.acf?.short_intro || '';

  // Featured film (ID → object)
  const featuredFilmId = data?.acf?.featured_film?.[0];
  const featuredFilm = films.find((f) => f.id === featuredFilmId);

  // 🔥 Fetch media async BEFORE render
  let featuredMedia = null;

  if (featuredFilm?.acf?.hero_image) {
    // if it's already an object, skip fetch
    if (typeof featuredFilm.acf.hero_image === 'number') {
      featuredMedia = await fetchMediaFromId(featuredFilm.acf.hero_image);
    } else {
      featuredMedia = featuredFilm.acf.hero_image;
    }
  }
  const filmsWithMedia = await Promise.all(
    films.map(async (film) => {
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
  const filmsWithMediaSorted = [
    ...filmsWithMedia,
    ...filmsWithMedia,
    ...filmsWithMedia,
    ...filmsWithMedia,
    ...filmsWithMedia,
    ...filmsWithMedia,

    ...filmsWithMedia,
  ];

  return (
    <div className='px-8 md:px-16 xl:px-48 py-16 relative'>
      {/* Background */}
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
      />

      {/* Header */}
      <div className='text-lg font-light mt-6 mb-16'>
        <h1 className='text-3xl md:text-6xl font-bold mb-6'>
          {data?.title?.rendered || 'FILMS'}
        </h1>
        <WysiwygContent content={headerIntro} />
      </div>

      {/* Featured Film */}
      {featuredFilm && (
        <div className='mb-20'>
          <div className='relative w-full md:w-4/5 mx-auto mb-6 h-64 md:h-96'>
            {(featuredMedia?.source_url || featuredMedia?.url) && (
              <Image
                src={featuredMedia?.source_url || featuredMedia?.url}
                alt={featuredFilm?.title?.rendered || ''}
                fill
                className='object-cover shadow-lg'
                sizes='(max-width: 768px) 100vw, 80vw'
              />
            )}
          </div>

          <div className='text-center max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-3xl  text-center font-semibold'>
              {featuredFilm?.title?.rendered}{' '}
              {featuredFilm?.acf?.year.slice(0, 4) &&
                `(${featuredFilm.acf.year.slice(0, 4)})`}
            </h2>

            {featuredFilm?.acf?.short_synopsis && (
              <WysiwygContent
                className='mt-3 text-lg'
                content={featuredFilm.acf.short_synopsis}
              ></WysiwygContent>
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
                Learn More
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Film Grid */}
      <h1 className='text-xl md:text-2xl font-bold mb-6'>
        {lang === 'en' ? 'All Films' : 'Alle Filme'}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mb-20'>
        {filmsWithMediaSorted.map((film) => (
          <a
            key={film.id}
            href={createLocalLink(`/${lang}/films/${film.slug}`)}
            className='group cursor-pointer'
          >
            <div className='relative overflow-hidden rounded-md shadow-md'>
              {film.posterUrl && (
                <Image
                  src={film.posterUrl}
                  alt={film?.title?.rendered}
                  width={400}
                  height={600}
                  className='w-full h-auto object-cover transition duration-300 group-hover:brightness-75'
                />
              )}

              <div className='absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition bg-black/40'>
                <span className='text-white font-semibold text-lg'>
                  {film?.title?.rendered}
                </span>
                {film?.acf?.year && (
                  <span className='text-white text-sm'>
                    {film.acf.year?.slice(0, 4)}
                  </span>
                )}
                <span className='mt-2 text-sm text-white underline'>
                  View Film
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AllFilmsTemplate;
