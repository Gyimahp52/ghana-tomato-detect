
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

export const expandedDiseaseInfo: Record<string, {
  name: string;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  description: string;
  symptoms: string[];
  treatments: TreatmentMethod[];
  prevention: string[];
  farmingTips: string[];
  expectedRecovery: string;
}> = {
  'tomatoe-healthy': {
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
  },
  'tomaote-not-healthy': {
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
  },
  'tomatoe-bacterial-spot': {
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
  },
  'tomatoe-early-blight': {
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
  },
  'tomatoe-late-blight': {
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
  },
  'tomatoe-leaf-mold': {
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
  }
};
