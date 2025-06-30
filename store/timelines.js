'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timelinesList',
  initialState: {
    allTimelines: [],
    activatesTimelines: [],
    allTimelinesDates: [],
    activatesTimelinesDates: [],
  },
  reducers: {
    timelinesAdded: (timelinesList, action) => {
      timelinesList.allTimelines = [...action.payload.timelines];
    },

    activatedTimelines: (timelinesList, action) => {
      timelinesList.activatesTimelines = [...action.payload.timelines];
    },
    deleteAllTimelines: (timelinesList) => {
      timelinesList.allTimelines = [];
    },
    timelinesDatesAdded: (timelinesList, action) => {
      timelinesList.allTimelines = [...action.payload.timelinesDates];
    },

    activatedTimeLineDates: (timelinesList, action) => {
      timelinesList.activatesTimelines = [...action.payload.timelinesDates];
    },
    deleteTimelinesDates: (timelinesList) => {
      timelinesList.allTimelines = [];
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
