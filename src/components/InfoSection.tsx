
import React from 'react';
import { Brain, Leaf, Users } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 animate-fade-in px-4 sm:px-0">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Why Choose TomatoAI?</h3>
        <p className="text-base sm:text-lg text-gray-600">Comprehensive organic solutions that work online and offline</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Works Completely Offline</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Advanced offline AI model that works without internet connection, ensuring you can diagnose diseases anytime, anywhere.
          </p>
        </div>
        
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Comprehensive Organic Solutions</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Multiple treatment options including organic, cultural, and biological methods - not just chemical fungicides.
          </p>
        </div>
        
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Local Ghanaian Solutions</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Treatments using locally available ingredients and methods specifically designed for Ghana's farming conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
