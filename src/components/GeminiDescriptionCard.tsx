
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GeminiDescriptionCardProps {
  description: string;
}

const GeminiDescriptionCard: React.FC<GeminiDescriptionCardProps> = ({ description }) => {
  // Function to parse markdown-like text and convert to JSX
  const parseDescription = (text: string) => {
    // Split by double newlines to get paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle bullet points
      if (paragraph.includes('*   *')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="space-y-2">
            {lines.map((line, lineIndex) => {
              if (line.startsWith('*   *')) {
                // Extract the bold part and the rest
                const content = line.replace('*   *', '').trim();
                const colonIndex = content.indexOf(':');
                if (colonIndex > 0) {
                  const boldPart = content.substring(0, colonIndex);
                  const restPart = content.substring(colonIndex + 1).trim();
                  return (
                    <div key={lineIndex} className="flex gap-2">
                      <span className="text-emerald-600 text-sm">•</span>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">{boldPart}:</strong> {restPart}
                      </p>
                    </div>
                  );
                }
                return (
                  <div key={lineIndex} className="flex gap-2">
                    <span className="text-emerald-600 text-sm">•</span>
                    <p className="text-sm text-gray-700">{content}</p>
                  </div>
                );
              }
              return null;
            }).filter(Boolean)}
          </div>
        );
      }
      
      // Handle regular paragraphs with potential bold text
      let processedText = paragraph;
      
      // Convert *text* to bold
      processedText = processedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      
      // Handle disclaimer section
      if (paragraph.includes('*Disclaimer:*')) {
        return (
          <div key={index} className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-amber-800 mb-2">Disclaimer:</h4>
            <p 
              className="text-sm text-amber-700"
              dangerouslySetInnerHTML={{ 
                __html: paragraph.replace('*Disclaimer:*', '').trim()
              }}
            />
          </div>
        );
      }
      
      return (
        <p 
          key={index} 
          className="text-sm sm:text-base text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
      );
    });
  };

  return (
    <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span>AI Analysis Report</span>
            <Badge variant="outline" className="text-xs px-2 py-1 flex items-center gap-1 bg-purple-100 text-purple-700 border-purple-300">
              <Sparkles className="w-3 h-3" />
              Gemini AI
            </Badge>
          </div>
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-600">
          Detailed analysis powered by Google's Gemini AI model
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-4">
        {parseDescription(description)}
      </CardContent>
    </Card>
  );
};

export default GeminiDescriptionCard;
