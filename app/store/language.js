'use client'

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "language",
  initialState: {
    language: "en",
  },
  reducers: {
    englishLanguageActivated: (language, action) => {
      language.language = "en";
    },
    germanLanguageActivated: (language, action) => {
        language.language = "de";
      },
  },
});
 
export const { englishLanguageActivated, germanLanguageActivated } = slice.actions;

export default slice.reducer; 