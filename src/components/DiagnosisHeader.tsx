
import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DiagnosisHeaderProps {
  result: {
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
  };
  selectedImage: File;
  disease: {
    name: string;
    severity: string;
    description: string;
    expectedRecovery: string;
  };
}

const DiagnosisHeader: React.FC<DiagnosisHeaderProps> = ({ result, selectedImage, disease }) => {
  const confidencePercentage = Math.round(result.confidence_score * 100);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'mild': return 'text-yellow-600 bg-yellow-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'severe': return 'text-red-600 bg-red-100';
      case 'not_applicable': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'healthy': return <CheckCircle className="w-5 h-5" />;
      case 'mild': return <Info className="w-5 h-5" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'severe': return <AlertCircle className="w-5 h-5" />;
      case 'not_applicable': return <Info className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 flex-wrap">
            <span>AI Diagnosis Complete</span>
            {result.offline ? (
              <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 flex items-center gap-1">
                <WifiOff className="w-3 h-3" />
                Offline Analysis
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                Online Analysis
              </Badge>
            )}
          </CardTitle>
          <Badge variant="outline" className="text-base sm:text-lg px-2 sm:px-3 py-1 self-start sm:self-auto">
            {confidencePercentage}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="order-2 lg:order-1">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Analyzed tomato plant"
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            <div className="flex items-start sm:items-center gap-3">
              {getSeverityIcon(disease.severity)}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{disease.name}</h3>
                <Badge className={`${getSeverityColor(disease.severity)} border-0`}>
                  {disease.severity === 'not_applicable' ? 'Not Applicable' : disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                </Badge>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{disease.description}</p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Expected Recovery:</strong> {disease.expectedRecovery}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisHeader;
