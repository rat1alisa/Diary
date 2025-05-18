import { WeatherData } from '@entities/weather/model/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  searchResult: WeatherData | null;
}

const initialState: WeatherState = {
  searchResult: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSearchResult(state, action: PayloadAction<WeatherData>) {
      state.searchResult = action.payload;
    },
    clearSearchResult(state) {
      state.searchResult = null;
    },
  },
});

export const { setSearchResult, clearSearchResult } = weatherSlice.actions;
export default weatherSlice.reducer;