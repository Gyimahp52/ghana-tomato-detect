
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FarmingTipsCardProps {
  farmingTips: string[];
}

const FarmingTipsCard: React.FC<FarmingTipsCardProps> = ({ farmingTips }) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Ghana-Specific Farming Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {farmingTips.map((tip, index) => (
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
  );
};

export default FarmingTipsCard;
