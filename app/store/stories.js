'use client'

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "storiesList",
  initialState: {
    allStories: [],
    activeStories: [],
  },
  reducers: {
    storiesAdded: (storiesList, action)=>{
      storiesList.allStories.push(action.payload.stories);
    },
    activatedStories: (storiesList, action)=>{
      
    //  const activatedList = storiesList.filter(arrayItem=>{})
    },
    deleteAllStories: (storiesList, action)=>{
      storiesList.allStories = [];
    }

  },
});
 
export const { storiesAdded, activatedStories, deleteAllStories } = slice.actions;

export default slice.reducer; 