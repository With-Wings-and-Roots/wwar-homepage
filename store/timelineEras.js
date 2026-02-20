'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'erasList',
  initialState: {
    allEras: [],

    activeEra: null,
  },
  reducers: {
    erasAdded: (erasList, action) => {
      erasList.allEras = [...action.payload.eras];
    },

    activatedEra: (erasList, action) => {
      erasList.activeEra = action.payload.era;
    },
    deleteAllEras: (erasList, action) => {
      erasList.allEras = [];
    },
  },
});

export const { erasAdded, activatedEra, deleteAllEras } = slice.actions;

export default slice.reducer;
