
import React from 'react';
import { motion } from 'framer-motion';

interface SudokuGridProps {
  grid: number[][];
  solved?: boolean;
  originalGrid?: number[][];
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ 
  grid, 
  solved = false,
  originalGrid = Array(9).fill(Array(9).fill(0))
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  // Determine if a cell was original or solved
  const isOriginalCell = (row: number, col: number) => {
    return originalGrid[row][col] !== 0;
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => {
              const isSectionBorderRight = (colIndex + 1) % 3 === 0 && colIndex < 8;
              const isSectionBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
              
              return (
                <motion.div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${
                    solved && !isOriginalCell(rowIndex, colIndex) ? 'sudoku-cell-highlight' : ''
                  } ${isSectionBorderRight ? 'sudoku-section-border-right' : ''} ${
                    isSectionBorderBottom ? 'sudoku-section-border-bottom' : ''
                  }`}
                  variants={item}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 24,
                    delay: solved ? 0.3 + (rowIndex * 9 + colIndex) * 0.01 : 0
                  }}
                >
                  {cell !== 0 ? cell : ''}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default SudokuGrid;
