const {
  default: StoriesPageContainer,
} = require("../../components/stories/StoriesPageContainer");

const Stories = (props) => {
  return <StoriesPageContainer lang={props.params.lang} />;
};

export default Stories;
