import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CountdownTimer from './components/CountdownTimer';
import GameGrid from './components/GameGrid';
import ScoreBoard from './components/ScoreBoard';
import { generateGrid, checkUserSelection, increaseDifficulty, calculateScore } from './utils/gameLogic';
import { GridSquare, Score } from './utils/types';

const App: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [grid, setGrid] = useState<GridSquare[][]>([]);
  const [score, setScore] = useState<Score>(
    { 
    level: 1, 
    attempts: 0, 
    timeTaken: 0 
  });

  const startGame = () => {
    const newGrid = generateGrid(level);
    setGrid(newGrid);
    setLevel(increaseDifficulty(level));
  };

  const handleSquareClick = (row: number, col: number) => {
    console.log(`Clicked on square at row ${row}, col ${col}`);
    const updatedGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((square, colIndex) =>
        rowIndex === row && colIndex === col ? { ...square, isSelected: !square.isSelected } : square
      )
    );
    setGrid(updatedGrid);
  };

  const handleTimeUp = () => {
    const selectedCoords: [number, number][] = [];
    grid.forEach((rowArr, rowIndex) =>
      rowArr.forEach((square, colIndex) => {
        if (square.isSelected && square.isGreen) selectedCoords.push([rowIndex, colIndex]);
      })
    );
    let [isSuccess, numCorrect] = checkUserSelection(grid, selectedCoords);
    if (isSuccess) {
      const newLevel = increaseDifficulty(level);
      const newGrid = generateGrid(newLevel);
      setLevel(newLevel);
      setGrid(newGrid);
      const newScore = {
        level: newLevel,
        attempts: score.attempts + 1,
        timeTaken: score.timeTaken,
      };
      setScore(newScore);
      setTimeout(() => {
        startGame();
      }, 5000);
    } else {
      console.log("Time's up! Game over.");
    }
  };

  return (
    <div className="App">
      {level === 0 ? (
        <WelcomeScreen onStartGame={startGame} />
      ) : (
        <>
          <ScoreBoard attempts={score.attempts} level={level} />
          <CountdownTimer initialTime={2} onTimeout={handleTimeUp} />
          <GameGrid grid={grid} onSquareClick={handleSquareClick} />
        </>
      )}
    </div>
  );
};

export default App;
