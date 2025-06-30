
import React from 'react';
import { Brain, Zap, Eye } from 'lucide-react';

interface ProcessingAnimationProps {
  stage: 'uploading' | 'analyzing' | 'complete';
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ stage }) => {
  const stages = [
    { key: 'uploading', icon: Zap, label: 'Uploading Image', description: 'Preparing your image for analysis...' },
    { key: 'analyzing', icon: Brain, label: 'AI Analysis', description: 'Our CNN model is examining your tomato plant...' },
    { key: 'complete', icon: Eye, label: 'Analysis Complete', description: 'Generating results and recommendations...' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Tomato Plant</h2>
        <p className="text-gray-600">Please wait while our AI processes your image...</p>
      </div>

      <div className="space-y-6">
        {stages.map((stageItem, index) => {
          const StageIcon = stageItem.icon;
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          return (
            <div key={stageItem.key} className="flex items-center space-x-4">
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
                <p className={`text-sm ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                  {stageItem.description}
                </p>
              </div>
              {isActive && (
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Step {currentStageIndex + 1} of {stages.length}
        </p>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
