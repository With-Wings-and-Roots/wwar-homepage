import Image from 'next/image';
import gfx_bg_blue from '@/public/bg_blue.png';
import gfx_arrow_down from '@/public/arrow-down--circle-white.svg';
import WysiwygContent from '@/components/common/WysiwygContent';
import PersonImageSlider from '@/components/common/PersonImageSlider';
import { createLocalLink } from '@/utilities/links';
import ScrollToElementButton from '@/components/common/ScrollToElementButton';
import React from 'react';
import Link from 'next/link';
import {
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import StoryCardContainer from '@/components/stories/StoryCardContainer';
import PageComponent from '@/components/page/storyPageComponent';
import { getAllPages } from '@/utilities/pages';
import { getAllPosts } from '@/utilities/posts';
import EventsList from '@/components/publicEvents/EventsList';
import FlexibleContent from '@/components/home/flexibleContent';

const HomeTemplate = async ({ data, params, subSlugs }) => {
  const [stories, allMedia, allPersons, topics] = await Promise.all([
    getAllStories(params.lang),
    getAllMedia(params.lang),
    getAllPersons(),
    fetchAllTopics(params.lang),
  ]);
  const pages = await getAllPages(params.lang);
  const events = await getAllPosts(params.lang, 'publicevent');
  const upcomingEvents = [...events]
    .filter((e) => new Date(e.acf?.date_sorting) > new Date())
    ?.sort(
      (a, b) => new Date(a.acf?.date_sorting) - new Date(b.acf?.date_sorting)
    );

  return (
    <div className='-mt-20'>
      {subSlugs?.length > 1 &&
        subSlugs[0] === 'story' &&
        !!stories?.find((s) => s.slug === subSlugs[1]) && (
          <PageComponent
            lang={params.lang}
            paramsStory={subSlugs[1]}
            stories={stories.filter((story) =>
              data.acf?.stories_linked_stories
                ?.map((sts) => sts.story?.ID)
                ?.includes(story.id)
            )}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={createLocalLink('/story/')}
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
              href={data.acf?.film_button?.url}
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
          <FlexibleContent items={data.acf.flexible_content} buttons={data.acf.flexible_content_buttons} />
        </div>
      ) : null}
      {upcomingEvents?.length > 1 ? (
        <div className='px-8 md:px-16 xl:px-48 pt-20'>
          <h2
            dangerouslySetInnerHTML={{
              __html: data.acf?.upcoming_events_title,
            }}
            className='text-3xl md:text-6xl font-light'
          />
          <div>
            <EventsList events={upcomingEvents} />
          </div>
        </div>
      ) : null}
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
            storiesToRender={stories.filter((story) =>
              data.acf?.stories_linked_stories
                ?.map((sts) => sts.story?.ID)
                ?.includes(story.id)
            )}
            lang={params.lang}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={createLocalLink('/story/')}
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
          <Link
            href={createLocalLink(data.acf?.timelines_page)}
            className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
          >
            {data.acf?.timelines_us_button_label}
          </Link>
          <Link
            href={createLocalLink(data.acf?.timelines_page)}
            className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
          >
            {data.acf?.timelines_german_button_label}
          </Link>
        </div>
      </div>
      <div className='relative min-h-screen'>
        <Image
          src={data.acf?.resources_image}
          alt=''
          fill={true}
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
                {data.acf?.resources_pages?.map((page, pI) => (
                  <Link
                    key={pI}
                    href={createLocalLink(
                      pages.find((p) => p.id === page.linked_page.ID)?.link
                    )}
                    className='bg-black hover:bg-wwr_yellow_orange_hovered text-wwr_yellow_orange hover:text-black text-sm lg:text-lg font-normal px-5 py-2  transition-all uppercase inline-flex'
                  >
                    {page.linked_page.post_title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
