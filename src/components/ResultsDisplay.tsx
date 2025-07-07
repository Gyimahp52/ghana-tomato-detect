
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
    // Handle the API's inconsistent spelling of "tomaote" vs "tomatoe"
    let normalized = label.toLowerCase().replace(/[^a-z-]/g, '');
    
    // Fix the spelling inconsistency
    if (normalized.startsWith('tomaote')) {
      normalized = normalized.replace('tomaote', 'tomatoe');
    }
    
    console.log('Normalizing label:', label, 'to:', normalized);
    return normalized;
  };

  const diseaseKey = normalizeLabel(result.label);
  let disease = expandedDiseaseInfo[diseaseKey];
  
  // If we don't have specific disease info, fall back based on label content
  if (!disease) {
    console.log('Disease not found for key:', diseaseKey, 'Available keys:', Object.keys(expandedDiseaseInfo));
    
    if (diseaseKey.includes('not-healthy') || diseaseKey.includes('unhealthy')) {
      disease = expandedDiseaseInfo['tomaote-not-healthy'];
    } else if (diseaseKey.includes('healthy')) {
      disease = expandedDiseaseInfo['tomatoe-healthy'];
    } else if (diseaseKey.includes('bacterial') || diseaseKey.includes('spot')) {
      disease = expandedDiseaseInfo['tomatoe-bacterial-spot'];
    } else if (diseaseKey.includes('early') && diseaseKey.includes('blight')) {
      disease = expandedDiseaseInfo['tomatoe-early-blight'];
    } else if (diseaseKey.includes('late') && diseaseKey.includes('blight')) {
      disease = expandedDiseaseInfo['tomatoe-late-blight'];
    } else if (diseaseKey.includes('leaf') && diseaseKey.includes('mold')) {
      disease = expandedDiseaseInfo['tomatoe-leaf-mold'];
    } else {
      // Final fallback to general not healthy
      disease = expandedDiseaseInfo['tomaoe-not-healthy'];
    }
  }

  console.log('Disease key:', diseaseKey, 'Found disease:', !!expandedDiseaseInfo[diseaseKey], 'Using:', disease.name);

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
