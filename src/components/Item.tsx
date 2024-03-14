import React from 'react';
import { Paper } from '@mui/material';

interface ItemProps {
  shape: string;
  isGreen: boolean;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ shape, isGreen, onClick }) => {
  const classes = `item ${shape} ${isGreen ? 'isGreen' : 'dark'}`;
  
  return (
    <Paper className={classes}>
    </Paper>
  );
};

export default Item;
