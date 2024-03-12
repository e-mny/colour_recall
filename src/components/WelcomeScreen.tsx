import React from 'react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div>
      <h1>Welcome to Memory Game</h1>
      <p>Instructions: Memorize the green squares and click on them after they disappear.</p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default WelcomeScreen;
