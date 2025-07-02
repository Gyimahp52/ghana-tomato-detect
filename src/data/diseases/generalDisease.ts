
import { DiseaseInfo } from '@/types/treatment';

export const generalDiseaseData: DiseaseInfo = {
  name: 'Unhealthy Plant - General Disease',
  severity: 'moderate',
  description: 'Your tomato plant shows signs of disease or stress requiring immediate attention.',
  symptoms: ['Visible leaf discoloration', 'Abnormal leaf patterns', 'Signs of disease or stress'],
  treatments: [
    {
      type: 'organic',
      name: 'Neem Oil Treatment',
      description: 'Natural antifungal and antibacterial spray',
      ingredients: ['Neem oil', 'Water', 'Mild soap'],
      application: 'Mix 2 tablespoons neem oil + 1 tsp soap per liter of water. Spray early morning or evening',
      frequency: 'Every 5-7 days',
      effectiveness: 75,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'organic',
      name: 'Baking Soda Spray',
      description: 'Alkaline treatment to prevent fungal growth',
      ingredients: ['Baking soda', 'Water', 'Vegetable oil'],
      application: 'Mix 1 tsp baking soda + 1/2 tsp oil per liter water. Spray leaves thoroughly',
      frequency: 'Twice weekly',
      effectiveness: 65,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'cultural',
      name: 'Leaf Removal & Sanitation',
      description: 'Remove infected plant material to prevent spread',
      application: 'Carefully remove affected leaves with clean scissors. Dispose away from garden',
      frequency: 'Daily inspection',
      effectiveness: 80,
      costLevel: 'low',
      localAvailability: 'common'
    },
    {
      type: 'biological',
      name: 'Beneficial Microorganisms',
      description: 'Apply beneficial bacteria and fungi to boost plant immunity',
      ingredients: ['Effective microorganisms (EM)', 'Compost tea'],
      application: 'Dilute EM solution 1:100 with water. Apply to soil and leaves',
      frequency: 'Weekly',
      effectiveness: 70,
      costLevel: 'medium',
      localAvailability: 'moderate'
    }
  ],
  prevention: ['Ensure proper plant spacing', 'Maintain good air circulation', 'Water at soil level'],
  farmingTips: ['Early detection is key', 'Combine multiple organic treatments for best results'],
  expectedRecovery: '2-4 weeks with proper treatment'
};
