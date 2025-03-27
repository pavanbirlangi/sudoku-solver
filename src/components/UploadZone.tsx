
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface UploadZoneProps {
  onImageUploaded: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
        onImageUploaded(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        onChange={handleFileInputChange}
      />
      
      <AnimatePresence>
        {!previewImage ? (
          <motion.div
            className={`rounded-xl border-2 border-dashed p-8 transition-all ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-card/50'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="relative w-16 h-16">
                <motion.div 
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload className="h-7 w-7 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-medium">Upload your Sudoku puzzle</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Drag and drop your Sudoku image here, or click to browse. 
                  For best results, ensure the image is clear and well-lit.
                </p>
              </div>
              
              <motion.button
                className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBrowseClick}
              >
                Browse Files
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="rounded-xl overflow-hidden bg-card border shadow-sm relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Uploaded image</span>
              </div>
              <button 
                className="text-muted-foreground hover:text-destructive transition-colors"
                onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative aspect-square w-full max-h-[500px] overflow-hidden">
              <img 
                src={previewImage} 
                alt="Uploaded Sudoku" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadZone;
