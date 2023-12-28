'use client';

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'mobileMenu',
  initialState: {
    mobileMenuOpen: false,
    subMenuOpen: false,
    activeSubMenuId: null,
    activeSubMenuTitle: '',
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
    subMenuActivated: (mobileMenu, action) => {
      mobileMenu.activeSubMenuId = action.payload.id;
      mobileMenu.activeSubMenuTitle = action.payload.title;
    },
  },
});

export const {
  mobileMenuOpened,
  mobileMenuClosed,
  mobileSubMenuOpened,
  mobileSubMenuClosed,
  subMenuActivated,
} = slice.actions;

export default slice.reducer;
