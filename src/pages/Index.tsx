import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import HeaderSection from '@/components/HeaderSection';
import HeroSection from '@/components/HeroSection';
import AnalysisSection from '@/components/AnalysisSection';
import InfoSection from '@/components/InfoSection';
import FooterSection from '@/components/FooterSection';

interface PredictionResult {
  is_tomato_leaf: string;
  confidence_score: number;
  health_status: string;
  diseases_detected: string[];
  symptoms_observed: string[];
  severity_level: string | null;
  treatment_recommendations: string[];
  prevention_tips: string[];
  additional_notes: string;
  offline?: boolean;
  gemini_description?: string;
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

      const processedResult: PredictionResult = {
        is_tomato_leaf: offlineResult.is_tomato_leaf,
        confidence_score: offlineResult.confidence_score,
        health_status: offlineResult.health_status,
        diseases_detected: offlineResult.diseases_detected,
        symptoms_observed: offlineResult.symptoms_observed,
        severity_level: offlineResult.severity_level,
        treatment_recommendations: offlineResult.treatment_recommendations,
        prevention_tips: offlineResult.prevention_tips,
        additional_notes: offlineResult.additional_notes,
        offline: true,
        gemini_description: offlineResult.gemini_description
      };

      console.log('Setting offline result:', processedResult);
      setResult(processedResult);
      setIsProcessing(false);

      toast({
        title: 'Offline Analysis Complete',
        description: `Disease detection completed offline with ${Math.round(processedResult.confidence_score * 100)}% confidence.`,
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

      const data = await response.json();
      console.log('Raw API Response data:', data);

      // Handle new API response format
      const processedResult: PredictionResult = {
        is_tomato_leaf: data.is_tomato_leaf || 'tomato',
        confidence_score: data.confidence_score || 0.8,
        health_status: data.health_status || 'diseased',
        diseases_detected: data.diseases_detected || ['other'],
        symptoms_observed: data.symptoms_observed || [],
        severity_level: data.severity_level || 'moderate',
        treatment_recommendations: data.treatment_recommendations || [],
        prevention_tips: data.prevention_tips || [],
        additional_notes: data.additional_notes || '',
        offline: false,
        gemini_description: data.additional_notes || ''
      };

      console.log('Processed result:', processedResult);

      setProcessingStage('complete');
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Setting online result:', processedResult);
      setResult(processedResult);
      setIsProcessing(false);

      toast({
        title: 'Online Analysis Complete',
        description: `Disease detection completed with ${Math.round(processedResult.confidence_score * 100)}% confidence.`,
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

  const handleForceOffline = () => {
    console.log('Force offline button clicked');
    setForceOffline(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <HeaderSection isOnline={isOnline} />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        {!result && !isProcessing && <HeroSection />}

        <div className="max-w-4xl mx-auto">
          <AnalysisSection
            selectedImage={selectedImage}
            isProcessing={isProcessing}
            processingStage={processingStage}
            result={result}
            isOnline={isOnline}
            forceOffline={forceOffline}
            onImageSelect={handleImageSelect}
            onAnalyzeImage={analyzeImage}
            onResetAnalysis={resetAnalysis}
            onForceOffline={handleForceOffline}
          />
        </div>

        {!result && !isProcessing && <InfoSection />}
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;
