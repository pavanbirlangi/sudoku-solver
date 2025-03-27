
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SudokuGrid from './SudokuGrid';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

interface ComparisonViewProps {
  originalGrid: number[][];
  solvedGrid: number[][];
  originalImage: string;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalGrid,
  solvedGrid,
  originalImage,
  onReset,
}) => {
  const [showSudokuComparison, setShowSudokuComparison] = React.useState(true);

  const toggleView = () => {
    setShowSudokuComparison(!showSudokuComparison);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-full max-w-4xl mx-auto my-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-block glass-card py-2 px-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleView}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {showSudokuComparison ? (
                <>
                  <span>View Image Result</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  <span>View Grid Comparison</span>
                </>
              )}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {showSudokuComparison ? (
            <motion.div
              key="grid-comparison"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col">
                <div className="glass-card p-4 mb-3">
                  <h3 className="text-lg font-medium text-center">Original Puzzle</h3>
                </div>
                <div className="flex-1 glass-card p-6 flex items-center justify-center">
                  <SudokuGrid grid={originalGrid} />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="glass-card p-4 mb-3">
                  <h3 className="text-lg font-medium text-center">Solved Puzzle</h3>
                </div>
                <div className="flex-1 glass-card p-6 flex items-center justify-center">
                  <SudokuGrid grid={solvedGrid} solved originalGrid={originalGrid} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="image-result"
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-md mx-auto">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={originalImage}
                    alt="Solved Sudoku Result"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  This is a visual representation of the solution overlaid on your original image.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-8">
          <motion.button
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/70 text-secondary-foreground px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Solve Another Puzzle</span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonView;
