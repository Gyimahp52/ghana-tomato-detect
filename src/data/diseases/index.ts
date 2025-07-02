
import { DiseaseInfo } from '@/types/treatment';
import { healthyPlantData } from './healthyPlant';
import { generalDiseaseData } from './generalDisease';
import { bacterialSpotData } from './bacterialSpot';
import { earlyBlightData } from './earlyBlight';
import { lateBlightData } from './lateBlight';
import { leafMoldData } from './leafMold';

export const expandedDiseaseInfo: Record<string, DiseaseInfo> = {
  'tomatoe-healthy': healthyPlantData,
  'tomaote-not-healthy': generalDiseaseData,
  'tomatoe-bacterial-spot': bacterialSpotData,
  'tomatoe-early-blight': earlyBlightData,
  'tomatoe-late-blight': lateBlightData,
  'tomatoe-leaf-mold': leafMoldData
};

// Re-export types for convenience
export type { TreatmentMethod, DiseaseInfo } from '@/types/treatment';
