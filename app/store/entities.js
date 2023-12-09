"use client";

import { combineReducers } from "redux";
import darkModeReducer from "./darkMode";
import languageReducer from "./language";
import storiesReducer from "./stories";
import selectedStoryReducer from "./selectedStory";
import topicsReducer from "./topics";
import mediaReducer from "./media";
import personsReducer from "./persons";
import mobileMenuReducer from "./mobileMenu";
import headerReducer from "./header";

export default combineReducers({
  darkMode: darkModeReducer,
  language: languageReducer,
  stories: storiesReducer,
  selectedStory: selectedStoryReducer,
  topics: topicsReducer,
  media: mediaReducer,
  persons: personsReducer,
  mobileMenu: mobileMenuReducer,
  header: headerReducer,
});
