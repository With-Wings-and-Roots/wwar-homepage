'use client';

import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  allCurriculum: [],
  activeCurriculum: null,
};

const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    curriculumAdded: (state, action) => {
      state.allCurriculum = action.payload.curriculum;
    },
    setActiveCurriculum(state, action) {
      state.activeCurriculum = action.payload;
    },
    clearActiveCurriculum(state) {
      state.activeCurriculum = null;
    },
  },
});

export const { curriculumAdded, setActiveCurriculum, clearActiveCurriculum } =
  curriculumSlice.actions;

export default curriculumSlice.reducer;
