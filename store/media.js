'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'media',
  initialState: {
    allMedia: [],
  },
  reducers: {
    mediaAdded: (media, action) => {
      media.allMedia = [...action.payload.allMedia];
    },

    deleteAllMedia: (media) => {
      media.allMedia = [];
    },
  },
});

export const { mediaAdded, deleteAllMedia } = slice.actions;

export default slice.reducer;
