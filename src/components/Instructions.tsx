
import React from 'react';
import { motion } from 'framer-motion';
import { FileImage, Image, Grid3X3, Zap } from 'lucide-react';

const instructionSteps = [
  {
    icon: <FileImage className="w-6 h-6" />,
    title: "Upload your Sudoku",
    description: "Take a clear photo of your sudoku puzzle or upload an existing image.",
  },
  {
    icon: <Image className="w-6 h-6" />,
    title: "Image Processing",
    description: "Our system will extract the Sudoku grid and recognize the digits.",
  },
  {
    icon: <Grid3X3 className="w-6 h-6" />,
    title: "Algorithm Solves",
    description: "The backtracking algorithm will find the solution to your puzzle.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Get Results",
    description: "View the solved Sudoku overlaid on your original image.",
  },
];

const Instructions = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto my-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="text-center mb-10">
        <motion.span 
          className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          How It Works
        </motion.span>
        <motion.h2 
          className="text-2xl md:text-3xl font-medium tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Solve Any Sudoku in Seconds
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructionSteps.map((step, index) => (
          <motion.div 
            key={index} 
            className="glass-card p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {React.cloneElement(step.icon, { className: "w-5 h-5 text-primary" })}
            </div>
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <motion.p 
          className="text-sm text-muted-foreground max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          For best results, ensure your image is well-lit and the numbers are clearly visible. 
          The clearer the image, the more accurate the recognition will be.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Instructions;
