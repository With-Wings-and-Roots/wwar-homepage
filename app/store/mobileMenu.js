"use client";

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "mobileMenu",
  initialState: {
    mobileMenuOpen: false,
    subMenuOpen: false,
  },
  reducers: {
    mobileMenuOpened: (mobileMenu, action) => {
      mobileMenu.mobileMenuOpen = true;
    },
    mobileMenuClosed: (mobileMenu, action) => {
      mobileMenu.mobileMenuOpen = false;
    },
    mobileSubMenuOpened: (mobileMenu, action) => {
      mobileMenu.subMenuOpen = true;
    },
    mobileSubMenuClosed: (mobileMenu, action) => {
      mobileMenu.subMenuOpen = false;
    },
  },
});

export const {
  mobileMenuOpened,
  mobileMenuClosed,
  mobileSubMenuOpened,
  mobileSubMenuClosed,
} = slice.actions;

export default slice.reducer;
