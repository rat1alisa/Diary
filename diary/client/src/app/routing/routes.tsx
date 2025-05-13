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
        path: 'clock',
        element: <DigitalClock />,
      },
      {
        path: 'timer',
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
  },
]);