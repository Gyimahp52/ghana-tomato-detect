import React from 'react';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ResultsDisplay from '@/components/ResultsDisplay';

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

interface AnalysisSectionProps {
  selectedImage: File | null;
  isProcessing: boolean;
  processingStage: 'uploading' | 'analyzing' | 'complete';
  result: PredictionResult | null;
  isOnline: boolean;
  forceOffline: boolean;
  onImageSelect: (file: File | null) => void;
  onAnalyzeImage: () => void;
  onResetAnalysis: () => void;
  onForceOffline: () => void;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  selectedImage,
  isProcessing,
  processingStage,
  result,
  isOnline,
  forceOffline,
  onImageSelect,
  onAnalyzeImage,
  onResetAnalysis,
  onForceOffline
}) => {
  const shouldUseOfflineMode = () => {
    return !isOnline || forceOffline;
  };

  if (isProcessing) {
    return (
      <div className="animate-scale-in px-4 sm:px-0">
        <ProcessingAnimation stage={processingStage} />
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-0">
        <ResultsDisplay result={result} selectedImage={selectedImage!} />
        <div className="text-center">
          <Button 
            onClick={onResetAnalysis} 
            size="lg" 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Analyze Another Plant
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-emerald-100 mx-4 sm:mx-0">
        <ImageUpload 
          onImageSelect={onImageSelect}
          selectedImage={selectedImage}
          isProcessing={isProcessing}
        />
      </div>
      
      {selectedImage && (
        <div className="text-center animate-scale-in space-y-4 px-4 sm:px-0">
          <Button 
            onClick={onAnalyzeImage}
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
                onClick={onForceOffline}
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
  );
};

export default AnalysisSection;
