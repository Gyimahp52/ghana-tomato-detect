
import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DiagnosisHeaderProps {
  result: {
    label: string;
    probability: number;
    confidence: number;
    image_path: string;
    offline?: boolean;
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
              {getSeverityIcon(disease.severity)}
              <div>
                <h3 className="text-xl font-semibold">{disease.name}</h3>
                <Badge className={`${getSeverityColor(disease.severity)} border-0`}>
                  {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{disease.description}</p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
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
