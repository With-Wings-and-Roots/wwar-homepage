import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';
import VisualStrip from '../projects/visualStrip';
import gfx_bg_blue from '@/public/bg_blue.png';
import { getStoryById } from '@/utilities/stories';
import StoryPageComponent from '../page/storyPageComponent';
import StoryCardContainer from '../stories/StoryCardContainer';
import { createLocalLink } from '@/utilities/links';
import Team from '../common/TeamModal';

const getEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.includes('youtu.be')
      ? url.split('/').pop()
      : new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop();
    return `https://player.vimeo.com/video/${id}`;
  }

  return null;
};

const resolveMedia = async (field) => {
  if (!field) return null;

  if (typeof field === 'number') {
    return await fetchMediaFromId(field);
  }

  return field; // already object
};

const SingleFilmTemplate = async ({
  data,
  film,
  lang,
  allMedia,
  allPersons,
  subSlugs,
  topics,
  relatedTeams,
}) => {
  const acf = film?.acf || {};
  const embedUrl = getEmbedUrl(acf.trailer);
  const formattedTeams = relatedTeams.map((team) => ({
    team_title: team.team_title.replace(/\r\n/g, ' ').trim(),
    member: team.related_members?.[0] || null,
  }));

  // ✅ FETCH ALL MEDIA BEFORE RENDER
  const heroMedia = await resolveMedia(acf.hero_image);
  const posterMedia = await resolveMedia(acf.poster_image);
  const directorMedia = await resolveMedia(acf.director_image);

  const galleryMedia = await Promise.all(
    (acf.gallery || []).map((img) => resolveMedia(img))
  );

  const peopleMedia = await Promise.all(
    (acf.person || []).map(async (p) => {
      const media = await resolveMedia(p.image);
      return { ...p, media };
    })
  );
  const relatedStoryIds = acf?.related_stories || [];
  const relatedStories = relatedStoryIds.length
    ? (
        await Promise.all(
          relatedStoryIds.map((id) => getStoryById(id, lang).catch(() => null))
        )
      ).filter(Boolean)
    : [];

  return (
    <div className='flex flex-col gap-24 -mt-20 mb-20'>
      {subSlugs?.length > 1 &&
        subSlugs[1] === 'story' &&
        !!relatedStories?.find((s) => s.slug === subSlugs[0]) && (
          <StoryPageComponent
            lang={lang}
            paramsStory={subSlugs[0]}
            stories={relatedStories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={createLocalLink(
              `/${lang}/${data?.slug}/${subSlugs[2]}/story/`
            )}
            backLink={createLocalLink(`/${lang}/${data?.slug}/${subSlugs[2]}/`)}
          />
        )}
      <div className='fixed inset-0 -z-10'>
        <Image
          src={gfx_bg_blue}
          alt=''
          fill
          priority
          className='object-cover object-center opacity-40'
        />
      </div>
      {/* 1. HERO */}
      <section className='relative w-full h-[80vh] '>
        {heroMedia?.source_url && (
          <Image
            src={heroMedia.source_url}
            alt={film?.title?.rendered || ''}
            fill
            className='object-cover'
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 px-8 md:px-16 xl:px-48 flex items-end pb-10'>
          <div className=' text-white max-w-2xl'>
            <h1 className='text-4xl md:text-6xl font-bold'>
              {film?.title?.rendered}
            </h1>

            <p className='mt-2 text-lg'>
              {acf.year?.slice(0, 4)} • {acf.runtime}
            </p>

            {acf.tagline && <p className='mt-4'>{acf.tagline}</p>}

            <div className='mt-6 flex gap-4 flex-wrap'>
              {embedUrl && (
                <a
                  href='#trailer'
                  className='bg-wwr_yellow_orange text-black text-sm rounded-lg lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                >
                  Watch Trailer
                </a>
              )}

              {acf.ctas?.length > 0 &&
                acf.ctas.map((cta, i) => (
                  <a
                    key={i}
                    href={cta?.link?.url}
                    target={cta?.link?.target || '_self'}
                    rel='noopener noreferrer'
                    className='rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                  >
                    {cta?.link?.title}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRAILER */}
      {embedUrl && (
        <section id='trailer' className='px-8 md:px-16 xl:px-48'>
          <div className='max-w-4xl'>
            <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
              {lang === 'en' ? 'Watch Trailer' : 'Trailer ansehen'}
            </h2>
            <p className='font-light text-lg mb-2'>{acf.description}</p>

            <iframe
              src={embedUrl}
              className='w-full aspect-video'
              allowFullScreen
            />
            {acf.get_screening_cta?.url && (
              <>
                <p className='font-light text-lg my-4'>
                  {lang === 'en'
                    ? 'Interested in screening this film in your community?'
                    : 'Interessiert daran, diesen Film in Ihrer Gemeinde zu zeigen?'}
                </p>
                <a
                  href={acf.get_screening_cta.url}
                  className=' rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                >
                  {acf.get_screening_cta.title || 'Request Screening'}
                </a>
              </>
            )}
          </div>
        </section>
      )}

      {/* 3. ABOUT */}
      <section className=' px-8 md:px-16 xl:px-48'>
        <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
          {lang === 'en' ? 'About the Film' : 'Über den Film'}
        </h2>
        <div className='grid md:grid-cols-2 mb-6 gap-4 items-center'>
          {posterMedia?.source_url && (
            <Image
              src={posterMedia.source_url}
              alt='Poster'
              width={500}
              height={400}
            />
          )}

          <WysiwygContent
            className='font-light text-lg mb-2'
            content={acf.short_synopsis}
          />
        </div>
        <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
          {lang === 'en' ? 'Full Synopsis' : 'Vollständige Synopsis'}
        </h2>
        <WysiwygContent
          className='font-light text-lg mb-2'
          content={acf.full_synopsis}
        />
      </section>

      {/* 4. DIRECTOR */}
      {acf.director_statment && (
        <section className='px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium'>
            {lang === 'en'
              ? `Director's Statement`
              : 'Statement des Regisseurs'}
          </h2>
          <div className='grid md:grid-cols-3 gap-8 items-center mt-12'>
            {directorMedia?.source_url && (
              <Image
                src={directorMedia.source_url}
                alt='Director'
                width={300}
                height={300}
                className='rounded-full'
              />
            )}

            <div className='md:col-span-2 relative'>
              <span className='absolute -top-6 -left-4 text-6xl text-gray-300 font-serif'>
                “
              </span>

              <div className='relative z-10'>
                <WysiwygContent
                  className='text-lg font-light'
                  content={acf.director_statment}
                />
              </div>

              <span className='block text-right text-6xl text-gray-300 font-serif mt-4'>
                ”
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 5. GALLERY */}
      {galleryMedia.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-16'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            {lang === 'en' ? `Film Stills` : 'Filmszenen'}
          </h2>
          <div className='w-full md:w-[70%] mx-auto'>
            <VisualStrip acf={acf} lang={lang} />
          </div>
        </section>
      )}

      {/* 6. PEOPLE */}
      {peopleMedia.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 '>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            {lang === 'en' ? `People in the Film` : 'Personen im Film'}
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {peopleMedia.map((p, i) => (
              <div key={i} className='flex items-center flex-col'>
                {p?.media?.source_url && (
                  <div className='w-[300px] h-[300px] relative'>
                    {p?.media?.source_url && (
                      <Image
                        src={p?.media?.source_url}
                        alt={p?.media?.alt || p?.name || ''}
                        fill
                        className='object-cover rounded-full'
                      />
                    )}
                  </div>
                )}
                <h3 className='text-lg font-light'>{p?.name}</h3>
                <p className='text-sm font-medium'>{p?.role}</p>
                <WysiwygContent
                  content={p?.short_text}
                  className='text-sm font-light mt-2'
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Awards */}
      {(acf?.award_list?.length > 0 ||
        acf?.award_laurals?.length > 0 ||
        acf?.screening_list?.length > 0) && (
        <section className='bg-wwr_yellow_orange pt-6'>
          <section className='px-8 md:px-16 xl:px-48 '>
            <h2 className='text-2xl lg:text-4xl font-medium pt-12 mb-6'>
              {lang === 'en'
                ? ' Awards & Festivals'
                : 'Auszeichnungen & Festivals'}
            </h2>
            {acf?.short_framing_heading && (
              <p className='text-lg font-light mb-4'>
                {acf?.short_framing_heading}
              </p>
            )}
            <div className='mb-6'>
              {acf?.award_list?.map((award, i) => (
                <p key={i} className=' text-sm font-light '>
                  {award['award_name']}
                </p>
              ))}
            </div>
            {acf?.award_laurals?.length > 0 && (
              <h2 className='text-2xl lg:text-4xl font-medium pt-12 mb-6'>
                {lang === 'en' ? 'Laurals' : 'Auszeichnungen'}
              </h2>
            )}
            {acf?.award_laurals?.length > 0 && (
              <div className=' flex flex-wrap gap-2 justify-start items-center mb-6'>
                {acf?.award_laurals?.map(async (award, i) => {
                  const media = await resolveMedia(award.laural);
                  return (
                    <Image
                      src={media.source_url}
                      alt={media.alt}
                      width={media.width || 160}
                      height={media.height || 160}
                      className='object-contain'
                    />
                  );
                })}
              </div>
            )}
            {acf?.screening_list?.length > 0 && (
              <h2 className='text-2xl lg:text-4xl font-medium pt-12 mb-6'>
                {lang === 'en' ? 'Screenings' : 'Vorführungen'}
              </h2>
            )}
            {acf?.screening_list?.length > 0 && (
              <div className='mb-6 pb-12'>
                {acf?.screening_list?.map(async (screening, i) => {
                  return (
                    <p key={i} className='text-sm font-light'>
                      {screening.screening_text}
                    </p>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      )}
      {/* 8. Selected Press */}
      {acf?.selected_press?.length > 0 && (
        <section className='bg-wwr_black text-white py-16 -mt-24 px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
            {lang === 'en'
              ? 'Selected Press & Feedback'
              : 'Ausgewählte Presse & Feedback'}
          </h2>

          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {acf?.selected_press.map((item, i) => (
              <a
                key={i}
                href={item.source_link || '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='group rounded-lg block text-black p-6 rounded-lg bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered transition'
              >
                <div className='flex items-start gap-4'>
                  <div>
                    <p className='font-light text-lg mb-2'>{item.quote}</p>
                    {item.news_outlet && (
                      <span className='text-sm font-semibold'>
                        — {item.news_outlet}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 9. WATCH */}
      {acf.watch_now_ctas?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
            {acf?.avaiability_text ||
              (lang === 'en' ? 'Where to Watch' : 'Wo ansehen')}
          </h2>
          {acf?.platforms?.length > 0 && (
            <div className='mb-4'>
              {acf?.platforms?.map(async (platform, i) => {
                return (
                  <p key={i} className='text-sm font-light'>
                    {platform.platform_name}
                  </p>
                );
              })}
            </div>
          )}
          <p className='text-sm font-medium mb-4 text-wwr_teal'>
            {acf?.region_note}
          </p>
          {acf?.watch_now_ctas?.length > 0 && (
            <div className='mb-4'>
              {acf?.watch_now_ctas?.map(async (cta, i) => {
                return (
                  <a
                    href={cta.cta?.url}
                    className='rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal mr-4 px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                  >
                    {cta.cta?.title || 'Watch Now'}
                  </a>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 10. CTA */}
      {acf.get_screening_cta?.url && (
        <section className='px-8 md:px-16 xl:px-48'>
          <p className='font-light text-lg mb-4'>{acf.short_text}</p>
          <a
            href={acf.get_screening_cta.url}
            className='rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
          >
            {acf.get_screening_cta.title || 'Request Screening'}
          </a>
        </section>
      )}

      {formattedTeams.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48'>
          <ul className='flex flex-wrap gap-8 justify-center xl:justify-start'>
            {formattedTeams.map((teamItem, i) => {
              const member = teamItem.member;

              const mediaUrl = allMedia?.find(
                (media) => media.id === member?.acf?.profile_icon
              )?.source_url;

              return (
                <div key={i} className='flex flex-col items-center'>
                  <Team
                    member={member}
                    mediaUrl={mediaUrl}
                    baseLink={`/${lang}/team/`}
                  />

                  <p className='font-light text-lg mb-4'>
                    {teamItem.team_title}
                  </p>
                </div>
              );
            })}
          </ul>
        </section>
      )}

      {/* 12. RELATED */}
      {acf.related_stories?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            {lang === 'en' ? 'Related Stories' : 'Verwandte Geschichten'}
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10'>
            <StoryCardContainer
              storiesToRender={relatedStories}
              lang={lang}
              allMedia={allMedia}
              allPersons={allPersons}
              baseLink={createLocalLink(
                `/${lang}/${data?.slug}/${subSlugs[0]}/story/`
              )}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleFilmTemplate;
