'use client'

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "storiesList",
  initialState: [],
  reducers: {
    storiesAdded: (storiesList, action)=>{
      
      let combinedArray = storiesList.concat(action.payload.stories)
      storiesList = combinedArray;
      console.log("Stories Added ")
      console.log(storiesList)
    },

    deleteAllStories: (storiesList, action)=>{
      storiesList = [];
    }

  },
});
 
export const { storiesAdded, deleteAllStories } = slice.actions;

export default slice.reducer; 