'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'collections',
  initialState: {
    allCollections: [],
    activeCollection: null, // single value, not array
  },
  reducers: {
    collectionsAdded: (state, action) => {
      state.allCollections = action.payload.collections;
    },

    setActiveCollection: (state, action) => {
      state.activeCollection = action.payload;
    },

    deleteAllCollections: (state) => {
      state.allCollections = [];
      state.activeCollection = null;
    },
  },
});

export const { collectionsAdded, setActiveCollection, deleteAllCollections } =
  slice.actions;

export default slice.reducer;
