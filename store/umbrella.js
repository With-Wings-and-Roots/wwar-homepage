'use client';

import { createSlice } from '@reduxjs/toolkit';
import { ALL_UMBRELLAS } from '@/utilities/umbrella';

const initialState = {
  allUmbrellas: ALL_UMBRELLAS,
  activeUmbrella: null,
};

const umbrellaSlice = createSlice({
  name: 'umbrella',
  initialState,
  reducers: {
    setActiveUmbrella(state, action) {
      state.activeUmbrella = action.payload;
    },
    clearActiveUmbrella(state) {
      state.activeUmbrella = null;
    },
  },
});

export const { setActiveUmbrella, clearActiveUmbrella } = umbrellaSlice.actions;

export default umbrellaSlice.reducer;
