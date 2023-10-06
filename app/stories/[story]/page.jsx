import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import { getAllStories, findIndexBySlug } from "@/app/utilities/stories";
import Link from "next/link";

const Story = async ({ params }) => {
  const stories = await getAllStories();
  const storiesLength = await stories.length;

  const storyIndex = parseInt(await findIndexBySlug(stories, params.story));

  const nextSlug =
    storyIndex === storiesLength - 1
      ? stories[0].slug
      : stories[storyIndex + 1].slug;
  const prevSlug =
    storyIndex < 0
      ? stories[storiesLength - 1].slug
      : stories[storyIndex - 1].slug;

  const story = stories?.filter((story) => story.slug === params.story)[0];

  console.log(story._links["acf:term"]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute z-10 top-0 left-0">
        <StoriesPageContainer />
      </div>
      <div className="w-full h-screen fixed top-0 left-0 z-40  bg-wwr_red_transparent"></div>
      <div className="w-full min-h-[100vh] relative flex justify-center z-50">
        <Link href={`./${prevSlug}`}>
          <div className="flex items-center h-[100vh]">Left</div>
        </Link>

        <div className="bg-white w-4/5 mt-14 p-4">
          <Link href="/stories">
            <div className="flex w-full justify-end">X</div>
          </Link>

          <div className="text-4xl">{story?.title?.rendered}</div>
          <div className="flex">
            <div className=" w-3/5">
              <div className=" w-full h-96 bg-green-200">
                <iframe
                  className="w-full h-full"
                  src={story?.acf?.video_embed}
                  sandbox="allow-scripts allow-modal"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex gap-4">
                <div>Button1</div>
                <div>Button2</div>
              </div>
            </div>
            <div className=" w-2/5">
              <div className="w-20">
                <img src="/quotation-mark.svg" />
              </div>
              <div>
                <p className="text-2xl text-wwr_gray_storm leading-10">
                  {story?.acf?.excerpt}
                </p>
                <div className="flex">
                  <div>Name,</div>
                  <div>Location</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href={`./${nextSlug}`}>
          <div className="flex items-center h-[100vh]">Right</div>
        </Link>
      </div>
    </div>
  );
};

export default Story;
