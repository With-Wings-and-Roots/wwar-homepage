'use client';
import TimeLineCard from './timelineCard';
import { easeOut, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

const TimelineCardContainer = ({
                                 timeLineEventsDe,
                                 timeLineEventsEn,
                                 timeLineEventsAll,
                                 allMedia,
                                 timeLineEventDatesArrayDe,
                                 timeLineEventDatesArrayEn,
                                 timeLineEventDatesArrayAll,
                                 baseLink,
                                 skip,
                                 countriesId
                               }) => {
  const pathname = usePathname()

  const {
    language,
    timeline: { country },
    rangeSlider: { date: selectedDate },
  } = useSelector((state) => state.entities);

  const countryTimelineData = {
    all: { events: timeLineEventsAll, datesArray: timeLineEventDatesArrayAll },
    de: { events: timeLineEventsDe, datesArray: timeLineEventDatesArrayDe },
    us: { events: timeLineEventsEn, datesArray: timeLineEventDatesArrayEn },
  };

  const { events: timeLineEvents, datesArray: timeLineEventDatesArray } =
  countryTimelineData[country] || countryTimelineData['all'];

  const [cardWidth, setCardWidth] = useState(0);

  const cardWidthPercentage =
    cardWidth !== 0 ? 100 / Math.round(window?.innerWidth / cardWidth) : 0;

  const dateIndex = useMemo(
    () => Math.max(0, timeLineEventDatesArray.indexOf(selectedDate) ?? 0),
    [selectedDate, timeLineEventDatesArray]
  );

  const isDateIndexZero = dateIndex === 0;
  const maxLeftPositionPercentage = cardWidthPercentage * timeLineEventDatesArray.length - 100;
  const leftPositionPercentage = isDateIndexZero ? 0 : -Math.min(cardWidthPercentage * dateIndex, maxLeftPositionPercentage);

  return (
    <div className='w-full overflow-hidden'>
      <motion.div
        animate={pathname.endsWith("/timelines") || pathname.endsWith("/de") || pathname.endsWith("/en")? {x:`${leftPositionPercentage}%`} : false}
        transition={{ duration: 0.8, ease: easeOut }}
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
                skip={skip}
                countriesId={countriesId}
              />
            </React.Fragment>
          );
        })}
      </motion.div>

    </div>
  );
};

export default TimelineCardContainer;
