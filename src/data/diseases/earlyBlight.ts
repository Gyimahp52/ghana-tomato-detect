
import { DiseaseInfo } from '@/types/treatment';

export const earlyBlightData: DiseaseInfo = {
  name: 'Early Blight',
  severity: 'moderate',
  description: 'Fungal disease creating distinctive target-like spots on leaves.',
  symptoms: ['Concentric rings on leaves', 'Brown spots with yellow borders', 'Lower leaves affected first'],
  treatments: [
    {
      type: 'organic',
      name: 'Compost Tea Spray',
      description: 'Nutrient-rich spray that boosts plant immunity',
      ingredients: ['Well-aged compost', 'Water', 'Molasses'],
      application: 'Steep compost in water for 3 days, strain, add 1 tbsp molasses per liter',
      frequency: 'Every 5 days',
      effectiveness: 70,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Milk Spray Treatment',
      description: 'Milk proteins create antifungal coating on leaves',
      ingredients: ['Fresh milk', 'Water'],
      application: 'Mix 1 part milk with 9 parts water. Spray in early morning',
      frequency: 'Twice weekly',
      effectiveness: 65,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'cultural',
      name: 'Mulching & Spacing',
      description: 'Improve air circulation and prevent soil splash',
      ingredients: ['Organic mulch (grass, leaves)'],
      application: 'Apply 5cm thick mulch around plants, ensure 60cm plant spacing',
      frequency: 'One-time application, refresh monthly',
      effectiveness: 80,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Potassium Bicarbonate Spray',
      description: 'Alkaline treatment that prevents fungal growth',
      ingredients: ['Potassium bicarbonate', 'Water', 'Soap'],
      application: 'Mix 1 tsp per liter water with few drops soap. Spray thoroughly',
      frequency: 'Weekly',
      effectiveness: 75,
      costLevel: 'medium',
      localAvailability: 'moderate'
    }
  ],
  prevention: ['Proper plant spacing', 'Drip irrigation', 'Regular pruning of lower branches'],
  farmingTips: ['Very common during rainy season', 'Focus on lower leaf removal'],
  expectedRecovery: '3-4 weeks with comprehensive organic approach'
};
