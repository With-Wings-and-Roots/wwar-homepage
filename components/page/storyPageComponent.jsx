import React from 'react';

import SocialShareIcons from '@/components/socialShare/socialShareIcons';
import { findIndexBySlug, getPersonById } from '@/utilities/stories';
import Header from '@/components/header/header';
import NavigationCircle from './navigationCircle';
import Categories from './categories';
import CloseIcon from './closeIcon';
import PageTitle from './pageTitle';
import ClosedCaption from './closedCaption';
import QuotationMark from './quotationMark';
import RelatedStoriesContainer from './relatedStoriesContainer';
import { fetchAllData } from '@/utilities/general';
import FullPageBackground from './fullPageBackground';

const StoryPageComponent = async ({
  lang = 'en',
  paramsStory,
  stories,
  topics,
  allMedia,
  allPersons,
}) => {
  const story = stories.find((s) => s.slug === paramsStory) || null;

  const personId = story?.person?.[0];
  const person = personId ? await getPersonById(personId) : null;

  const topicsHref = story?._links['acf:term']?.map((term) => term.href) || [];

  const categoriesArray = await Promise.all(
    topicsHref.map(async (topic) => {
      const [data] = await fetchAllData(topic);
      const temp = topics.find((t) => t.slug === data.slug);
      return temp ? { name: data.name, slug: data.slug } : null;
    })
  );

  const categories = categoriesArray.filter(Boolean);

  const storiesLength = stories.length;
  const storyIndex = parseInt(await findIndexBySlug(stories, paramsStory));

  const nextSlug =
    storyIndex === storiesLength - 1
      ? stories[0].slug
      : stories[storyIndex + 1].slug;
  const prevSlug =
    storyIndex < 1
      ? stories[storiesLength - 1].slug
      : stories[storyIndex - 1].slug;

  const relatedStories = (story?.acf?.related_stories || []).map((id) =>
    stories.find((s) => s.id === id)
  );

  return (
    <div className='relative overflow-hidden lg:py-10'>
      <div className='hidden sm:block fixed z-10 top-0 left-0'>
        <Header />
      </div>
      <FullPageBackground color={story?.acf?.color} />
      <div className='min-h-[100vh] m-auto relative flex justify-center z-50'>
        <NavigationCircle slug={prevSlug} direction={'left'}></NavigationCircle>

        <div className='bg-white w-full sm:mt-10 md:mt-8 sm:w-10/12 md:w-11/12 lg:w-4/5 max-w-[1200px] '>
          <div className='flex w-full p-4 justify-end text-4xl'>
            <CloseIcon closeLink={'../stories'} />
          </div>

          <div className='px-4 md:px-8 lg:px-20 pb-10'>
            <PageTitle title={story?.title?.rendered} />

            <div className='flex flex-wrap md:flex-nowrap gap-8 md:gap-10'>
              <div className='w-full md:w-8/12 '>
                <div className='w-full'>
                  <iframe
                    className='w-full h-[52vw] sm:h-[44vw] md:h-[30vw] lg:h-96'
                    src={story?.acf?.video_embed}
                  ></iframe>
                </div>
                <div className='flex flex-wrap gap-1 mt-4 md:mt-10'>
                  <Categories categories={categories} />
                </div>
              </div>
              <div className='w-full md:w-4/12'>
                <QuotationMark />
                <div>
                  <p className='text-xl lg:text-26px text-wwr_gray_storm font-light '>
                    <span className='leading-10'>{story?.acf?.excerpt}</span>
                  </p>
                  <div className='flex text-wwr_rich_black text-lg pt-8'>
                    <div className='font-semibold'>{person?.name} </div>
                    <div>{story?.acf?.city ? ', ' + story.acf.city : ''}</div>
                  </div>

                  <div className='h-px opacity-10 w-full bg-wwr_rich_black mb-8 mt-10'></div>

                  {story.acf?.closed_captions && <ClosedCaption />}
                  {/* Social Share Buttons */}
                  <SocialShareIcons lang={lang} />
                </div>
              </div>
            </div>
            {relatedStories.length > 0 && (
              <RelatedStoriesContainer
                relatedStories={relatedStories}
                lang={lang}
                allMedia={allMedia}
                allPersons={allPersons}
                hoverZoom={false}
              />
            )}
          </div>
        </div>

        <NavigationCircle slug={nextSlug} direction={'right'} />
      </div>
    </div>
  );
};

export default StoryPageComponent;
