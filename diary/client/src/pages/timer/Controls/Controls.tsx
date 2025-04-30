import { Button } from '@shared/ui/Button';
import React, { useState } from 'react';
import './Controls.scss'

type Props = {
    setTimeInSeconds: Function
};

function Controls(props:Props) {
    const {setTimeInSeconds} = props;
    const [intervalId, setIntervalId] = useState<number>(0);

    const handleStartButton = () => {
        let interval: any = setInterval(() => {
            setTimeInSeconds((previousState: number) => 
            previousState + 1);
        }, 1000);

        setIntervalId(interval);
    }   

    const handleStopButton = () => {
        clearInterval(intervalId); 
    }

    const handleResetButton = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
    }

    return (
        <section className='controls-container'>
            <button onClick={handleStartButton}>START</button>
            <button onClick={handleStopButton}>STOP</button>
            <button onClick={handleResetButton}>RESET</button>
        </section>
    );
}

export default Controls;
