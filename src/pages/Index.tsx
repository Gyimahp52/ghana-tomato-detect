
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

  // Improved disease label normalization
  const normalizeDiseaseLabel = (label: string): string => {
    const normalized = label.toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    console.log('Original label:', label, 'Normalized:', normalized);
    
    // Map common variations to standard labels
    const labelMappings: Record<string, string> = {
      'healthy': 'tomatoe-healthy',
      'tomato-healthy': 'tomatoe-healthy',
      'tomatoe-healthy': 'tomatoe-healthy',
      'bacterial-spot': 'tomatoe-bacterial-spot',
      'tomato-bacterial-spot': 'tomatoe-bacterial-spot',
      'tomatoe-bacterial-spot': 'tomatoe-bacterial-spot',
      'early-blight': 'tomatoe-early-blight',
      'tomato-early-blight': 'tomatoe-early-blight',
      'tomatoe-early-blight': 'tomatoe-early-blight',
      'late-blight': 'tomatoe-late-blight',
      'tomato-late-blight': 'tomatoe-late-blight',
      'tomatoe-late-blight': 'tomatoe-late-blight',
      'leaf-mold': 'tomatoe-leaf-mold',
      'tomato-leaf-mold': 'tomatoe-leaf-mold',
      'tomatoe-leaf-mold': 'tomatoe-leaf-mold',
    };

    return labelMappings[normalized] || normalized;
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStage('analyzing');

      const formData = new FormData();
      formData.append('file', selectedImage);

      console.log('Sending request to API...');
      console.log('Selected image:', selectedImage.name, selectedImage.size, selectedImage.type);
      
      const response = await fetch('https://tomatoe-plant-disease-predictor.onrender.com/predict', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(45000)
      });

      console.log('Response received:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        console.error('API Error Response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned non-JSON response');
      }

      const data: PredictionResult = await response.json();
      console.log('Raw API Response data:', data);

      // Validate and normalize the response
      if (!data || typeof data.label === 'undefined') {
        console.error('Invalid response structure:', data);
        throw new Error('Server returned invalid response format');
      }

      // Normalize the disease label for consistent mapping
      const normalizedLabel = normalizeDiseaseLabel(data.label);
      const processedResult = {
        ...data,
        label: normalizedLabel,
        confidence: data.confidence || data.probability || 0.8,
        probability: data.probability || data.confidence || 0.8
      };

      console.log('Processed result:', processedResult);

      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setResult(processedResult);
      toast({
        title: "Analysis Complete",
        description: `Disease detection completed with ${Math.round(processedResult.confidence * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Error analyzing image:', error);
      
      let errorMessage = "There was an error analyzing your image. Please try again.";
      
      if (error instanceof TypeError) {
        if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
          errorMessage = "Network connection failed. The server might be temporarily unavailable. Please try again in a few moments.";
        } else {
          errorMessage = `Network error: ${error.message}`;
        }
      } else if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Request timed out. The server is taking too long to respond. Please try again.";
        } else {
          errorMessage = `Analysis failed: ${error.message}`;
        }
      }
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // Development fallback with more realistic disease options
      if (process.env.NODE_ENV === 'development' && error instanceof TypeError && error.message === 'Failed to fetch') {
        console.log('CORS issue detected in development, using mock response...');
        setTimeout(() => {
          const mockDiseases = [
            { label: 'tomatoe-bacterial-spot', confidence: 0.89 },
            { label: 'tomatoe-early-blight', confidence: 0.92 },
            { label: 'tomatoe-late-blight', confidence: 0.87 },
            { label: 'tomatoe-leaf-mold', confidence: 0.91 },
            { label: 'tomatoe-healthy', confidence: 0.95 }
          ];
          
          const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
          const mockResult: PredictionResult = {
            label: randomDisease.label,
            probability: randomDisease.confidence,
            confidence: randomDisease.confidence,
            image_path: 'mock_path'
          };
          
          setProcessingStage('complete');
          setResult(mockResult);
          toast({
            title: "Development Mode - CORS Workaround",
            description: "Using mock data due to CORS restrictions in development.",
          });
        }, 2000);
      }
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  TomatoAI Ghana
                </h1>
                <p className="text-sm text-emerald-600 font-medium">Advanced CNN Disease Detection</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-emerald-700">
                <Brain className="w-5 h-5" />
                <span className="font-medium">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <Users className="w-5 h-5" />
                <span className="font-medium">Farmer Friendly</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Ghana Focused</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!result && !isProcessing && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Detect Tomato Diseases
                <span className="block text-emerald-600">Instantly with AI</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload a photo of your tomato plant and get instant AI-powered diagnosis with 
                treatment recommendations tailored for Ghanaian farming conditions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ 95%+ Accuracy</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Instant Results</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Local Expertise</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {isProcessing ? (
            <div className="animate-scale-in">
              <ProcessingAnimation stage={processingStage} />
            </div>
          ) : result ? (
            <div className="space-y-8 animate-fade-in">
              <ResultsDisplay result={result} selectedImage={selectedImage!} />
              <div className="text-center">
                <Button 
                  onClick={resetAnalysis} 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Analyze Another Plant
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100">
                <ImageUpload 
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  isProcessing={isProcessing}
                />
              </div>
              
              {selectedImage && (
                <div className="text-center animate-scale-in">
                  <Button 
                    onClick={analyzeImage}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    Analyze Plant Health
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Info Section */}
        {!result && !isProcessing && (
          <div className="mt-20 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TomatoAI Ghana?</h3>
              <p className="text-lg text-gray-600">Built specifically for Ghanaian farmers with local expertise</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Advanced AI Detection</h4>
                <p className="text-gray-600 leading-relaxed">
                  Our CNN model is specifically trained on tomato diseases common in Ghana's climate, achieving 95%+ accuracy in disease identification.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Instant Diagnosis</h4>
                <p className="text-gray-600 leading-relaxed">
                  Get immediate disease identification and comprehensive treatment recommendations within seconds of uploading your image.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Local Expertise</h4>
                <p className="text-gray-600 leading-relaxed">
                  Practical treatments and prevention strategies specifically designed for Ghana's farming conditions and available resources.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">TomatoAI Ghana</h4>
            </div>
            <p className="text-emerald-100 mb-4">
              CNN-Based Framework for Early Detection and Diagnosis of Tomato Diseases
            </p>
            <p className="text-emerald-200 text-sm">
              &copy; 2025 TomatoAI Ghana - Empowering Farmers with AI Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
