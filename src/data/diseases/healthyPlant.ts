
import { DiseaseInfo } from '@/types/treatment';

export const healthyPlantData: DiseaseInfo = {
  name: 'Healthy Plant',
  severity: 'healthy',
  description: 'Your tomato plant appears to be healthy with no signs of disease.',
  symptoms: ['Vibrant green foliage', 'Normal leaf structure', 'No visible spots or discoloration'],
  treatments: [
    {
      type: 'preventive',
      name: 'Continued Care',
      description: 'Maintain optimal growing conditions',
      application: 'Continue regular watering and fertilization schedule',
      frequency: 'Daily monitoring',
      effectiveness: 95,
      costLevel: 'low',
      localAvailability: 'common'
    }
  ],
  prevention: ['Maintain proper spacing', 'Ensure good air circulation', 'Water at soil level'],
  farmingTips: ['Your plant is doing well! Keep up the good work', 'This is the ideal condition for tomato growth'],
  expectedRecovery: 'Plant is healthy - maintain current care routine'
};
