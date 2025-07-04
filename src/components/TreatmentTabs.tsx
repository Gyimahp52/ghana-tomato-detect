
import React from 'react';
import { Leaf, Scissors, Microscope, Droplets, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';
import TreatmentGrid from './TreatmentGrid';

interface TreatmentTabsProps {
  treatments: TreatmentMethod[];
  onSelectTreatment: (treatment: TreatmentMethod) => void;
}

const TreatmentTabs: React.FC<TreatmentTabsProps> = ({ treatments, onSelectTreatment }) => {
  const { t } = useLanguage();

  const organicTreatments = treatments.filter(t => t.type === 'organic');
  const culturalTreatments = treatments.filter(t => t.type === 'cultural');
  const biologicalTreatments = treatments.filter(t => t.type === 'biological');
  const chemicalTreatments = treatments.filter(t => t.type === 'chemical');
  const preventiveTreatments = treatments.filter(t => t.type === 'preventive');

  return (
    <Tabs defaultValue="organic" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="organic" className="text-xs">
          <Leaf className="w-3 h-3 mr-1" />
          {t('treatment.organic')} ({organicTreatments.length})
        </TabsTrigger>
        <TabsTrigger value="cultural" className="text-xs">
          <Scissors className="w-3 h-3 mr-1" />
          {t('treatment.cultural')} ({culturalTreatments.length})
        </TabsTrigger>
        <TabsTrigger value="biological" className="text-xs">
          <Microscope className="w-3 h-3 mr-1" />
          {t('treatment.biological')} ({biologicalTreatments.length})
        </TabsTrigger>
        {chemicalTreatments.length > 0 && (
          <TabsTrigger value="chemical" className="text-xs">
            <Droplets className="w-3 h-3 mr-1" />
            {t('treatment.chemical')} ({chemicalTreatments.length})
          </TabsTrigger>
        )}
        {preventiveTreatments.length > 0 && (
          <TabsTrigger value="preventive" className="text-xs">
            <ShieldCheck className="w-3 h-3 mr-1" />
            {t('treatment.preventive')} ({preventiveTreatments.length})
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="organic">
        <TreatmentGrid treatments={organicTreatments} onSelect={onSelectTreatment} />
      </TabsContent>
      <TabsContent value="cultural">
        <TreatmentGrid treatments={culturalTreatments} onSelect={onSelectTreatment} />
      </TabsContent>
      <TabsContent value="biological">
        <TreatmentGrid treatments={biologicalTreatments} onSelect={onSelectTreatment} />
      </TabsContent>
      {chemicalTreatments.length > 0 && (
        <TabsContent value="chemical">
          <TreatmentGrid treatments={chemicalTreatments} onSelect={onSelectTreatment} />
        </TabsContent>
      )}
      {preventiveTreatments.length > 0 && (
        <TabsContent value="preventive">
          <TreatmentGrid treatments={preventiveTreatments} onSelect={onSelectTreatment} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TreatmentTabs;
