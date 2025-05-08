import { useSelector } from 'react-redux';
import { RootState } from '@shared/store';
import { Outlet } from 'react-router-dom';
import './HomePage.scss'

export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
        <main>
            <div className='main-container'>
            <h1>Home</h1>
            {user ? (
            <p>Привет, {user.name}!</p>
            ) : (
            <p>Вы не вошли в систему</p>
            )}
            <Outlet />
            </div>
        </main>
    </div>
  );
};