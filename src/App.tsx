import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CountdownTimer from './components/CountdownTimer';
import GameGrid from './components/GameGrid';
import ScoreBoard from './components/ScoreBoard';
import GameOverOverlay from './components/GameOverOverlay';
import { generateGrid, checkUserSelection, increaseDifficulty } from './utils/gameLogic';
import { GridSquare, Score } from './utils/types';

const App: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  const [grid, setGrid] = useState<GridSquare[][]>([]);
  const [score, setScore] = useState<Score>({ level: 1, timeTaken: 0 });
  const [time, setTime] = useState(5);
  const [showInitialGrid, setShowInitialGrid] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (level > 0) {
      const newGrid = generateGrid(level);
      setGrid(newGrid);
      setTime(5);
      setShowInitialGrid(true);
      setTimeout(() => {
        setShowInitialGrid(false);
      }, 3000);
    } else {
      setShowInitialGrid(true);
      setGrid([]);
    }
  }, [level]);

  const startGame = () => {
    setLevel(increaseDifficulty(level));
    setGameOver(false);
  };

  const resetGame = () => {
    setLevel(0);
    setGrid([]);
    setGameOver(false);
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
    setTime(0);
    let [isSuccess, numCorrect] = checkUserSelection(grid, selectedCoords);
    if (isSuccess) {
      const newScore = {
        level: level,
        timeTaken: score.timeTaken,
      };
      setScore(newScore);
      setShowInitialGrid(true);
      setTimeout(() => {
        startGame();
      }, 3000);
    } else {
      console.log("Time's up! Game over.");
      setTimeout(() => {
        setShowInitialGrid(true);
      }, 1000);
      setTimeout(() => {
        setGameOver(true);
      }, 3000);
    }
  };

  return (
    <div className="App">
      {gameOver ? <GameOverOverlay onTryAgain={resetGame} /> : null}
      {level === 0 ? (
        <WelcomeScreen onStartGame={startGame} />
      ) : (
        <>
          <ScoreBoard level={level} />
          <GameGrid grid={grid} onSquareClick={handleSquareClick} showInitialGrid={showInitialGrid} />
          <CountdownTimer initialTime={time} onTimeout={handleTimeUp} />
        </>
      )}
    </div>
  );
};

export default App;
