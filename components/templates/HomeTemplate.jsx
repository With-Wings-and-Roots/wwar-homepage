import Image from 'next/image';
import gfx_bg_blue from '@/public/bg_blue.png';
import gfx_arrow_down from '@/public/arrow-down--circle-white.svg';
import WysiwygContent from '@/components/common/WysiwygContent';
import PersonImageSlider from '@/components/common/PersonImageSlider';
import { createLocalLink } from '@/utilities/links';
import ScrollToElementButton from '@/components/common/ScrollToElementButton';
import React from 'react';
import Link from 'next/link';
import { fetchPersonsByIds, fetchStoriesByIds } from '@/utilities/stories';
import StoryCardContainer from '@/components/stories/StoryCardContainer';
import PageComponent from '@/components/page/storyPageComponent';
import FlexibleContent from '@/components/home/flexibleContent';
import { fetchMediaByIds, fetchMediaFromId } from '@/utilities/media';
import {
  fetchTimelinesByIds,
  getTimelineCountries,
} from '@/utilities/timeline';
import { fetchPagesByIds } from '@/utilities/pages';
import TimelineCountriesSection from '../timelines/timelineCountriesSection';
const fetchImageForTimelineContries = async (timelineCountries) => {
  const countriesWithImages = await Promise.all(
    timelineCountries.map(async (country) => {
      const mediaId = country.acf?.image;
      if (mediaId) {
        const i = await fetchMediaFromId(mediaId);
        return { ...country, imageUrl: i.source_url };
      } else {
        return { ...country, imageUrl: null };
      }
    })
  );
  return countriesWithImages;
};

