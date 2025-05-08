import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from '@pages/registration/ui/Registration'
import { LoginPage } from '@pages/login/ui/LoginPage'
import { App } from '@app/App'
import DigitalClock from '@pages/clock/ui/ClockPage'
import { TimerPage } from '@pages/timer/ui/TimerPage'
import { store } from '@shared/store'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clock" element={<DigitalClock />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
  </BrowserRouter>
  </Provider>
  </StrictMode>,
)