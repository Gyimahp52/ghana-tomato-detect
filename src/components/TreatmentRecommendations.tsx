
import React, { useState, useEffect } from 'react';
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
  const [translatedTreatments, setTranslatedTreatments] = useState<TreatmentMethod[]>(treatments);
  const [isTranslating, setIsTranslating] = useState(false);

  // Add debug logging for translation
  console.log('TreatmentRecommendations - Current language:', language);
  console.log('TreatmentRecommendations - Translation test:', t('treatment.title'));

  // Effect to handle async translation when language changes
  useEffect(() => {
    const translateTreatments = async () => {
      if (language === 'en') {
        setTranslatedTreatments(treatments);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await Promise.all(
          treatments.map(treatment => translateTreatment(treatment, language))
        );
        setTranslatedTreatments(translated);
        console.log('Treatments translated to:', language, translated);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedTreatments(treatments); // Fallback to original
      } finally {
        setIsTranslating(false);
      }
    };

    translateTreatments();
  }, [treatments, language]);

  // Check if this is for a healthy plant (preventive treatments only)
  const isHealthyPlant = treatments.length === 1 && treatments[0].type === 'preventive';

  const titleText = isHealthyPlant ? t('healthy.title') : t('treatment.title');
  const subtitleText = isHealthyPlant ? t('healthy.subtitle') : t('treatment.subtitle');

  console.log('TreatmentRecommendations - Title text:', titleText);
  console.log('TreatmentRecommendations - Subtitle text:', subtitleText);

  if (isTranslating && language === 'tw') {
    return (
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="text-gray-600">Translating to Twi...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isHealthyPlant ? (
            <Heart className="w-5 h-5 text-green-600" />
          ) : (
            <Leaf className="w-5 h-5 text-green-600" />
          )}
          {titleText}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {subtitleText}
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
