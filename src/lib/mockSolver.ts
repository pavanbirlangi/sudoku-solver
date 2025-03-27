
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
      // Create a solved grid based on the input grid
      // This ensures consistency between input and output
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

// Function to generate an overlay image with the solution on top of the original image
export const generateOverlayImage = (originalImage: string, originalGrid: number[][], solvedGrid: number[][]): Promise<string> => {
  return new Promise((resolve) => {
    // In a real implementation, this would create an actual overlay using canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Calculate the size and position for the Sudoku grid overlay
      const gridSize = Math.min(canvas.width, canvas.height) * 0.8;
      const cellSize = gridSize / 9;
      const startX = (canvas.width - gridSize) / 2;
      const startY = (canvas.height - gridSize) / 2;
      
      // Semi-transparent overlay for the grid area
      ctx!.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx!.fillRect(startX, startY, gridSize, gridSize);
      
      // Draw grid lines
      ctx!.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx!.lineWidth = 1;
      
      // Draw the cell lines
      for (let i = 0; i <= 9; i++) {
        // Thicker lines for the 3x3 section borders
        ctx!.lineWidth = (i % 3 === 0) ? 2 : 1;
        
        // Vertical lines
        ctx!.beginPath();
        ctx!.moveTo(startX + i * cellSize, startY);
        ctx!.lineTo(startX + i * cellSize, startY + gridSize);
        ctx!.stroke();
        
        // Horizontal lines
        ctx!.beginPath();
        ctx!.moveTo(startX, startY + i * cellSize);
        ctx!.lineTo(startX + gridSize, startY + i * cellSize);
        ctx!.stroke();
      }
      
      // Add the numbers to the grid
      ctx!.font = `bold ${cellSize * 0.6}px Arial`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const originalValue = originalGrid[row][col];
          const solvedValue = solvedGrid[row][col];
          
          const x = startX + (col + 0.5) * cellSize;
          const y = startY + (row + 0.5) * cellSize;
          
          if (originalValue === 0) {
            // This is a solved number (wasn't in the original grid)
            ctx!.fillStyle = "#2563EB"; // Blue color for solved numbers
            ctx!.fillText(solvedValue.toString(), x, y);
          } else {
            // This was in the original grid
            ctx!.fillStyle = "#000000"; // Black for original numbers
            ctx!.fillText(originalValue.toString(), x, y);
          }
        }
      }
      
      // Convert the canvas to a data URL and resolve the promise
      resolve(canvas.toDataURL("image/png"));
    };
    
    // Load the original image
    img.src = originalImage;
    
    // If there's an error loading the image, return the original image
    img.onerror = () => {
      console.error("Error generating overlay image");
      resolve(originalImage);
    };
  });
};
