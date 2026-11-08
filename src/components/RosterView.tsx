import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  AlertTriangle,
  Briefcase,
  Users,
  DollarSign,
  CheckCircle2,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import { Department, Employee, KopilotProject, Language, Shift } from '../types';
import { translations } from '../i18n/translations';
import { calculateShiftHours, getWeekDates } from '../services/integrationService';

interface RosterViewProps {
  employees: Employee[];
  shifts: Shift[];
  projects: KopilotProject[];
  language: Language;
  onAddShift: (employeeId?: string, date?: string) => void;
  onEditShift: (shift: Shift) => void;
  onMoveShift: (shiftId: string, targetEmployeeId: string, targetDate: string) => void;
  onApplyTemplate: (templateType: 'morning' | 'day' | 'evening', employeeId: string, date: string) => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  employees,
  shifts,
  projects,
  language,
  onAddShift,
  onEditShift,
  onMoveShift,
  onApplyTemplate,
}) => {
  const t = translations[language];

  // Week navigation state
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>('All');
  const [draggedShiftId, setDraggedShiftId] = useState<string | null>(null);
  const [dragOverCell, setDragOverCell] = useState<{ empId: string; date: string } | null>(null);

  // Compute base date with week offset
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + currentWeekOffset * 7);
  const weekDates = getWeekDates(baseDate);

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    if (selectedDepartment === 'All') return true;
    return emp.department === selectedDepartment;
  });

  // Calculate employee weekly hours
  const getEmployeeWeeklyHours = (empId: string): number => {
    const empShifts = shifts.filter(
      (s) => s.employeeId === empId && weekDates.some((w) => w.dateStr === s.date)
    );
    const total = empShifts.reduce(
      (sum, s) => sum + calculateShiftHours(s.startTime, s.endTime, s.breakMinutes),
      0
    );
    return Number(total.toFixed(1));
  };

  // High-level stats
  const totalWeeklyHours = employees.reduce(
    (sum, emp) => sum + getEmployeeWeeklyHours(emp.id),
    0
  );
  
  const overtimeCount = employees.filter((emp) => {
    const hours = getEmployeeWeeklyHours(emp.id);
    return hours > emp.contractHours;
  }).length;

  const estimatedLaborCost = employees.reduce((sum, emp) => {
    const hours = getEmployeeWeeklyHours(emp.id);
    const regular = Math.min(hours, emp.contractHours);
    const overtime = Math.max(0, hours - emp.contractHours);
    return sum + regular * emp.hourlyRate + overtime * (emp.hourlyRate * 1.5);
  }, 0);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, shiftId: string) => {
    e.dataTransfer.setData('text/plain', shiftId);
    setDraggedShiftId(shiftId);
  };

  const handleDragOver = (e: React.DragEvent, empId: string, dateStr: string) => {
    e.preventDefault();
    setDragOverCell({ empId, date: dateStr });
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e: React.DragEvent, targetEmpId: string, targetDate: string) => {
    e.preventDefault();
    const shiftId = e.dataTransfer.getData('text/plain') || draggedShiftId;
    if (shiftId) {
      onMoveShift(shiftId, targetEmpId, targetDate);
    }
    setDraggedShiftId(null);
    setDragOverCell(null);
  };

  // Check for shift overlap conflicts for an employee on a given date
  const checkConflicts = (empShifts: Shift[]): boolean => {
    if (empShifts.length <= 1) return false;
    for (let i = 0; i < empShifts.length; i++) {
      for (let j = i + 1; j < empShifts.length; j++) {
        const s1 = empShifts[i];
        const s2 = empShifts[j];
        if (s1.startTime < s2.endTime && s2.startTime < s1.endTime) {
          return true; // Overlap detected
        }
      }
    }
    return false;
  };

  const departments: Department[] = ['All', 'Engineering', 'Operations', 'Customer Care', 'Logistics'];

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar & Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Week Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setCurrentWeekOffset(prev => prev - 1)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-all"
              title={t.prevWeek}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentWeekOffset(0)}
              className="px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t.today}
            </button>
            <button
              onClick={() => setCurrentWeekOffset(prev => prev + 1)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-all"
              title={t.nextWeek}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-blue-600" />
            <span className="font-display font-bold text-slate-900 text-sm sm:text-base">
              {weekDates[0]?.fullDate.toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
              –{' '}
              {weekDates[6]?.fullDate.toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Center: Department Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          {departments.map((dept) => {
            const label =
              dept === 'All'
                ? t.allDepartments
                : dept === 'Engineering'
                ? t.engineering
                : dept === 'Operations'
                ? t.operations
                : dept === 'Customer Care'
                ? t.customerCare
                : t.logistics;

            return (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDepartment === dept
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onAddShift()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addShift}</span>
          </button>
        </div>
      </div>

      {/* 2. High-Density Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Total Scheduled Hours */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.totalScheduledHours}</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-display font-bold text-2xl text-slate-900 font-mono tabular-nums">
            {totalWeeklyHours.toFixed(1)} <span className="text-sm font-normal text-slate-500">hrs</span>
          </div>
        </div>

        {/* Stat 2: Active Staff */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.activeStaff}</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display font-bold text-2xl text-slate-900 font-mono tabular-nums">
            {filteredEmployees.length} <span className="text-sm font-normal text-slate-500">members</span>
          </div>
        </div>

        {/* Stat 3: Overtime Alerts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.overtimeAlerts}</span>
            <AlertTriangle className={`w-4 h-4 ${overtimeCount > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
          </div>
          <div className={`font-display font-bold text-2xl font-mono tabular-nums ${overtimeCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
            {overtimeCount} <span className="text-sm font-normal text-slate-500">{language === 'nl' ? 'medewerkers' : 'staff'}</span>
          </div>
        </div>

        {/* Stat 4: Estimated Payroll Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.grossWageEstimate}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-bold text-2xl text-slate-900 font-mono tabular-nums">
            €{estimatedLaborCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* 3. Interactive Drag-and-Drop Weekly Roster Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            {/* Table Header: Staff Column + 7 Days */}
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-left text-xs text-slate-600">
                <th className="py-3 px-4 font-semibold w-64 border-r border-slate-200">
                  {t.staffMember}
                </th>
                {weekDates.map((w, idx) => {
                  const isToday =
                    new Date().toISOString().split('T')[0] === w.dateStr;
                  const dayName = t[w.dayName as keyof typeof t] as string;

                  return (
                    <th
                      key={w.dateStr}
                      className={`py-3 px-2 text-center font-semibold border-r border-slate-200 last:border-r-0 ${
                        isToday ? 'bg-blue-50/70 text-blue-900' : ''
                      }`}
                    >
                      <div className="font-display text-xs">{dayName}</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {w.fullDate.getDate()}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body: Employee Rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredEmployees.map((emp) => {
                const weeklyHours = getEmployeeWeeklyHours(emp.id);
                const isOvertime = weeklyHours > emp.contractHours;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Employee Identity Cell */}
                    <td className="py-3 px-4 border-r border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">
                            {emp.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {emp.role}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                              TP: {emp.talentPulseId}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span
                              className={`text-[10px] font-mono font-medium ${
                                isOvertime ? 'text-amber-600 font-bold' : 'text-slate-600'
                              }`}
                            >
                              {weeklyHours} / {emp.contractHours}h
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 7 Daily Shift Cells */}
                    {weekDates.map((w) => {
                      const dayShifts = shifts.filter(
                        (s) => s.employeeId === emp.id && s.date === w.dateStr
                      );
                      const hasConflict = checkConflicts(dayShifts);
                      const isDragTarget =
                        dragOverCell?.empId === emp.id && dragOverCell?.date === w.dateStr;

                      return (
                        <td
                          key={w.dateStr}
                          onDragOver={(e) => handleDragOver(e, emp.id, w.dateStr)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, emp.id, w.dateStr)}
                          className={`p-1.5 align-top border-r border-slate-200 last:border-r-0 min-h-[95px] relative group transition-colors ${
                            isDragTarget
                              ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset'
                              : 'bg-white hover:bg-slate-50/70'
                          }`}
                        >
                          {/* Conflict Warning */}
                          {hasConflict && (
                            <div className="flex items-center gap-1 p-1 mb-1 text-[10px] text-red-700 bg-red-50 border border-red-200 rounded font-medium">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>{t.doubleBooked}</span>
                            </div>
                          )}

                          {/* Render Shifts in this slot */}
                          <div className="space-y-1.5">
                            {dayShifts.map((shift) => {
                              const hours = calculateShiftHours(
                                shift.startTime,
                                shift.endTime,
                                shift.breakMinutes
                              );
                              const project = projects.find(p => p.id === shift.projectId);

                              return (
                                <div
                                  key={shift.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, shift.id)}
                                  onClick={() => onEditShift(shift)}
                                  className="p-2 rounded-lg border text-left cursor-grab active:cursor-grabbing transition-all hover:shadow-xs group/card relative"
                                  style={{
                                    borderColor: `${shift.color}40`,
                                    backgroundColor: `${shift.color}0D`,
                                  }}
                                  title={`${shift.roleLabel} (${shift.startTime}-${shift.endTime}) - ${t.dragToMove}`}
                                >
                                  {/* Shift Role Title */}
                                  <div className="font-semibold text-slate-900 text-[11px] truncate leading-tight">
                                    {shift.roleLabel}
                                  </div>

                                  {/* Time and Duration */}
                                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-600 font-mono">
                                    <span>
                                      {shift.startTime} - {shift.endTime}
                                    </span>
                                    <span className="font-bold text-slate-800">
                                      {hours}h
                                    </span>
                                  </div>

                                  {/* Kopilot Project Badge */}
                                  {project && (
                                    <div className="mt-1 pt-1 border-t border-slate-200/60 flex items-center gap-1 text-[9px] text-slate-600 font-medium truncate">
                                      <Briefcase className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                                      <span className="truncate">{project.code}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Quick Add Button on Hover when cell is empty */}
                          <button
                            onClick={() => onAddShift(emp.id, w.dateStr)}
                            className="w-full mt-1 py-1 rounded border border-dashed border-slate-300 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-[10px]"
                            title="Add shift for this day"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{language === 'nl' ? 'Dienst' : 'Shift'}</span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Quick Shift Templates Row */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">{t.quickTemplate}:</span>
          <span className="text-slate-500 hidden sm:inline">
            {language === 'nl'
              ? 'Klik op een leeg vak in het rooster of gebruik de knop Nieuwe dienst om direct in te plannen.'
              : 'Click any empty cell or the New Shift button to schedule.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-mono rounded border border-blue-200">
            {t.shiftMorning} (08:00 - 16:00)
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-mono rounded border border-emerald-200">
            {t.shiftDay} (09:00 - 17:00)
          </span>
          <span className="px-2.5 py-1 bg-purple-50 text-purple-800 font-mono rounded border border-purple-200">
            {t.shiftEvening} (12:00 - 20:00)
          </span>
        </div>
      </div>
    </div>
  );
};
