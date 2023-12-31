import StoriesPageContainer from '@/components/stories/StoriesPageContainer';

const StoriesPageWrapper = async ({
  lang,
  stories,
  allMedia,
  allPersons,
  topics,
  baseLink,
}) => {
  const language = lang || 'en';

  return (
    <>
      <div className='px-8 md:px-16 xl:px-48'>
        <StoriesPageContainer
          stories={stories}
          allMedia={allMedia}
          allPersons={allPersons}
          topics={topics}
          lang={language}
          baseLink={baseLink}
        />
      </div>
    </>
  );
};

export default StoriesPageWrapper;
