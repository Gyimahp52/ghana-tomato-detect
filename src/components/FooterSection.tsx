
import React from 'react';
import { Leaf } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white mt-12 sm:mt-16 lg:mt-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold">Asenso.AI</h4>
          </div>
          <p className="text-emerald-100 mb-4 text-sm sm:text-base px-4 sm:px-0">
            Comprehensive Offline Plant Disease Detection with Organic Treatment Solutions
          </p>
          <p className="text-emerald-200 text-xs sm:text-sm px-4 sm:px-0">
            © 2025 Asenso.AI Ghana - Empowering Farmers with Sustainable AI Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
