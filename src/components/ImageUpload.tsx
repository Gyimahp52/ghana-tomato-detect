
import React, { useState, useCallback } from 'react';
import { Upload, Camera, X, Image } from 'lucide-react';
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
    <div className="w-full max-w-3xl mx-auto">
      {!selectedImage ? (
        <div
          className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-lg' 
              : 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-6">
            <div className={`p-6 rounded-full transition-all duration-300 ${
              dragActive 
                ? 'bg-emerald-500 shadow-lg scale-110' 
                : 'bg-gradient-to-br from-emerald-400 to-teal-500 hover:shadow-lg'
            }`}>
              <Upload className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800">Upload Tomato Plant Image</h3>
              <p className="text-gray-600 text-lg">
                Drag and drop your image here, or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">JPEG</span>
              </div>
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
              <Button 
                variant="outline" 
                className="flex items-center gap-3 px-8 py-4 text-lg font-semibold border-2 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <span>
                  <Camera className="w-6 h-6" />
                  Choose Image
                </span>
              </Button>
            </label>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                📸 <strong>Tip:</strong> For best results, capture clear photos of leaves showing any spots, discoloration, or unusual patterns
              </p>
            </div>
          </div>
          
          {dragActive && (
            <div className="absolute inset-0 bg-emerald-100/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="text-emerald-700 font-semibold text-xl">
                Drop your image here!
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border-4 border-emerald-200 shadow-2xl bg-white">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected tomato plant"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            <div className="absolute top-4 right-4">
              <Button
                size="sm"
                variant="destructive"
                onClick={removeImage}
                disabled={isProcessing}
                className="rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{selectedImage.name}</p>
                  <p className="text-sm opacity-90">
                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-50 border-t border-emerald-200">
            <div className="flex items-center justify-center space-x-2 text-emerald-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Image ready for AI analysis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
