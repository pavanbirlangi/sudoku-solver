
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingStageProps {
  name: string;
  description: string;
  completed: boolean;
  active: boolean;
}

const ProcessingStage: React.FC<ProcessingStageProps> = ({ 
  name, 
  description, 
  completed, 
  active 
}) => {
  return (
    <motion.div 
      className="flex items-start gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-1 relative">
        <motion.div 
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            completed 
              ? 'bg-primary text-white' 
              : active 
                ? 'bg-primary/10 border-2 border-primary' 
                : 'bg-muted border-2 border-muted-foreground/20'
          }`}
          animate={{ 
            scale: active && !completed ? [1, 1.1, 1] : 1,
            opacity: 1 
          }}
          transition={{ 
            duration: 0.8, 
            repeat: active && !completed ? Infinity : 0,
            repeatType: "loop" 
          }}
        >
          {completed ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : active ? (
            <motion.div 
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : null}
        </motion.div>
      </div>
      
      <div className="flex-1">
        <p className={`font-medium text-sm ${active ? 'text-primary' : completed ? 'text-foreground' : 'text-muted-foreground'}`}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </motion.div>
  );
};

interface ProcessingStateProps {
  isProcessing: boolean;
  currentStage: number;
}

const ProcessingState: React.FC<ProcessingStateProps> = ({ isProcessing, currentStage }) => {
  const stages = [
    {
      name: "Extracting Grid",
      description: "Finding and isolating the Sudoku grid from your image"
    },
    {
      name: "Recognizing Digits",
      description: "Identifying the numbers present in the puzzle"
    },
    {
      name: "Solving Puzzle",
      description: "Applying backtracking algorithm to find the solution"
    },
    {
      name: "Finalizing Result",
      description: "Preparing the solution for display"
    }
  ];

  if (!isProcessing) return null;

  return (
    <motion.div 
      className="w-full max-w-md mx-auto my-8 glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-5 border-b border-border flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <h3 className="font-medium">Processing Your Sudoku</h3>
      </div>
      
      <div className="p-5 space-y-4">
        {stages.map((stage, index) => (
          <ProcessingStage
            key={index}
            name={stage.name}
            description={stage.description}
            completed={index < currentStage}
            active={index === currentStage}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessingState;
