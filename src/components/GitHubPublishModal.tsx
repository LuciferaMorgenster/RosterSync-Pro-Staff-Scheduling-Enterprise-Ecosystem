import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface GitHubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const GitHubPublishModal: React.FC<GitHubPublishModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const gitHubUserEmail = 'luciferamorgenster@gmail.com';
  const repoName = 'rostersync-pro';
  const gitCommands = `# 1. Initialize Git repository
git init

# 2. Stage all project files including bilingual README.md & cover asset
git add .

# 3. Create initial commit
git commit -m "feat: initial release of RosterSync Pro staff scheduling app with TalentPulse, Kopilot & BoekhoudGemak bridge"

# 4. Set default main branch
git branch -M main

# 5. Link to your GitHub account repository (create 'rostersync-pro' on github.com first)
git remote add origin https://github.com/luciferamorgenster/${repoName}.git

# 6. Push codebase to GitHub
git push -u origin main`;

  if (!isOpen) return null;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <Github className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-display font-bold text-lg leading-tight">
            {t.githubTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t.githubSubtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Author Badge */}
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <span className="text-slate-600 font-medium">{t.githubUserEmail}</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Ready
            </span>
          </div>

          {/* Step list */}
          <div className="space-y-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">{t.githubStepsHeading}:</p>
            <p className="text-slate-600">{t.step1}</p>
            <p className="text-slate-600">{t.step2}</p>
            <p className="text-slate-600">{t.step3}</p>
          </div>

          {/* Terminal Command Box */}
          <div className="relative bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-56">
            <button
              onClick={handleCopyCommands}
              className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? t.copiedToClipboard : t.copyCommands}</span>
            </button>
            <pre className="pr-20">{gitCommands}</pre>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>{language === 'nl' ? 'Open GitHub om repo aan te maken' : 'Open GitHub to create repo'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
