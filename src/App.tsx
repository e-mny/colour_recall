import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CountdownTimer from './components/CountdownTimer';
import GameGrid from './components/GameGrid';
import ScoreBoard from './components/ScoreBoard';
import GameOverOverlay from './components/GameOverOverlay';
import { generateGrid, checkUserSelection, increaseDifficulty } from './utils/gameLogic';
import { GridSquare, Score } from './utils/types';
import { useTheme, useMediaQuery } from '@mui/material';

const App: React.FC = () => {
  const playerTime = 10;

  const [level, setLevel] = useState<number>(1);
  const [grid, setGrid] = useState<GridSquare[][]>([]);
  const [score, setScore] = useState<Score>({ level: 1, timeTaken: 0 });
  const [time, setTime] = useState(-999);
  const [showInitialGrid, setShowInitialGrid] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (level > 0) {
      if ((!gameOver)){

        const newGrid = generateGrid(level);
        setGrid(newGrid);
        setTimeout(() => {
            setShowInitialGrid(false);
            setGameOver(false);
          }, 3000);
        }
      } else {
        setGrid([]);
      }
      
    }, [level, gameOver]);
    
    useEffect(() => {
      if (!showInitialGrid) {
          setTime(playerTime);
          document.body.style.pointerEvents = 'auto';
      }
      else {if (!gameOver){
        document.body.style.pointerEvents = 'none';
      }
      else{
        document.body.style.pointerEvents = 'auto';

      }}
  }, [showInitialGrid]);

  useEffect(() => {
    setTime(playerTime + 3);
  }, [level]);

  const startGame = () => {
    setLevel(increaseDifficulty(level));
    setGameOver(false);
    setShowInitialGrid(true);
    
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
    let [isSuccess, numCorrect] = checkUserSelection(grid, selectedCoords);
    if (isSuccess) {
      const newScore = {
        level: level,
        timeTaken: score.timeTaken,
      };
      setScore(newScore);
      setShowInitialGrid(true); // Show the correct answers
      setTimeout(() => {
        startGame();
      }, 2000);
    } else {
      console.log("Time's up! Game over.");
      setShowInitialGrid(true); // Show the correct answers
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  return (
    <div className="App flex justify-center items-center h-screen">
      <div className={isSmallScreen ? "flex flex-col items-center w-75 px-4" : "flex flex-col items-center"}>
        {gameOver ? <GameOverOverlay onTryAgain={resetGame} /> : null}
        {level === 0 ? (
          <WelcomeScreen onStartGame={startGame} />
        ) : (
          <>
            <ScoreBoard level={level} />
            <GameGrid grid={grid} onSquareClick={handleSquareClick} showInitialGrid={showInitialGrid} />
            <CountdownTimer initialTime={time} onTimeout={handleTimeUp} level={level} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
