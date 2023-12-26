"use client";

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "persons",
  initialState: {
    allPersons: [],
  },
  reducers: {
    personsAdded: (persons, action) => {
      persons.allPersons = [...action.payload.allPersons];
    },

    deleteAllPersons: (persons) => {
      persons.allPersons = [];
    },
  },
});

export const { personsAdded, deleteAllPersons } = slice.actions;

export default slice.reducer;
