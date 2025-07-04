
import React from 'react';
import { TreatmentMethod } from '@/types/treatment';
import TreatmentCard from './TreatmentCard';

interface TreatmentGridProps {
  treatments: TreatmentMethod[];
  onSelect: (treatment: TreatmentMethod) => void;
}

const TreatmentGrid: React.FC<TreatmentGridProps> = ({ treatments, onSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {treatments.map((treatment, index) => (
        <TreatmentCard
          key={index}
          treatment={treatment}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default TreatmentGrid;
