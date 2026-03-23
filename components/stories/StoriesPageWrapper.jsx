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
  materialCtaData,
  curriculumData,
  cities,
  exploreArchiveText,
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
          lang={language}
          baseLink={baseLink}
          cities={cities}
          exploreArchiveText={exploreArchiveText}
        />
      </div>
    </>
  );
};

export default StoriesPageWrapper;
