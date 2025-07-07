
import React from 'react';
import { Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SymptomsCardProps {
  symptoms: string[];
}

const SymptomsCard: React.FC<SymptomsCardProps> = ({ symptoms }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          Identified Symptoms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
          {symptoms.map((symptom, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
              <span className="flex-1">{symptom}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SymptomsCard;
