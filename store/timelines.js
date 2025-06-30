'use client';

import { createSlice } from '@reduxjs/toolkit';

const extractYearFromTimeline = (timeLineEvents) =>
  timeLineEvents.map((timeLineEvent) =>
    Number(timeLineEvent.acf.basic_info?.start_date?.slice(0, 4))
  );

const slice = createSlice({
  name: 'timelinesList',
  initialState: {
    allTimelines: [],
    activatedTimelines: [],
    allTimelinesDates: [],
    activatedTimelinesDates: [],
  },
  reducers: {
    timelinesAdded: (timelinesList, action) => {
      console.log('in adding');
      timelinesList.allTimelines = [...action.payload.timelines];
      console.log(timelinesList.allTimelines);
    },

    activatedTimelines: (timelinesList, action) => {
      console.log('in activating');
      timelinesList.activatedTimelines = [...action.payload.timelines];
      console.log(timelinesList.activatedTimelines);
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
      timelinesList.activatedTimelinesDates = [...timelinesDates];
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
