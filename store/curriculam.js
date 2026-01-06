'use client';

import { createSlice } from '@reduxjs/toolkit';
import { ALL_CURRICULUM } from '@/utilities/curriculam';
const initialState = {
  allCurriculum: ALL_CURRICULUM,
  activeCurriculum: null,
};

const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    setActiveCurriculum(state, action) {
      state.activeCurriculum = action.payload;
    },
    clearActiveCurriculum(state) {
      state.activeCurriculum = null;
    },
  },
});

export const { setActiveCurriculum, clearActiveCurriculum } =
  curriculumSlice.actions;

export default curriculumSlice.reducer;
