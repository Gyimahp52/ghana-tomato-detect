
import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
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
        <TreatmentTabs 
          treatments={translatedTreatments} 
          onSelectTreatment={setSelectedTreatment} 
        />

        {selectedTreatment && (
          <TreatmentDetails treatment={selectedTreatment} />
        )}
      </CardContent>
    </Card>
  );
};

export default TreatmentRecommendations;
