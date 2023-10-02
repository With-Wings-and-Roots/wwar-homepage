"use client";
import { useState } from "react";
import Link from "next/link";

const StoryCard = ({
  title = "Test Title",
  name = "Test Name",
  city = "",
  slug,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className=" w-full h-full flex flex-col justify-between "
      >
        <h2
          className={`${
            hovered && "highlight "
          } text-[2.2vw] relative z-10 max-w-max`}
        >
          {title}
        </h2>
        <p className="text-base relative">{city}</p>

        <Link href={`/stories/${slug}`}>
          <img
            className="hover:flex absolute z-30 w-full h-full left-0 top-0 opacity-0 hover:opacity-75 transition-all duration-500"
            src="./play-icon.svg"
          />
        </Link>
      </div>
    </>
  );
};

export default StoryCard;
