'use client';
import TimeLineCard from './timelineCard';
import Tabs from './tabs';
import Image from 'next/image';
import { easeOut, motion } from 'framer-motion';
import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { activatedTimeLineDates, activatedTimelines } from '@/store/timelines';
import { storiesCounted } from '@/store/selectedStory';

const TimelineCardContainer = ({ allMedia, baseLink, lang }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const {
    language,
    timeline: { country },
    rangeSlider: { date: selectedDate },
    timelines: {
      allTimelines,
      allActivatedTimelines,
      allActivatedTimelinesDates,
    },
    selectedStory: {
      selectedStory: selectedTopic,
      selectedStoryId: selectedTopicId,
    },
  } = useSelector((state) => state.entities);
  console.log({ selectedTopicId });

  useEffect(() => {
    if (selectedTopic === 'all') {
      dispatch(activatedTimelines({ timelines: allTimelines }));
      dispatch(activatedTimeLineDates({ timelines: allTimelines }));
      dispatch(storiesCounted({ count: allTimelines.length }));
    }

    if (selectedTopic !== 'all' && selectedTopic !== 'featured') {
      const timelines = allTimelines.filter((story) =>
        story.acf?.basic_info?.topics?.includes(selectedTopicId)
      );
      dispatch(
        activatedTimelines({
          timelines,
        })
      );
      dispatch(activatedTimeLineDates({ timelines }));
      dispatch(storiesCounted({ count: timelines.length }));
    }
    if (selectedTopic === 'featured') {
      const timelines = allTimelines.filter(
        (timeline) => timeline.acf.featured_story === true
      );
      dispatch(
        activatedTimelines({
          timelines,
        })
      );
      dispatch(activatedTimeLineDates({ timelines }));
      dispatch(storiesCounted({ count: timelines.length }));
    }
  }, [selectedTopic, dispatch, allTimelines, selectedTopicId]);

  const [cardWidth, setCardWidth] = useState(0);

  const cardWidthPercentage =
    cardWidth !== 0 ? 100 / Math.round(window?.innerWidth / cardWidth) : 0;

  const dateIndex = useMemo(
    () => Math.max(0, allActivatedTimelinesDates.indexOf(selectedDate) ?? 0),
    [selectedDate, allActivatedTimelinesDates]
  );

  const isDateIndexZero = dateIndex === 0;
  const maxLeftPositionPercentage =
    cardWidthPercentage * allActivatedTimelinesDates.length - 100;
  const leftPositionPercentage = isDateIndexZero
    ? 0
    : -Math.min(cardWidthPercentage * dateIndex, maxLeftPositionPercentage);

  return (
    <div className='w-full overflow-hidden'>
      <Tabs lang={lang} />
      <div className='flex flex-nowrap items-center h-10 border-2 border-wwr_rich_black max-w-max mb-8'>
        <input
          className='my-4 p-1  h-full border-0 focus:outline-none'
          placeholder='Search all timelines'
          type='text'
          // onChange={handleInput}
        />
        <div className='text-2xl text-wwr_white cursor-pointer h-full bg-wwr_rich_black px-2  flex items-center p-2'>
          <Image src='/search.svg' width={24} height={24} alt='Search icon' />
        </div>
      </div>
      <motion.div
        animate={
          pathname.endsWith('/timelines')
            ? { x: `${leftPositionPercentage}%` }
            : false
        }
        transition={{ duration: 0.8, ease: easeOut }}
        className='flex'
        initial={
          pathname.endsWith('/timelines')
            ? { x: `${leftPositionPercentage}%` }
            : false
        }
      >
        {allActivatedTimelines.map((timeLineEvent, index) => {
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

      <div
        className={`${
          country === 'de' ? 'bg-wwr_turquoise' : 'bg-wwr_yellow_orange'
        } w-full h-5`}
      ></div>
    </div>
  );
};

export default TimelineCardContainer;
