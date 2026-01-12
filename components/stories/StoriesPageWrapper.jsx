'use client';
import StoriesPageContainer from '@/components/stories/StoriesPageContainer';
import UmbrellaCards from './UmbrellaCards';

const StoriesPageWrapper = ({
  lang,
  stories,
  allMedia,
  allPersons,
  topics,
  collections,
  baseLink,
  ctaData,
  materialCtaData,
  curriculumData,
  pathways,
  cities,
}) => {
  const language = lang || 'en';
  return (
    <>
      <UmbrellaCards lang={language} />
      <div className='px-8 md:px-16 xl:px-48'>
        <StoriesPageContainer
          stories={stories}
          allMedia={allMedia}
          allPersons={allPersons}
          topics={topics}
          collections={collections}
          curriculumData={curriculumData}
          materialCtaData={materialCtaData}
          pathways={pathways}
          lang={language}
          baseLink={baseLink}
          ctaData={ctaData}
          cities={cities}
        />
      </div>
    </>
  );
};

export default StoriesPageWrapper;
