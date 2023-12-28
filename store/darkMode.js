'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'darkMode',
  initialState: {
    darkMode: true,
  },
  reducers: {
    darkModeToggled: (darkMode, action) => {
      darkMode.darkMode = !darkMode.darkMode;
    },
  },
});

export const { darkModeToggled } = slice.actions;

export default slice.reducer;
