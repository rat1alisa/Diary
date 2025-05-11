import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '@shared/store/themeSlice';
import { RootState } from '@shared/store';

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
    </button>
  );
};
