
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreventionCardProps {
  preventionTips: string[];
}

const PreventionCard: React.FC<PreventionCardProps> = ({ preventionTips }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          Prevention for Future Crops
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
          {preventionTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-700 flex-1">{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreventionCard;
