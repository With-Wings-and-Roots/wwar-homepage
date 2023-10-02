import { getStoryMedia, getStoryMediaByMediaId } from "@/app/utilities/stories";
import StoryCard from "./StoryCard";
import Image from "next/image";
import Link from "next/link";

const StoryCardContainer = async ({ title, slug, city }) => {
  const mediaJson = await getStoryMedia(slug);

  const mediaURL = await getStoryMediaByMediaId(mediaJson);

  return (
    <div className="hover:scale-105 cursor-pointer transition-all duration-500 w-full min-h-[200px] p-8 text-wwr_white relative overflow-hidden">
      <Image
        className="absolute left-0 top-0 min-w-full min-h-full"
        src={mediaURL}
        width={200}
        height={200}
      ></Image>
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent to-wwr_yellow_orange opacity-50"></div>

      <StoryCard title={title} mediaURL={""} city={city} slug={slug} />
    </div>
  );
};

export default StoryCardContainer;
