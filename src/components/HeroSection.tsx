
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
          Detect Tomato Diseases
          <span className="block text-emerald-600">Instantly with AI</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
          Upload a photo of your tomato plant and get instant AI-powered diagnosis with comprehensive organic and cultural treatment recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-4 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
            <span className="text-emerald-700 font-medium">✓ Works Offline</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
            <span className="text-emerald-700 font-medium">✓ Organic Solutions</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
            <span className="text-emerald-700 font-medium">✓ Multiple Treatment Options</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
