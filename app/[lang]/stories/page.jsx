import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";

const Stories = ({ params }) => {
  return <StoriesPageContainer lang={params.lang} />;
};

export default Stories;
