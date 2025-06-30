
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
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Identified Symptoms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid md:grid-cols-2 gap-2">
          {symptoms.map((symptom, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              {symptom}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SymptomsCard;
