'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'storiesList',
  initialState: {
    allStories: [],

    activeStories: [],
  },
  reducers: {
    storiesAdded: (storiesList, action) => {
      storiesList.allStories = [...action.payload.stories];
    },

    activatedStories: (storiesList, action) => {
      storiesList.activeStories = [...action.payload.stories];
    },
    deleteAllStories: (storiesList) => {
      storiesList.allStories = [];
    },
  },
});

export const { storiesAdded, activatedStories, deleteAllStories } =
  slice.actions;

export default slice.reducer;
