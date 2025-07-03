
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

// Only translation keys for treatments and prescriptions
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
    // Treatment sections
    'treatment.title': 'Ayaresa Akwan a Ɛyɛ Yie',
    'treatment.subtitle': 'Ayaresa akwan pii a wɔahyehyɛ ɛnam ɛho hia, bo, ne baabi a ɛwɔ so',
    'treatment.organic': 'Abɔdeɛ',
    'treatment.cultural': 'Amammerɛ',
    'treatment.biological': 'Abɔdeɛ Nkwa',
    'treatment.chemical': 'Aduru',
    'treatment.preventive': 'Siw Kwan',

    // Treatment details
    'treatment.ingredients': 'Nneɛma:',
    'treatment.application': 'Ɛkwan a Wɔde Di Dwuma:',
    'treatment.effective': 'ɛyɛ adwuma',
    'treatment.cost': 'bo',
    'treatment.low': 'sua',
    'treatment.medium': 'mfinimfini',
    'treatment.high': 'ɔsoro',
    'treatment.common': 'dɔɔso',
    'treatment.moderate': 'kakra',
    'treatment.rare': 'nsɛntɛnseɛ',

    // Prescription sections
    'prescription.title': 'Ayaresa Nhyehyɛe a Ɛyɛ Nokware',
    'prescription.immediate': 'Ntɛm Nneyɛe (Nnɛ)',
    'prescription.weekly': 'Dapɛn Biara Hwɛ (Dapɛn 3-4 a Ɛbɛba)',
    'prescription.monthly': 'Bosome Biara Hwɛ (Bosome Biara)',
    'prescription.act_immediately': 'Yɛ ntɛm so!',
    'prescription.early_treatment': 'Ntɛm ayaresa ho hia ma ho yɛ yie. Di nhyehyɛe yi akyi yiye na ho bɛyɛ yie.',
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
