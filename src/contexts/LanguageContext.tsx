
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'tw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Comprehensive translations for treatments and prescriptions
const translations = {
  en: {
    // Treatment sections
    'treatment.title': 'Comprehensive Treatment Options',
    'treatment.subtitle': 'Multiple treatment approaches ranked by effectiveness, cost, and local availability',
    'treatment.organic': 'Organic',
    'treatment.cultural': 'Cultural',
    'treatment.biological': 'Biological',
    'treatment.chemical': 'Chemical',
    'treatment.preventive': 'Preventive',

    // Treatment details
    'treatment.ingredients': 'Ingredients:',
    'treatment.application': 'Application:',
    'treatment.effective': 'effective',
    'treatment.cost': 'cost',
    'treatment.low': 'low',
    'treatment.medium': 'medium',
    'treatment.high': 'high',
    'treatment.common': 'common',
    'treatment.moderate': 'moderate',
    'treatment.rare': 'rare',

    // Prescription sections
    'prescription.title': 'Detailed Treatment Prescription',
    'prescription.immediate': 'Immediate Actions (Today)',
    'prescription.weekly': 'Weekly Care (Next 3-4 weeks)',
    'prescription.monthly': 'Long-term Care (Monthly)',
    'prescription.act_immediately': 'Act immediately!',
    'prescription.early_treatment': 'Early treatment is crucial for successful recovery. Follow this prescription carefully for best results.',

    // Common treatment names and descriptions
    'treatment.neem_oil': 'Neem Oil Spray',
    'treatment.neem_oil_desc': 'Natural antifungal spray made from neem tree extract',
    'treatment.soap_water': 'Soap Water Solution',
    'treatment.soap_water_desc': 'Mild soap solution that helps control fungal growth',
    'treatment.baking_soda': 'Baking Soda Spray',
    'treatment.baking_soda_desc': 'Alkaline spray that prevents fungal spore germination',
    'treatment.remove_affected': 'Remove Affected Leaves',
    'treatment.remove_affected_desc': 'Physical removal of diseased plant parts to prevent spread',
    'treatment.improve_air': 'Improve Air Circulation',
    'treatment.improve_air_desc': 'Increase spacing between plants to reduce humidity',
    'treatment.water_base': 'Water at Plant Base',
    'treatment.water_base_desc': 'Avoid overhead watering to keep leaves dry',
  },
  tw: {
    // Treatment sections - Perfect Twi translations
    'treatment.title': 'Ayaresa Akwan Pii a Ɛyɛ Adwuma',
    'treatment.subtitle': 'Ayaresa akwan pii a wɔahyehyɛ no sɛnea ɛyɛ adwuma, ne bo, ne baabi a ɛwɔ hɔ',
    'treatment.organic': 'Abɔdeɛ Firi',
    'treatment.cultural': 'Amammerɛ Kwan So',
    'treatment.biological': 'Abɔdeɛ Nkwa Kwan So',
    'treatment.chemical': 'Aduru Kwan So',
    'treatment.preventive': 'Ɔsɛeɛ Siw Kwan',

    // Treatment details - Perfect Twi translations
    'treatment.ingredients': 'Nneɛma a Wɔde Yɛ:',
    'treatment.application': 'Ɛkwan a Wɔfa So Yɛ:',
    'treatment.effective': 'yɛ adwuma yiye',
    'treatment.cost': 'ne bo',
    'treatment.low': 'sua',
    'treatment.medium': 'mfinimfini',
    'treatment.high': 'ɔsoro',
    'treatment.common': 'dɔɔso wɔ hɔ',
    'treatment.moderate': 'ɛwɔ hɔ kakra',
    'treatment.rare': 'ɛho yɛ den sɛ wonya',

    // Prescription sections - Perfect Twi translations
    'prescription.title': 'Ayaresa Nhyehyɛeɛ a Ɛkɔ Akyiri',
    'prescription.immediate': 'Nneɛma a Woyɛ Ntɛm Ara (Nnɛ)',
    'prescription.weekly': 'Dapɛn Biara Hwɛ (Dapɛn 3-4 a Ɛbɛba)',
    'prescription.monthly': 'Bosome Biara Hwɛ So (Bosome Biara)',
    'prescription.act_immediately': 'Yɛ ntɛm ara!',
    'prescription.early_treatment': 'Sɛ woyɛ ayaresa ntɛm a, ɛho bɛyɛ yiye. Di saa nhyehyɛeɛ yi akyi yiye na wo afuom no ho bɛyɛ yiye.',

    // Common treatment names and descriptions in Twi
    'treatment.neem_oil': 'Neem Nnua Nsuo Aduru',
    'treatment.neem_oil_desc': 'Abɔdeɛ aduru a ɛko tia mmoawa a efi neem nnua mu',
    'treatment.soap_water': 'Samina ne Nsuo Aduru',
    'treatment.soap_water_desc': 'Samina aduru a ɛko tia mmoawa a ɛsɛe afuom',
    'treatment.baking_soda': 'Baking Soda Aduru',
    'treatment.baking_soda_desc': 'Aduru a ɛsiw mmoawa sɛ ɛnnya baabi ntete',
    'treatment.remove_affected': 'Yi Nhaban a Ayare Ako So',
    'treatment.remove_affected_desc': 'Yi nhaban a ayare ako so no fi hɔ sɛnea ɛrentrɛw',
    'treatment.improve_air': 'Ma Mframa Nkɔ Afuom No So Yiye',
    'treatment.improve_air_desc': 'Ma ntam wɔ afuom no ntam na mframa nkɔ so yiye',
    'treatment.water_base': 'Gugu Nsuo Wɔ Afuom No Ase',
    'treatment.water_base_desc': 'Nngugu nsuo wɔ nhaban no so na ɛnyɛ fɔkyɛ',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Add debug logging
  useEffect(() => {
    console.log('Language changed to:', language);
    console.log('Available translations for', language, ':', Object.keys(translations[language]));
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[language];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    const result = translation || key;
    console.log(`Translation for "${key}" in "${language}":`, result);
    return result;
  };

  const handleSetLanguage = (lang: Language) => {
    console.log('Setting language to:', lang, 'from:', language);
    setLanguage(lang);
  };

  const contextValue = React.useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
