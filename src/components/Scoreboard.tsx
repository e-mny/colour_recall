import React from 'react';

interface ScoreBoardProps {
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ level }) => {
  return (
    <div className='text-center justify-center items-center flex text-4xl mb-4 font-'>
      <p>Level: {level}</p>
    </div>
  );
};

export default ScoreBoard;
