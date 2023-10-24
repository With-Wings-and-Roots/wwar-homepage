import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import SocialShareIcons from "@/app/components/socialShare/socialShareIcons";
import {
  getAllStories,
  findIndexBySlug,
  getPersonById,
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
} from "@/app/utilities/stories";
import Header from "@/app/components/header/header";
import StoryCardContainer from "@/app/components/stories/StoryCardContainer";

const Story = async ({ params }) => {
  const stories = await getAllStories(params.lang);
  const topics = await fetchAllTopics(params.lang);
  const allMedia = await getAllMedia(params.lang);

  const allPersons = await getAllPersons();

  const storiesLength = stories.length;

  const storyIndexData = await findIndexBySlug(stories, params.story);

  const storyIndex = parseInt(storyIndexData);

  const nextSlug =
    storyIndex === storiesLength - 1
      ? [...stories][0].slug
      : stories[storyIndex + 1].slug;
  const prevSlug =
    storyIndex < 1
      ? stories[storiesLength - 1].slug
      : stories[storyIndex - 1].slug;

  const story = [...stories.filter((story) => story.slug === params.story)][0];

  const person = await getPersonById(story?.person[0]);

  let relatedStories = [];

  const relatedStoriesIdList = story?.acf?.related_stories || [];

  for (let id of relatedStoriesIdList) {
    const storyWithId = stories.filter((story) => story.id === id);
    relatedStories = [...relatedStories, ...storyWithId];
  }

  const terms = story?._links["acf:term"];

  let topicsHref = [];

  let categories = [];

  terms?.map((term) => topicsHref.push(term.href));

  for (let topic of topicsHref) {
    const response = await fetch(topic);
    const data = await response.json();

    let temp = topics.filter((topic) => {
      return topic.slug === data.slug;
    });

    if (temp.length > 0) {
      categories.push({ name: data.name, slug: data.slug });
    }
  }

  return (
    <div className="relative overflow-hidden lg:py-10">
      <div className="hidden sm:block fixed z-10 top-0 left-0">
        {/* <StoriesPageWrapper lang={params.lang} /> */}
        <Header />
      </div>
      <div
        className="w-full h-screen fixed top-0 left-0 z-40 opacity-80"
        style={{ background: story?.acf?.color }}
      ></div>
      <div className="min-h-[100vh] m-auto relative flex justify-center z-50">
        <NavigationCircle slug={prevSlug} direction={"left"}></NavigationCircle>

        <div className="bg-white w-full sm:mt-10 md:mt-8 sm:w-10/12 md:w-11/12 lg:w-4/5 max-w-[1200px] ">
          <div className="flex w-full p-4 justify-end text-4xl">
            <Link href="../stories">
              <div className="hover:rotate-90 transition-all duration-500">
                <Image
                  src={"/close-icon.svg"}
                  width={45}
                  height={45}
                  alt="Close"
                />
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
                  ></iframe>
                </div>
                <div className="flex flex-wrap gap-1 mt-4 md:mt-10">
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <div className="w-max bg-wwr_yellow_orange px-4 py-2 text-sm text-wwr_white transition-all duration-500">
                          {parse(category.name)}
                        </div>
                      </div>
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
                  <p className="text-xl lg:text-26px text-wwr_gray_storm font-light ">
                    <span className="leading-10">{story?.acf?.excerpt}</span>
                  </p>
                  <div className="flex text-wwr_rich_black text-lg pt-8">
                    <div className="font-semibold">{person?.name} </div>
                    <div>{story?.acf?.city ? ", " + story.acf.city : ""}</div>
                  </div>

                  <div className="h-px opacity-10 w-full bg-wwr_rich_black mb-8 mt-10"></div>

                  {story.acf?.closed_captions && (
                    <div>
                      <Image
                        className="mb-3"
                        src="/closed-captions.svg"
                        width={30}
                        height={30}
                        alt="closed caption"
                      />
                      <div className="text-base font-bold">
                        Closed Captions available
                      </div>
                      <div className="text-xs font-light text-wwr_gray_storm py-3">
                        <div className="leading-[17px]">{`We have subtitles available for this video! Turn on
                        subtitles by clicking the CC (closed captions) icon in
                        the video player and enjoy the content in English.`}</div>
                      </div>
                    </div>
                  )}
                  {/* Social Share Buttons */}
                  <SocialShareIcons lang={params.lang} />
                </div>
              </div>
            </div>
            {relatedStories.length > 0 && (
              <div>
                <h3 className="mb-8 mt-16 text-xl font-light">
                  {params.lang === "de"
                    ? "Ähnliche Beiträge"
                    : "Related Stories"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <StoryCardContainer
                    storiesToRender={relatedStories}
                    lang={params.lang}
                    allMedia={allMedia}
                    allPersons={allPersons}
                    hoverZoom={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <NavigationCircle slug={nextSlug} direction={"right"} />
      </div>
    </div>
  );
};

const NavigationCircle = ({ slug, direction }) => (
  <div className="hidden sm:flex min-w-max grow justify-center text-2xl sm:text-3xl lg:text-6xl items-center h-[100vh] text-wwr_white">
    <div className="relative w-16 h-16 mb-16">
      <div className="fixed">
        <Link href={`./${slug}`}>
          <Image
            src={direction === "left" ? "/arrow-left.svg" : "/arrow-right.svg"}
            width={64}
            height={64}
            className="w-16 h-16"
            alt="arrow"
          />
        </Link>
      </div>
    </div>
  </div>
);

export default Story;

export async function generateStaticParams() {
  const storiesEn = await getAllStories("en");
  const storiesDe = await getAllStories("de");

  const enStories = storiesEn.map((story) => ({
    lang: "en",
    story: story.slug,
  }));
  const deStories = storiesDe.map((story) => ({
    lang: "de",
    story: story.slug,
  }));

  return [...enStories, ...deStories];
}
