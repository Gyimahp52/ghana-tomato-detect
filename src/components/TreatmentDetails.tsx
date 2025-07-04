
import React from 'react';
import { Clock, Star, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTypeIcon, getTypeColor, getCostColor, getAvailabilityColor } from '@/utils/treatmentUtils';

interface TreatmentDetailsProps {
  treatment: TreatmentMethod;
}

const TreatmentDetails: React.FC<TreatmentDetailsProps> = ({ treatment }) => {
  const { t } = useLanguage();
  const TypeIcon = getTypeIcon(treatment.type);

  return (
    <Card className="mt-6 border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TypeIcon className="w-4 h-4" />
          {treatment.name}
          <Badge className={getTypeColor(treatment.type)}>
            {t(`treatment.${treatment.type}`)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{treatment.description}</p>
        
        {treatment.ingredients && (
          <div>
            <h4 className="font-semibold mb-2">{t('treatment.ingredients')}</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {treatment.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold mb-2">{t('treatment.application')}</h4>
          <p className="text-sm text-gray-700">{treatment.application}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{treatment.frequency}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{treatment.effectiveness}% {t('treatment.effective')}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className={`w-4 h-4 ${getCostColor(treatment.costLevel)}`} />
            <span className={getCostColor(treatment.costLevel)}>
              {t(`treatment.${treatment.costLevel}`)} {t('treatment.cost')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${getAvailabilityColor(treatment.localAvailability)}`} />
            <span className={getAvailabilityColor(treatment.localAvailability)}>
              {t(`treatment.${treatment.localAvailability}`)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentDetails;
