import React, { useState } from 'react';
import {
  RefreshCw,
  CheckCircle2,
  Users,
  Briefcase,
  FileSpreadsheet,
  ArrowRight,
  Code2,
  Copy,
  Check,
  Clock,
  Layers,
  Download
} from 'lucide-react';
import { ConnectedApp, Employee, KopilotProject, Language, Shift, SyncLogEntry } from '../types';
import { translations } from '../i18n/translations';
import { calculateShiftHours } from '../services/integrationService';

interface ConnectedAppsViewProps {
  apps: ConnectedApp[];
  employees: Employee[];
  shifts: Shift[];
  projects: KopilotProject[];
  syncLogs: SyncLogEntry[];
  language: Language;
  onSyncApp: (appId: 'talentpulse' | 'kopilot' | 'boekhoudgemak') => void;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const ConnectedAppsView: React.FC<ConnectedAppsViewProps> = ({
  apps,
  employees,
  shifts,
  projects,
  syncLogs,
  language,
  onSyncApp,
  onSyncAll,
  isSyncing,
}) => {
  const t = translations[language];
  const [activePayloadApp, setActivePayloadApp] = useState<'talentpulse' | 'kopilot' | 'boekhoudgemak'>('talentpulse');
  const [copied, setCopied] = useState(false);

  // Calculate project hours allocated from shifts
  const getProjectAllocatedHours = (projId: string): number => {
    const projShifts = shifts.filter((s) => s.projectId === projId);
    return projShifts.reduce(
      (sum, s) => sum + calculateShiftHours(s.startTime, s.endTime, s.breakMinutes),
      0
    );
  };

  // Generate payload for preview
  const generatePayload = () => {
    if (activePayloadApp === 'talentpulse') {
      return {
        service: 'TalentPulse-HRIS API Bridge v2.8',
        action: 'EMPLOYEE_DIRECTORY_SYNC',
        timestamp: new Date().toISOString(),
        headcount: employees.length,
        employees: employees.map((e) => ({
          talentPulseId: e.talentPulseId,
          name: e.name,
          role: e.role,
          department: e.department,
          contractWeeklyHours: e.contractHours,
          status: e.status
        }))
      };
    } else if (activePayloadApp === 'kopilot') {
      return {
        service: 'Kopilot-Projects API Bridge v3.1',
        action: 'RESOURCE_ALLOCATION_PUSH',
        timestamp: new Date().toISOString(),
        projects: projects.map((p) => ({
          code: p.code,
          title: p.title,
          client: p.client,
          budgetHours: p.budgetHours,
          allocatedHours: getProjectAllocatedHours(p.id)
        }))
      };
    } else {
      // BoekhoudGemak
      const payrollData = employees.map((emp) => {
        const empShifts = shifts.filter((s) => s.employeeId === emp.id);
        const totalHours = empShifts.reduce(
          (sum, s) => sum + calculateShiftHours(s.startTime, s.endTime, s.breakMinutes),
          0
        );
        const regular = Math.min(totalHours, emp.contractHours);
        const overtime = Math.max(0, totalHours - emp.contractHours);
        const gross = regular * emp.hourlyRate + overtime * (emp.hourlyRate * 1.5);
        return {
          employeeId: emp.talentPulseId,
          name: emp.name,
          regularHours: Number(regular.toFixed(1)),
          overtimeHours: Number(overtime.toFixed(1)),
          ratePerHour: emp.hourlyRate,
          grossTotalEur: Number(gross.toFixed(2))
        };
      });

      return {
        service: 'BoekhoudGemak Timesheets & Payroll API v4.0',
        action: 'TIMESHEET_BATCH_EXPORT',
        period: '2026-W44',
        timestamp: new Date().toISOString(),
        currency: 'EUR',
        batchLedger: payrollData
      };
    }
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(generatePayload(), null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="font-display font-bold text-slate-900 text-lg">
              {t.integrationsTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            {t.integrationsSubtitle}
          </p>
        </div>

        <button
          onClick={onSyncAll}
          disabled={isSyncing}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors whitespace-nowrap"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? t.syncInProgress : t.syncAllApps}</span>
        </button>
      </div>

      {/* 2. Three Dedicated App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* App 1: TalentPulse-HRIS */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Link</span>
              </div>
            </div>

            <h3 className="font-display font-bold text-slate-900 text-base">
              {t.talentPulseName}
            </h3>
            <div className="text-[11px] font-medium text-indigo-600 mt-0.5">
              {t.talentPulseCategory}
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {language === 'nl' ? apps[0]?.descriptionNl : apps[0]?.descriptionEn}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>{language === 'nl' ? 'Medewerkers:' : 'Staff Directory:'}</span>
                <span className="font-mono font-bold text-slate-800">12 profiles</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>{t.lastSynced}:</span>
                <span className="font-mono text-slate-700">{apps[0]?.lastSync || '08:30'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSyncApp('talentpulse')}
            disabled={isSyncing}
            className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{t.talentPulseAction}</span>
          </button>
        </div>

        {/* App 2: Kopilot-Projects */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Link</span>
              </div>
            </div>

            <h3 className="font-display font-bold text-slate-900 text-base">
              {t.kopilotName}
            </h3>
            <div className="text-[11px] font-medium text-blue-600 mt-0.5">
              {t.kopilotCategory}
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {language === 'nl' ? apps[1]?.descriptionNl : apps[1]?.descriptionEn}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>{language === 'nl' ? 'Actieve projecten:' : 'Active Projects:'}</span>
                <span className="font-mono font-bold text-slate-800">4 budgets</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>{t.lastSynced}:</span>
                <span className="font-mono text-slate-700">{apps[1]?.lastSync || '08:35'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSyncApp('kopilot')}
            disabled={isSyncing}
            className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{t.kopilotAction}</span>
          </button>
        </div>

        {/* App 3: BoekhoudGemak */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ready to Export</span>
              </div>
            </div>

            <h3 className="font-display font-bold text-slate-900 text-base">
              {t.boekhoudgemakName}
            </h3>
            <div className="text-[11px] font-medium text-emerald-600 mt-0.5">
              {t.boekhoudgemakCategory}
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {language === 'nl' ? apps[2]?.descriptionNl : apps[2]?.descriptionEn}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>{language === 'nl' ? 'Urenstaat records:' : 'Timesheet Records:'}</span>
                <span className="font-mono font-bold text-slate-800">42 records</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>{t.lastSynced}:</span>
                <span className="font-mono text-slate-700">{apps[2]?.lastSync || '08:40'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSyncApp('boekhoudgemak')}
            disabled={isSyncing}
            className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.boekhoudgemakAction}</span>
          </button>
        </div>
      </div>

      {/* 3. Kopilot-Projects Resource Utilization Overview */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              {language === 'nl'
                ? 'Kopilot-Projects: Gekoppelde Uren per Klantproject'
                : 'Kopilot-Projects: Allocated Roster Hours by Project'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {language === 'nl' ? '4 Actieve Projecten' : '4 Active Projects'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((proj) => {
            const allocated = getProjectAllocatedHours(proj.id);
            const percentage = Math.min(100, Math.round((allocated / proj.budgetHours) * 100));

            return (
              <div
                key={proj.id}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="font-bold text-blue-700">{proj.code}</span>
                    <span className="text-slate-500">{proj.client}</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs truncate">
                    {proj.title}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono mb-1">
                    <span>{allocated}h allocated</span>
                    <span>{proj.budgetHours}h budget</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: proj.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Live Bridge JSON Payload Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            <span className="font-display font-bold text-slate-900 text-sm">
              {t.viewApiPayload}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* App Payload Selector */}
            <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setActivePayloadApp('talentpulse')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activePayloadApp === 'talentpulse'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                TalentPulse-HRIS
              </button>
              <button
                onClick={() => setActivePayloadApp('kopilot')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activePayloadApp === 'kopilot'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kopilot-Projects
              </button>
              <button
                onClick={() => setActivePayloadApp('boekhoudgemak')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activePayloadApp === 'boekhoudgemak'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                BoekhoudGemak
              </button>
            </div>

            <button
              onClick={handleCopyPayload}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copiedToClipboard : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-72">
          <pre>{JSON.stringify(generatePayload(), null, 2)}</pre>
        </div>
      </div>

      {/* 5. Live Activity Logs */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="font-display font-bold text-slate-900 text-sm">
              {t.liveLogs}
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live webhook bridge stream</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {syncLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-slate-400 mt-0.5">{log.timestamp}</span>
                <div>
                  <span className="font-semibold text-slate-900">{log.appName}:</span>{' '}
                  <span className="text-slate-700">{log.action}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{log.details}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                {log.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
