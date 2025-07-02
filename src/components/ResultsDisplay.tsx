
import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SymptomsCard from './SymptomsCard';
import PreventionCard from './PreventionCard';
import FarmingTipsCard from './FarmingTipsCard';
import TreatmentRecommendations from './TreatmentRecommendations';
import { expandedDiseaseInfo } from '@/data/expandedTreatments';

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

  const confidencePercentage = Math.round(result.confidence * 100);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'mild': return 'text-yellow-600 bg-yellow-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'healthy': return <CheckCircle className="w-5 h-5" />;
      case 'mild': return <Info className="w-5 h-5" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'severe': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with image and main result */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              AI Diagnosis Complete
              {result.offline ? (
                <Badge variant="outline" className="text-sm px-3 py-1 flex items-center gap-1">
                  <WifiOff className="w-3 h-3" />
                  Offline Analysis
                </Badge>
              ) : (
                <Badge variant="outline" className="text-sm px-3 py-1 flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  Online Analysis
                </Badge>
              )}
            </CardTitle>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {confidencePercentage}% Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Analyzed tomato plant"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {getSeverityIcon(finalDisease.severity)}
                <div>
                  <h3 className="text-xl font-semibold">{finalDisease.name}</h3>
                  <Badge className={`${getSeverityColor(finalDisease.severity)} border-0`}>
                    {finalDisease.severity.charAt(0).toUpperCase() + finalDisease.severity.slice(1)}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{finalDisease.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Expected Recovery:</strong> {finalDisease.expectedRecovery}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Detection Notice */}
      {result.offline && (
        <Alert className="border-blue-200 bg-blue-50">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            <strong>Offline Analysis:</strong> This diagnosis was performed using our offline AI model. 
            The system analyzed your image locally on your device without requiring an internet connection.
          </AlertDescription>
        </Alert>
      )}

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
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> This AI diagnosis provides comprehensive treatment options including organic, 
          cultural, and biological methods. For severe infections or if organic methods aren't working, 
          consult with your local agricultural extension officer for additional support.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsDisplay;
