import React from 'react';

import SocialShareIcons from '@/components/socialShare/socialShareIcons';
import { findIndexBySlug, getPersonById } from '@/utilities/stories';
import NavigationCircle from './navigationCircle';
import Categories from './categories';
import CloseIcon from './closeIcon';
import PageTitle from './pageTitle';
import ClosedCaption from './closedCaption';
import QuotationMark from './quotationMark';
import RelatedStoriesContainer from './relatedStoriesContainer';
import { fetchAllData } from '@/utilities/general';
import FullPageBackground from './fullPageBackground';
import { createLocalLink, createVideoEmbedLink } from '@/utilities/links';
import ModalOpenBodyClass from '@/components/common/ModalOpenBodyClass';
import RelatedEvents from '../timelineEvent/relatedEvents';

const StoryPageComponent = ({
  lang = 'en',
  paramsStory,
  stories,
  topics,
  allMedia,
  allPersons,
  baseLink,
  allEvents,
}) => {
  const story = stories.find((s) => s.slug === paramsStory) || null;

  const personId = story?.acf?.person;
  const person = personId ? allPersons?.find((p) => p.id === personId) : null;

  const categoriesArray = topics
    ?.filter((t) => story?.acf?.topics?.includes(t.id))
    ?.map((t) => ({ name: t.name, slug: t.slug }));

  const categories = categoriesArray.filter(Boolean);

  const storiesLength = stories.length;
  const storyIndex = parseInt(findIndexBySlug(stories, paramsStory));

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
  const relatedEvents = (story?.acf?.related_events || []).map((id) =>
    allEvents?.find((e) => e.id === id)
  );
  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 z-[500] lg:py-10 overflow-y-auto'>
      <ModalOpenBodyClass />
      <FullPageBackground color={story?.acf?.color} />
      <div className='h-[100vh] m-auto relative flex justify-center items-start z-50'>
        <NavigationCircle
          slug={prevSlug}
          direction={'left'}
          baseLink={baseLink}
        />

        <div className='w-full sm:w-4/5 xl:w-full max-w-[1200px]'>
          <div className='bg-white sm:my-10 md:my-8'>
            <div className='flex w-full p-4 justify-end text-4xl'>
              <CloseIcon closeLink={createLocalLink(baseLink)} />
            </div>

            <div className='px-4 md:px-8 lg:px-20 pb-10'>
              <PageTitle title={story?.title?.rendered} />

              <div className='flex flex-wrap md:flex-nowrap gap-8 md:gap-10'>
                <div className='w-full md:w-8/12 '>
                  <div className='w-full'>
                    <iframe
                      className='w-full h-[52vw] sm:h-[44vw] md:h-[30vw] lg:h-96'
                      src={createVideoEmbedLink(story?.acf?.video_embed)}
                    ></iframe>
                  </div>
                  <div className='flex flex-wrap gap-1 mt-4 md:mt-10'>
                    <Categories categories={categories} />
                  </div>
                </div>
                <div className='w-full md:w-4/12'>
                  <div className={`w-10 md:w-20 pb-2`}>
                    <QuotationMark />
                  </div>
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
            </div>

            {relatedStories.length > 0 && (
              <RelatedStoriesContainer
                relatedStories={relatedStories}
                lang={lang}
                allMedia={allMedia}
                allPersons={allPersons}
                hoverZoom={false}
                person={person?.name}
                baseLink={baseLink}
              />
            )}
            {relatedEvents?.length > 0 && (
              <RelatedEvents
                relatedEvents={relatedEvents}
                lang={lang}
                baseLink={baseLink}
                allMedia={allMedia}
                person={person?.name}
              />
            )}
          </div>
        </div>

        <NavigationCircle
          baseLink={baseLink}
          slug={nextSlug}
          direction={'right'}
        />
      </div>
    </div>
  );
};

export default StoryPageComponent;
