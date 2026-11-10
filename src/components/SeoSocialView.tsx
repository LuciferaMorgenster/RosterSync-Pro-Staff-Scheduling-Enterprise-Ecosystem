import React, { useState } from 'react';
import { Share2, Globe, Linkedin, Facebook, Twitter, Check, Copy, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface SeoSocialViewProps {
  language: Language;
}

export const SeoSocialView: React.FC<SeoSocialViewProps> = ({ language }) => {
  const t = translations[language];
  const [platform, setPlatform] = useState<'linkedin' | 'facebook' | 'twitter'>('linkedin');
  const [copiedTags, setCopiedTags] = useState(false);

  // Cover image asset path
  const coverImageUrl = '/src/assets/images/rostersync_cover_banner_1794113389294.jpg';
  const siteUrl = 'https://rostersync-pro.lucifera.eu';
  const pageTitle = 'RosterSync Pro – Staff Roster & Shift Scheduling Platform';
  const pageDescription =
    'Plan weekly staff shifts, manage department rosters, and seamlessly sync with TalentPulse-HRIS, Kopilot-Projects, and BoekhoudGemak.';

  const metaTagsSnippet = `<!-- Primary Meta Tags -->
<title>${pageTitle}</title>
<meta name="description" content="${pageDescription}" />

<!-- OpenGraph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="RosterSync Pro" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:title" content="${pageTitle}" />
<meta property="og:description" content="${pageDescription}" />
<meta property="og:image" content="${coverImageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="675" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@rostersync" />
<meta name="twitter:title" content="${pageTitle}" />
<meta name="twitter:description" content="${pageDescription}" />
<meta name="twitter:image" content="${coverImageUrl}" />`;

  const handleCopyTags = () => {
    navigator.clipboard.writeText(metaTagsSnippet);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h2 className="font-display font-bold text-slate-900 text-lg">
              {t.seoTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            {t.seoSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SEO 100% Validated</span>
          </span>
          <button
            onClick={handleCopyTags}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
          >
            {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTags ? t.copiedToClipboard : 'Copy Meta Tags'}</span>
          </button>
        </div>
      </div>

      {/* Social Preview Platform Switcher & Live Simulator */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              {t.previewPlatform}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'nl'
                ? 'Bekijk de interactieve weergave zoals deze verschijnt op sociale netwerken'
                : 'Inspect the card render exactly as social bots and feed crawlers render it'}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setPlatform('linkedin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                platform === 'linkedin'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => setPlatform('facebook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                platform === 'facebook'
                  ? 'bg-white text-blue-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => setPlatform('twitter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                platform === 'twitter'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Twitter className="w-3.5 h-3.5 fill-current" />
              <span>Twitter / X</span>
            </button>
          </div>
        </div>

        {/* Mock Card Preview Container */}
        <div className="max-w-2xl mx-auto py-2">
          {platform === 'linkedin' && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              {/* Post author header */}
              <div className="p-3.5 flex items-center gap-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm">
                  RP
                </div>
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    RosterSync Enterprise
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Sponsored · Human Resources Tech
                  </div>
                </div>
              </div>

              {/* Shared Card Link Object */}
              <div className="border-t border-slate-200 bg-slate-50">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={coverImageUrl}
                    alt="RosterSync Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded backdrop-blur-xs font-mono">
                    1200 x 675 · OpenGraph
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    rostersync-pro.lucifera.eu
                  </div>
                  <div className="font-semibold text-slate-900 text-sm mt-0.5 leading-snug">
                    {pageTitle}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {pageDescription}
                  </div>
                </div>
              </div>

              {/* LinkedIn Reactions footer */}
              <div className="px-4 py-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>👍 148 likes · 22 comments</span>
                <span>Share</span>
              </div>
            </div>
          )}

          {platform === 'facebook' && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              {/* Post author header */}
              <div className="p-3.5 flex items-center gap-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  F
                </div>
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    RosterSync Pro
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Just now · 🌐
                  </div>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="border border-slate-200 bg-slate-50 m-2 rounded overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={coverImageUrl}
                    alt="RosterSync Cover Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-slate-100 border-t border-slate-200">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    ROSTERSYNC-PRO.LUCIFERA.EU
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {pageTitle}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {pageDescription}
                  </div>
                </div>
              </div>
            </div>
          )}

          {platform === 'twitter' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  𝕏
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">RosterSync Pro</div>
                  <div className="text-[11px] text-slate-500">@rostersync</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={coverImageUrl}
                    alt="Twitter Card Cover Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-white">
                  <div className="text-[11px] text-slate-500">rostersync-pro.lucifera.eu</div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">
                    {pageTitle}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {pageDescription}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meta Tags & JSON-LD Snippet View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OpenGraph & Meta Tags Box */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="font-display font-semibold text-xs text-slate-800">
              HTML OpenGraph &amp; Twitter Meta Tags
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Injected in index.html
            </span>
          </div>
          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto max-h-64">
            <pre>{metaTagsSnippet}</pre>
          </div>
        </div>

        {/* Schema.org Structured Data */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="font-display font-semibold text-xs text-slate-800">
              Schema.org JSON-LD Structured Data
            </span>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              WebApplication
            </span>
          </div>
          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto max-h-64">
            <pre>{`{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RosterSync Pro",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "description": "${pageDescription}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "featureList": [
    "Interactive Weekly Drag-and-Drop Shift Planner",
    "Multi-Department Roster Management",
    "TalentPulse-HRIS Employee Sync",
    "Kopilot-Projects Labor & Milestone Allocation",
    "BoekhoudGemak Automated Payroll Wage Export",
    "Bilingual Interface (English & Nederlands)",
    "Overtime & Shift Conflict Detection"
  ]
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
