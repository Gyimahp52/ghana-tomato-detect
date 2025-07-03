
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
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Add debug logging
  useEffect(() => {
    console.log('Language changed to:', language);
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
    console.log('Setting language to:', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
