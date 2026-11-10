import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xl border border-amber-500 animate-pulse">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        {language === 'nl'
          ? 'Offlinemodus — Lokale en gecachete roostergegevens zijn actief.'
          : 'Offline Mode — Local and cached roster data are active.'}
      </span>
    </div>
  );
};
