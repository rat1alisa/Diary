import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';
import { AppWrapper } from '@shared/ui/AppWrapper';
import './App.css'

export const App = () => {
  return (
    <AppWrapper>
      <Header />
      <Outlet />
    </AppWrapper>
  );
}