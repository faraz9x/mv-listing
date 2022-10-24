import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';

export const movieStore = configureStore({
  reducer:{
    mainSlice: mainReducer.reducer
  }
});
