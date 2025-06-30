
import React, { useState, useCallback } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onImageSelect(null as any);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-green-500 bg-green-50 scale-105' 
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-green-100 rounded-full">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Upload Tomato Plant Image</h3>
              <p className="text-gray-500 mt-2">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supports JPG, PNG, JPEG formats
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
              disabled={isProcessing}
            />
            <label htmlFor="file-input">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <span>
                  <Camera className="w-4 h-4" />
                  Choose Image
                </span>
              </Button>
            </label>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border-2 border-green-200">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected tomato plant"
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={removeImage}
              disabled={isProcessing}
              className="rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
            <p className="text-sm font-medium">{selectedImage.name}</p>
            <p className="text-xs opacity-90">
              {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
