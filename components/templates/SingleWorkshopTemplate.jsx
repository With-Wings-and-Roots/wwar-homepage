'use client';

import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import gfx_bg_blue from '@/public/bg_blue.png';
import VisualStrip from '../projects/visualStrip';
import { getFilmById } from '@/utilities/films';

const resolveMedia = async (field) => {
  if (!field) return null;
  if (typeof field === 'number') return await fetchMediaFromId(field);
  return field;
};

const SingleWorkshopTemplate = async ({ workshop, lang = 'en' }) => {
  const acf = workshop?.acf || {};

  const heroMedia = await resolveMedia(acf.hero_image);
  const featuredFilm = await getFilmById(acf.featured_films[0]);

  // Fetch featured media
  let featuredMedia = null;
  if (featuredFilm?.acf?.hero_image) {
    if (typeof featuredFilm.acf.hero_image === 'number') {
      featuredMedia = await fetchMediaFromId(featuredFilm.acf.hero_image);
    } else {
      featuredMedia = featuredFilm.acf.hero_image;
    }
  }

  return (
    <div className='flex flex-col gap-24 -mt-20 mb-20'>
      {/* 🔵 BACKGROUND SAME AS FILM */}
      <div className='fixed inset-0 -z-10'>
        <Image
          src={gfx_bg_blue}
          alt=''
          fill
          className='object-cover opacity-40'
        />
      </div>

      {/* 1️⃣ HERO (FILM STYLE) */}
      <section className='relative w-full h-[80vh]'>
        {heroMedia?.source_url && (
          <Image
            src={heroMedia.source_url}
            alt={workshop?.title?.rendered}
            fill
            className='object-cover'
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 px-8 md:px-16 xl:px-48 flex items-end pb-10'>
          <div className='text-white max-w-2xl'>
            <h1
              className='text-4xl md:text-6xl font-bold'
              dangerouslySetInnerHTML={{
                __html: workshop?.title?.rendered,
              }}
            />

            <p className='mt-2 text-lg font-light'>
              {acf.duration} • {acf.format_details}
            </p>

            {acf.description && (
              <p className='mt-4 text-lg'>{acf.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* 2️⃣ ABOUT / OVERVIEW */}
      <section className='px-8 md:px-16 xl:px-48'>
        <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
          {lang === 'en' ? 'About the Workshop' : 'Über den Workshop'}
        </h2>

        <WysiwygContent className='text-lg font-light' content={acf.overview} />

        <div className='grid md:grid-cols-2 gap-6 mt-6 text-sm'>
          <p>
            <strong>Duration:</strong> {acf.duration}
          </p>
          <p>
            <strong>Format:</strong> {acf.format_details}
          </p>
          <p>
            <strong>Audience:</strong> {acf.age_range}
          </p>
          <p>
            <strong>Location:</strong> {acf.location_availability}
          </p>
        </div>
      </section>

      {/* 3️⃣ WHAT HAPPENS */}
      {acf.content?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            What Happens
          </h2>

          <div className='grid gap-4'>
            {acf.content.map((item, i) => (
              <div key={i} className='border p-4 rounded-lg'>
                <h3 className='font-semibold'>{item.c_heading}</h3>
                <WysiwygContent className='text-sm' content={item.c_text} />
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Featured Film */}
      {/* {featuredFilm && (
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
      )} */}
      {/* 4️⃣ WORKSHOP COMPONENTS */}
      {acf.workshop_component?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            Workshop Components
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>
            {acf.workshop_component.map((comp, i) => (
              <div key={i} className='bg-white/5 border p-4 rounded-lg'>
                <h3 className='font-semibold'>{comp.title}</h3>
                <p className='text-sm'>{comp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5️⃣ TESTIMONIALS (FILM STYLE) */}
      {acf.testimonials?.length > 0 && (
        <section className='bg-wwr_black text-white py-16 px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
            Testimonials
          </h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {acf.testimonials.map((t, i) => (
              <div
                key={i}
                className='bg-wwr_yellow_orange text-black p-6 rounded-lg'
              >
                <p className='text-lg mb-2'>“{t.quote}”</p>
                <span className='text-sm font-semibold'>
                  — {t.name}, {t.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6️⃣ GALLERY */}
      <section className='px-8 md:px-16 xl:px-48'>
        <h2 className='text-2xl lg:text-4xl font-medium mb-6'>Gallery</h2>

        <VisualStrip acf={acf} lang={lang} />
      </section>

      {/* 7️⃣ CTA (STRONG LIKE FILM PAGE) */}
      {acf.link?.url && (
        <section className='px-8 md:px-16 xl:px-48 text-center'>
          <h2 className='text-3xl font-medium mb-4'>
            {acf.heading || 'Book this Workshop'}
          </h2>

          <p className='mb-6'>{acf.cta_text}</p>

          <a
            href={acf.link.url}
            className='bg-wwr_yellow_orange text-black px-6 py-3 rounded-lg uppercase hover:text-white transition'
          >
            {acf.link.title || 'Book Now'}
          </a>
        </section>
      )}
    </div>
  );
};

export default SingleWorkshopTemplate;
