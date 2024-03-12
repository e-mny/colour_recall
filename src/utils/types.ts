export interface GridSquare {
  id: number;
  isGreen: boolean;
  isSelected: boolean;
}

export interface Score {
  level: number;
  attempts: number;
  timeTaken: number;
}
