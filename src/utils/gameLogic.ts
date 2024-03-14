import { GridSquare } from './types';

// Generate a 2D grid of squares with specified level
export const generateGrid = (level: number): GridSquare[][] => {
  const gridSize = getGridSize(level);
  const greenSquareCount = getGreenSquareCount(level);
  let currentId = 1;

  // Generate an empty 2D grid
  let grid: GridSquare[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => ({ id: currentId++, isGreen: false, isSelected: false }))
  );

  // Generate random positions for green squares
  let greenSquaresPlaced = 0;
  while (greenSquaresPlaced < greenSquareCount) {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);
    if (!grid[randomRow][randomCol].isGreen) {
      grid[randomRow][randomCol].isGreen = true;
      greenSquaresPlaced++;
    }
  }

  grid = [
    [{ id: 1, isGreen: true, isSelected: false }, { id: 2, isGreen: false, isSelected: false }, { id: 3, isGreen: false, isSelected: false }],
    [{ id: 4, isGreen: true, isSelected: false }, { id: 5, isGreen: false, isSelected: false }, { id: 6, isGreen: false, isSelected: false }],
    [{ id: 7, isGreen: true, isSelected: false }, { id: 8, isGreen: false, isSelected: false }, { id: 9, isGreen: false, isSelected: false }],
  ]
  return grid;
};

// Check if user's selection matches the original green squares' positions
export const checkUserSelection = (grid: GridSquare[][], selectedCoords: [number, number][]): [ boolean, number ] => {
  const greenSquareCoords: [number, number][] = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      if (square.isGreen) greenSquareCoords.push([rowIndex, colIndex]);
    });
  });

  // Convert selected coordinates to strings for comparison
  const selectedCoordStrings = selectedCoords.map(([row, col]) => `${row}-${col}`);
  const greenSquareCoordStrings = greenSquareCoords.map(([row, col]) => `${row}-${col}`);

  
  // Sort the coordinate strings and compare
  const sortedSelectedCoordStrings = selectedCoordStrings.sort();
  const sortedGreenSquareCoordStrings = greenSquareCoordStrings.sort();

  // For empty selection, return false and 0 correct elements
  if (sortedSelectedCoordStrings.length === 0) {
    return [false, 0]
  };

  let isMatch = JSON.stringify(sortedSelectedCoordStrings) === JSON.stringify(sortedGreenSquareCoordStrings);
  const correctElements = sortedSelectedCoordStrings.filter(coord => sortedGreenSquareCoordStrings.includes(coord)).length;

  // Make sure correctElements == number of green squares
  if (sortedGreenSquareCoordStrings.length !== sortedSelectedCoordStrings.length) {
    isMatch = false;
  }
  
  console.log('Number of correct elements:', correctElements, "out of", sortedGreenSquareCoordStrings.length);
  console.log('isMatch:', isMatch)
  return [isMatch, correctElements];
};

// Increase the difficulty level based on the current level
export const increaseDifficulty = (level: number): number => {
  return level + 1;
};


// Helper function to determine grid size based on level
const getGridSize = (level: number): number => {
  if (level <= 3) return 3;
  if (level <= 6) return 4;
  if (level <= 8) return 5;
  return 6;
};

// Helper function to determine the number of green squares based on level
const getGreenSquareCount = (level: number): number => {
  if (level === 1) return 3;
  if (level <= 4) return 4;
  if (level <= 7) return 5;
  return level;
};
