'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: {
    country: 'all',
  },
  reducers: {
    usaSelected: (timeline, action) => {
      timeline.country = 'us';
    },
    germanySelected: (timeline, action) => {
      timeline.country = 'de';
    },
  },
});

export const { germanySelected, usaSelected } = slice.actions;

export default slice.reducer;
