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

  // Monitor online/offline status with debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const handleOnline = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log('Browser reports online');
        setIsOnline(true);
      }, 1000); // 1 second debounce
    };
    
    const handleOffline = () => {
      clearTimeout(debounceTimer);
      console.log('Browser reports offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkInternetConnectivity = async (retries = 2, delay = 1000): Promise<boolean> => {
    // If browser reports offline, don't even try
    if (!navigator.onLine) {
      console.log('Browser reports offline, skipping connectivity check');
      return false;
    }

    const testEndpoints = [
      'https://www.google.com/favicon.ico',
      'https://www.cloudflare.com/favicon.ico',
      'https://www.apple.com/favicon.ico'
    ];

    for (let attempt = 0; attempt <= retries; attempt++) {
      // Try different endpoints for better reliability
      const endpoint = testEndpoints[attempt % testEndpoints.length];
      
      try {
        console.log(`Checking connectivity (attempt ${attempt + 1}) to ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
          signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        console.log(`Connectivity check successful to ${endpoint}`);
        return true;
      } catch (error) {
        console.warn(`Connectivity check failed (attempt ${attempt + 1}):`, error);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    console.log('All connectivity checks failed');
    return false;
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setResult(null);
    // Reset forceOffline when selecting a new image
    setForceOffline(false);
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

    console.log('Starting online analysis...');
    setIsProcessing(true);
    setProcessingStage('uploading');

    // Check internet connectivity with retries before proceeding
    const hasInternet = await checkInternetConnectivity();
    if (!hasInternet) {
      console.log('No internet connectivity detected, falling back to offline mode');
      await analyzeImageOffline();
      return;
    }

    // Proceed with online analysis
    try {
      // Simulate uploading stage
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStage('analyzing');

      const formData = new FormData();
      formData.append('file', selectedImage);

      console.log('Sending request to API...');
      
      // Try the online API with a timeout and retry logic
      let response;
      const maxRetries = 2;
      let lastError;
      
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          response = await fetch('https://tomatoe-plant-disease-predictor.onrender.com/predict', {
            method: 'POST',
            body: formData,
            signal: AbortSignal.timeout(15000) // 15 second timeout per attempt
          });
          break; // If successful, exit the retry loop
        } catch (error) {
          lastError = error;
          if (attempt < maxRetries) {
            console.warn(`API attempt ${attempt + 1} failed, retrying...`, error);
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
          }
        }
      }

      // If all retries failed
      if (!response) {
        throw lastError || new Error('Failed to connect to the server after multiple attempts');
      }

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
