"use client";
import React, { useState } from "react";
import Image from "next/image";

const TimeLineCard = ({ index, mediaUrl, timeLineEvent }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={index}
      className="relative aspect-square w-1/5 shrink-0 flex flex-col justify-end cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        className={`absolute min-w-full min-h-full ${hovered ? "blur" : ""}`}
        src={mediaUrl}
        fill={true}
        style={{ objectFit: "cover" }}
        alt={" "}
        placeholder="blur"
        blurDataURL="/colors.png"
        quality={80}
        sizes="100%"
      ></Image>
      <div
        className={`p-8 relative transition-all duration-500 ${
          hovered ? "pb-16" : ""
        }`}
      >
        <div>
          {new Date(timeLineEvent.acf.basic_info.start_date).getFullYear()}
        </div>
        <div>{timeLineEvent.title.rendered}</div>
      </div>
    </div>
  );
};

export default TimeLineCard;
