import { getStoryMedia, getStoryMediaByMediaId } from "@/app/utilities/stories";
import StoryCard from "./StoryCard";
import Image from "next/image";

const StoryCardContainer = async ({ title, slug, city, lang, color }) => {
  const mediaJson = await getStoryMedia(slug);

  const mediaURL = await getStoryMediaByMediaId(mediaJson);

  return (
    <div className="relative hover:scale-105 cursor-pointer transition-all duration-500 w-full min-h-[170px] lg:min-h-[12vw] p-4 font-light text-wwr_white overflow-hidden">
      <Image
        className="absolute left-0 top-0 min-w-full min-h-full"
        src={mediaURL}
        width={200}
        height={100}
        alt={"Cover " + slug}
      ></Image>
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent to-wwr_yellow_orange opacity-30"></div>

      <StoryCard
        title={title}
        mediaURL={""}
        city={city}
        slug={slug}
        lang={lang}
        color={color}
      />
    </div>
  );
};

export default StoryCardContainer;
