
// This file contains mock functionality to simulate the backend processing
// In a real implementation, this would be replaced with actual API calls to your backend

// Function to extract grid from image (mock)
export const extractGridFromImage = (imageFile: File): Promise<number[][]> => {
  return new Promise((resolve) => {
    // Mock delay to simulate processing
    setTimeout(() => {
      // Mock sudoku grid (this would come from the backend in reality)
      const mockGrid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];
      resolve(mockGrid);
    }, 1200); // Simulating 1.2 seconds of processing time
  });
};

// Function to solve sudoku (mock)
export const solveSudoku = (grid: number[][]): Promise<number[][]> => {
  return new Promise((resolve) => {
    // Mock delay to simulate solving
    setTimeout(() => {
      // Mock solved grid (in reality, this would be the actual solved Sudoku)
      const solvedGrid = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ];
      resolve(solvedGrid);
    }, 2000); // Simulating 2 seconds of solving time
  });
};

// Mock function to generate an overlay image
export const generateOverlayImage = (originalImage: string): Promise<string> => {
  return new Promise((resolve) => {
    // In a real implementation, this would create an actual overlay
    // For now, we'll just return the original image as a mock
    setTimeout(() => {
      resolve(originalImage);
    }, 1000);
  });
};
