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
    // Reset forceOffline when selecting a new image
    setForceOffline(false);
  };

  const checkInternetConnectivity = async (): Promise<boolean> => {
    try {
      // Try to fetch a reliable endpoint with a short timeout
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: AbortSignal.timeout(5000)
      });
      return true;
    } catch (error) {
      console.log('Internet connectivity check failed:', error);
      return false;
    }
  };

  const analyzeImageOffline = async () => {
    if (!selectedImage) return;

    console.log('Starting offline analysis...');
    setIsProcessing(true);
    setProcessingStage('uploading');

    try {
      // Dynamic import for better performance
      const { offlineDetectionService } = await import('@/services/offlineDetection');
      
      // Faster uploading simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingStage('analyzing');

      console.log('Running offline disease detection...');
      const offlineResult = await offlineDetectionService.detectDisease(selectedImage);
      
      console.log('Offline analysis result:', offlineResult);

      // Faster completion
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 300));

      const processedResult = {
        ...offlineResult,
        offline: true
      };

      console.log('Setting offline result:', processedResult);
      setResult(processedResult);
      setIsProcessing(false);

      toast({
        title: 'Offline Analysis Complete',
        description: `Disease detection completed offline with ${Math.round(offlineResult.confidence * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Error in offline analysis:', error);
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

    // Check if we should force offline mode
    if (forceOffline) {
      console.log('Force offline mode enabled');
      await analyzeImageOffline();
      return;
    }

    // Check if browser reports offline
    if (!isOnline) {
      console.log('Browser reports offline, using offline analysis');
      await analyzeImageOffline();
      return;
    }

    // Double-check internet connectivity
    const hasInternet = await checkInternetConnectivity();
    if (!hasInternet) {
      console.log('No internet connectivity detected, using offline analysis');
      await analyzeImageOffline();
      return;
    }

    // Proceed with online analysis
    console.log('Starting online analysis...');
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
      
      // Reduced timeout to 30 seconds for faster fallback
      const response = await fetch('https://tomatoe-plant-disease-predictor.onrender.com/predict', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(30000)
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
      console.error('Online analysis failed:', error);
      
      // Check if it's a timeout or network error
      const isTimeoutError = error instanceof Error && (
        error.name === 'TimeoutError' || 
        error.message.includes('timeout') ||
        error.message.includes('signal timed out')
      );
      
      const isNetworkError = error instanceof Error && (
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('Failed to fetch')
      );

      if (isTimeoutError) {
        toast({
          title: 'Server Timeout',
          description: 'The server is taking too long to respond. Switching to offline analysis...',
        });
      } else if (isNetworkError) {
        toast({
          title: 'Network Error', 
          description: 'Unable to connect to server. Switching to offline analysis...',
        });
      } else {
        toast({
          title: 'Server Error',
          description: 'Server error occurred. Switching to offline analysis...',
        });
      }
      
      setProcessingStage('uploading');
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

  // Helper function to determine if offline mode should be used
  const shouldUseOfflineMode = () => {
    return !isOnline || forceOffline;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Enhanced Header with Language Selector */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  TomatoAI
                </h1>
                <p className="text-xs sm:text-sm text-emerald-600 font-medium flex items-center gap-1 sm:gap-2">
                  <span className="hidden sm:inline">Advanced CNN Disease Detection</span>
                  <span className="sm:hidden">AI Disease Detection</span>
                  {!isOnline && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      Offline
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <LanguageSelector />
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-sm">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Brain className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="font-medium">AI Powered</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="font-medium">Organic Treatments</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="font-medium">Works Offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        {!result && !isProcessing && (
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                Detect Tomato Diseases
                <span className="block text-emerald-600">Instantly with AI</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                Upload a photo of your tomato plant and get instant AI-powered diagnosis with comprehensive organic and cultural treatment recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-4 sm:px-0">
                <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Works Offline</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Organic Solutions</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
                  <span className="text-emerald-700 font-medium">✓ Multiple Treatment Options</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {isProcessing ? (
            <div className="animate-scale-in px-4 sm:px-0">
              <ProcessingAnimation stage={processingStage} />
            </div>
          ) : result ? (
            <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-0">
              <ResultsDisplay result={result} selectedImage={selectedImage!} />
              <div className="text-center">
                <Button 
                  onClick={resetAnalysis} 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  Analyze Another Plant
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-emerald-100 mx-4 sm:mx-0">
                <ImageUpload 
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  isProcessing={isProcessing}
                />
              </div>
              
              {selectedImage && (
                <div className="text-center animate-scale-in space-y-4 px-4 sm:px-0">
                  <Button 
                    onClick={analyzeImage}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">
                      {shouldUseOfflineMode() ? 'Analyze Plant Health (Offline)' : 'Analyze Plant Health'}
                    </span>
                    <span className="sm:hidden">
                      {shouldUseOfflineMode() ? 'Analyze (Offline)' : 'Analyze Plant'}
                    </span>
                  </Button>
                  
                  {isOnline && !forceOffline && (
                    <div>
                      <Button 
                        onClick={() => {
                          console.log('Force offline button clicked');
                          setForceOffline(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-2 sm:ml-4 sm:mt-0 w-full sm:w-auto"
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
          <div className="mt-12 sm:mt-16 lg:mt-20 animate-fade-in px-4 sm:px-0">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Why Choose TomatoAI?</h3>
              <p className="text-base sm:text-lg text-gray-600">Comprehensive organic solutions that work online and offline</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Works Completely Offline</h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Advanced offline AI model that works without internet connection, ensuring you can diagnose diseases anytime, anywhere.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Comprehensive Organic Solutions</h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Multiple treatment options including organic, cultural, and biological methods - not just chemical fungicides.
                </p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Local Ghanaian Solutions</h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Treatments using locally available ingredients and methods specifically designed for Ghana's farming conditions.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white mt-12 sm:mt-16 lg:mt-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold">TomatoAI</h4>
            </div>
            <p className="text-emerald-100 mb-4 text-sm sm:text-base px-4 sm:px-0">
              Comprehensive Offline Plant Disease Detection with Organic Treatment Solutions
            </p>
            <p className="text-emerald-200 text-xs sm:text-sm px-4 sm:px-0">
              © 2025 TomatoAI Ghana - Empowering Farmers with Sustainable AI Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
