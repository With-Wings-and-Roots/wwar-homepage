import StoriesPageWrapper from '@/components/stories/StoriesPageWrapper';
import PageComponent from '@/components/page/storyPageComponent';
import React from 'react';
import WysiwygContent from '@/components/common/WysiwygContent';

const StoriesTemplate = ({
  stories,
  allMedia,
  allPersons,
  topics,
  params,
  data,
  subSlugs,
  baseLink,
  timeLineEventsDe,
  timeLineEventsEn,
}) => {
  const allEvents = [...(timeLineEventsDe || []), ...(timeLineEventsEn || [])];
  return (
    <div>
      <div className='px-8 md:px-16 xl:px-48 py-16 lg:pt-24 relative'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          className='text-3xl md:text-6xl font-light'
        />
        <div className='grid grid-cols-5 mt-12 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <WysiwygContent
              content={data.acf?.intro?.video}
              className='video'
            />
          </div>
          <div className='col-span-5 xl:col-span-2'>
            <h2 className='text-2xl lg:text-4xl font-thin'>
              {data.acf?.intro?.title}
            </h2>
            <WysiwygContent
              content={data.acf?.intro?.text}
              className='font-light md:text-lg mt-4'
            />
          </div>
        </div>
      </div>
      {subSlugs?.length > 0 &&
        !!stories?.find((s) => s.slug === subSlugs[0]) && (
          <PageComponent
            lang={params.lang}
            paramsStory={subSlugs[0]}
            stories={stories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={baseLink}
            allEvents={allEvents}
          />
        )}
      <StoriesPageWrapper
        lang={params.lang}
        stories={stories}
        allMedia={allMedia}
        allPersons={allPersons}
        topics={topics}
        baseLink={baseLink}
      />
    </div>
  );
};

export default StoriesTemplate;
