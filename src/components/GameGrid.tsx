import React from 'react';
import { GridSquare } from '../utils/types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from 'react-responsive';

interface GameGridProps {
  grid: GridSquare[][];
  onSquareClick: (row: number, col: number) => void;
  showInitialGrid: boolean;
}

const Item = styled(Paper)<{ isGreen: boolean; isSelected: boolean; isMobile: boolean}>(
  ({ theme, isGreen, isSelected, isMobile}) => ({
    width: isMobile ? '50px' : '100px',
    height: isMobile ? '50px' : '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isGreen ? 'green' : theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
    ...theme.typography.body2,
    padding: '2px',
    margin: isMobile ? '25px' : '50px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    transform: 'rotate(45deg)',
    transition: 'outline 0.2s', 
    '&:hover': {
      outline: isSelected ? '5px solid red' : '5px solid white'
    },
    outline: isSelected ? '5px solid red' : '5px solid black',
    outlineWidth: isMobile ? '3px' : '5px',
  })
);


const GameGrid: React.FC<GameGridProps> = ({ grid, onSquareClick, showInitialGrid }) => {
  const gridSize = grid.length;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <Box style={{ minWidth: isTabletOrMobile ? '100%' : '600px' }}>
      {grid.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={4}>
          {row.map((square, colIndex) => (
            <Grid item xs={12 / gridSize} key={colIndex}>
              <Item
                onClick={() => onSquareClick(rowIndex, colIndex)}
                isGreen={showInitialGrid && square.isGreen}
                isSelected={square.isSelected}
                isMobile={isTabletOrMobile}
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
