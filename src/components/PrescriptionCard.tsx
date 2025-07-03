
import React from 'react';
import { Pill, Clock, Calendar, Leaf, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrescriptionCardProps {
  prescription: {
    immediate: string[];
    weekly: string[];
    monthly: string[];
  };
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-blue-600" />
          {t('prescription.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>{t('prescription.act_immediately')}</strong> {t('prescription.early_treatment')}
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Immediate Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h4 className="font-semibold text-red-700">{t('prescription.immediate')}</h4>
            </div>
            {prescription.immediate.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-200">
                <Clock className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{action}</p>
              </div>
            ))}
          </div>

          {/* Weekly Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h4 className="font-semibold text-orange-700">{t('prescription.weekly')}</h4>
            </div>
            {prescription.weekly.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-200">
                <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{action}</p>
              </div>
            ))}
          </div>

          {/* Monthly Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h4 className="font-semibold text-green-700">{t('prescription.monthly')}</h4>
            </div>
            {prescription.monthly.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-200">
                <Leaf className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
