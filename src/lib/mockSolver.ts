
// This file contains mock functionality to simulate the backend processing
// In a real implementation, this would be replaced with actual API calls to your backend

// Function to extract grid from image (mock)
export const extractGridFromImage = (imageFile: File): Promise<number[][]> => {
  return new Promise((resolve) => {
    // Create a FileReader to read the image data
    const reader = new FileReader();
    
    reader.onload = () => {
      console.log("Processing uploaded image...");
      
      // In a real implementation, we would:
      // 1. Use image processing to detect the grid
      // 2. Apply OCR to recognize digits
      // 3. Return the recognized grid
      
      // For demo purposes, we'll generate a semi-random grid based on the image data
      // This creates an illusion that different images produce different grids
      const buffer = reader.result as ArrayBuffer;
      const view = new Uint8Array(buffer);
      
      // Use some bytes from the image to seed our grid (for demo purposes only)
      const seedValue = view.length > 100 ? 
        (view[10] + view[20] + view[50] + view[100]) : 42;
      
      // Generate a grid with some fixed numbers and some empty cells
      const grid = generateSemiRandomGrid(seedValue);
      
      console.log("Grid extracted from image:", grid);
      setTimeout(() => resolve(grid), 1200); // Simulating 1.2 seconds of processing time
    };
    
    reader.onerror = () => {
      console.error("Error reading the uploaded image");
      // Fall back to default grid if there's an error
      const defaultGrid = [
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
      resolve(defaultGrid);
    };
    
    // Start reading the image as ArrayBuffer
    reader.readAsArrayBuffer(imageFile);
  });
};

// Generate a semi-random Sudoku grid based on a seed value
const generateSemiRandomGrid = (seed: number): number[][] => {
  // Use the seed to make the grid generation somewhat deterministic
  const random = (max: number) => Math.floor(((seed * 13) % 237 + Date.now() % 100) / 337 * max);
  
  // Start with an empty grid
  const grid = Array(9).fill(0).map(() => Array(9).fill(0));
  
  // Place some numbers in the grid (25-35 numbers)
  const numbersToPlace = 25 + random(10);
  
  // Ensure the grid is valid Sudoku
  for (let i = 0; i < numbersToPlace; i++) {
    let row = random(9);
    let col = random(9);
    let num = 1 + random(9);
    
    // Try up to 10 times to place a valid number
    let attempts = 0;
    while (attempts < 10 && !isValidPlacement(grid, row, col, num)) {
      row = random(9);
      col = random(9);
      num = 1 + random(9);
      attempts++;
    }
    
    if (attempts < 10) {
      grid[row][col] = num;
    }
  }
  
  return grid;
};

// Check if a number placement is valid in Sudoku rules
const isValidPlacement = (grid: number[][], row: number, col: number, num: number): boolean => {
  // Check if cell is already filled
  if (grid[row][col] !== 0) return false;
  
  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
};

// Function to solve sudoku
export const solveSudoku = (grid: number[][]): Promise<number[][]> => {
  return new Promise((resolve) => {
    console.log("Solving the extracted Sudoku grid...");
    
    // Create a copy of the original grid to avoid modifying it
    const workingGrid = grid.map(row => [...row]);
    
    // Solve the grid using backtracking algorithm
    const solved = solveWithBacktracking(workingGrid);
    
    // Log the result
    if (solved) {
      console.log("Sudoku successfully solved:", workingGrid);
    } else {
      console.log("The Sudoku puzzle couldn't be solved. There might be no valid solution.");
    }
    
    // Mock delay to simulate solving
    setTimeout(() => {
      resolve(workingGrid);
    }, 2000); // Simulating 2 seconds of solving time
  });
};

// Backtracking algorithm to solve the Sudoku
const solveWithBacktracking = (grid: number[][]): boolean => {
  // Find an empty cell
  let emptyCell = findEmptyCell(grid);
  
  // If no empty cell is found, the puzzle is solved
  if (!emptyCell) return true;
  
  const [row, col] = emptyCell;
  
  // Try placing digits 1-9
  for (let num = 1; num <= 9; num++) {
    // Check if placing num at (row, col) is valid
    if (isValidPlacement(grid, row, col, num)) {
      // Place the number
      grid[row][col] = num;
      
      // Recursively try to solve the rest of the puzzle
      if (solveWithBacktracking(grid)) {
        return true;
      }
      
      // If placing num at (row, col) doesn't lead to a solution, backtrack
      grid[row][col] = 0;
    }
  }
  
  // No solution found with current configuration
  return false;
};

// Helper function to find an empty cell
const findEmptyCell = (grid: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null; // No empty cell found
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
