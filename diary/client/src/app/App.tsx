import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';
import { AppWrapper } from '@shared/ui/AppWrapper';
import './App.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@shared/store';

export const App = () => {
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}