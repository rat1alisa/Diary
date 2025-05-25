import { useSelector } from 'react-redux';
import { RootState } from '@shared/store';
import { Outlet } from 'react-router-dom';
import './HomePage.scss'
import BookApp from '@pages/BookShelf/BookApp';

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
             <BookApp />
            <Outlet />
            </div>
        </main>
    </div>
  );
};