import React, { useEffect, useRef, useState } from 'react';
import './ClockPage.scss';

interface CountdownTrackerProps {
  label: string;
  value: number;
}

const pad = (num: number): string => (num < 10 ? '0' + num : num.toString());

const CountdownTracker: React.FC<CountdownTrackerProps> = ({ label, value }) => {
  const [currentValue, setCurrentValue] = useState(pad(value));
  const [previousValue, setPreviousValue] = useState(pad(value));
  const [flipping, setFlipping] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const newValue = pad(value);
    if (newValue !== currentValue) {
      setPreviousValue(currentValue);
      setCurrentValue(newValue);
      setFlipping(true);
      const timeout = setTimeout(() => setFlipping(false), 600); // длительность анимации, мс
      
      return () => clearTimeout(timeout);
    }
  }, [value, currentValue]);

  return (
    <span className="flip-clock__piece" ref={rootRef}>
      <b className={`flip-clock__card card ${flipping ? 'flip' : ''}`} >
        <b className="card__top" data-value={previousValue}>{previousValue}</b>
        <b className="card__bottom" data-value={previousValue}>{previousValue}</b>
        <b className="card__back">
          <b className="card__bottom" data-value={currentValue}>{currentValue}</b>
        </b>
      </b>
      <span className="flip-clock__slot">{label}</span>
    </span>
  );
};

interface ClockProps {
  countdown?: string | Date;
  onComplete?: () => void;
}

interface TimeData {
  [key: string]: number | Date;
}

const getTimeRemaining = (endtime: Date): Record<string, number> => {
  const t = endtime.getTime() - new Date().getTime();
  return {
    Total: t,
    Days: Math.floor(t / (1000 * 60 * 60 * 24)),
    Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
    Minutes: Math.floor((t / 1000 / 60) % 60),
    Seconds: Math.floor((t / 1000) % 60),
  };
};

const getTime = (): Record<string, number | Date> => {
  const now = new Date();
  return {
    Total: now,
    Hours: now.getHours(),
    Minutes: now.getMinutes(),
    Seconds: now.getSeconds(),
  };
};

const FlipClock: React.FC<ClockProps> = ({ countdown, onComplete }) => {
  // timer state
  const [time, setTime] = useState<Record<string, number>>(countdown ? getTimeRemaining(new Date(countdown)) : getTime() as any);

  useEffect(() => {
    let animationFrameId: number;
    let tickCount = 0;

    const updateTime = () => {
      animationFrameId = requestAnimationFrame(updateTime);

      // throttle: обновлять каждую 10-ю итерацию (~6 раз в секунду)
      tickCount++;
      if (tickCount % 10 !== 0) return;

      let t: Record<string, number>;
      if (countdown) {
        t = getTimeRemaining(new Date(countdown));
        if (t.Total < 0) {
          cancelAnimationFrame(animationFrameId);
          if (onComplete) onComplete();
          Object.keys(t).forEach(key => (t[key] = 0));
          setTime(t);
          return;
        }
      } else {
        t = getTime() as any;
      }
      setTime(t);
    };

    const timerId = setTimeout(() => {
      updateTime();
    }, 500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timerId);
    };
  }, [countdown, onComplete]);

  return (
    <div className="flip-clock"> 
        <>
          <CountdownTracker label="Часы" value={time.Hours as number} />
          <CountdownTracker label="Минуты" value={time.Minutes as number} />
          <CountdownTracker label="Секунды" value={time.Seconds as number} />
        </>x
    </div>
  );
};

export default FlipClock;
/*import React, { useEffect, useState } from 'react';
import './ClockPage.scss';

const DigitalClock: React.FC = () => {
    const [time, setTime] = useState<string>('00:00');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setTime(`${hours}${minutes}`);

            const day = now.getDate();
            const month = now.toLocaleString('default', { month: 'long' });
            setDate(`${day} ${month}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="clock-container">
                <div className="clock">
                    {time.split('').map((digit, index) => (
                        <div key={index} className="digit">
                            <b>{digit}</b>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DigitalClock;

//<div className="date">{date}</div>*/
