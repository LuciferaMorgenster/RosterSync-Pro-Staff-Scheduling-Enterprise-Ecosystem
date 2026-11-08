import React from 'react';
import { FileSpreadsheet, Download, CheckCircle2, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { Employee, Language, Shift } from '../types';
import { translations } from '../i18n/translations';
import { calculateShiftHours } from '../services/integrationService';

interface PayrollViewProps {
  employees: Employee[];
  shifts: Shift[];
  language: Language;
}

export const PayrollView: React.FC<PayrollViewProps> = ({
  employees,
  shifts,
  language,
}) => {
  const t = translations[language];

  // Calculate detailed payroll records for each employee
  const payrollRecords = employees.map((emp) => {
    const empShifts = shifts.filter((s) => s.employeeId === emp.id);
    const totalScheduled = empShifts.reduce(
      (sum, s) => sum + calculateShiftHours(s.startTime, s.endTime, s.breakMinutes),
      0
    );

    const regularHours = Math.min(totalScheduled, emp.contractHours);
    const overtimeHours = Math.max(0, totalScheduled - emp.contractHours);
    const overtimeRate = emp.hourlyRate * 1.5;

    const regularPay = regularHours * emp.hourlyRate;
    const overtimePay = overtimeHours * overtimeRate;
    const grossTotal = regularPay + overtimePay;

    return {
      emp,
      totalScheduled: Number(totalScheduled.toFixed(1)),
      regularHours: Number(regularHours.toFixed(1)),
      overtimeHours: Number(overtimeHours.toFixed(1)),
      regularPay,
      overtimePay,
      grossTotal,
    };
  });

  const grandTotalHours = payrollRecords.reduce((sum, r) => sum + r.totalScheduled, 0);
  const grandTotalOvertime = payrollRecords.reduce((sum, r) => sum + r.overtimeHours, 0);
  const grandTotalGross = payrollRecords.reduce((sum, r) => sum + r.grossTotal, 0);

  // CSV download function
  const handleDownloadCsv = () => {
    const headers = [
      'TalentPulse_ID',
      'Employee_Name',
      'Department',
      'Contract_Hours',
      'Scheduled_Hours',
      'Regular_Hours',
      'Overtime_Hours',
      'Base_Hourly_Rate_EUR',
      'Overtime_Rate_EUR',
      'Gross_Total_EUR'
    ];

    const rows = payrollRecords.map((r) => [
      r.emp.talentPulseId,
      `"${r.emp.name}"`,
      r.emp.department,
      r.emp.contractHours,
      r.totalScheduled,
      r.regularHours,
      r.overtimeHours,
      r.emp.hourlyRate.toFixed(2),
      (r.emp.hourlyRate * 1.5).toFixed(2),
      r.grossTotal.toFixed(2)
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BoekhoudGemak_Payroll_Export_2026_W44.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON download function
  const handleDownloadJson = () => {
    const payload = {
      sourceApp: 'RosterSync Pro',
      targetApp: 'BoekhoudGemak',
      batchType: 'WEEKLY_PAYROLL_TIMESHEET',
      exportTimestamp: new Date().toISOString(),
      period: '2026-W44',
      currency: 'EUR',
      summary: {
        totalEmployees: employees.length,
        totalScheduledHours: Number(grandTotalHours.toFixed(1)),
        totalOvertimeHours: Number(grandTotalOvertime.toFixed(1)),
        totalGrossWageEur: Number(grandTotalGross.toFixed(2))
      },
      lineItems: payrollRecords.map((r) => ({
        talentPulseEmployeeId: r.emp.talentPulseId,
        employeeName: r.emp.name,
        department: r.emp.department,
        contractWeeklyHours: r.emp.contractHours,
        actualScheduledHours: r.totalScheduled,
        regularHours: r.regularHours,
        overtimeHours: r.overtimeHours,
        hourlyRate: r.emp.hourlyRate,
        overtimeRate: Number((r.emp.hourlyRate * 1.5).toFixed(2)),
        grossWageEur: Number(r.grossTotal.toFixed(2))
      }))
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BoekhoudGemak_Payroll_Payload_2026_W44.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display font-bold text-slate-900 text-lg">
              {t.payrollTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            {t.payrollSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-slate-700" />
            <span>{t.downloadPayrollCsv}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadPayrollJson}</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{language === 'nl' ? 'Totale Roosteruren' : 'Total Scheduled Hours'}</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-display font-bold text-2xl text-slate-900 font-mono tabular-nums">
            {grandTotalHours.toFixed(1)} <span className="text-sm font-normal text-slate-500">hrs</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{language === 'nl' ? 'Overuren (+50% toeslag)' : 'Overtime Hours (+50%)'}</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-display font-bold text-2xl text-amber-600 font-mono tabular-nums">
            {grandTotalOvertime.toFixed(1)} <span className="text-sm font-normal text-slate-500">hrs</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{language === 'nl' ? 'Bruto Loonkosten Totaal' : 'Total Gross Payroll'}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-bold text-2xl text-emerald-700 font-mono tabular-nums">
            €{grandTotalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Detailed Payroll Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">{t.staffMember}</th>
                <th className="py-3 px-3 font-semibold">{t.filterDepartment}</th>
                <th className="py-3 px-3 font-semibold text-right">{t.contractHoursHeader}</th>
                <th className="py-3 px-3 font-semibold text-right">{t.actualHoursHeader}</th>
                <th className="py-3 px-3 font-semibold text-right">{t.baseWage}</th>
                <th className="py-3 px-3 font-semibold text-right">{t.overtimeHours}</th>
                <th className="py-3 px-4 font-semibold text-right">{t.totalGross}</th>
                <th className="py-3 px-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {payrollRecords.map((r) => {
                const isOvertime = r.overtimeHours > 0;

                return (
                  <tr key={r.emp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={r.emp.avatar}
                          alt={r.emp.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div>{r.emp.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            {r.emp.talentPulseId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-600">
                      {r.emp.department}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-600 tabular-nums">
                      {r.emp.contractHours}h
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 tabular-nums">
                      {r.totalScheduled}h
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700 tabular-nums">
                      €{r.emp.hourlyRate.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      <span className={isOvertime ? 'text-amber-600 font-bold' : 'text-slate-400'}>
                        {r.overtimeHours > 0 ? `+${r.overtimeHours}h` : '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 tabular-nums">
                      €{r.grossTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{language === 'nl' ? 'Akkoord' : 'Verified'}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Grand Total Footer */}
            <tfoot>
              <tr className="bg-slate-50/80 border-t-2 border-slate-300 font-bold text-slate-900 font-mono">
                <td colSpan={2} className="py-3.5 px-4 font-sans">
                  {language === 'nl' ? 'Totaal BoekhoudGemak Batch' : 'Total BoekhoudGemak Batch'}
                </td>
                <td className="py-3.5 px-3 text-right text-slate-600">
                  {employees.reduce((s, e) => s + e.contractHours, 0)}h
                </td>
                <td className="py-3.5 px-3 text-right text-blue-700">
                  {grandTotalHours.toFixed(1)}h
                </td>
                <td className="py-3.5 px-3 text-right text-slate-400">—</td>
                <td className="py-3.5 px-3 text-right text-amber-600">
                  +{grandTotalOvertime.toFixed(1)}h
                </td>
                <td className="py-3.5 px-4 text-right text-emerald-700 text-sm">
                  €{grandTotalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="text-[10px] text-slate-500 font-sans">SEPA Ready</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
