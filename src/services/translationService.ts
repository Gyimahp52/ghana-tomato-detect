
import { TreatmentMethod } from '@/types/treatment';
import { useLanguage } from '@/contexts/LanguageContext';

// Translation mappings for treatment content
const treatmentTranslations = {
  en: {
    // Neem Oil Treatment
    'Neem Oil Spray': 'Neem Oil Spray',
    'Natural antifungal spray made from neem tree extract that disrupts fungal cell membranes': 'Natural antifungal spray made from neem tree extract that disrupts fungal cell membranes',
    'Mix 2 tablespoons of neem oil with 1 gallon of water and a few drops of mild soap': 'Mix 2 tablespoons of neem oil with 1 gallon of water and a few drops of mild soap',
    'Spray on affected areas in the evening to avoid leaf burn': 'Spray on affected areas in the evening to avoid leaf burn',
    
    // Soap Water Treatment
    'Soap Water Solution': 'Soap Water Solution',
    'Mild soap solution that helps control fungal growth and removes spores': 'Mild soap solution that helps control fungal growth and removes spores',
    'Mix 1 tablespoon of mild dish soap with 1 gallon of water': 'Mix 1 tablespoon of mild dish soap with 1 gallon of water',
    'Spray gently on affected leaves, rinse after 30 minutes': 'Spray gently on affected leaves, rinse after 30 minutes',
    
    // Baking Soda Treatment
    'Baking Soda Spray': 'Baking Soda Spray',
    'Alkaline spray that prevents fungal spore germination': 'Alkaline spray that prevents fungal spore germination',
    'Mix 1 teaspoon baking soda with 1 quart water and few drops of soap': 'Mix 1 teaspoon baking soda with 1 quart water and few drops of soap',
    'Spray weekly as preventive treatment': 'Spray weekly as preventive treatment',
    
    // Cultural Practices
    'Remove Affected Leaves': 'Remove Affected Leaves',
    'Physical removal of diseased plant parts to prevent spread': 'Physical removal of diseased plant parts to prevent spread',
    'Cut infected leaves and stems with clean, sharp tools': 'Cut infected leaves and stems with clean, sharp tools',
    'Dispose of removed plant material away from garden': 'Dispose of removed plant material away from garden',
    
    'Improve Air Circulation': 'Improve Air Circulation',
    'Increase spacing between plants to reduce humidity': 'Increase spacing between plants to reduce humidity',
    'Prune lower branches and thin overcrowded areas': 'Prune lower branches and thin overcrowded areas',
    'Position plants to catch morning sun and evening breeze': 'Position plants to catch morning sun and evening breeze',
    
    'Water at Plant Base': 'Water at Plant Base',
    'Avoid overhead watering to keep leaves dry': 'Avoid overhead watering to keep leaves dry',
    'Water at soil level using drip irrigation or soaker hose': 'Water at soil level using drip irrigation or soaker hose',
    'Water early morning to allow soil to dry during day': 'Water early morning to allow soil to dry during day',
  },
  tw: {
    // Neem Oil Treatment
    'Neem Oil Spray': 'Neem Nnua Nsuo Aduru',
    'Natural antifungal spray made from neem tree extract that disrupts fungal cell membranes': 'Abɔdeɛ aduru a efi neem nnua mu a ɛko tia mmoawa a ɛsɛe afuom',
    'Mix 2 tablespoons of neem oil with 1 gallon of water and a few drops of mild soap': 'Fra neem nsuo aduru nkatasoɔ mmienu ne nsuo galɔn baako ne samina kakra',
    'Spray on affected areas in the evening to avoid leaf burn': 'Gugu wɔ beaeɛ a ayareɛ ako so wɔ anwummerɛ na nhaban no nnya hyeɛ',
    
    // Soap Water Treatment
    'Soap Water Solution': 'Samina ne Nsuo Aduru',
    'Mild soap solution that helps control fungal growth and removes spores': 'Samina aduru brɛooɔ a ɛko tia mmoawa a ɛsɛe afuom na ɛyi mmoawa aba',
    'Mix 1 tablespoon of mild dish soap with 1 gallon of water': 'Fra samina nkataso baako ne nsuo galɔn baako',
    'Spray gently on affected leaves, rinse after 30 minutes': 'Gugu brɛooɔ wɔ nhaban a ayareɛ ako so, na hohor wɔ simma 30 akyi',
    
    // Baking Soda Treatment
    'Baking Soda Spray': 'Baking Soda Aduru',
    'Alkaline spray that prevents fungal spore germination': 'Aduru a ɛsiw mmoawa aba sɛ ɛnnya baabi ntete',
    'Mix 1 teaspoon baking soda with 1 quart water and few drops of soap': 'Fra baking soda nkataso ketewaa baako ne nsuo ne samina kakra',
    'Spray weekly as preventive treatment': 'Gugu dapɛn biara sɛ aduru a ɛsiw ayareɛ',
    
    // Cultural Practices
    'Remove Affected Leaves': 'Yi Nhaban a Ayareɛ Ako So',
    'Physical removal of diseased plant parts to prevent spread': 'Yi nhaban a ayareɛ ako so no fi hɔ sɛnea ayareɛ no ntrɛw',
    'Cut infected leaves and stems with clean, sharp tools': 'Fa adwinnade a ɛyɛ fi na ano yɛ nam twa nhaban ne dua no mu',
    'Dispose of removed plant material away from garden': 'Fa nhaban a woayii no kɔ baabi a ɛnne turo no',
    
    'Improve Air Circulation': 'Ma Mframa Nkɔ Afuom No So Yiye',
    'Increase spacing between plants to reduce humidity': 'Ma ntam wɔ afuom no ntam na mframa nkɔ so yiye',
    'Prune lower branches and thin overcrowded areas': 'Twa mman a ɛwɔ ase ne beaeɛ a afuom no hyɛ hɔ ma',
    'Position plants to catch morning sun and evening breeze': 'To afuom no baabi a anɔpatutuutu owia ne anwummerɛ mframa bɛka',
    
    'Water at Plant Base': 'Gugu Nsuo Wɔ Afuom No Ase',
    'Avoid overhead watering to keep leaves dry': 'Nngugu nsuo wɔ nhaban no so na ɛnyɛ fɔkyɛ',
    'Water at soil level using drip irrigation or soaker hose': 'Gugu nsuo wɔ fam no so fa pipe a nsuo fi mu ba brɛooɔ anaa hose',
    'Water early morning to allow soil to dry during day': 'Gugu nsuo anɔpatutuutu na fam no wo awiaberɛ',
  }
};

export const translateTreatmentContent = (content: string, language: 'en' | 'tw'): string => {
  return treatmentTranslations[language][content] || content;
};

export const translateTreatment = (treatment: TreatmentMethod, language: 'en' | 'tw'): TreatmentMethod => {
  return {
    ...treatment,
    name: translateTreatmentContent(treatment.name, language),
    description: translateTreatmentContent(treatment.description, language),
    application: translateTreatmentContent(treatment.application, language),
    ingredients: treatment.ingredients?.map(ingredient => 
      translateTreatmentContent(ingredient, language)
    )
  };
};
