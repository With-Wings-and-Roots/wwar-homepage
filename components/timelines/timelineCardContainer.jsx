'use client';
import TimeLineCard from './timelineCard';
import { easeOut, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const TimelineCardContainer = ({
  timeLineEventsDe,
  timeLineEventsEn,
  allMedia,
  timeLineEventDatesArrayDe,
  timeLineEventDatesArrayEn,
  baseLink,
}) => {
  const {
    language,
    timeline: { country },
    rangeSlider: { date: selectedDate },
  } = useSelector((state) => state.entities);

  const countryTimelineData = {
    de: { events: timeLineEventsDe, datesArray: timeLineEventDatesArrayDe },
    en: { events: timeLineEventsEn, datesArray: timeLineEventDatesArrayEn },
  };

  const { events: timeLineEvents, datesArray: timeLineEventDatesArray } =
    countryTimelineData[country] || countryTimelineData['en'];

  const [cardWidth, setCardWidth] = useState(0);
  const [cardWidthPercentage, setCardWidthPercentage] = useState(0);

  const [leftPosition, setLeftPosition] = useState('0%');

  useEffect(() => {
    if (cardWidth && window?.innerWidth) {
      setCardWidthPercentage(100 / Math.round(window.innerWidth / cardWidth));
    }
  }, [cardWidth]);

  const dateIndex = useMemo(
    () => Math.max(0, timeLineEventDatesArray.indexOf(selectedDate) ?? 0),
    [selectedDate, timeLineEventDatesArray]
  );

  useEffect(() => {
    setLeftPosition(
      `${-Math.min(
        cardWidthPercentage * dateIndex,
        cardWidthPercentage * timeLineEventDatesArray.length - 100
      )}%`
    );
  }, [cardWidthPercentage, dateIndex, timeLineEventDatesArray.length]);

  return (
    <div className='w-full overflow-hidden'>
      <motion.div
        animate={{ x: leftPosition }}
        transition={{ duration: 0.8, ease: easeOut }}
        drag='x'
        className='flex'
      >
        {timeLineEvents.map((timeLineEvent, index) => {
          const mediaUrl = allMedia.find(
            (media) => media.id === timeLineEvent.featured_media
          )?.source_url;

          return (
            <React.Fragment key={index}>
              <TimeLineCard
                mediaUrl={mediaUrl}
                timeLineEvent={timeLineEvent}
                setCardWidth={setCardWidth}
                cardWidth={cardWidth}
                language={language}
                selectedCountry={country}
                baseLink={baseLink}
              />
            </React.Fragment>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`${
          country === 'de' ? 'bg-wwr_turquoise' : 'bg-wwr_yellow_orange'
        } w-full h-5`}
      ></motion.div>
    </div>
  );
};

export default TimelineCardContainer;
