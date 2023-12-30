'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import TimelineCardInternal from '@/components/timelines/timelineCardInternal';

const TimeLineCard = ({
  mediaUrl,
  timeLineEvent,
  setCardWidth,
  cardWidth,
  selectedCountry,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardWidth != cardRef.current.offsetWidth) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  });

  return (
    <div
      ref={cardRef}
      className={`relative aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:w-1/6 shrink-0`}
    >
      <TimelineCardInternal
        mediaUrl={mediaUrl}
        timeLineEvent={timeLineEvent}
        selectedCountry={selectedCountry}
        link={`./timelines/${timeLineEvent.slug}`}
      />
    </div>
  );
};

export default TimeLineCard;
