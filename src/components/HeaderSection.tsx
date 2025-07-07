
import React from 'react';
import { Leaf, Brain, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LanguageSelector from '@/components/LanguageSelector';

interface HeaderSectionProps {
  isOnline: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isOnline }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                TomatoAI
              </h1>
              <p className="text-xs sm:text-sm text-emerald-600 font-medium flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Advanced CNN Disease Detection</span>
                <span className="sm:hidden">AI Disease Detection</span>
                {!isOnline && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    Offline
                  </Badge>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-6">
            <LanguageSelector />
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-emerald-700">
                <Brain className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="font-medium">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="font-medium">Organic Treatments</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="font-medium">Works Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
