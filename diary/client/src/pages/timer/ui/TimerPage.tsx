import React, { useState, useEffect } from 'react';
import './TimerPage.scss';
import { Header } from '@widgets/ui/header/Header';
import calculateTimer from '../Timer';
import Controls from '../Controls/Controls';

export const TimerPage = () => {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [timerArray, setTimerArray] = useState<Array<number|string>>([]);

    useEffect(() => {
        let timeArray: Array<number|string> = calculateTimer(timeInSeconds);
        setTimerArray(timeArray);
    }, [timeInSeconds]);

    return (
        <div className='time-page'>
            <Header />
            <section className='time-container'>
            <div className='digit'>
                <b className='timer-text'>{timerArray[0]}</b>
            </div>
            <div className='digit'>
                <b className='timer-text'>{timerArray[1]}</b>
            </div>
            <div className='digit'>
                <b className='timer-text'>{timerArray[2]}</b>
            </div>
        </section>
        <Controls setTimeInSeconds={setTimeInSeconds}/>
        </div>
    );
}
