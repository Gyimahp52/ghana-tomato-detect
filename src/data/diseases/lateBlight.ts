
import { DiseaseInfo } from '@/types/treatment';

export const lateBlightData: DiseaseInfo = {
  name: 'Late Blight',
  severity: 'severe',
  description: 'Serious fungal disease that can destroy crops rapidly if untreated.',
  symptoms: ['Water-soaked spots', 'White fuzzy growth on undersides', 'Rapid spread'],
  treatments: [
    {
      type: 'cultural',
      name: 'Emergency Plant Removal',
      description: 'Remove severely affected plants to save others',
      application: 'Remove and burn affected plants immediately, do not compost',
      frequency: 'Immediate action',
      effectiveness: 95,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Copper Hydroxide Treatment',
      description: 'Organic copper treatment for severe fungal infections',
      ingredients: ['Copper hydroxide', 'Water'],
      application: 'Apply as per label instructions. Cover all plant surfaces',
      frequency: 'Every 5-7 days',
      effectiveness: 80,
      costLevel: 'medium',
      localAvailability: 'moderate'
    },
    {
      type: 'cultural',
      name: 'Protective Covering',
      description: 'Install rain protection to reduce humidity',
      application: 'Set up plastic covering or greenhouse structure',
      frequency: 'Permanent installation',
      effectiveness: 85,
      costLevel: 'high',
      localAvailability: 'moderate'
    },
    {
      type: 'biological',
      name: 'Trichoderma Soil Treatment',
      description: 'Beneficial fungi that suppress disease pathogens',
      ingredients: ['Trichoderma harzianum', 'Organic matter'],
      application: 'Mix with compost and apply to soil around plants',
      frequency: 'Monthly',
      effectiveness: 70,
      costLevel: 'medium',
      localAvailability: 'moderate'
    },
    {
      type: 'chemical',
      name: 'Systemic Fungicide (Last Resort)',
      description: 'Chemical treatment for severe infections when organic methods fail',
      ingredients: ['Metalaxyl + Mancozeb'],
      application: 'Follow label instructions carefully. Use protective equipment',
      frequency: 'As directed',
      effectiveness: 90,
      costLevel: 'high',
      localAvailability: 'moderate'
    }
  ],
  prevention: ['Choose resistant varieties', 'Monitor weather', 'Preventive treatments'],
  farmingTips: ['Most serious disease - act immediately', 'Consider replanting with resistant varieties'],
  expectedRecovery: '4-6 weeks if caught early, may require replanting'
};
