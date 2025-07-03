
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-emerald-600" />
      <div className="flex bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border border-emerald-200">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs rounded-none ${
            language === 'en' 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          English
        </Button>
        <Button
          variant={language === 'tw' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('tw')}
          className={`px-3 py-1 text-xs rounded-none ${
            language === 'tw' 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          Twi
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
