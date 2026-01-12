'use client';

import { combineReducers } from 'redux';
import darkModeReducer from './darkMode';
import storiesReducer from './stories';
import selectedStoryReducer from './selectedStory';
import topicsReducer from './topics';
import mediaReducer from './media';
import personsReducer from './persons';
import mobileMenuReducer from './mobileMenu';
import headerReducer from './header';
import rangeSliderReducer from './rangeSlider';
import timelineReducer from './timeline';
import timelinesReducer from './timelines';
import umbrellaReducer from './umbrella';
import curriculumReducer from './curriculam';
import collectionsReducer from './collections';
import citiesReducer from './cities';

export default combineReducers({
  darkMode: darkModeReducer,
  stories: storiesReducer,
  selectedStory: selectedStoryReducer,
  topics: topicsReducer,
  media: mediaReducer,
  persons: personsReducer,
  mobileMenu: mobileMenuReducer,
  header: headerReducer,
  rangeSlider: rangeSliderReducer,
  timeline: timelineReducer,
  timelines: timelinesReducer,
  umbrella: umbrellaReducer,
  curriculum: curriculumReducer,
  collections: collectionsReducer,
  cities: citiesReducer,
});
