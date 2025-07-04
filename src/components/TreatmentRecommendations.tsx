
import React, { useState } from 'react';
import { Leaf, Droplets, Scissors, Microscope, ShieldCheck, DollarSign, MapPin, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateTreatment } from '@/services/translationService';

interface TreatmentRecommendationsProps {
  treatments: TreatmentMethod[];
}

const TreatmentRecommendations: React.FC<TreatmentRecommendationsProps> = ({ treatments }) => {
  const { t, language } = useLanguage();
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentMethod | null>(null);

  // Translate treatments based on current language
  const translatedTreatments = treatments.map(treatment => 
    translateTreatment(treatment, language)
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'organic': return <Leaf className="w-4 h-4" />;
      case 'cultural': return <Scissors className="w-4 h-4" />;
      case 'biological': return <Microscope className="w-4 h-4" />;
      case 'chemical': return <Droplets className="w-4 h-4" />;
      case 'preventive': return <ShieldCheck className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organic': return 'bg-green-100 text-green-800 border-green-200';
      case 'cultural': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'biological': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'chemical': return 'bg-red-100 text-red-800 border-red-200';
      case 'preventive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'common': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'rare': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const organicTreatments = translatedTreatments.filter(t => t.type === 'organic');
  const culturalTreatments = translatedTreatments.filter(t => t.type === 'cultural');
  const biologicalTreatments = translatedTreatments.filter(t => t.type === 'biological');
  const chemicalTreatments = translatedTreatments.filter(t => t.type === 'chemical');
  const preventiveTreatments = translatedTreatments.filter(t => t.type === 'preventive');

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          {t('treatment.title')}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {t('treatment.subtitle')}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="organic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="organic" className="text-xs">
              <Leaf className="w-3 h-3 mr-1" />
              {t('treatment.organic')} ({organicTreatments.length})
            </TabsTrigger>
            <TabsTrigger value="cultural" className="text-xs">
              <Scissors className="w-3 h-3 mr-1" />
              {t('treatment.cultural')} ({culturalTreatments.length})
            </TabsTrigger>
            <TabsTrigger value="biological" className="text-xs">
              <Microscope className="w-3 h-3 mr-1" />
              {t('treatment.biological')} ({biologicalTreatments.length})
            </TabsTrigger>
            {chemicalTreatments.length > 0 && (
              <TabsTrigger value="chemical" className="text-xs">
                <Droplets className="w-3 h-3 mr-1" />
                {t('treatment.chemical')} ({chemicalTreatments.length})
              </TabsTrigger>
            )}
            {preventiveTreatments.length > 0 && (
              <TabsTrigger value="preventive" className="text-xs">
                <ShieldCheck className="w-3 h-3 mr-1" />
                {t('treatment.preventive')} ({preventiveTreatments.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="organic">
            <TreatmentGrid treatments={organicTreatments} onSelect={setSelectedTreatment} />
          </TabsContent>
          <TabsContent value="cultural">
            <TreatmentGrid treatments={culturalTreatments} onSelect={setSelectedTreatment} />
          </TabsContent>
          <TabsContent value="biological">
            <TreatmentGrid treatments={biologicalTreatments} onSelect={setSelectedTreatment} />
          </TabsContent>
          {chemicalTreatments.length > 0 && (
            <TabsContent value="chemical">
              <TreatmentGrid treatments={chemicalTreatments} onSelect={setSelectedTreatment} />
            </TabsContent>
          )}
          {preventiveTreatments.length > 0 && (
            <TabsContent value="preventive">
              <TreatmentGrid treatments={preventiveTreatments} onSelect={setSelectedTreatment} />
            </TabsContent>
          )}
        </Tabs>

        {selectedTreatment && (
          <Card className="mt-6 border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(selectedTreatment.type)}
                {selectedTreatment.name}
                <Badge className={getTypeColor(selectedTreatment.type)}>
                  {t(`treatment.${selectedTreatment.type}`)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{selectedTreatment.description}</p>
              
              {selectedTreatment.ingredients && (
                <div>
                  <h4 className="font-semibold mb-2">{t('treatment.ingredients')}</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedTreatment.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold mb-2">{t('treatment.application')}</h4>
                <p className="text-sm text-gray-700">{selectedTreatment.application}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{selectedTreatment.frequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{selectedTreatment.effectiveness}% {t('treatment.effective')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className={`w-4 h-4 ${getCostColor(selectedTreatment.costLevel)}`} />
                  <span className={getCostColor(selectedTreatment.costLevel)}>
                    {t(`treatment.${selectedTreatment.costLevel}`)} {t('treatment.cost')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${getAvailabilityColor(selectedTreatment.localAvailability)}`} />
                  <span className={getAvailabilityColor(selectedTreatment.localAvailability)}>
                    {t(`treatment.${selectedTreatment.localAvailability}`)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

const TreatmentGrid: React.FC<{
  treatments: TreatmentMethod[];
  onSelect: (treatment: TreatmentMethod) => void;
}> = ({ treatments, onSelect }) => {
  const { t } = useLanguage();
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organic': return 'border-green-200 hover:bg-green-50';
      case 'cultural': return 'border-blue-200 hover:bg-blue-50';
      case 'biological': return 'border-purple-200 hover:bg-purple-50';
      case 'chemical': return 'border-red-200 hover:bg-red-50';
      case 'preventive': return 'border-gray-200 hover:bg-gray-50';
      default: return 'border-gray-200 hover:bg-gray-50';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {treatments.map((treatment, index) => (
        <Card
          key={index}
          className={`cursor-pointer transition-all duration-200 ${getTypeColor(treatment.type)} hover:shadow-md`}
          onClick={() => onSelect(treatment)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{treatment.name}</h4>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs">{treatment.effectiveness}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">{treatment.frequency}</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {t(`treatment.${treatment.costLevel}`)} {t('treatment.cost')}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t(`treatment.${treatment.localAvailability}`)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TreatmentRecommendations;
