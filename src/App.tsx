import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RosterView } from './components/RosterView';
import { ConnectedAppsView } from './components/ConnectedAppsView';
import { PayrollView } from './components/PayrollView';
import { SeoSocialView } from './components/SeoSocialView';
import { ShiftModal } from './components/ShiftModal';
import { SponsorModal } from './components/SponsorModal';
import { GitHubPublishModal } from './components/GitHubPublishModal';
import { ConnectedApp, Employee, KopilotProject, Language, Shift, SyncLogEntry, ViewTab } from './types';
import {
  INITIAL_CONNECTED_APPS,
  INITIAL_EMPLOYEES,
  INITIAL_PROJECTS,
  INITIAL_SYNC_LOGS,
  generateInitialShifts,
  getWeekDates,
} from './services/integrationService';
import { translations } from './i18n/translations';
import { Heart, Github, Layers, Calendar, CheckCircle2 } from 'lucide-react';

export default function App() {
  // 1. Language state (English default as requested)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('rostersync_lang');
    return (saved === 'nl' || saved === 'en') ? saved : 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('rostersync_lang', lang);
  };

  const t = translations[language];

  // 2. Navigation tab state
  const [currentTab, setCurrentTab] = useState<ViewTab>('roster');

  // 3. Core data state with localStorage persistence
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('rostersync_employees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [projects] = useState<KopilotProject[]>(INITIAL_PROJECTS);

  const [shifts, setShifts] = useState<Shift[]>(() => {
    const saved = localStorage.getItem('rostersync_shifts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const currentWeek = getWeekDates();
    return generateInitialShifts(INITIAL_EMPLOYEES, currentWeek);
  });

  const [apps, setApps] = useState<ConnectedApp[]>(INITIAL_CONNECTED_APPS);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(INITIAL_SYNC_LOGS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // 4. Modal state
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [modalDefaultEmpId, setModalDefaultEmpId] = useState<string | undefined>();
  const [modalDefaultDate, setModalDefaultDate] = useState<string | undefined>();

  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  // 5. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist shifts and employees
  useEffect(() => {
    localStorage.setItem('rostersync_shifts', JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem('rostersync_employees', JSON.stringify(employees));
  }, [employees]);

  // Handlers for Shifts
  const handleOpenAddShift = (empId?: string, dateStr?: string) => {
    setEditingShift(null);
    setModalDefaultEmpId(empId);
    setModalDefaultDate(dateStr || new Date().toISOString().split('T')[0]);
    setIsShiftModalOpen(true);
  };

  const handleOpenEditShift = (shift: Shift) => {
    setEditingShift(shift);
    setModalDefaultEmpId(shift.employeeId);
    setModalDefaultDate(shift.date);
    setIsShiftModalOpen(true);
  };

  const handleSaveShift = (shiftData: Shift | Omit<Shift, 'id'>) => {
    if ('id' in shiftData && shiftData.id) {
      // Edit existing
      setShifts((prev) =>
        prev.map((s) => (s.id === shiftData.id ? (shiftData as Shift) : s))
      );
      showToast(language === 'nl' ? 'Dienst succesvol bijgewerkt' : 'Shift updated successfully');
    } else {
      // Create new
      const newShift: Shift = {
        ...(shiftData as Omit<Shift, 'id'>),
        id: `shift-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      setShifts((prev) => [...prev, newShift]);
      showToast(language === 'nl' ? 'Nieuwe dienst ingepland' : 'New shift scheduled');
    }
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts((prev) => prev.filter((s) => s.id !== shiftId));
    showToast(language === 'nl' ? 'Dienst verwijderd' : 'Shift removed');
  };

  const handleMoveShift = (shiftId: string, targetEmpId: string, targetDate: string) => {
    setShifts((prev) =>
      prev.map((s) => {
        if (s.id === shiftId) {
          const emp = employees.find((e) => e.id === targetEmpId);
          return {
            ...s,
            employeeId: targetEmpId,
            date: targetDate,
            department: emp?.department || s.department,
          };
        }
        return s;
      })
    );
    showToast(language === 'nl' ? 'Dienst succesvol verplaatst' : 'Shift reassigned');
  };

  // Connected Apps sync simulation
  const handleSyncApp = (appId: 'talentpulse' | 'kopilot' | 'boekhoudgemak') => {
    setIsSyncing(true);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTimeout(() => {
      setApps((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, lastSync: `Today at ${nowStr.substring(0, 5)}`, status: 'connected' } : a))
      );

      const appName =
        appId === 'talentpulse'
          ? 'TalentPulse-HRIS'
          : appId === 'kopilot'
          ? 'Kopilot-Projects'
          : 'BoekhoudGemak';

      const details =
        appId === 'talentpulse'
          ? 'Pulled updated personnel contracts & verified weekly limits.'
          : appId === 'kopilot'
          ? 'Synced scheduled billable hours with project tasks.'
          : 'Timesheet ledger processed and validated for payroll export.';

      const newLog: SyncLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: nowStr,
        appId,
        appName,
        action: 'Manual Bridge Sync Triggered',
        details,
        type: appId === 'boekhoudgemak' ? 'export' : 'sync',
      };

      setSyncLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      setIsSyncing(false);
      showToast(`${appName} ${language === 'nl' ? 'succesvol gesynchroniseerd' : 'synchronized successfully'}`);
    }, 800);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTimeout(() => {
      setApps((prev) =>
        prev.map((a) => ({
          ...a,
          lastSync: `Today at ${nowStr.substring(0, 5)}`,
          status: 'connected',
        }))
      );

      const newLog: SyncLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: nowStr,
        appId: 'talentpulse',
        appName: 'Unified Ecosystem Bridge',
        action: 'Complete Multi-App Sync',
        details: 'TalentPulse-HRIS, Kopilot-Projects, and BoekhoudGemak data streams harmonized.',
        type: 'success',
      };

      setSyncLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      setIsSyncing(false);
      showToast(language === 'nl' ? 'Alle apps gesynchroniseerd' : 'All applications synchronized');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* 1. Header Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
        onOpenGithub={() => setIsGithubModalOpen(true)}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'roster' && (
          <RosterView
            employees={employees}
            shifts={shifts}
            projects={projects}
            language={language}
            onAddShift={handleOpenAddShift}
            onEditShift={handleOpenEditShift}
            onMoveShift={handleMoveShift}
            onApplyTemplate={(type, empId, date) => {
              // Quick template helper
              const times =
                type === 'morning'
                  ? { start: '08:00', end: '16:00', label: 'Morning Duty' }
                  : type === 'day'
                  ? { start: '09:00', end: '17:00', label: 'Day Shift' }
                  : { start: '12:00', end: '20:00', label: 'Evening Duty' };

              handleSaveShift({
                employeeId: empId,
                date,
                startTime: times.start,
                endTime: times.end,
                breakMinutes: 30,
                department: employees.find((e) => e.id === empId)?.department || 'Operations',
                roleLabel: times.label,
                color: '#3B82F6',
              });
            }}
          />
        )}

        {currentTab === 'integrations' && (
          <ConnectedAppsView
            apps={apps}
            employees={employees}
            shifts={shifts}
            projects={projects}
            syncLogs={syncLogs}
            language={language}
            onSyncApp={handleSyncApp}
            onSyncAll={handleSyncAll}
            isSyncing={isSyncing}
          />
        )}

        {currentTab === 'export_payroll' && (
          <PayrollView
            employees={employees}
            shifts={shifts}
            language={language}
          />
        )}

        {currentTab === 'seo_social' && (
          <SeoSocialView language={language} />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">RosterSync Pro</span>
            <span>·</span>
            <span>
              {language === 'nl'
                ? 'Geoptimaliseerd voor TalentPulse-HRIS, Kopilot-Projects en BoekhoudGemak'
                : 'Integrated bridge for TalentPulse-HRIS, Kopilot-Projects & BoekhoudGemak'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
              <span>PayPal Sponsor (luciferamorgenster@gmail.com)</span>
            </button>

            <span>·</span>

            <button
              onClick={() => setIsGithubModalOpen(true)}
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Export</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 4. Modals */}
      <ShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        onSave={handleSaveShift}
        onDelete={handleDeleteShift}
        initialShift={editingShift}
        defaultEmployeeId={modalDefaultEmpId}
        defaultDate={modalDefaultDate}
        employees={employees}
        projects={projects}
        language={language}
      />

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        language={language}
      />

      <GitHubPublishModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        language={language}
      />
    </div>
  );
}
