import React, { useEffect, useState } from 'react';
import './ClockPage.scss';
import { Header } from '@widgets/ui/header/Header';
import { data } from 'react-router-dom';

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
            <Header />
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

//<div className="date">{date}</div>
