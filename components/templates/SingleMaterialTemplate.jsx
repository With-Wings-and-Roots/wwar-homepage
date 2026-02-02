import Image from 'next/image';

import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';
import WysiwygContent from '../common/WysiwygContent';
import Buttons from '../common/Buttons';
import StoryCardContainer from '../stories/StoryCardContainer';
import PageComponent from '../page/storyPageComponent';
import RelatedEvents from '../timelineEvent/relatedEvents';
import Link from 'next/link';

const renderImageVideo = async (obj) => {
  if (!obj) return null;
  if (obj.acf_fc_layout === 'image') {
    const imageData = await fetchMediaFromId(obj.image);
    if (!imageData) return null;

    return (
      <Image
        src={imageData.source_url} // use source_url
        alt={imageData.alt_text || ''}
        width={imageData.media_details.width}
        height={imageData.media_details.height}
        className='w-full h-[60vh] object-cover'
      />
    );
  } else if (obj.acf_fc_layout === 'video') {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${obj.video.split('/').pop()}`}
        className='w-full aspect-video'
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
      />
    );
  }

  return null;
};

const SingleMaterialTemplate = async ({
  subSlugs,
  lang,
  relatedStories,
  relatedEvents,
  material,
  allMedia,
  topics,
  allPersons,
  data,
  relatedTeams,
}) => {
  const title = material[0]?.title || 'Material';
  const acf = material[0]?.acf || null;
  // if (!acf) return notFound();

  // Fetch hero media if it's an image
  const heroMedia = acf.imagevideo?.[0];
  const heroContent =
    heroMedia?.acf_fc_layout === 'image' ? (
      await renderImageVideo(heroMedia)
    ) : (
      <iframe
        src={`https://player.vimeo.com/video/${heroMedia?.video
          .split('/')
          .pop()}`}
        className='w-full aspect-video'
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
      />
    );
  return (
    <div className='flex flex-col -mt-20 pt-20 mb-20'>
      {subSlugs?.length > 1 &&
        subSlugs[1] === 'story' &&
        !!relatedStories?.find((s) => s.slug === subSlugs[0]) && (
          <PageComponent
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
      {/* ================= HERO ================= */}
      <section className='relative flex flex-col xl:flex-row items-center xl:items-start min-h-[60vh] px-8 md:px-16 xl:px-48 py-16 gap-8'>
        {/* Left side: Image or Video */}
        <div className='w-full xl:w-1/2 flex justify-center'>
          {heroMedia?.acf_fc_layout === 'video'
            ? await renderImageVideo(heroMedia)
            : heroContent}
        </div>

        {/* Right side: Title + Intro */}
        <div className='w-full xl:w-1/2 text-center xl:text-left flex flex-col justify-center'>
          <h1 className='text-4xl md:text-6xl font-light mb-4'>
            {acf.title || title}
          </h1>
          {acf.text && (
            <WysiwygContent content={acf.text} className='text-lg font-light' />
          )}
        </div>
      </section>

      {/* ================= QUICK FACTS ================= */}
      {acf.quick_facts?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 pt-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-wwr_yellow_orange p-8 rounded-lg'>
            {acf.quick_facts.map((fact, i) => (
              <div key={i}>
                <h4 className='font-bold uppercase text-sm'>{fact.title}</h4>
                <p className='text-lg'>{fact.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= BUTTONS / DOWNLOADS ================= */}
      {acf.buttons?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <div className='flex flex-wrap gap-4'>
            <Buttons buttons={acf.buttons} />
          </div>
        </section>
      )}

      {/* ================= LEARNING GOALS ================= */}
      {acf.learning_goals?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          {acf.learning_goals.map((goal, i) => (
            <div key={i} className='mb-8'>
              {goal.heading && (
                <h3 className='text-2xl font-bold mb-2'>{goal.heading}</h3>
              )}
              {goal.explanation && (
                <p className='text-lg whitespace-pre-line'>
                  {goal.explanation}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= RELATED VIDEOS ================= */}
      {acf.related_videos?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <h3 className='text-2xl font-bold mb-4'>Related Videos</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {acf.related_videos.map((video, i) => (
              <div key={i} className='aspect-video w-full'>
                <iframe
                  src={`https://player.vimeo.com/video/${video.related_videos
                    .split('/')
                    .pop()}`}
                  className='w-full aspect-video'
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= RELATED STORIES ================= */}
      {acf.related_stories?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <h3 className='text-2xl font-bold mb-4'>Related Stories</h3>
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

      {/* ================= RELATED TIMELINES ================= */}
      {acf.related_timelines?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <RelatedEvents
            relatedEvents={relatedEvents}
            lang={lang}
            baseLink={createLocalLink(`/${lang}/timelines/`)}
            allMedia={allMedia}
            person={''}
          />
        </section>
      )}

      {/* ================= EDUCATIONAL QUESTIONS ================= */}
      {acf.questions?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-12'>
          <h3 className='text-2xl font-bold mb-4'>Educational Questions</h3>
          {acf.questions.map((q, i) => (
            <ul key={i} className='list-disc pl-6 space-y-2'>
              {q.question.split(',\r\n').map((item, idx) => (
                <li key={idx}>{item.replace(/["]/g, '').trim()}</li>
              ))}
            </ul>
          ))}
        </section>
      )}

      {/* ================= TEAM ================= */}
      {relatedTeams.map((teamItem, i) => (
        <section key={i} className='px-8 md:px-16 xl:px-48 py-12'>
          <h4 className='text-xl font-semibold mb-6 text-center xl:text-left'>
            {teamItem.team_title}
          </h4>

          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {teamItem.related_members.map((member) => {
              const mediaUrl = allMedia?.find(
                (media) => media.id === member?.acf?.profile_icon
              )?.source_url;

              return (
                <li key={member.id} className='flex justify-center'>
                  <Link
                    href={member.acf?.external_link || '#'}
                    target='_blank'
                    className='group flex flex-col items-center text-center'
                  >
                    {/* Profile Icon */}
                    <div className='w-40 h-40 rounded-full overflow-hidden border border-gray-200 group-hover:border-wwr_yellow_orange transition-colors duration-200'>
                      {mediaUrl ? (
                        <Image
                          src={mediaUrl}
                          alt={member.title?.rendered || ''}
                          width={160}
                          height={160}
                          className='w-full h-full object-contain p-2 bg-white'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-100 text-gray-400'>
                          <svg
                            className='w-8 h-8'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0'
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <p className='mt-3 text-sm font-light leading-snug group-hover:text-wwr_yellow_orange transition-colors duration-200'>
                      {member.title?.rendered}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default SingleMaterialTemplate;
