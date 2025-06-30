import React from 'react';
import { CheckCircle, AlertTriangle, Leaf, Pill, Clock, Info, Calendar, MapPin, AlertCircle } from 'lucide-react';
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
  prescription: {
    immediate: string[];
    weekly: string[];
    monthly: string[];
  };
  farmingTips: string[];
  expectedRecovery: string;
}> = {
  'tomatoe-healthy': {
    name: 'Healthy Plant',
    severity: 'healthy',
    description: 'Your tomato plant appears to be healthy with no signs of disease.',
    symptoms: ['Vibrant green foliage', 'Normal leaf structure', 'No visible spots or discoloration'],
    treatment: ['Continue current care routine', 'Regular watering and fertilization', 'Monitor for any changes'],
    prevention: ['Maintain proper spacing', 'Ensure good air circulation', 'Water at soil level'],
    prescription: {
      immediate: ['Continue current watering schedule', 'Apply balanced NPK fertilizer'],
      weekly: ['Monitor for any changes in leaf color', 'Check soil moisture levels'],
      monthly: ['Prune lower branches for air circulation', 'Apply organic compost']
    },
    farmingTips: ['Your plant is doing well! Keep up the good work', 'This is the ideal condition for tomato growth'],
    expectedRecovery: 'Plant is healthy - maintain current care routine'
  },
  'tomatoe-bacterial-spot': {
    name: 'Bacterial Spot',
    severity: 'moderate',
    description: 'Bacterial spot is a common disease that affects tomato leaves and fruit caused by Xanthomonas bacteria.',
    symptoms: ['Small, dark spots on leaves', 'Yellow halos around spots', 'Fruit lesions', 'Leaf drop in severe cases'],
    treatment: ['Apply copper-based fungicides', 'Remove affected leaves immediately', 'Improve air circulation', 'Avoid overhead watering'],
    prevention: ['Use disease-resistant varieties', 'Crop rotation every 2-3 years', 'Clean tools between plants'],
    prescription: {
      immediate: ['Remove all affected leaves and dispose safely', 'Apply copper sulfate spray (2g per liter)', 'Stop overhead watering immediately'],
      weekly: ['Spray copper fungicide every 7 days for 3 weeks', 'Monitor new growth for symptoms', 'Apply organic neem oil as preventive'],
      monthly: ['Implement drip irrigation system', 'Apply beneficial microorganisms to soil', 'Plan crop rotation for next season']
    },
    farmingTips: ['Common in Ghana\'s humid climate', 'Ensure morning watering to allow leaves to dry', 'Space plants 60cm apart for good airflow'],
    expectedRecovery: '2-3 weeks with proper treatment - new growth should be healthy'
  },
  'tomatoe-early-blight': {
    name: 'Early Blight',
    severity: 'moderate',
    description: 'Early blight is a fungal disease caused by Alternaria solani, creating distinctive target-like spots.',
    symptoms: ['Concentric rings on leaves (bull\'s eye pattern)', 'Brown spots with yellow borders', 'Lower leaves affected first', 'Stem lesions possible'],
    treatment: ['Apply fungicide containing chlorothalonil', 'Remove lower leaves', 'Mulch around plants', 'Increase plant spacing'],
    prevention: ['Proper plant spacing for air circulation', 'Drip irrigation instead of sprinkler', 'Regular pruning of lower branches'],
    prescription: {
      immediate: ['Remove all affected lower leaves', 'Apply chlorothalonil fungicide (3ml per liter)', 'Mulch around base with organic material'],
      weekly: ['Fungicide spray every 7-10 days during wet season', 'Prune suckers and lower branches', 'Monitor upper leaves for new infections'],
      monthly: ['Deep watering twice weekly (avoid daily light watering)', 'Apply potassium-rich fertilizer to boost immunity', 'Inspect and treat neighboring plants']
    },
    farmingTips: ['Very common during Ghana\'s rainy season', 'Start treatment early - don\'t wait for spread', 'Focus on lower leaf removal for prevention'],
    expectedRecovery: '3-4 weeks - complete recovery possible with consistent treatment'
  },
  'tomatoe-late-blight': {
    name: 'Late Blight',
    severity: 'severe',
    description: 'Late blight is a serious fungal disease caused by Phytophthora infestans that can destroy entire crops rapidly.',
    symptoms: ['Water-soaked spots on leaves', 'White fuzzy growth on leaf undersides', 'Rapid spread to entire plant', 'Fruit rot and collapse'],
    treatment: ['Immediate systemic fungicide application', 'Remove all affected parts', 'Destroy infected plants if severe', 'Apply preventive treatments to healthy plants'],
    prevention: ['Choose resistant varieties like Tropimech', 'Avoid wet conditions', 'Monitor weather - treat before rain', 'Use protective fungicides preventively'],
    prescription: {
      immediate: ['URGENT: Apply metalaxyl + mancozeb fungicide immediately', 'Remove and burn all affected plant parts', 'Treat all nearby plants preventively'],
      weekly: ['Systemic fungicide application every 5-7 days', 'Daily monitoring of all plants in area', 'Remove any new affected growth immediately'],
      monthly: ['Switch to resistant varieties for replanting', 'Soil treatment with beneficial fungi', 'Install rain protection if possible']
    },
    farmingTips: ['Most serious tomato disease in Ghana', 'Can destroy entire field in 1-2 weeks', 'Act immediately - don\'t delay treatment'],
    expectedRecovery: '4-6 weeks if caught early, may require replanting if severe'
  },
  'tomatoe-leaf-mold': {
    name: 'Leaf Mold',
    severity: 'mild',
    description: 'Leaf mold typically occurs in humid conditions with poor air circulation, caused by Passalora fulva fungus.',
    symptoms: ['Yellow spots on upper leaf surface', 'Fuzzy olive-green growth on leaf undersides', 'Leaves may curl and drop', 'Reduced fruit production'],
    treatment: ['Improve ventilation around plants', 'Reduce humidity levels', 'Apply appropriate fungicides', 'Remove affected leaves'],
    prevention: ['Ensure good air circulation', 'Avoid overcrowding plants', 'Water in morning hours', 'Use resistant varieties'],
    prescription: {
      immediate: ['Remove affected leaves carefully', 'Apply baking soda spray (5g per liter)', 'Improve spacing between plants'],
      weekly: ['Monitor humidity levels', 'Apply neem oil spray weekly', 'Prune for better air circulation'],
      monthly: ['Consider shade cloth during hottest periods', 'Apply sulfur-based fungicide monthly', 'Evaluate plant spacing for next season']
    },
    farmingTips: ['Common in greenhouse conditions', 'Easy to prevent with good ventilation', 'Responds well to organic treatments'],
    expectedRecovery: '2-3 weeks - excellent recovery rate with proper care'
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
            <CardTitle className="text-2xl font-bold">AI Diagnosis Complete</CardTitle>
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

      {/* Detailed Prescription - Only show for diseases */}
      {disease.severity !== 'healthy' && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-600" />
              Detailed Treatment Prescription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Act immediately!</strong> Early treatment is crucial for successful recovery. 
                Follow this prescription carefully for best results.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Immediate Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-red-700">Immediate Actions (Today)</h4>
                </div>
                {disease.prescription.immediate.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-200">
                    <Clock className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>

              {/* Weekly Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-orange-700">Weekly Care (Next 3-4 weeks)</h4>
                </div>
                {disease.prescription.weekly.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-200">
                    <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>

              {/* Monthly Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-green-700">Long-term Care (Monthly)</h4>
                </div>
                {disease.prescription.monthly.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-200">
                    <Leaf className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ghana-Specific Farming Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Ghana-Specific Farming Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {disease.farmingTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  🇬🇭
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ... keep existing code (symptoms, prevention, and disclaimer sections) */}
      
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

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Prevention for Future Crops
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

      {/* Professional Consultation Reminder */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> This AI diagnosis is a helpful tool, but for severe infections or persistent issues, 
          consult with your local agricultural extension officer or plant pathologist for professional confirmation and additional support.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsDisplay;
