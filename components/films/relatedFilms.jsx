import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import { getFilmById } from '@/utilities/films';
import { fetchMediaFromId } from '@/utilities/media';

const RelatedFilms = async ({ relatedFilmIds, lang = 'en' }) => {
  if (!relatedFilmIds?.length) return null;

  const films = await Promise.all(
    relatedFilmIds.map(async (id) => {
      const film = await getFilmById(id, lang);
      const filmMedia = film?.acf?.hero_image || film?.acf?.poster_image;
      const media = filmMedia
        ? await fetchMediaFromId(filmMedia)
        : null;

      return { ...film, media };
    })
  );

  return (
    <section className="px-8 md:px-16 xl:px-48 py-12 bg-yellow-50 text-black">
      <h2 className="text-3xl md:text-5xl font-light mb-8">
        {lang === 'en' ? 'Related Films' : 'Verwandte Filme'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        {films.map((film) => (
          <Link
            key={film.id}
            href={createLocalLink(`/films/${film.slug}`)}
            className="block h-full overflow-hidden flex flex-col bg-white"
          >
            <div className="relative w-full h-40 sm:h-36 bg-gray-200">
              {film.media && (
                <Image
                  src={film.media.source_url}
                  alt={film.title.rendered}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-4 bg-wwr_yellow_orange flex-1 flex items-end">
              <h3 className="text-lg font-medium line-clamp-2">
                {film.title.rendered}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedFilms;