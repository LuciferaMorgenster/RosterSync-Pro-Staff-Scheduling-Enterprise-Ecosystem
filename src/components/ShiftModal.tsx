import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, User, Briefcase, Trash2, AlertCircle } from 'lucide-react';
import { Employee, KopilotProject, Language, Shift } from '../types';
import { translations } from '../i18n/translations';
import { calculateShiftHours } from '../services/integrationService';

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shiftData: Omit<Shift, 'id'> | Shift) => void;
  onDelete?: (shiftId: string) => void;
  initialShift?: Shift | null;
  defaultEmployeeId?: string;
  defaultDate?: string;
  employees: Employee[];
  projects: KopilotProject[];
  language: Language;
}

export const ShiftModal: React.FC<ShiftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialShift,
  defaultEmployeeId,
  defaultDate,
  employees,
  projects,
  language,
}) => {
  const t = translations[language];

  const [employeeId, setEmployeeId] = useState(defaultEmployeeId || employees[0]?.id || '');
  const [date, setDate] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakMinutes, setBreakMinutes] = useState(30);
  const [roleLabel, setRoleLabel] = useState('General Operations');
  const [projectId, setProjectId] = useState<string>('proj-1');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialShift) {
      setEmployeeId(initialShift.employeeId);
      setDate(initialShift.date);
      setStartTime(initialShift.startTime);
      setEndTime(initialShift.endTime);
      setBreakMinutes(initialShift.breakMinutes);
      setRoleLabel(initialShift.roleLabel);
      setProjectId(initialShift.projectId || '');
      setNotes(initialShift.notes || '');
    } else {
      if (defaultEmployeeId) setEmployeeId(defaultEmployeeId);
      if (defaultDate) setDate(defaultDate);
      setStartTime('09:00');
      setEndTime('17:00');
      setBreakMinutes(30);
      setRoleLabel('General Operations');
      setProjectId(projects[0]?.id || '');
      setNotes('');
    }
    setError(null);
  }, [initialShift, defaultEmployeeId, defaultDate, isOpen, projects]);

  if (!isOpen) return null;

  const currentHours = calculateShiftHours(startTime, endTime, breakMinutes);
  const selectedEmployee = employees.find(e => e.id === employeeId);
  const selectedProject = projects.find(p => p.id === projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) {
      setError(language === 'nl' ? 'Selecteer een medewerker' : 'Please select an employee');
      return;
    }
    if (currentHours <= 0) {
      setError(language === 'nl' ? 'Eindtijd moet na de starttijd liggen' : 'End time must be later than start time');
      return;
    }

    const payload = {
      ...(initialShift ? { id: initialShift.id } : {}),
      employeeId,
      date,
      startTime,
      endTime,
      breakMinutes,
      department: selectedEmployee?.department || 'Operations',
      projectId: selectedProject?.id,
      projectTitle: selectedProject?.title,
      kopilotTaskId: selectedProject?.code,
      roleLabel: roleLabel.trim() || 'General Operations',
      color: selectedProject?.color || '#3B82F6',
      notes: notes.trim()
    };

    onSave(payload as Shift);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-semibold text-slate-900 text-base">
              {initialShift ? t.modalEditShiftTitle : t.modalNewShiftTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Employee Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              {t.employeeSelect}
            </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.role} ({emp.department}, {emp.contractHours}h)
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {t.dateLabel}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
              required
            />
          </div>

          {/* Time & Break Row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.startTime}
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg font-mono text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.endTime}
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg font-mono text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.breakMinutesLabel}
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>
          </div>

          {/* Calculated Hours Display */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="text-slate-600 font-medium">
              {language === 'nl' ? 'Effectieve diensttijd:' : 'Net Shift Duration:'}
            </span>
            <span className="font-mono font-bold text-blue-700 tabular-nums">
              {currentHours} {t.hoursShort}
            </span>
          </div>

          {/* Role / Duty Label */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.roleLabel}
            </label>
            <input
              type="text"
              value={roleLabel}
              onChange={(e) => setRoleLabel(e.target.value)}
              placeholder="e.g. Lead Developer, Dispatch Desk, Client Onboarding"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Kopilot-Projects Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.projectAllocation}</span>
              <span className="text-[10px] text-slate-500">· Kopilot-Projects</span>
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t.noProject}</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  [{proj.code}] {proj.title} ({proj.client})
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Remote sprint planning, handover notes..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {initialShift && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(t.confirmDelete)) {
                    onDelete(initialShift.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.deleteShift}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                {t.saveShift}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
