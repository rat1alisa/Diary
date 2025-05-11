import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialState: Theme = getInitialTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => (state === 'dark' ? 'light' : 'dark'),
    setTheme: (_, action) => action.payload,
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;