'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'rangeSlider',
  initialState: {
    date: 0,
  },
  reducers: {
    rangeDateChanged: (rangeSlider, action) => {
      rangeSlider.date = action.payload.date;
    },
  },
});

export const { rangeDateChanged } = slice.actions;

export default slice.reducer;
