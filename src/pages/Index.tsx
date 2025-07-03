
import React, { useState, useEffect } from 'react';
import { Leaf, Brain, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import LanguageSelector from '@/components/LanguageSelector';
import ImageUpload from '@/components/ImageUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ResultsDisplay from '@/components/ResultsDisplay';

interface PredictionResult {
  label: string;
  probability: number;
  confidence: number;
  image_path: string;
  offline?: boolean;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'uploading' | 'analyzing' | 'complete'>('uploading');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [forceOffline, setForceOffline] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setResult(null);
    setForceOffline(false);
  };

  const analyzeImageOffline = async () => {
    if (!selectedImage) return;

    console.log('Starting optimized offline analysis...');
    setIsProcessing(true);
    setProcessingStage('uploading');

    try {
      // Dynamic import for better performance
      const { offlineDetectionService } = await import('@/services/offlineDetection');
      
      // Faster uploading simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingStage('analyzing');

      console.log('Running optimized offline disease detection...');
      const offlineResult = await offlineDetectionService.detectDisease(selectedImage);
      
      console.log('Optimized offline analysis result:', offlineResult);

      // Faster completion
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 300));

      const processedResult = {
        ...offlineResult,
        offline: true
      };

      console.log('Setting optimized offline result:', processedResult);
      setResult(processedResult);
      setIsProcessing(false);

      toast({
        title: 'Offline Analysis Complete',
        description: `Disease detection completed offline with ${Math.round(offlineResult.confidence * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Error in optimized offline analysis:', error);
      setIsProcessing(false);
      setProcessingStage('uploading');
      
      toast({
        title: 'Offline Analysis Failed',
        description: 'There was an error analyzing your image offline. Please try again.',
        variant: "destructive",
      });
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: 'No Image Selected',
        description: 'Please select an image before analyzing.',
        variant: "destructive",
      });
      return;
    }

    // Use optimized offline analysis if offline or forced offline
    if (!isOnline || forceOffline) {
      await analyzeImageOffline();
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

      if (!data || typeof data.label === 'undefined') {
        console.error('Invalid response structure:', data);
        throw new Error('Server returned invalid response format');
      }

      const processedResult = {
        ...data,
        confidence: data.confidence || data.probability || 0.8,
        probability: data.probability || data.confidence || 0.8,
        offline: false
      };

      console.log('Processed result:', processedResult);

      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Setting online result:', processedResult);
      setResult(processedResult);
      setIsProcessing(false);

      toast({
        title: 'Online Analysis Complete',
        description: `Disease detection completed with ${Math.round(processedResult.confidence * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Error analyzing image online, falling back to offline:', error);
      
      setProcessingStage('uploading');
      
      toast({
        title: 'Switching to Offline Mode',
        description: 'Server unavailable. Analyzing image offline...',
      });
      
      await analyzeImageOffline();
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setProcessingStage('uploading');
    setIsProcessing(false);
    setForceOffline(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Enhanced Header with Language Selector */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  TomatoAI
                </h1>
                <p className="text-sm text-emerald-600 font-medium flex items-center gap-2">
                  Advanced CNN Disease Detection
                  {!isOnline && (
                    <Badge variant="outline" className="text-xs">
                      Offline Mode
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <LanguageSelector />
              <div className="hidden md:flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">AI Powered</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Organic Treatments</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Works Offline</span>
                </div>
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
                Upload a photo of your tomato plant and get instant AI-powered diagnosis with comprehensive organic and cultural treatment recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Works Offline</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Organic Solutions</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Multiple Treatment Options</span>
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
                <div className="text-center animate-scale-in space-y-4">
                  <Button 
                    onClick={analyzeImage}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    {!isOnline || forceOffline ? 'Analyze Plant Health (Offline)' : 'Analyze Plant Health'}
                  </Button>
                  
                  {isOnline && !forceOffline && (
                    <div>
                      <Button 
                        onClick={() => {
                          setForceOffline(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="ml-4"
                      >
                        Try Offline Mode
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Info Section with System Title */}
        {!result && !isProcessing && (
          <div className="mt-20 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TomatoAI?</h3>
              <p className="text-lg text-gray-600">Comprehensive organic solutions that work online and offline</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Works Completely Offline</h4>
                <p className="text-gray-600 leading-relaxed">
                  Advanced offline AI model that works without internet connection, ensuring you can diagnose diseases anytime, anywhere.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Organic Solutions</h4>
                <p className="text-gray-600 leading-relaxed">
                  Multiple treatment options including organic, cultural, and biological methods - not just chemical fungicides.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Local Ghanaian Solutions</h4>
                <p className="text-gray-600 leading-relaxed">
                  Treatments using locally available ingredients and methods specifically designed for Ghana's farming conditions.
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
              <h4 className="text-xl font-bold">TomatoAI</h4>
            </div>
            <p className="text-emerald-100 mb-4">
              Comprehensive Offline Plant Disease Detection with Organic Treatment Solutions
            </p>
            <p className="text-emerald-200 text-sm">
              © 2025 TomatoAI Ghana - Empowering Farmers with Sustainable AI Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
