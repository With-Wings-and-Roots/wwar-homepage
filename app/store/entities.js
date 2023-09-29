'use client'

import { combineReducers } from "redux";
import darkModeReducer from "./darkMode"
import languageReducer from "./language"
import storiesReducer from "./stories"


export default combineReducers({
  darkMode: darkModeReducer,
  language: languageReducer,
  stories: storiesReducer,
});
