import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SlClose } from "react-icons/sl";

import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import StoryCards from "@/app/components/stories/storyCards/StoryCards";
import { getAllStories, findIndexBySlug } from "@/app/utilities/stories";

const Story = async ({ params }) => {
  const stories = await getAllStories();
  const storiesLength = stories.length;

  const storyIndexData = await findIndexBySlug(stories, params.story);

  const storyIndex = parseInt(storyIndexData);

  const nextSlug =
    storyIndex === storiesLength - 1
      ? stories[0].slug
      : stories[storyIndex + 1].slug;
  const prevSlug =
    storyIndex < 1
      ? stories[storiesLength - 1].slug
      : stories[storyIndex - 1].slug;

  const story = stories?.filter((story) => story.slug === params.story)[0];

  let relatedStories = [];

  const relatedStoriesIdList = story.acf.related_stories;

  for (let id of relatedStoriesIdList) {
    const storyWithId = stories.filter((story) => story.id === id)[0];
    if (storyWithId) relatedStories.push(storyWithId);
  }

  const terms = story?._links["acf:term"];

  let topicsHref = [];

  let categories = [];

  terms?.map((term) => topicsHref.push(term.href));

  for (let topic of topicsHref) {
    const response = await fetch(topic);
    const data = await response.json();

    categories.push({ name: data.name, slug: data.slug });
  }

  return (
    <div className="relative overflow-hidden pb-10">
      <div className="fixed z-10 top-0 left-0">
        <StoriesPageContainer />
      </div>
      <div
        className="w-full h-screen fixed top-0 left-0 z-40 opacity-80"
        style={{ background: story.acf.color }}
      ></div>
      <div className="max-w-[1500px] min-h-[100vh] m-auto relative flex justify-center z-50 mt-16">
        <div className="flex items-center min-w-[100px] p-4 text-6xl justify-center h-[100vh] text-wwr_white relative">
          <div className="fixed">
            <Link href={`./${prevSlug}`}>
              <CiCircleChevLeft />
            </Link>
          </div>
        </div>

        <div className="bg-white w-4/5">
          <div className="flex w-full p-4 justify-end text-4xl opacity-50 ">
            <Link href="../stories">
              <div className="hover:rotate-90 transition-all duration-500">
                <SlClose />
              </div>
            </Link>
          </div>

          <div className="px-20 pb-10">
            <div className="text-4xl pb-6">{parse(story?.title?.rendered)}</div>
            <div className="flex gap-8">
              <div className=" w-8/12">
                <div className=" w-full h-96">
                  <iframe
                    className="w-full h-full"
                    src={story?.acf?.video_embed}
                    sandbox="allow-scripts allow-modal"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex gap-1 mt-10">
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <Link href={`./topic/${category.slug}`}>
                        <div className="bg-wwr_yellow_orange hover:bg-wwr_rich_black px-4 py-2 text-wwr_white hover:text-wwr_yellow_orange transition-all duration-500">
                          {parse(category.name)}
                        </div>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className=" w-4/12">
                <div className="w-20 pb-2">
                  <img src="/quotation-mark.svg" />
                </div>
                <div>
                  <p className="text-2xl text-wwr_gray_storm leading-10 font-light">
                    {story?.acf?.excerpt}
                  </p>
                  <div className="flex text-wwr_rich_black text-lg pt-8">
                    <div>{`Name, ${story?.acf?.city}`} </div>
                  </div>
                  <div className="h-px opacity-10 w-full bg-wwr_rich_black"></div>

                  <Image src="/closed-captions.svg" width={30} height={30} />
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-8 mt-16 text-xl font-light">Related Stories</h3>
              <div>
                <StoryCards stories={relatedStories} lang={params.lang} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 text-4xl min-w-[100px] justify-center text-6xl items-center h-[100vh] text-wwr_white relative">
          <div className="fixed">
            <Link href={`./${nextSlug}`}>
              <CiCircleChevRight />
            </Link>
          </div>
        </div>
      </div>
      {/* Related Stories */}
    </div>
  );
};

export default Story;
