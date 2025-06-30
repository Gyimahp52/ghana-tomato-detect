
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
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Prevention for Future Crops
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {preventionTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreventionCard;
