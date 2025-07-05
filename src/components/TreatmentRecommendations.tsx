
import React, { useState } from 'react';
import { Leaf, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateTreatment } from '@/services/translationService';
import TreatmentTabs from './TreatmentTabs';
import TreatmentDetails from './TreatmentDetails';

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

  // Check if this is for a healthy plant (preventive treatments only)
  const isHealthyPlant = treatments.length === 1 && treatments[0].type === 'preventive';

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isHealthyPlant ? (
            <Heart className="w-5 h-5 text-green-600" />
          ) : (
            <Leaf className="w-5 h-5 text-green-600" />
          )}
          {isHealthyPlant ? t('healthy.title') : t('treatment.title')}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {isHealthyPlant ? t('healthy.subtitle') : t('treatment.subtitle')}
        </p>
      </CardHeader>
      <CardContent>
        {isHealthyPlant ? (
          // Special layout for healthy plants
          <div className="space-y-4">
            <h3 className="font-semibold text-green-700">{t('healthy.care_title')}</h3>
            {translatedTreatments.map((treatment, index) => (
              <Card key={index} className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">{treatment.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{treatment.description}</p>
                  <div className="text-sm text-gray-600">
                    <p><strong>{t('treatment.application')}</strong> {treatment.application}</p>
                    <p><strong>{t('healthy.frequency')}</strong> {treatment.frequency}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Regular treatment tabs for diseased plants
          <>
            <TreatmentTabs 
              treatments={translatedTreatments} 
              onSelectTreatment={setSelectedTreatment} 
            />

            {selectedTreatment && (
              <TreatmentDetails treatment={selectedTreatment} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TreatmentRecommendations;
