import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface PWAInstallButtonProps {
  language: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
        title={language === 'nl' ? 'Installeer RosterSync als PWA app' : 'Install RosterSync as desktop/mobile app'}
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {language === 'nl' ? 'Installeer App' : 'Install App'}
        </span>
        <span className="sm:hidden">PWA</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          title={language === 'nl' ? 'Installeer op iPhone/iPad' : 'Install on iPhone/iPad'}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {language === 'nl' ? 'Installeer op iOS' : 'Install on iOS'}
          </span>
          <span className="sm:hidden">iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-display font-bold text-base">
                    {language === 'nl' ? 'Installeren op iPhone / iPad' : 'Install on iPhone / iPad'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </div>
                  <div>
                    {language === 'nl' ? (
                      <span>Tik onderaan in Safari op de <strong>Deel-knop</strong> (vierkantje met pijltje).</span>
                    ) : (
                      <span>Tap the <strong>Share</strong> button in Safari toolbar.</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </div>
                  <div>
                    {language === 'nl' ? (
                      <span>Scroll omlaag en kies <strong>Zet op beginscherm</strong>.</span>
                    ) : (
                      <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </div>
                  <div>
                    {language === 'nl' ? (
                      <span>Bevestig met <strong>Voeg toe</strong> om RosterSync Pro als app te openen.</span>
                    ) : (
                      <span>Confirm with <strong>Add</strong> to launch RosterSync Pro like a native app.</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                {language === 'nl' ? 'Begrepen' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers without beforeinstallprompt triggered yet: show button that explains or registers
  return (
    <button
      onClick={() => {
        // Trigger generic install info toast
        if (window.confirm(
          language === 'nl'
            ? 'RosterSync Pro is een Progressive Web App (PWA) met offline ondersteuning. Gebruik het menu van uw browser (bijv. icoontje in adresbalk) om de app te installeren op uw apparaat.'
            : 'RosterSync Pro is a Progressive Web App (PWA) with offline capabilities. Use your browser menu or address bar install icon to install to your device.'
        )) {
          install();
        }
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
      title={language === 'nl' ? 'PWA Applicatie Installeren' : 'Install PWA Application'}
    >
      <Download className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{language === 'nl' ? 'PWA App' : 'Install PWA'}</span>
      <span className="sm:hidden">PWA</span>
    </button>
  );
};
