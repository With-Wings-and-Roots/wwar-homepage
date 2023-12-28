import { useSelector, useDispatch } from 'react-redux';
import { storySelected } from '@/store/selectedStory';

const SingleTabButton = ({ buttonText = '', slug = 'all' }) => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.entities.language.language);

  const selectedTopic = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  const allTopics = useSelector((state) => state.entities.topics);

  const selectTopic = () => {
    const selectedTopicId =
      allTopics.allTopics.find((topic) => topic.slug === slug)?.id || null;

    dispatch(
      storySelected({
        selection: slug,
        id: selectedTopicId ? selectedTopicId : null,
      })
    );
  };

  return (
    <>
      <div
        onClick={selectTopic}
        className={`${
          selectedTopic === slug
            ? 'bg-wwr_rich_black text-wwr_yellow_orange'
            : 'bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered text-wwr_rich_black  hover:text-wwr_white'
        } text-sm lg:text-xl w-max px-3 py-1.5 lg:py-3  hover:cursor-pointer transition-all duration-300 font-extralight`}
      >
        {buttonText}
      </div>
    </>
  );
};

export default SingleTabButton;
