import React, { useState } from 'react';


interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const [countdown, setCountdown] = useState(3);

  const handleStartGame = () => {
    setShowCountdown(true);

    // Start the countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Call the onStartGame callback after the countdown finishes
    setTimeout(() => {
      clearInterval(countdownInterval);
      setShowCountdown(false);
      onStartGame();
    }, countdown * 1000);
  };

  const [showCountdown, setShowCountdown] = useState(false);

  const pulseAnimation = {
    animationName: 'pulse',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  return (
    <div className ="text-center justify-center content-center">
      {!showCountdown ? (
        <>
          <h1 className="m-16 text-5xl">Memory Game</h1>
          <p className="mt-8 text-2xl">Memorize where the <span className="text-lime-500">green</span> diamonds are</p>
          <p className="mb-8 text-2xl">and click on them after they disappear.</p>
          <button className="btn m-6 text-3xl" onClick={() => {
            setShowCountdown(true);
            handleStartGame();
          }}>Start</button>
        </>
      ) : (
        <div className='text-5xl'>
          <p>Get Ready...</p>
          <p className='m-8' style={pulseAnimation}>{countdown}</p>
        </div>
      )}
    </div>
  );

}

export default WelcomeScreen;
