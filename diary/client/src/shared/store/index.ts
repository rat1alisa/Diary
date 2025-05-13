import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeSlice from './themeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;