'use client'

import { combineReducers } from "redux";
import darkModeReducer from "./darkMode"
import languageReducer from "./language"
import storiesReducer from "./stories"
import selectedStoryReducer from "./selectedStory"


export default combineReducers({
  darkMode: darkModeReducer,
  language: languageReducer,
  stories: storiesReducer,
  selectedStory: selectedStoryReducer,
});
