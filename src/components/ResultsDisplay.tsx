import React from 'react';
import DiagnosisHeader from './DiagnosisHeader';
import OfflineNotice from './OfflineNotice';
import SymptomsCard from './SymptomsCard';
import PreventionCard from './PreventionCard';
import FarmingTipsCard from './FarmingTipsCard';
import TreatmentRecommendations from './TreatmentRecommendations';
import ConsultationNotice from './ConsultationNotice';
import { expandedDiseaseInfo } from '@/data/diseases';

interface PredictionResult {
  label: string;
  probability: number;
  confidence: number;
  image_path: string;
  offline?: boolean;
}

interface ResultsDisplayProps {
  result: PredictionResult;
  selectedImage: File;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, selectedImage }) => {
  // Normalize the disease label to match our disease keys
  const normalizeLabel = (label: string): string => {
    const normalized = label.toLowerCase().replace(/[^a-z-]/g, '');
    console.log('Normalizing label:', label, 'to:', normalized);
    return normalized;
  };

  const diseaseKey = normalizeLabel(result.label);
  const disease = expandedDiseaseInfo[diseaseKey];
  
  // If we don't have specific disease info, fall back to general unhealthy info
  const finalDisease = disease || (diseaseKey.includes('not-healthy') || diseaseKey.includes('unhealthy') 
    ? expandedDiseaseInfo['tomaote-not-healthy'] 
    : expandedDiseaseInfo['tomatoe-healthy']);

  console.log('Disease key:', diseaseKey, 'Found disease:', !!disease, 'Using:', finalDisease.name);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with image and main result */}
      <DiagnosisHeader 
        result={result} 
        selectedImage={selectedImage} 
        disease={finalDisease} 
      />

      {/* Offline Detection Notice */}
      <OfflineNotice isOffline={!!result.offline} />

      {/* Comprehensive Treatment Recommendations */}
      {finalDisease.severity !== 'healthy' && (
        <TreatmentRecommendations treatments={finalDisease.treatments} />
      )}

      {/* Ghana-Specific Farming Tips */}
      <FarmingTipsCard farmingTips={finalDisease.farmingTips} />

      {/* Symptoms */}
      <SymptomsCard symptoms={finalDisease.symptoms} />

      {/* Prevention Tips */}
      <PreventionCard preventionTips={finalDisease.prevention} />

      {/* Professional Consultation Reminder */}
      <ConsultationNotice />
    </div>
  );
};

export default ResultsDisplay;
