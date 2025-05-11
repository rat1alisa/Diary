import { RootState } from '@shared/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    document.documentElement.className = ''; // очистим все классы
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <>{children}</>;
};