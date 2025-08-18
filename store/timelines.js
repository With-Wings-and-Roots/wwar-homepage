'use client';

import { createSlice } from '@reduxjs/toolkit';

const extractYearFromTimeline = (timeLineEvents) =>
  timeLineEvents.map((timeLineEvent) =>
    Number(timeLineEvent?.acf?.basic_info?.start_date?.slice(0, 4))
  );

const slice = createSlice({
  name: 'timelinesList',
  initialState: {
    allTimelines: [],
    allActivatedTimelines: [],
    allTimelinesDates: [],
    allActivatedTimelinesDates: [],
  },
  reducers: {
    timelinesAdded: (timelinesList, action) => {
      timelinesList.allTimelines = [...action.payload.timelines];
    },

    activatedTimelines: (timelinesList, action) => {
      timelinesList.allActivatedTimelines = [...action.payload.timelines];
    },
    deleteAllTimelines: (timelinesList) => {
      timelinesList.allTimelines = [];
    },
    timelinesDatesAdded: (timelinesList, action) => {
      const timelinesDates = extractYearFromTimeline(action.payload.timelines);
      timelinesList.allTimelinesDates = [...timelinesDates];
    },

    activatedTimeLineDates: (timelinesList, action) => {
      const timelinesDates = extractYearFromTimeline(action.payload.timelines);
      timelinesList.allActivatedTimelinesDates = [...timelinesDates];
    },
    deleteTimelinesDates: (timelinesList) => {
      timelinesList.allTimelinesDates = [];
    },
  },
});

export const {
  timelinesAdded,
  activatedTimelines,
  deleteAllTimelines,
  timelinesDatesAdded,
  activatedTimeLineDates,
  deleteTimelinesDates,
} = slice.actions;

export default slice.reducer;
