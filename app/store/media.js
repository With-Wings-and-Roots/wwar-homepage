"use client";

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "media",
  initialState: {
    allMedia: [],
  },
  reducers: {
    mediaAdded: (media, action) => {
      media.allMedia = [];
      media.allMedia.push(...action.payload.allMedia);
    },

    deleteAllMedia: (media, action) => {
      media.allMedia = [];
    },
  },
});

export const { mediaAdded, deleteAllMedia } = slice.actions;

export default slice.reducer;
