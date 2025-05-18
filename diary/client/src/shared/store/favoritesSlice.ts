import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  cities: string[];
}

const initialState: FavoritesState = {
  cities: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
    },
    clearFavorites(state) {
      state.cities = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;