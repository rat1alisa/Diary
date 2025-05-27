import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

//Начальное состояние темы
const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialState: Theme = getInitialTheme();

const themeSlice = createSlice({
  name: 'theme', //название в браузере
  initialState,
  //функци переключения и установки темы (чистые функции(что передали, то и вернули))
  reducers: {
    toggleTheme: (state) => (state === 'dark' ? 'light' : 'dark'),
    setTheme: (_, action) => action.payload,
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;