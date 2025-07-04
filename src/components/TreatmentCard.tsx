
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTypeHoverColor } from '@/utils/treatmentUtils';

interface TreatmentCardProps {
  treatment: TreatmentMethod;
  onClick: (treatment: TreatmentMethod) => void;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onClick }) => {
  const { t } = useLanguage();

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${getTypeHoverColor(treatment.type)} hover:shadow-md`}
      onClick={() => onClick(treatment)}
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
  );
};

export default TreatmentCard;
