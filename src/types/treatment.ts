
export interface TreatmentMethod {
  type: 'organic' | 'cultural' | 'biological' | 'chemical' | 'preventive';
  name: string;
  description: string;
  ingredients?: string[];
  application: string;
  frequency: string;
  effectiveness: number;
  costLevel: 'low' | 'medium' | 'high';
  localAvailability: 'common' | 'moderate' | 'rare';
}

export interface DiseaseInfo {
  name: string;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe' | 'not_applicable';
  description: string;
  symptoms: string[];
  treatments: TreatmentMethod[];
  prevention: string[];
  farmingTips: string[];
  expectedRecovery: string;
}
