
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ConsultationNotice: React.FC = () => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Important:</strong> This AI diagnosis provides comprehensive treatment options including organic, 
        cultural, and biological methods. For severe infections or if organic methods aren't working, 
        consult with your local agricultural extension officer for additional support.
      </AlertDescription>
    </Alert>
  );
};

export default ConsultationNotice;
