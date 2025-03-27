
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 md:py-8 px-4 md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="flex items-center gap-3 mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-primary/90 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-2xl font-medium tracking-tight">Sudoku Solver</h1>
        </motion.div>
        
        <motion.div
          className="flex items-center gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a 
            href="https://github.com/your-username/sudoku-solver" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-secondary px-4 py-2 rounded-full hover:bg-secondary/70 transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
