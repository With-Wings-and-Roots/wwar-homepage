import React from 'react';

import FullPageBackground from '../page/fullPageBackground';
import NavigationCircle from '../page/navigationCircle';
import CloseIcon from '../page/closeIcon';
import PageTitle from '../page/pageTitle';
import parse from 'html-react-parser';
import Excerpt from '../page/excerpt';
import GeneralText from '../page/generalText';
import YearButton from '../page/yearButton';
import Sidebar from './sidebar';
import { getTimelineTopicFromId } from '@/utilities/timeline';
import Button from '@/components/page/button';
import RelatedEvents from '@/components/timelineEvent/relatedEvents';
import ModalOpenBodyClass from '@/components/common/ModalOpenBodyClass';
import { createLocalLink } from '@/utilities/links';
import RelatedStoriesContainer from '../page/relatedStoriesContainer';

const TimelineEventPage = ({
  timelineEvent,
  nextSlug,
  prevSlug,
  country,
  relatedEvents,
  relatedStories,
  baseLink,
  timelineTopics,
  allMedia,
  stories,
  allPersons,
  lang,
}) => {
  const {
    timeline_event_topic,
    acf: {
      article: { event_sources, event_resources },
    },
  } = timelineEvent;

  const topicsArray = timelineTopics
    ?.filter((t) => timeline_event_topic?.includes(t.id))
    ?.map((t) => parse(t.name));

  const {
    acf: {
      basic_info: { start_date: date, end_date: endDate } = {},
      article: { lead_text, text } = {},
    } = {},
    title: { rendered: title } = {},
  } = timelineEvent || {};

  const year = date?.slice(0, 4) || null;
  const endYear = endDate?.slice(0, 4) || null;

  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 z-[500] lg:py-10 overflow-y-auto'>
      <FullPageBackground color={'black'} animation={false} />
      <ModalOpenBodyClass />
      <div className='h-[100vh] m-auto relative flex justify-center items-start z-50'>
        <NavigationCircle
          slug={prevSlug}
          direction={'left'}
          baseLink={baseLink}
        ></NavigationCircle>

        <div className='w-full sm:w-4/5 xl:w-full max-w-[1200px]'>
          <div className='bg-white sm:my-10 md:my-8'>
            <div className='flex w-full p-4 justify-end text-4xl'>
              <CloseIcon
                closeLink={`${createLocalLink(baseLink)}?date=${year}`}
              />
            </div>
            <div className='px-4 md:px-8 lg:px-20 pb-10'>
              <div className='flex gap-2 flex-wrap md:flex-nowrap'>
                <Button
                  color={`turquoise`}
                  name={
                    country === 'us'
                      ? 'United States'
                      : `${country === 'de' ? 'Germany' : ''}`
                  }
                />
                <YearButton year={year} endYear={endYear} />
              </div>
              <PageTitle title={title} />

              <div className='flex gap-8 flex-wrap md:flex-nowrap'>
                <div className='w-full md:w-2/3'>
                  <Excerpt excerpt={parse(lead_text)} color={'black'} />
                  <GeneralText text={parse(text)} />
                </div>
                <div className='w-full md:w-1/3'>
                  <Sidebar
                    sidebarContent={timelineEvent.acf?.sidebar_content}
                    stories={stories}
                    allPersons={allPersons}
                  />
                  <div className={`flex flex-col gap-px mt-10`}>
                    <div className={`flex flex-wrap gap-px`}>
                      {topicsArray.map((topicName) => {
                        return (
                          <React.Fragment key={topicName}>
                            <Button name={topicName} />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={`bg-wwr_gray_storm h-px w-full opacity-20`}></div>
              <div
                className={`px-8 sm:px-4 md:px-8 lg:px-20 pb-10 flex gap-12 font-light text-sm pt-10 `}
              >
                {event_sources && (
                  <div className={`${event_resources ? 'w-1/2' : 'w-full'}`}>
                    <div className={`text-xl font-normal pb-6`}>Sources</div>
                    <ol className={`flex flex-col gap-4`}>
                      {event_sources.map((eventSource, index) => {
                        return (
                          <li
                            className={`list-decimal [&>p>a]:text-wwr_majorelle_blue [&>p>a]:hover:underline`}
                            key={index}
                          >
                            {parse(eventSource.source)}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
                {event_resources && (
                  <div className={`${event_sources ? 'w-1/2' : 'w-full'}`}>
                    <div className={`text-xl font-normal pb-6`}>
                      Additional Resources
                    </div>
                    <ol className={`flex flex-col gap-4`}>
                      {event_resources.map((eventResource, index) => {
                        return (
                          <li
                            className={`list-decimal [&>p>a]:text-wwr_majorelle_blue [&>p>a]:hover:underline`}
                            key={index}
                          >
                            {parse(eventResource.resource)}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </div>
            </div>
            {relatedEvents && (
              <RelatedEvents
                relatedEvents={relatedEvents}
                lang={lang}
                baseLink={baseLink}
                allMedia={allMedia}
              />
            )}
            {relatedStories && (
              <RelatedStoriesContainer
                relatedStories={relatedStories}
                lang={lang}
                allMedia={allMedia}
                allPersons={allPersons}
                hoverZoom={false}
                baseLink={baseLink}
              />
            )}
          </div>
        </div>

        <NavigationCircle
          slug={nextSlug}
          direction={'right'}
          baseLink={baseLink}
        />
      </div>
    </div>
  );
};

export default TimelineEventPage;
