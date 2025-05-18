import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeSlice from './themeSlice';
import weatherSlice from './weatherSlice';
import favoritesSlice from './favoritesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeSlice,
    weather: weatherSlice,
    cities: favoritesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;