const HomeTemplate = async ({ data, params, subSlug }) => {
  const linkedStoryIds =
    data.acf?.stories_linked_stories?.map((s) => s.story) || [];

  const linkedPagesIds =
    data.acf?.resources_pages?.map((r) => r.linked_page) || [];

  // Step 1: fetch independent core data in parallel
  const [linkedStories, pages] = await Promise.all([
    fetchStoriesByIds(linkedStoryIds, params.lang),
    fetchPagesByIds(linkedPagesIds, params.lang),
  ]);

  // Step 2: derive IDs
  const mediaIds = [
    ...new Set(linkedStories.map((s) => s?.featured_media).filter(Boolean)),
  ];

  const personIds = [
    ...new Set(linkedStories.map((s) => s?.acf?.person).filter(Boolean)),
  ];

  const timelineIds = [
    ...new Set(linkedStories.flatMap((s) => s?.acf?.related_events || [])),
  ];

  const relatedStoryIds = [
    ...new Set(linkedStories.flatMap((s) => s?.acf?.related_stories || [])),
  ];

  // Step 3: fetch dependent data in parallel
  const [
    allMedia,
    allPersons,
    allTimelines,
    relatedStories,
    timelineCountries,
  ] = await Promise.all([
    fetchMediaByIds(mediaIds),
    fetchPersonsByIds(personIds, params.lang),
    fetchTimelinesByIds(timelineIds, params.lang),
    fetchStoriesByIds(relatedStoryIds, params.lang),
    getTimelineCountries(params.lang),
  ]);
  const timelineCountriesWithImages =
    await fetchImageForTimelineContries(timelineCountries);

  // Step 4: merge stories
  const stories = [
    ...new Map(
      [...linkedStories, ...relatedStories].map((s) => [s.id, s])
    ).values(),
  ];
  return (
    <div className='-mt-20'>
      {subSlug && !!linkedStories?.find((s) => s.slug === subSlug) && (
        <PageComponent
          lang={params.lang}
          paramsStory={subSlug}
          stories={stories}
          allMedia={allMedia}
          allPersons={allPersons}
          topics={[]}
          allEvents={allTimelines}
          baseLink={createLocalLink(`/${params.lang}/story/`)}
          closeLink={createLocalLink(`/${params.lang}/`)}
        />
      )}
      <PersonImageSlider
        imageUrls={data.acf?.images?.map((i) => i.image)}
        height={100}
        interval={7000}
      />
      <div className='-mt-20 h-20 flex justify-center items-center relative'>
        <ScrollToElementButton elementId='fromHere'>
          <Image
            src={gfx_arrow_down}
            alt=''
            width={32}
            height={32}
            className='hover:scale-110 transition-all'
          />
        </ScrollToElementButton>
      </div>
      <div
        className='px-8 md:px-16 xl:px-48 relative bg-black text-white py-20 relative'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
        id='fromHere'
      >
        <Image
          src={gfx_bg_blue}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-50'
        />
        <div className='grid grid-cols-2 gap-12'>
          <div className='col-span-2 lg:col-span-1'>
            <div
              className='video'
              dangerouslySetInnerHTML={{ __html: data.acf?.film_video }}
            />
          </div>
          <div className='col-span-2 lg:col-span-1'>
            <h2 className='text-2xl lg:text-4xl font-medium'>
              {data.acf?.film_intro_title}
            </h2>
            <WysiwygContent
              content={data.acf?.film_text}
              className='font-light text-lg mt-4'
            />
            <Link
              href={createLocalLink(data.acf?.film_button?.url)}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex mt-6'
            >
              {data.acf?.film_button?.label}
            </Link>
          </div>
        </div>
      </div>
      {data.acf?.flexible_content?.length > 0 ? (
        <div className='px-8 md:px-16 xl:px-48 pt-20 flex flex-col gap-y-10'>
          <FlexibleContent
            items={data.acf.flexible_content}
            buttons={data.acf.flexible_content_buttons}
          />
        </div>
      ) : null}
      <div className='px-8 md:px-16 xl:px-48 pt-20'>
        <h2
          dangerouslySetInnerHTML={{
            __html: data.acf?.upcoming_events_title,
          }}
          className='text-3xl md:text-6xl font-light'
        />
        <div>
          <Link
            href={createLocalLink(data.acf?.upcoming_events_linked_page?.url)}
            className='mt-6 bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
          >
            {data.acf?.upcoming_events_linked_page?.title}
          </Link>
        </div>
      </div>
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        <h2
          dangerouslySetInnerHTML={{ __html: data.acf?.stories_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <WysiwygContent
          content={data.acf?.stories_text}
          className='font-light md:text-lg mt-1'
        />
        <Link
          href={createLocalLink(data.acf?.stories_button?.linked_page)}
          className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex mt-6'
        >
          {data.acf?.stories_button?.label}
        </Link>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10'>
          <StoryCardContainer
            storiesToRender={linkedStories}
            lang={params.lang}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={createLocalLink(`/${params.lang}/story/`)}
          />
        </div>
      </div>
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        <h2
          dangerouslySetInnerHTML={{ __html: data.acf?.timelines_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <WysiwygContent
          content={data.acf?.timelines_text}
          className='font-light md:text-lg mt-1'
        />
        <div className='flex mt-6 gap-x-4'>
          <TimelineCountriesSection
            timelineCountries={timelineCountriesWithImages}
            language={params.lang}
          />
        </div>
      </div>
      <div className='relative min-h-screen'>
        <Image
          src={data.acf?.resources_image}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='px-8 md:px-16 xl:px-48 py-20 relative'>
          <div className='grid grid-cols-3'>
            <div className='col-span-3 md:col-span-2 xl:col-span-1'>
              <h2
                dangerouslySetInnerHTML={{ __html: data.acf?.resources_title }}
                className='text-3xl md:text-6xl font-light'
              />
              <WysiwygContent
                content={data.acf?.resources_text}
                className='font-medium md:text-lg mt-1'
              />
              <div className='flex flex-col mt-6 gap-y-4 items-start'>
                {data.acf?.resources_pages?.map((page, pI) => {
                  const matchedPage = pages?.find(
                    (p) => p.id === page?.linked_page
                  );

                  if (!matchedPage) return null;

                  return (
                    <Link
                      key={pI}
                      href={createLocalLink(matchedPage?.link || '/')}
                      className='bg-black hover:bg-wwr_yellow_orange_hovered text-wwr_yellow_orange hover:text-black text-sm lg:text-lg font-normal px-5 py-2 transition-all uppercase inline-flex'
                    >
                      {matchedPage?.title?.rendered || 'Untitled'}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
