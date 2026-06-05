import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import gfx_bg_blue from '@/public/bg_blue.png';
import VisualStrip from '../projects/visualStrip';
import { getFilmById } from '@/utilities/films';
import { createLocalLink } from '@/utilities/links';
import { getWorkshopTypeById } from '@/utilities/workshops';
import { resolveRelatedContent } from '@/utilities/general';
import { getStoryById } from '@/utilities/stories';
import { getMaterialById } from '@/utilities/materials';
import { getProjectById } from '@/utilities/projects';
import Link from 'next/link';

const resolveMedia = async (field) => {
  if (!field) return null;
  if (typeof field === 'number') return await fetchMediaFromId(field);
  return field;
};
const normalizePost = async (post, type) => {
  if (!post) return null;

  // 🔥 FIX: unwrap weird WP response
  const data = post?.[0] ? post[0] : post;

  const featuredImage = await resolveMedia(
    data.featured_media ||
      data.acf?.banner ||
      data.acf?.imagevideo?.[0].image ||
      data.acf?.imagevideo?.[0]?.video
  );

  return {
    ...data,
    type,
    featured_image: featuredImage,
  };
};
const SingleWorkshopTemplate = async ({ workshop, lang = 'en' }) => {
  const acf = workshop?.acf || {};
  if (!acf) return notFound();
  let relatedContent = [];
  const relatedStories = await Promise.all(
    (acf?.related_stories || []).map(async (id) => {
      const post = await getStoryById(id);
      return normalizePost(post, 'story');
    })
  );

  const relatedMaterials = await Promise.all(
    (acf?.related_materials || []).map(async (id) => {
      const post = await getMaterialById(id);
      return normalizePost(post, 'material');
    })
  );

  const relatedProjects = await Promise.all(
    (acf?.related_projects || []).map(async (id) => {
      const post = await getProjectById(id);
      return normalizePost(post, 'project');
    })
  );
  relatedContent = [
    ...relatedMaterials,
    ...relatedProjects,
    ...relatedStories,
  ].filter(Boolean);
  const heroMedia = await resolveMedia(acf?.hero_image);
  const featuredFilm = await getFilmById(acf?.featured_films?.[0]);

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
    <div className='flex flex-col gap-24 -mt-20'>
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

           
          </div>
        </div>
      </section>
      {/* TITLE + INTRO + DETAILS */}
<section className="px-8 md:px-16 xl:px-48 py-16 ">
  <div className="grid md:grid-cols-12 gap-[48px]">
    
    {/* LEFT: Title + Intro */}
    <div className="md:col-span-7">
    

      {acf.overview && (
        <div className="mt-6 max-w-[680px] text-[18px] leading-[1.55] text-black/90">
          <WysiwygContent content={acf.overview} />
        </div>
      )}
    </div>

    {/* RIGHT: Workshop Details Card */}
<div className="md:col-span-5">
  <div className="p-8 bg-wwr_yellow_orange flex flex-col lg:hover:scale-105 transition-all rounded-[8px] space-y-5">

    <h3 className="font-bold text-lg lg:text-2xl">
      Workshop Details
    </h3>

    {/* Duration */}
    {acf.duration && (
      <p>
        <span className="font-bold">Duration:</span> {acf.duration}
      </p>
    )}

    {/* Audience */}
    {acf.age_range && (
      <p>
        <span className="font-bold">Audience:</span> {acf.age_range}
      </p>
    )}

    {/* Format */}
    {acf.format_details && (
      <p>
        <span className="font-bold">Format:</span> {acf.format_details}
      </p>
    )}

    {/* Location */}
    {acf.location_availability && (
      <p>
        <span className="font-bold">Location:</span>{" "}
        {acf.location_availability}
      </p>
    )}

    {/* CTA */}
    {acf.link?.url && (
      <a
        href={acf.link.url}
        className="mt-4 inline-flex justify-center bg-black text-white px-5 py-3 rounded-[8px] text-[14px] uppercase hover:opacity-90 transition"
      >
        Book this Workshop
      </a>
    )}

  </div>
</div>

  </div>
</section>
      {/* 3️⃣ WHAT HAPPENS */}

      {acf?.content?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-32 bg-[#f7f7f7]'>
          <div className='max-w-5xl mx-auto space-y-24'>
            {acf.content.map((item, i) => (
              <div key={i} className='grid grid-cols-1 md:grid-cols-2 '>
                {/* LEFT — Heading */}
                <div className='md:col-span-1'>
                  <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
                    {item.c_heading}
                  </h2>
                </div>

                {/* RIGHT — Rich Text */}
                <div className='md:col-span-2'>
                  <WysiwygContent
                    className='font-light text-lg mb-2'
                    content={item.c_text}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Film */}
      {featuredFilm?.slug && (
        <section className='px-8 md:px-16 xl:px-48'>
          <div className='grid md:grid-cols-2 gap-10 items-start'>
            {/* LEFT — Poster */}
            <div className='relative w-full aspect-video md:aspect-[3/4]'>
              {(featuredMedia?.source_url || featuredMedia?.url) && (
                <Image
                  src={featuredMedia?.source_url || featuredMedia?.url}
                  alt={featuredFilm?.title?.rendered || ''}
                  fill
                  className='object-cover rounded-lg shadow-lg'
                />
              )}
            </div>

            {/* RIGHT — Content */}
            <div>
              <p className='text-sm uppercase tracking-wide text-wwr_teal mb-2'>
{lang==='en' ? 'Film Used in This Workshop' : 'Película utilizada en este taller'}              </p>

              <h2
                className='text-2xl md:text-4xl font-semibold mb-3'
                dangerouslySetInnerHTML={{
                  __html: featuredFilm?.title?.rendered,
                }}
              />

              {/* Meta */}
              <p className='text-sm text-gray-500 mb-4'>
                {featuredFilm?.acf?.year &&
                  `${String(featuredFilm.acf.year).slice(0, 4)} • `}
                {featuredFilm?.acf?.runtime}
              </p>

              {/* Synopsis */}
              {featuredFilm?.acf?.short_synopsis && (
                <WysiwygContent
                  className='text-lg mb-6'
                  content={featuredFilm.acf.short_synopsis}
                />
              )}

              {/* Actions */}
              <div className='flex gap-4 flex-wrap'>
                {featuredFilm?.acf?.trailer && (
                  <a
                    href={`/${lang}/films/${featuredFilm.slug}#trailer`}
                    className='bg-wwr_yellow_orange text-black px-5 py-2 uppercase hover:text-white transition'
                  >
                    Watch Trailer
                  </a>
                )}

                <a
                  href={`/${lang}/films/${featuredFilm.slug}`}
                  className='border border-black px-5 py-2 uppercase hover:bg-black hover:text-white transition'
                >
                  View Film
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* 4️⃣ WORKSHOP COMPONENTS */}
      {acf.workshop_component?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-20'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
            {lang === 'en' ? 'Workshop Components' : 'Componentes del taller'}
          </h2>

          <div className='space-y-10'>
            {acf.workshop_component.map(async (comp, i) => {
              const typeId = comp.type || 'Other';
              const type = await getWorkshopTypeById(typeId, lang);

              return (
                <div
                  key={i}
                  className='border-b border-black/10 pb-8 grid md:grid-cols-12 gap-6'
                >
                  {/* LEFT — TYPE */}
                  <div className='md:col-span-3'>
                    <span className='text-xs uppercase tracking-widest text-gray-500'>
                      {type.name}
                    </span>
                  </div>

                  {/* RIGHT — CONTENT */}
                  <div className='md:col-span-9'>
                    <h3 className='text-xl md:text-2xl font-semibold mb-2'>
                      {comp.title}
                    </h3>

                    <WysiwygContent
                      className='text-base md:text-lg text-gray-700 leading-relaxed mb-4'
                      content={comp.description}
                    />

                    {/* Optional Link */}
                    {comp.link?.url && (
                      <a
                        href={comp.link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-wwr_yellow_orange text-black px-5 py-2 uppercase hover:text-white transition'
                      >
                        {comp.link.title || 'Learn More'}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* RELATED CONTENT */}
      {relatedContent?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-20'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
            {lang === 'en' ? 'Related Resources' : 'Contenido Relacionado'}
          </h2>

          <div className='grid md:grid-cols-3 gap-6'>
            {relatedContent.map((item, i) => {
              const type = item.type;

              return (
                <Link
                  key={i}
                  href={`/${lang}/${type}/${item.slug}`}
                  scroll={false}
                >
                  <div className='relative aspect-square cursor-pointer overflow-hidden rounded-lg group'>
                    {/* IMAGE */}
                    {item.featured_image?.source_url && (
                      <Image
                        src={item.featured_image.source_url}
                        alt={item.title?.rendered || ''}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                        sizes='100%'
                      />
                    )}

                    {/* GRADIENT OVERLAY */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90' />

                    {/* TYPE (top left like your system style) */}
                    <div className='absolute top-4 left-4 z-20 text-xs uppercase tracking-widest text-wwr_yellow_orange bg-black/70 px-2 py-1 rounded'>
                      {type}
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className='absolute bottom-0 left-0 right-0 p-5 z-20 text-white'>
                      {/* TITLE (animated style like StoryCard) */}
                      <h3 className='text-lg md:text-xl font-semibold leading-snug relative'>
                        {/* BACK LAYER */}
                        <span className='absolute top-0 left-0 opacity-40 transition-all duration-500 group-hover:opacity-0'>
                          {item.title?.rendered}
                        </span>

                        {/* FRONT LAYER */}
                        <span className='relative opacity-100'>
                          {item.title?.rendered}
                        </span>
                      </h3>

                      {/* EXCERPT (optional) */}
                      {item.excerpt?.rendered && (
                        <div
                          className='text-sm mt-2 text-white/70 line-clamp-2'
                          dangerouslySetInnerHTML={{
                            __html: item.excerpt.rendered,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      {/* 5️⃣ TESTIMONIALS (FILM STYLE) */}
      {acf.testimonials?.length > 0 && (
        <section className='text-black py-16 px-8 md:px-16 xl:px-48'>
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

      {acf?.gallery?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-16'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            {lang === 'en' ? `Moments of Learning` : 'Momente des Lernens'}
          </h2>
          <div className='w-full md:w-[70%] mx-auto'>
            <VisualStrip acf={acf} lang={lang} />
          </div>
        </section>)}

      {/* 7️⃣ CTA (STRONG LIKE FILM PAGE) */}
      {acf.link?.url && (
        <section className='px-8 md:px-16 xl:px-48 bg-wwr_teal py-20 text-white '>
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
