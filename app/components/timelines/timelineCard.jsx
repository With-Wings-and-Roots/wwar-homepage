"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import parse from "html-react-parser";

const TimeLineCard = ({
  mediaUrl,
  timeLineEvent,
  setCardWidth,
  cardWidth,
  language,
  selectedCountry,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardWidth != cardRef.current.offsetWidth) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  });

  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={cardRef}
      className="relative aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:w-1/6 shrink-0 flex flex-col justify-end cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        className={`absolute min-w-full min-h-full ${hovered ? "blur" : ""}`}
        src={mediaUrl ? mediaUrl : "/colors.png"}
        fill={true}
        style={{ objectFit: "cover" }}
        alt={timeLineEvent.title.rendered}
        quality={80}
        sizes="100%"
        priority={true}
      ></Image>
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-wwr_rich_black"></div>
      <div
        className={`px-[10%] sm:px-8 cursor-pointer relative transition-all text-[4.4vw] leading-snug sm:text-xl duration-500 text-wwr_white ${
          hovered ? "pb-[20%] sm:pb-16" : "pb-[10%]"
        }`}
      >
        <div
          className={`scale-90 font-extralight tracking-wider mb-2  w-max px-2 py-1 transition-all duration-300 ${
            language === "en" && selectedCountry === "de" && "bg-wwr_turquoise"
          }`}
        >
          {timeLineEvent.acf.basic_info.start_date.slice(0, 4)}
        </div>

        <div className="font-light">{parse(timeLineEvent.title.rendered)}</div>
      </div>
    </div>
  );
};

export default TimeLineCard;
