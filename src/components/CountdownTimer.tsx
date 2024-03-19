import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number;
  onTimeout: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState(initialTime);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          setIsTimeout(true);
          return 0;
        }
        // console.log(prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setIsTimeout(false);
    };
  }, [initialTime]);

  useEffect(() => {
    if (isTimeout) {
      setIsTimeout(false);
      onTimeout();
    }
  }, [isTimeout, onTimeout]);

  const timeStyle = {
    fontSize: '2rem',
    color: time > 0 && time <= 3 ? 'red' : 'white',
    animation: time > 0 && time <= 3 ? 'pulse 1s infinite' : 'none',
  };


  return (
    <div className="text-center justify-center items-center flex text-3xl p-4">
      <p>Time Left:</p>
      <p className="m-4 font-bold" style={timeStyle}>{time}</p>s
    </div>
  );
};

export default CountdownTimer;
