import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";

const Story = () => {
  return (
    <div className="relative">
      <StoriesPageContainer />
      <div className="min-w-full min-h-full absolute flex justify-center items-center">
        <div className="w-[80vw] h-[80vh] bg-white opacity-50 flex justify-center items-center relative">
          abcd
        </div>
      </div>
    </div>
  );
};

export default Story;
