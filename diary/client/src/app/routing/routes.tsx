import { App } from '@app/App';
import DigitalClock from '@pages/clock/ui/ClockPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { LoginPage } from '@pages/login/ui/LoginPage';
import { NotFoundPage } from '@pages/notFound/NotFoundPage';
import { TimerPage } from '@pages/timer/ui/TimerPage';
import { WeatherPage } from '@pages/WeatherPage/WeatherPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'timer',
            element: <DigitalClock />,
          },
          {
            path: 'clock',
            element: <TimerPage />,
          },
          {
            path: 'weather',
            element: <WeatherPage />,
          },{
            path: '*',
            element: <NotFoundPage />
          }
        ],
      }
    ],
);

/*import { LoginPage } from '@pages/login/ui/LoginPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { NotFoundPage } from '@pages/notFound/NotFoundPage';
import { TimerPage } from '@pages/timer/ui/TimerPage';
import { WeatherPage } from '@pages/WeatherPage/WeatherPage';
import { createBrowserRouter } from 'react-router-dom';
import { WelcomePage } from '@pages/welcome/WelcomePage';
import { MainLayout } from '@app/MainLayout';
import FlipClock from '@pages/clock/ui/ClockPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />, 
  },
  {
    path: '/login',
    element: <LoginPage />, 
  },
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'clock',
        element: <FlipClock />,
      },
      {
        path: 'timer',
        element: <TimerPage />,
      },
      {
        path: 'weather',
        element: <WeatherPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);*/