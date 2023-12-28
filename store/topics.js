'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'topicsList',
  initialState: {
    allTopics: [],

    activeTopic: [],
  },
  reducers: {
    topicsAdded: (topicsList, action) => {
      topicsList.allTopics = [...action.payload.topics];
    },

    activatedTopic: (topicsList, action) => {
      //  const activatedList = topicsList.filter(arrayItem=>{})
    },
    deleteAllTopics: (topicsList, action) => {
      topicsList.allTopics = [];
    },
  },
});

export const { topicsAdded, activatedTopic, deleteAllTopics } = slice.actions;

export default slice.reducer;
