"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

const StoryCard = ({
  title = "Test Title",
  name = "Test Name",
  city = "",
  slug,
  lang,
  color,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/${lang}/stories/${slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className=" w-full h-full flex flex-col justify-between "
      >
        <div className={`text-[2vw] relative z-10 max-w-max leading-tight`}>
          <div
            className={`${
              hovered ? "w-full" : "w-0 "
            } absolute top-0 left-0 h-full opacity-50 transition-all duration-500 z-10`}
            style={{ background: color }}
          ></div>
          <h2 className="relative z-20">{parse(title)}</h2>
        </div>
        <p className="text-base relative">{city}</p>

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
