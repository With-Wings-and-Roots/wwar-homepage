"use client";
import TimeLineCard from "./timelineCard";
import { easeOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimelineCardContainer = ({
  timeLineEvents,
  allMedia,
  timeLineEventDatesArray,
}) => {
  const selectedDate = useSelector((state) => state.entities.rangeSlider.date);

  const [leftPosition, setLeftPosition] = useState(0);

  const dateIndex = timeLineEventDatesArray.indexOf(selectedDate) || 0;

  useEffect(() => {
    setLeftPosition(`${-20 * dateIndex}%`);
  });

  return (
    <div className="w-screen overflow-hidden">
      <motion.div
        animate={{ x: leftPosition }}
        transition={{ duration: 0.8, ease: easeOut }}
        drag="x"
        className="flex"
      >
        {timeLineEvents.map((timeLineEvent, index) => {
          const mediaUrl = allMedia.filter(
            (media) => media.id === timeLineEvent.featured_media
          )[0]?.source_url;
          return (
            <TimeLineCard
              index={index}
              mediaUrl={mediaUrl}
              timeLineEvent={timeLineEvent}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default TimelineCardContainer;
