
import React, { useState } from 'react';
import { Leaf, Brain, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ResultsDisplay from '@/components/ResultsDisplay';

interface PredictionResult {
  label: string;
  probability: number;
  confidence: number;
  image_path: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'uploading' | 'analyzing' | 'complete'>('uploading');
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProcessingStage('uploading');

    try {
      // Simulate uploading stage
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStage('analyzing');

      const formData = new FormData();
      formData.append('file', selectedImage);

      console.log('Sending request to API...');
      
      const response = await fetch('https://tomatoe-plant-disease-predictor.onrender.com/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      console.log('API Response:', data);

      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: `Your tomato plant has been analyzed successfully.`,
      });

    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setProcessingStage('uploading');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">TomatoAI Ghana</h1>
                <p className="text-sm text-gray-600">CNN-Based Disease Detection System</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Farmer Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Ghana Focus</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!result && !isProcessing && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Detect Tomato Diseases Instantly
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Upload a photo of your tomato plant and get instant AI-powered diagnosis with 
              treatment recommendations tailored for Ghanaian farming conditions.
            </p>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {isProcessing ? (
            <ProcessingAnimation stage={processingStage} />
          ) : result ? (
            <div className="space-y-6">
              <ResultsDisplay result={result} selectedImage={selectedImage!} />
              <div className="text-center">
                <Button onClick={resetAnalysis} size="lg" className="bg-green-600 hover:bg-green-700">
                  Analyze Another Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <ImageUpload 
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                isProcessing={isProcessing}
              />
              
              {selectedImage && (
                <div className="text-center">
                  <Button 
                    onClick={analyzeImage}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze Plant Health
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Section */}
        {!result && !isProcessing && (
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Detection</h3>
              <p className="text-gray-600 text-sm">
                Advanced CNN technology trained specifically on tomato diseases common in Ghana.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">
                Get immediate disease identification and treatment recommendations in seconds.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Farmer Support</h3>
              <p className="text-gray-600 text-sm">
                Practical advice and treatments accessible to farmers across Ghana.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2025 TomatoAI Ghana - CNN-Based Framework for Early Detection and Diagnosis of Tomato Diseases</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
