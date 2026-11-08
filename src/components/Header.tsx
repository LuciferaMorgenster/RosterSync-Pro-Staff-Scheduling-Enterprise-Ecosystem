import React from 'react';
import { Calendar, Layers, Share2, FileSpreadsheet, Heart, Github, Globe } from 'lucide-react';
import { Language, ViewTab } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSponsor: () => void;
  onOpenGithub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onOpenSponsor,
  onOpenGithub,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                {t.brandTitle}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline whitespace-nowrap">
                {t.brandTagline}
              </span>
            </div>
          </div>

          {/* Zone 2: 4 Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('roster')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'roster'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.navRoster}</span>
            </button>

            <button
              onClick={() => onTabChange('integrations')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'integrations'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.navIntegrations}</span>
            </button>

            <button
              onClick={() => onTabChange('export_payroll')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'export_payroll'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.navPayroll}</span>
            </button>

            <button
              onClick={() => onTabChange('seo_social')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'seo_social'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{t.navSeo}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('nl')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  language === 'nl'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Wissel naar Nederlands"
              >
                NL
              </button>
            </div>

            {/* Sponsor Button */}
            <button
              onClick={onOpenSponsor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Support with PayPal"
            >
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
              <span className="hidden sm:inline">{t.navSponsor}</span>
              <span className="sm:hidden">PayPal</span>
            </button>

            {/* GitHub Publish Button */}
            <button
              onClick={onOpenGithub}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              title="GitHub Repository & Export"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navGithub}</span>
              <span className="sm:hidden">GitHub</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => onTabChange('roster')}
            className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
              currentTab === 'roster' ? 'text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.navRoster}</span>
          </button>
          <button
            onClick={() => onTabChange('integrations')}
            className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
              currentTab === 'integrations' ? 'text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.navIntegrations}</span>
          </button>
          <button
            onClick={() => onTabChange('export_payroll')}
            className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
              currentTab === 'export_payroll' ? 'text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{t.navPayroll}</span>
          </button>
          <button
            onClick={() => onTabChange('seo_social')}
            className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
              currentTab === 'seo_social' ? 'text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>SEO</span>
          </button>
        </div>
      </div>
    </header>
  );
};
