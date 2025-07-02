
import { DiseaseInfo } from '@/types/treatment';

export const bacterialSpotData: DiseaseInfo = {
  name: 'Bacterial Spot',
  severity: 'moderate',
  description: 'Bacterial infection causing dark spots with yellow halos on leaves.',
  symptoms: ['Small dark spots on leaves', 'Yellow halos around spots', 'Fruit lesions'],
  treatments: [
    {
      type: 'organic',
      name: 'Copper Soap Spray',
      description: 'Organic copper-based treatment for bacterial diseases',
      ingredients: ['Copper soap', 'Water'],
      application: 'Mix as directed on package. Spray all plant surfaces until dripping',
      frequency: 'Every 7-10 days',
      effectiveness: 85,
      costLevel: 'medium',
      localAvailability: 'moderate'
    },
    {
      type: 'organic',
      name: 'Garlic & Chili Spray',
      description: 'Natural antibacterial treatment using local ingredients',
      ingredients: ['Garlic cloves (10)', 'Hot chili peppers (5)', 'Water (1L)', 'Soap'],
      application: 'Blend garlic and chili, strain, add soap. Spray every 3 days',
      frequency: 'Every 3 days',
      effectiveness: 60,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'cultural',
      name: 'Drip Irrigation Setup',
      description: 'Prevent water splash that spreads bacteria',
      application: 'Install drip irrigation or water at soil level only',
      frequency: 'Permanent modification',
      effectiveness: 90,
      costLevel: 'medium',
      localAvailability: 'moderate'
    },
    {
      type: 'biological',
      name: 'Beneficial Bacteria Treatment',
      description: 'Use beneficial bacteria to outcompete harmful ones',
      ingredients: ['Bacillus subtilis', 'Water'],
      application: 'Apply bacterial solution to leaves and soil weekly',
      frequency: 'Weekly',
      effectiveness: 75,
      costLevel: 'medium',
      localAvailability: 'moderate'
    }
  ],
  prevention: ['Use disease-resistant varieties', 'Avoid overhead watering', 'Clean tools between plants'],
  farmingTips: ['Common in Ghana\'s humid climate', 'Morning watering allows leaves to dry'],
  expectedRecovery: '2-3 weeks with consistent organic treatment'
};
