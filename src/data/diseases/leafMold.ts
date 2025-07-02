
import { DiseaseInfo } from '@/types/treatment';

export const leafMoldData: DiseaseInfo = {
  name: 'Leaf Mold',
  severity: 'mild',
  description: 'Fungal disease thriving in humid conditions with poor air circulation.',
  symptoms: ['Yellow spots on upper surfaces', 'Olive-green growth on undersides', 'Leaf curling'],
  treatments: [
    {
      type: 'cultural',
      name: 'Ventilation Improvement',
      description: 'Increase air circulation around plants',
      application: 'Prune lower branches, increase plant spacing, install fans if in greenhouse',
      frequency: 'One-time improvement',
      effectiveness: 90,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Baking Soda & Oil Spray',
      description: 'Effective organic treatment for leaf mold',
      ingredients: ['Baking soda', 'Vegetable oil', 'Water', 'Soap'],
      application: 'Mix 1 tsp baking soda + 1 tsp oil + few drops soap per liter',
      frequency: 'Every 5 days',
      effectiveness: 85,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Sulfur Dust Application',
      description: 'Natural fungicidal treatment',
      ingredients: ['Elemental sulfur powder'],
      application: 'Dust plants lightly in early morning when dew is present',
      frequency: 'Weekly',
      effectiveness: 80,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'cultural',
      name: 'Humidity Control',
      description: 'Reduce humidity levels around plants',
      application: 'Water early morning, avoid evening watering, improve drainage',
      frequency: 'Daily practice',
      effectiveness: 85,
      costLevel: 'low',
      localAvailability: 'common'
    }
  ],
  prevention: ['Good ventilation', 'Avoid overcrowding', 'Morning watering'],
  farmingTips: ['Easy to prevent and treat', 'Responds well to organic methods'],
  expectedRecovery: '2-3 weeks with proper ventilation'
};
