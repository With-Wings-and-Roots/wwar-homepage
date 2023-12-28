'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'header',
  initialState: {
    logoShrink: false,
  },
  reducers: {
    logoShrinked: (header, action) => {
      header.logoShrink = true;
    },

    logoExpanded: (header, action) => {
      header.logoShrink = false;
    },
  },
});

export const { logoExpanded, logoShrinked } = slice.actions;

export default slice.reducer;
