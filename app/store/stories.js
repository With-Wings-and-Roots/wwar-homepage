"use client";

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "storiesList",
  initialState: {
    allStories: [],

    activeStories: [],
  },
  reducers: {
    storiesAdded: (storiesList, action) => {
      storiesList.allStories = [];
      storiesList.allStories.push(...action.payload.stories);
    },

    activatedStories: (storiesList, action) => {
      storiesList.activeStories = [];
      storiesList.activeStories.push(...action.payload.stories);
    },
    deleteAllStories: (storiesList, action) => {
      storiesList.allStories = [];
    },
  },
});

export const { storiesAdded, activatedStories, deleteAllStories } =
  slice.actions;

export default slice.reducer;
