// store.js
import { configureStore } from '@reduxjs/toolkit';
import processReducer from './processSlice';

const store = configureStore({
  reducer: {
    process: processReducer,
  },
});

export default store;