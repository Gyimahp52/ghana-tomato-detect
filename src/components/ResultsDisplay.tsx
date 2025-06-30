
import React from 'react';
import { CheckCircle, AlertTriangle, Leaf, Pills, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PredictionResult {
  label: string;
  probability: number;
  confidence: number;
  image_path: string;
}

interface ResultsDisplayProps {
  result: PredictionResult;
  selectedImage: File;
}

const diseaseInfo: Record<string, {
  name: string;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}> = {
  'tomatoe-healthy': {
    name: 'Healthy Plant',
    severity: 'healthy',
    description: 'Your tomato plant appears to be healthy with no signs of disease.',
    symptoms: ['Vibrant green foliage', 'Normal leaf structure', 'No visible spots or discoloration'],
    treatment: ['Continue current care routine', 'Regular watering and fertilization', 'Monitor for any changes'],
    prevention: ['Maintain proper spacing', 'Ensure good air circulation', 'Water at soil level']
  },
  'tomatoe-bacterial-spot': {
    name: 'Bacterial Spot',
    severity: 'moderate',
    description: 'Bacterial spot is a common disease that affects tomato leaves and fruit.',
    symptoms: ['Small, dark spots on leaves', 'Yellow halos around spots', 'Fruit lesions'],
    treatment: ['Apply copper-based fungicides', 'Remove affected leaves', 'Improve air circulation'],
    prevention: ['Avoid overhead watering', 'Use disease-resistant varieties', 'Crop rotation']
  },
  'tomatoe-early-blight': {
    name: 'Early Blight',
    severity: 'moderate',
    description: 'Early blight is a fungal disease that creates distinctive target-like spots.',
    symptoms: ['Concentric rings on leaves', 'Brown spots with yellow borders', 'Lower leaves affected first'],
    treatment: ['Fungicide application', 'Remove lower leaves', 'Mulch around plants'],
    prevention: ['Proper plant spacing', 'Drip irrigation', 'Regular pruning']
  },
  'tomatoe-late-blight': {
    name: 'Late Blight',
    severity: 'severe',
    description: 'Late blight is a serious fungal disease that can destroy entire crops.',
    symptoms: ['Water-soaked spots', 'White fuzzy growth', 'Rapid spread', 'Fruit rot'],
    treatment: ['Immediate fungicide treatment', 'Remove all affected parts', 'Destroy infected plants'],
    prevention: ['Choose resistant varieties', 'Avoid wet conditions', 'Monitor weather conditions']
  },
  'tomatoe-leaf-mold': {
    name: 'Leaf Mold',
    severity: 'mild',
    description: 'Leaf mold typically occurs in humid conditions with poor air circulation.',
    symptoms: ['Yellow spots on upper leaf surface', 'Fuzzy growth on leaf undersides', 'Leaves may curl'],
    treatment: ['Improve ventilation', 'Reduce humidity', 'Apply appropriate fungicides'],
    prevention: ['Greenhouse ventilation', 'Avoid overcrowding', 'Morning watering']
  }
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, selectedImage }) => {
  const diseaseKey = result.label.toLowerCase().replace(/[^a-z-]/g, '');
  const disease = diseaseInfo[diseaseKey] || diseaseInfo['tomatoe-healthy'];
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
      case 'severe': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with image and main result */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Analysis Results</CardTitle>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Identified Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                {symptom}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      {disease.severity !== 'healthy' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pills className="w-5 h-5 text-blue-600" />
              Treatment Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Act quickly!</strong> Early treatment is key to preventing disease spread.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              {disease.treatment.map((treatment, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{treatment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {disease.prevention.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> This analysis is based on AI image recognition. For persistent issues or severe infections, 
          consult with a local agricultural extension office or plant pathologist for professional diagnosis and treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsDisplay;
