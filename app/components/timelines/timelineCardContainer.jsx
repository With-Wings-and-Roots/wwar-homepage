"use client";
import TimeLineCard from "./timelineCard";
import { easeOut, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimelineCardContainer = ({
  timeLineEvents,
  allMedia,
  timeLineEventDatesArray,
}) => {
  const [cardWidth, setCardWidth] = useState(0);
  console.log(timeLineEventDatesArray);

  const [cardWidthPercentage, setCardWidthPercentage] = useState(0);

  useEffect(() => {
    if (cardWidth && typeof window != "undefined") {
      setCardWidthPercentage(100 / Math.round(window.innerWidth / cardWidth));
    }
  }, [cardWidth]);

  const selectedDate = useSelector((state) => state.entities.rangeSlider.date);

  const [leftPosition, setLeftPosition] = useState(null);

  const dateIndex = timeLineEventDatesArray.indexOf(selectedDate) || 0;

  useEffect(() => {
    setLeftPosition(`${-cardWidthPercentage * dateIndex}%`);
  }, [cardWidthPercentage, dateIndex]);

  return (
    <div className="w-screen overflow-hidden">
      <motion.div
        animate={{ x: leftPosition ? leftPosition : 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        drag="x"
        className="flex"
      >
        {timeLineEvents.map((timeLineEvent, index) => {
          const mediaUrl = allMedia.filter(
            (media) => media.id === timeLineEvent.featured_media
          )[0]?.source_url;
          return (
            <React.Fragment key={index}>
              <TimeLineCard
                index={index}
                mediaUrl={mediaUrl}
                timeLineEvent={timeLineEvent}
                setCardWidth={setCardWidth}
                cardWidth={cardWidth}
              />
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TimelineCardContainer;
