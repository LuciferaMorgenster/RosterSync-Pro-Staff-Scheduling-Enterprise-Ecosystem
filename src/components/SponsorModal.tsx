import React, { useState } from 'react';
import { X, Heart, Copy, Check, ExternalLink, ShieldCheck, Coffee } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(25);

  const paypalEmail = 'luciferamorgenster@gmail.com';
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(
    paypalEmail
  )}&currency_code=EUR&amount=${selectedAmount}`;

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(paypalEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header with decorative top banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <h3 className="font-display font-bold text-lg leading-tight">
            {t.sponsorTitle}
          </h3>
          <p className="text-xs text-white/90 mt-1 leading-relaxed">
            {t.sponsorSubtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Preset Donation Amounts */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              {language === 'nl' ? 'Kies een bijdrage' : 'Choose a Sponsorship Tier'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    selectedAmount === amt
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  €{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Account Details Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                {language === 'nl' ? 'PayPal Rekening' : 'PayPal Account'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200">
              <span className="font-mono text-xs font-semibold text-slate-900 truncate">
                {paypalEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-slate-500 hover:text-slate-900 p-1 rounded transition-colors shrink-0"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Direct PayPal Checkout Button */}
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#0070BA] hover:bg-[#005ea6] rounded-xl shadow-xs transition-colors"
          >
            <span>{t.sponsorButtonDirect} (€{selectedAmount})</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="text-[11px] text-center text-slate-500 italic">
            {t.sponsorNote}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
