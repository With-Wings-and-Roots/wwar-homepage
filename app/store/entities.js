'use client'

import { combineReducers } from "redux";
import darkModeReducer from "./darkMode"

export default combineReducers({
  darkMode: darkModeReducer,
});
