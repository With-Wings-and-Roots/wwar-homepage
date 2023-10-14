"use client";

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "selected_story",
  initialState: {
    selectedStory: "all",
    selectedStoryId: null,
    numberOfSelectedStories: 0,
  },
  reducers: {
    storySelected: (selectedStory, action) => {
      selectedStory.selectedStory = action.payload.selection;
      selectedStory.selectedStoryId = action.payload.id;
    },
    storiesCounted: (selectedStory, action) => {
      selectedStory.numberOfSelectedStories = action.payload.count;
    },
  },
});

export const { storySelected, storiesCounted } = slice.actions;

export default slice.reducer;
