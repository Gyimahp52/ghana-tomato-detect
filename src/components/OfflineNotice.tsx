
import React from 'react';
import { WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OfflineNoticeProps {
  isOffline: boolean;
}

const OfflineNotice: React.FC<OfflineNoticeProps> = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        <strong>Offline Analysis:</strong> This diagnosis was performed using our offline AI model. 
        The system analyzed your image locally on your device without requiring an internet connection.
      </AlertDescription>
    </Alert>
  );
};

export default OfflineNotice;
