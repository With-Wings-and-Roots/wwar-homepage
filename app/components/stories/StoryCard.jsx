"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

const StoryCard = ({ title, city, slug, lang, color, personName }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/${lang}/stories/${slug}`}>
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
    </Link>
  );
};

export default StoryCard;
