import React from 'react';
import DiagnosisHeader from './DiagnosisHeader';
import OfflineNotice from './OfflineNotice';
import SymptomsCard from './SymptomsCard';
import PreventionCard from './PreventionCard';
import FarmingTipsCard from './FarmingTipsCard';
import TreatmentRecommendations from './TreatmentRecommendations';
import ConsultationNotice from './ConsultationNotice';
import GeminiDescriptionCard from './GeminiDescriptionCard';
import { expandedDiseaseInfo } from '@/data/diseases';

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

interface ResultsDisplayProps {
  result: PredictionResult;
  selectedImage: File;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, selectedImage }) => {
  // Determine disease info based on health status and detected diseases
  const getDiseaseInfo = () => {
    // Handle non-tomato images
    if (result.is_tomato_leaf === 'not_tomato') {
      return expandedDiseaseInfo['tomaote-not-healthy']; // Use as fallback for display
    }

    // Handle healthy plants
    if (result.health_status === 'healthy') {
      return expandedDiseaseInfo['tomatoe-healthy'];
    }

    // Handle diseased/stressed plants based on detected diseases
    if (result.diseases_detected && result.diseases_detected.length > 0) {
      const primaryDisease = result.diseases_detected[0];
      
      switch (primaryDisease) {
        case 'early_blight':
          return expandedDiseaseInfo['tomatoe-early-blight'];
        case 'late_blight':
          return expandedDiseaseInfo['tomatoe-late-blight'];
        case 'bacterial_spot':
          return expandedDiseaseInfo['tomatoe-bacterial-spot'];
        case 'septoria_leaf_spot':
        case 'leaf_mold':
          return expandedDiseaseInfo['tomatoe-leaf-mold'];
        case 'nutrient_deficiency':
        case 'other':
        default:
          return expandedDiseaseInfo['tomaote-not-healthy'];
      }
    }

    // Default fallback for stressed or unclear cases
    return expandedDiseaseInfo['tomaote-not-healthy'];
  };

  const disease = getDiseaseInfo();
  
  console.log('Health status:', result.health_status, 'Diseases detected:', result.diseases_detected, 'Using disease info:', disease.name);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header with image and main result */}
      <DiagnosisHeader 
        result={result} 
        selectedImage={selectedImage} 
        disease={disease} 
      />

      {/* Offline Detection Notice */}
      <OfflineNotice isOffline={!!result.offline} />

      {/* Gemini AI Description */}
      {result.gemini_description && (
        <GeminiDescriptionCard description={result.gemini_description} />
      )}

      {/* Comprehensive Treatment Recommendations */}
      {disease.severity !== 'healthy' && (
        <TreatmentRecommendations treatments={disease.treatments} />
      )}

      {/* Ghana-Specific Farming Tips */}
      <FarmingTipsCard farmingTips={disease.farmingTips} />

      {/* Symptoms */}
      <SymptomsCard symptoms={disease.symptoms} />

      {/* Prevention Tips */}
      <PreventionCard preventionTips={disease.prevention} />

      {/* Professional Consultation Reminder */}
      <ConsultationNotice />
    </div>
  );
};

export default ResultsDisplay;
