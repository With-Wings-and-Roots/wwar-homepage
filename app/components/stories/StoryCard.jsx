"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

const StoryCard = ({
  title,
  city,
  slug,
  lang,
  color,
  personName,
  mediaUrl,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/${lang}/stories/${slug}`}>
      <div className="relative hover:scale-105 aspect-square cursor-pointer transition-all duration-500 w-full p-4 font-light text-wwr_white overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full min-w-full flex justify-start w-[136%]`}
        >
          <Image
            className="min-w-full min-h-full -ml-[18%]"
            src={mediaUrl}
            width={1024}
            height={768}
            alt={"Cover-" + slug}
            placeholder="blur"
            blurDataURL="/colors.png"
            quality={100}
          ></Image>
        </div>
        <div
          className="absolute left-0 top-0 w-full h-full opacity-40"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${color} 100%)`,
          }}
        ></div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className=" w-full h-full flex flex-col justify-between "
        >
          <div
            className={`text-lg sm:text-[2vw] lg:text-2xl relative z-10 max-w-max leading-tight`}
          >
            <span
              className="relative opacity-50 z-20 text-transparent bg-no-repeat no-underline transition-all duration-500 ease-out bg-opacity-10"
              style={{
                backgroundSize: hovered ? "100% 100%" : "0% 100%",

                backgroundImage: `linear-gradient(${color}, ${color})`,
              }}
            >
              {parse(title)}
            </span>
            <span className="absolute top-0 left-0 z-20">{parse(title)}</span>
          </div>
          <div className="text-base relative flex ">
            <div className="font-semibold">{personName} </div>
            {personName && city && <span>{`,\u00A0`}</span>}
            <div>{city}</div>
          </div>

          <Image
            className="hover:flex absolute z-30 w-full h-full left-0 top-0 opacity-0 hover:opacity-75 transition-all duration-500"
            src="/play-icon.svg"
            width={200}
            height={100}
            alt="play-icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
