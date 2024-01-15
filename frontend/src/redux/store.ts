import { configureStore } from '@reduxjs/toolkit';
import expertsReducer from './expertsSlice';

const store = configureStore({
  reducer: {
    experts: expertsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;