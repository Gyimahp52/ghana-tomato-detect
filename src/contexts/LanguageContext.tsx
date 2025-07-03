
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const translations = {
  en: {
    // Header
    'header.title': 'TomatoAI',
    'header.subtitle': 'Advanced CNN Disease Detection',
    'header.offline': 'Offline Mode',
    'header.ai_powered': 'AI Powered',
    'header.organic_treatments': 'Organic Treatments',
    'header.works_offline': 'Works Offline',

    // Main content
    'main.title': 'Detect Tomato Diseases',
    'main.subtitle': 'Instantly with AI',
    'main.description': 'Upload a photo of your tomato plant and get instant AI-powered diagnosis with comprehensive organic and cultural treatment recommendations.',
    'main.works_offline': '✓ Works Offline',
    'main.organic_solutions': '✓ Organic Solutions',
    'main.multiple_treatments': '✓ Multiple Treatment Options',

    // Buttons
    'button.analyze': 'Analyze Plant Health',
    'button.analyze_offline': 'Analyze Plant Health (Offline)',
    'button.try_offline': 'Try Offline Mode',
    'button.analyze_another': 'Analyze Another Plant',

    // Disease names
    'disease.healthy': 'Healthy Plant',
    'disease.bacterial_spot': 'Bacterial Spot',
    'disease.early_blight': 'Early Blight',
    'disease.late_blight': 'Late Blight',
    'disease.leaf_mold': 'Leaf Mold',
    'disease.general': 'Unhealthy Plant - General Disease',

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

    // Symptoms
    'symptoms.title': 'Disease Symptoms',
    
    // Prevention
    'prevention.title': 'Prevention Tips',
    
    // Farming tips
    'farming.title': 'Ghana-Specific Farming Tips',
    
    // Footer
    'footer.title': 'TomatoAI',
    'footer.description': 'Comprehensive Offline Plant Disease Detection with Organic Treatment Solutions',
    'footer.copyright': '© 2025 TomatoAI Ghana - Empowering Farmers with Sustainable AI Technology',

    // Toast messages
    'toast.offline_complete': 'Offline Analysis Complete',
    'toast.offline_description': 'Disease detection completed offline with {{confidence}}% confidence.',
    'toast.online_complete': 'Online Analysis Complete',
    'toast.online_description': 'Disease detection completed with {{confidence}}% confidence.',
    'toast.switching_offline': 'Switching to Offline Mode',
    'toast.switching_description': 'Server unavailable. Analyzing image offline...',
    'toast.no_image': 'No Image Selected',
    'toast.no_image_description': 'Please select an image before analyzing.',
    'toast.offline_failed': 'Offline Analysis Failed',
    'toast.offline_failed_description': 'There was an error analyzing your image offline. Please try again.',
  },
  tw: {
    // Header
    'header.title': 'TomatoAI',
    'header.subtitle': 'AI Nhwehwɛmu a Ɛyɛ Den',
    'header.offline': 'Offline Kwan',
    'header.ai_powered': 'AI Tumi',
    'header.organic_treatments': 'Abɔdeɛ Ayaresa',
    'header.works_offline': 'Ɛyɛ Adwuma Offline',

    // Main content
    'main.title': 'Hu Ntomato Yareɛ',
    'main.subtitle': 'Ntɛm so wɔ AI',
    'main.description': 'Fa wo ntomato afuom mfonini to hɔ na nya AI nhwehwɛmu ntɛm so ne abɔdeɛ ayaresa akwan pii.',
    'main.works_offline': '✓ Ɛyɛ Adwuma Offline',
    'main.organic_solutions': '✓ Abɔdeɛ Ayaresa',
    'main.multiple_treatments': '✓ Ayaresa Akwan Pii',

    // Buttons
    'button.analyze': 'Hwehwɛ Afuom Ahoɔden',
    'button.analyze_offline': 'Hwehwɛ Afuom Ahoɔden (Offline)',
    'button.try_offline': 'Sɔ Offline Kwan Hwɛ',
    'button.analyze_another': 'Hwehwɛ Afuom Foforɔ',

    // Disease names
    'disease.healthy': 'Afuom a Ɛyɛ',
    'disease.bacterial_spot': 'Bacteria Nkekaho',
    'disease.early_blight': 'Ntɛm Yareɛ',
    'disease.late_blight': 'Akyiri Yareɛ',
    'disease.leaf_mold': 'Nhaban Efi',
    'disease.general': 'Afuom a Ɛnyɛ Yie - Yareɛ Amoa',

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

    // Symptoms
    'symptoms.title': 'Yareɛ Nsɛnkyerɛnneɛ',
    
    // Prevention
    'prevention.title': 'Siw Akwan',
    
    // Farming tips
    'farming.title': 'Ghana Kuayɛ Nkyerɛkyerɛ',
    
    // Footer
    'footer.title': 'TomatoAI',
    'footer.description': 'Offline Afuom Yareɛ Nhwehwɛmu ne Abɔdeɛ Ayaresa Akwan',
    'footer.copyright': '© 2025 TomatoAI Ghana - Ɛma Akuafo Tumi wɔ AI Mfiridwuma mu',

    // Toast messages
    'toast.offline_complete': 'Offline Nhwehwɛmu Awie',
    'toast.offline_description': 'Yareɛ nhwehwɛmu awie offline wɔ {{confidence}}% gyidie mu.',
    'toast.online_complete': 'Online Nhwehwɛmu Awie',
    'toast.online_description': 'Yareɛ nhwehwɛmu awie wɔ {{confidence}}% gyidie mu.',
    'toast.switching_offline': 'Ɛrekɔ Offline Kwan So',
    'toast.switching_description': 'Server nni hɔ. Ɛrehwehwɛ mfonini offline...',
    'toast.no_image': 'Mfonini Biara Nni Hɔ',
    'toast.no_image_description': 'Yɛsrɛ wo fa mfonini ansa na woahwehwɛ.',
    'toast.offline_failed': 'Offline Nhwehwɛmu Ansi',
    'toast.offline_failed_description': 'Ɛyɛɛ mfomsoɔ bere a na ɛrehwehwɛ wo mfonini offline. Yɛsrɛ wo sɔ hwɛ bio.',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[language];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
