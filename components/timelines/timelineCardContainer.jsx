'use client';
import TimeLineCard from './timelineCard';
import Tabs from './tabs';
import Image from 'next/image';
import { easeOut, motion } from 'framer-motion';
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { activatedTimeLineDates, activatedTimelines } from '@/store/timelines';
import { storiesCounted } from '@/store/selectedStory';
import SearchAndFilter from '../common/search';
import ErasTabs from './ErasTabs';
import { activatedEra } from '@/store/timelineEras';

const TimelineCardContainer = ({
  allMedia,
  baseLink,
  lang,
  selectedCountry,
}) => {
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
    timelineEras: { activeEra },
  } = useSelector((state) => state.entities);

  useEffect(() => {
    let timelines = allTimelines;

    // Filter by topic
    if (selectedTopic !== 'all' && selectedTopic !== 'featured') {
      timelines = allTimelines.filter((story) => {
        try {
          return story.acf?.basic_info?.topics?.includes(selectedTopicId);
        } catch {
          return false;
        }
      });
    }

    // Filter by featured
    if (selectedTopic === 'featured') {
      timelines = allTimelines.filter(
        (story) => story.acf.featured_story === true
      );
    }

    // Filter by era
    if (activeEra) {
      timelines = allTimelines.filter((story) => {
        try {
          return story.acf?.basic_info?.timeline_era?.includes(activeEra.id);
        } catch {
          return false;
        }
      });
    }

    // Activate filtered timelines
    dispatch(activatedTimelines({ timelines }));
    dispatch(activatedTimeLineDates({ timelines }));
    dispatch(storiesCounted({ count: timelines.length }));
  }, [selectedTopic, selectedTopicId, allTimelines, activeEra, dispatch]);

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

  const handleFilteredTimelines = useCallback(
    (filtered) => {
      dispatch(activatedTimelines({ timelines: filtered }));
    },
    [dispatch]
  );

  return (
    <div className='w-full overflow-hidden'>
      <div className='px-8 md:px-16 xl:px-48 mb-4 text-lg lg:text-xl font-medium text-wwr_rich_black'>
        {lang === 'en'
          ? 'Search timelines or filter by topics / timeline eras'
          : 'Zeitstrahlen durchsuchen oder nach Themen / Epochen filtern'}
      </div>
      <div className='max-w-xl mx-auto mb-4'>
        <SearchAndFilter
          items={allTimelines}
          searchFields={[
            'title.rendered',
            'acf.basic_info.title',
            'acf.basic_info.description',
            'acf.basic_info.keywords',
            'acf.basic_info.tags',
          ]}
          onFiltered={handleFilteredTimelines}
          placeholder={
            lang === 'en' ? 'Search all timelines' : 'Suche nach Ereignissen'
          }
        />
      </div>
      <Tabs lang={lang} />
      <ErasTabs lang={lang} allStoriesCount={allTimelines.length} />

      <motion.div
        animate={
          pathname.endsWith('/united-states') ||
          pathname.endsWith('/germany') ||
          pathname.endsWith('/usa') ||
          pathname.endsWith('/usa-ed') ||
          pathname.endsWith('/deutschland') ||
          pathname.endsWith('/deutschland-ed')
            ? { x: `${leftPositionPercentage}%` }
            : false
        }
        transition={{ duration: 0.8, ease: easeOut }}
        className='flex'
        initial={
          pathname.endsWith('/united-states') ||
          pathname.endsWith('/germany') ||
          pathname.endsWith('/usa') ||
          pathname.endsWith('/usa-ed') ||
          pathname.endsWith('/deutschland') ||
          pathname.endsWith('/deutschland-ed')
            ? { x: `${leftPositionPercentage}%` }
            : false
        }
      >
        {allActivatedTimelines.length > 0
          ? allActivatedTimelines.map((timeLineEvent, index) => {
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
                    selectedCountry={selectedCountry}
                    baseLink={baseLink}
                  />
                </React.Fragment>
              );
            })
          : ''}
      </motion.div>

      <div
        className={`${
          selectedCountry === 'us' ? 'bg-wwr_yellow_orange' : 'bg-wwr_turquoise'
        } w-full h-5`}
      ></div>
    </div>
  );
};

export default TimelineCardContainer;
