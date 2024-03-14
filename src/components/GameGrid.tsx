import React from 'react';
import { GridSquare } from '../utils/types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

interface GameGridProps {
  grid: GridSquare[][];
  onSquareClick: (row: number, col: number) => void;
  showInitialGrid: boolean;
}

const Item = styled(Paper)<{ shape: string; isGreen: boolean; isSelected: boolean }>(({ theme, shape, isGreen, isSelected }) => ({
  width: '150px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isGreen ? 'green' : (theme.palette.mode === 'dark' ? '#1A2027' : 'gray'), // Conditionally apply green color
  ...theme.typography.body2,
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  clipPath: shape === 'circle' ? 'circle(50% at 50% 50%)' : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  transition: 'outline 0.3s', // Add transition property for smooth outline animation
  outline: 'none', // Set initial outline to none
  '&:hover': {
    outline: '2px solid white', // Show white outline on hover
  },
  ...(isSelected && { outline: '2px solid red' }), // Apply red outline if isSelected is true
}));

const GameGrid: React.FC<GameGridProps> = ({ grid, onSquareClick, showInitialGrid }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {grid.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={4}>
          {row.map((square, colIndex) => (
            <Grid item xs={4} key={colIndex}>
              <Item
                onClick={() => onSquareClick(rowIndex, colIndex)}
                shape={'circle'}
                isGreen={showInitialGrid && square.isGreen}
                isSelected={square.isSelected}
              >
              </Item>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
};

export default GameGrid;
