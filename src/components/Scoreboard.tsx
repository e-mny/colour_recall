import React from 'react';

interface ScoreBoardProps {
  attempts: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ attempts, level }) => {
  return (
    <div>
      <p>Level: {level}</p>
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default ScoreBoard;
