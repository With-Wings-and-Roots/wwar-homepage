'use client';

import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const createStore = function () {
  return configureStore({ reducer });
};

export default createStore;
