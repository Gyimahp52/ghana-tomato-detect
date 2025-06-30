
import React from 'react';
import { Brain, Zap, Eye, Microscope } from 'lucide-react';

interface ProcessingAnimationProps {
  stage: 'uploading' | 'analyzing' | 'complete';
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ stage }) => {
  const stages = [
    { 
      key: 'uploading', 
      icon: Zap, 
      label: 'Uploading Image', 
      description: 'Securely uploading your tomato plant image to our servers...',
      tips: 'Ensure your image shows clear leaf details for best results'
    },
    { 
      key: 'analyzing', 
      icon: Microscope, 
      label: 'AI Disease Detection', 
      description: 'Our advanced CNN model is analyzing leaf patterns, spots, and discoloration...',
      tips: 'Our AI examines over 1000+ visual features to identify diseases'
    },
    { 
      key: 'complete', 
      icon: Eye, 
      label: 'Generating Prescription', 
      description: 'Preparing detailed treatment recommendations and prevention strategies...',
      tips: 'Customized advice based on Ghanaian farming conditions'
    }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Disease Detection in Progress</h2>
        <p className="text-gray-600">Please wait while our advanced CNN model processes your image...</p>
      </div>

      <div className="space-y-6">
        {stages.map((stageItem, index) => {
          const StageIcon = stageItem.icon;
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          return (
            <div key={stageItem.key} className={`p-4 rounded-lg border transition-all duration-500 ${
              isActive 
                ? 'border-green-500 bg-green-50' 
                : isCompleted 
                  ? 'border-green-200 bg-green-25' 
                  : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'bg-green-500 text-white scale-110' 
                    : isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  <StageIcon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
                    {stageItem.label}
                  </h3>
                  <p className={`text-sm mt-1 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                    {stageItem.description}
                  </p>
                  {isActive && (
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      💡 {stageItem.tips}
                    </p>
                  )}
                </div>
                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isCompleted && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">
            Step {currentStageIndex + 1} of {stages.length}
          </p>
          <p className="text-sm text-green-600 font-medium">
            {Math.round(((currentStageIndex + 1) / stages.length) * 100)}% Complete
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">ℹ</span>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              <strong>About our AI:</strong> Our CNN model has been specifically trained on tomato diseases 
              common in Ghana and achieves 95%+ accuracy in disease identification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
