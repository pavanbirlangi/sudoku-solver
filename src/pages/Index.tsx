
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import Header from '@/components/Header';
import UploadZone from '@/components/UploadZone';
import Instructions from '@/components/Instructions';
import ProcessingState from '@/components/ProcessingState';
import ComparisonView from '@/components/ComparisonView';
import { extractGridFromImage, solveSudoku, generateOverlayImage } from '@/lib/mockSolver';

// App state enum to track progress
enum AppState {
  UPLOAD = 'upload',
  PROCESSING = 'processing',
  RESULT = 'result'
}

const Index: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalGrid, setOriginalGrid] = useState<number[][]>([]);
  const [solvedGrid, setSolvedGrid] = useState<number[][]>([]);
  const [processingStage, setProcessingStage] = useState<number>(0);
  
  // Handle image upload
  const handleImageUploaded = (file: File) => {
    setUploadedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };
  
  // Process the uploaded image
  const processImage = async () => {
    if (!uploadedImage) return;
    
    try {
      setAppState(AppState.PROCESSING);
      
      // Stage 1: Extract grid
      setProcessingStage(0);
      const extractedGrid = await extractGridFromImage(uploadedImage);
      setOriginalGrid(extractedGrid);
      
      // Stage 2: Recognize digits
      setProcessingStage(1);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating OCR time
      
      // Stage 3: Solve sudoku
      setProcessingStage(2);
      const solved = await solveSudoku(extractedGrid);
      setSolvedGrid(solved);
      
      // Stage 4: Finalize result
      setProcessingStage(3);
      await generateOverlayImage(imagePreview!);
      
      // Complete processing
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Error processing the image. Please try again with a clearer image.');
      setAppState(AppState.UPLOAD);
    }
  };
  
  // Reset the application state
  const handleReset = () => {
    setAppState(AppState.UPLOAD);
    setUploadedImage(null);
    setImagePreview(null);
    setOriginalGrid([]);
    setSolvedGrid([]);
    setProcessingStage(0);
  };
  
  // Process the image when uploaded
  useEffect(() => {
    if (uploadedImage && appState === AppState.UPLOAD) {
      processImage();
    }
  }, [uploadedImage]);
  
  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Header />
      
      <motion.main
        className="container px-4 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {appState === AppState.UPLOAD && (
            <motion.div
              key="upload-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center max-w-3xl mx-auto mt-10 mb-12">
                <motion.h1 
                  className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Sudoku Solver with Image Recognition
                </motion.h1>
                <motion.p 
                  className="text-lg text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Upload a photo of your Sudoku puzzle and get the solution instantly.
                </motion.p>
              </div>
              
              <UploadZone onImageUploaded={handleImageUploaded} />
              <Instructions />
            </motion.div>
          )}
          
          {appState === AppState.PROCESSING && (
            <motion.div
              key="processing-state"
              className="max-w-3xl mx-auto my-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingState 
                isProcessing={true} 
                currentStage={processingStage} 
              />
            </motion.div>
          )}
          
          {appState === AppState.RESULT && imagePreview && (
            <motion.div
              key="result-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ComparisonView 
                originalGrid={originalGrid}
                solvedGrid={solvedGrid}
                originalImage={imagePreview}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Index;
