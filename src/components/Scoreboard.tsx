import React from 'react';

interface ScoreBoardProps {
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ level }) => {
  return (
    <div>
      <p className='text-3xl mb-4'>Level: {level}</p>
    </div>
  );
};

export default ScoreBoard;
