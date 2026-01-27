'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cities',
  initialState: {
    allCities: [],
    activeCity: null,
  },
  reducers: {
    citiesAdded: (state, action) => {
      state.allCities = action.payload.cities;
    },

    setActiveCity: (state, action) => {
      state.activeCity = action.payload;
    },

    deleteAllCities: (state) => {
      state.allCities = [];
      state.activeCity = null;
    },
  },
});

export const { citiesAdded, setActiveCity, deleteAllCities } = slice.actions;

export default slice.reducer;
