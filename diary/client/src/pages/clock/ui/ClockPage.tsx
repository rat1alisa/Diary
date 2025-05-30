import React, { useState, useEffect, useRef } from 'react';
import './ClockPage.scss';

const COFFEE_IMG = 'https://png.pngtree.com/png-clipart/20230131/ourmid/pngtree-coffee-aroma-png-image_6195642.png';
const MATCHA_IMG = 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-cup-of-matcha-latte-png-image_10275148.png';

const FlipClock: React.FC = () => {
  const [inputMinutes, setInputMinutes] = useState('0');
  const [inputSeconds, setInputSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'pink' | 'green'>('pink');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    //чтобы избежать утечки памяти
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleFocusClick = () => {
    const totalSeconds = Number(inputMinutes) * 60 + Number(inputSeconds);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const handleQuitClick = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputMinutes('0');
    setInputSeconds('0');
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setInputMinutes(val);
  };

  const onSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      if (val === '' || Number(val) <= 59) {
        setInputSeconds(val);
      }
    }
  };

  const handleThemeSwitch = () => {
    setTheme(prev => (prev === 'pink' ? 'green' : 'pink'));
  };

  return (
    <div className='timer'>
      <div className={`timer-page ${theme}`}>
        <div className="timer-photo">
          <img 
            alt={theme === 'pink' ? 'coffee' : 'matcha'}
            src={theme === 'pink' ? COFFEE_IMG : MATCHA_IMG}
            draggable={false}
          />
        </div>

        <div className="timer-container">
          <p>DO NOT DISTRUB</p>
          <div className="time-display">{formatTime(timeLeft)}</div>

          {!isRunning && (
            <div className="input-section">
              <input
                type="text"
                value={inputMinutes}
                onChange={onMinutesChange}
                maxLength={3}
                aria-label="Минуты"
              />
              <span> : </span>
              <input
                type="text"
                value={inputSeconds}
                onChange={onSecondsChange}
                maxLength={2}
                aria-label="Секунды"
              />
            </div>
          )}

          {!isRunning ? (
            <button className="focus-btn" onClick={handleFocusClick}>Focus</button>
          ) : (
            <button className="focus-btn" onClick={handleQuitClick}>Quit</button>
          )}
        </div>
      </div>

      <button
        className={`theme-switch-btn ${theme}`}
        onClick={handleThemeSwitch}
        title="Переключить тему"
      />
    </div>
  );
};

export default FlipClock;
