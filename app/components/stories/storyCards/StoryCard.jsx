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
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/${lang}/stories/${slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className=" w-full h-full flex flex-col justify-between "
      >
        <h2
          className={`${
            hovered && "highlight "
          } text-[2vw] relative z-10 max-w-max leading-tight`}
        >
          {parse(title)}
        </h2>
        <p className="text-base relative">{city}</p>

        <Image
          className="hover:flex absolute z-30 w-full h-full left-0 top-0 opacity-0 hover:opacity-75 transition-all duration-500"
          src="/play-icon.svg"
          width={200}
          height={100}
        />
      </div>
    </Link>
  );
};

export default StoryCard;
