import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SlClose } from "react-icons/sl";

import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import { getAllStories, findIndexBySlug } from "@/app/utilities/stories";

const Story = async ({ params }) => {
  const stories = await getAllStories();
  const storiesLength = await stories.length;

  const storyIndex = parseInt(await findIndexBySlug(stories, params.story));

  const nextSlug =
    storyIndex === storiesLength - 1
      ? stories[0].slug
      : stories[storyIndex + 1].slug;
  const prevSlug =
    storyIndex < 1
      ? stories[storiesLength - 1].slug
      : stories[storyIndex - 1].slug;

  const story = stories?.filter((story) => story.slug === params.story)[0];

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
    <div className="relative overflow-hidden">
      <div className="absolute z-10 top-0 left-0">
        <StoriesPageContainer />
      </div>
      <div
        className="w-full h-screen fixed top-0 left-0 z-40 opacity-30"
        style={{ background: story.acf.color }}
      ></div>
      <div className="w-full min-h-[100vh] relative flex justify-center z-50">
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

          <div className="px-20">
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
                <div className="flex gap-4">
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-wwr_yellow_orange hover:bg-wwr_rich_black px-4 py-2 text-wwr_white hover:text-wwr_yellow_orange transition-all duration-500">
                        <Link href={`./topic/${category.slug}`}>
                          {parse(category.name)}
                        </Link>
                      </div>
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
                </div>
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
    </div>
  );
};

export default Story;
