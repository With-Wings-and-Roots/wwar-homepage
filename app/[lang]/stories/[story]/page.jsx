import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import SocialShareIcons from "@/app/components/socialShare/socialShareIcons";
import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";
import StoryCards from "@/app/components/stories/storyCards/StoryCards";
import {
  getAllStories,
  findIndexBySlug,
  getPersonById,
} from "@/app/utilities/stories";

const Story = async ({ params }) => {
  const stories = await getAllStories(params.lang);
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

  const person = await getPersonById(story.person[0]);

  let relatedStories = [];

  const relatedStoriesIdList = story?.acf?.related_stories || [];

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
    <div className="relative overflow-hidden lg:py-10">
      <div className="hidden sm:block fixed z-10 top-0 left-0">
        <StoriesPageContainer />
      </div>
      <div
        className="w-full h-screen fixed top-0 left-0 z-40 opacity-80"
        style={{ background: story?.acf?.color }}
      ></div>
      <div className="max-w-[1500px] min-h-[100vh] m-auto relative flex justify-center z-50">
        <NavigationCircle slug={prevSlug}>
          <CiCircleChevLeft />
        </NavigationCircle>

        <div className="bg-white w-full sm:mt-10 md:mt-8 sm:w-10/12 md:w-11/12 lg:w-4/5">
          <div className="flex w-full p-4 justify-end text-4xl opacity-50 ">
            <Link href="../stories">
              <div className="hover:rotate-90 transition-all duration-500">
                <SlClose />
              </div>
            </Link>
          </div>

          <div className="px-4 md:px-8 lg:px-20 pb-10">
            <div className="text-2xl md:text-4xl pb-6">
              {parse(story?.title?.rendered)}
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-10">
              <div className="w-full md:w-8/12 ">
                <div className="w-full">
                  <iframe
                    className="w-full h-[52vw] sm:h-[44vw] md:h-[30vw] lg:h-96"
                    src={story?.acf?.video_embed}
                    sandbox="allow-scripts allow-modal"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex flex-wrap gap-1 mt-4 md:mt-10">
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <Link href={`./topic/${category.slug}`}>
                        <div className="w-max bg-wwr_yellow_orange hover:bg-wwr_rich_black px-4 py-2 text-sm text-wwr_white hover:text-wwr_yellow_orange transition-all duration-500">
                          {parse(category.name)}
                        </div>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-4/12">
                <div className="w-10 md:w-20 pb-2">
                  <Image
                    className="w-full"
                    src="/quotation-mark.svg"
                    alt="quotation mark"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl text-wwr_gray_storm leading-10 font-light">
                    {story?.acf?.excerpt}
                  </p>
                  <div className="flex text-wwr_rich_black text-lg pt-8">
                    <div className="font-semibold">{person.name} </div>
                    <div>{story?.acf?.city ? ", " + story.acf.city : ""}</div>
                  </div>
                  {/* Social Share Buttons */}
                  <div className="font-light text-xl flex flex-wrap lg:flex-nowrap gap-4 items-center text-wwr_gray_storm pt-16 pb-4">
                    <div className="w-max">
                      {params.lang === "en" && "SHARE STORY:"}
                      {params.lang === "de" && "GESCHICHTE TEILEN:"}
                    </div>
                    <SocialShareIcons />
                  </div>
                  <div className="h-px opacity-10 w-full bg-wwr_rich_black"></div>

                  {/* <Image src="/closed-captions.svg" width={30} height={30} alt="closed caption" /> */}
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-8 mt-16 text-xl font-light">
                {params.lang === "en" && "Related Stories"}
                {params.lang === "de" && "Ähnliche Beiträge"}
              </h3>
              <div className="">
                <StoryCards stories={relatedStories} lang={params.lang} />
              </div>
            </div>
          </div>
        </div>

        <NavigationCircle slug={nextSlug}>
          <CiCircleChevRight />
        </NavigationCircle>
      </div>
    </div>
  );
};

const NavigationCircle = ({ slug, children }) => (
  <div className="hidden sm:flex min-w-max grow justify-center text-2xl sm:text-3xl lg:text-6xl items-center h-[100vh] text-wwr_white">
    <div className="relative w-7 h-7">
      <div className="fixed">
        <Link href={`./${slug}`}>{children}</Link>
      </div>
    </div>
  </div>
);

export default Story;
