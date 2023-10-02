'use client'

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "selected_story",
  initialState: {
    selectedStory: "All Stories",
    numberOfSelectedStories: 0
  },
  reducers: {
    storySelected: (selectedStory, action)=>{
    selectedStory.selectedStory = action.payload.selection
    },
    storiesCounted: (selectedStory, action)=>{
      selectedStory.numberOfSelectedStories = action.payload.count
    }
  },
});
 
export const { storySelected, storiesCounted } = slice.actions;

export default slice.reducer; 