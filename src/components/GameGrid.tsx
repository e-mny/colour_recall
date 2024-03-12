import React from 'react';
import { GridSquare } from '../utils/types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

interface GameGridProps {
  grid: GridSquare[][];
  onSquareClick: (row: number, col: number) => void;
}

const Item = styled(Paper)<{ shape: string }>(({ theme, shape }) => ({
  width: '150px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
  ...theme.typography.body2,
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  clipPath: shape === 'circle' ? 'circle(50% at 50% 50%)' : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
}));

const GameGrid: React.FC<GameGridProps> = ({ grid, onSquareClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {grid.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={3}>
          {row.map((square, colIndex) => (
            <Grid item xs={4} key={colIndex}>
              <Item
                onClick={() => onSquareClick(rowIndex, colIndex)}
                shape = {'triangle'}
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
