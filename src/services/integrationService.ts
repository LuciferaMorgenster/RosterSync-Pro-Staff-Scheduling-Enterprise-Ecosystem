import { ConnectedApp, Employee, KopilotProject, Shift, SyncLogEntry } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Lead System Architect',
    department: 'Engineering',
    contractHours: 40,
    hourlyRate: 58.50,
    talentPulseId: 'TP-EMP-8492',
    phone: '+31 6 1234 5678',
    status: 'active'
  },
  {
    id: 'emp-2',
    name: 'Daan van Dijk',
    email: 'daan.vd@company.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Fullstack Engineer',
    department: 'Engineering',
    contractHours: 36,
    hourlyRate: 52.00,
    talentPulseId: 'TP-EMP-8493',
    phone: '+31 6 2345 6789',
    status: 'active'
  },
  {
    id: 'emp-3',
    name: 'Elena Jansen',
    email: 'elena.j@company.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Operations & Dispatch Manager',
    department: 'Operations',
    contractHours: 40,
    hourlyRate: 46.00,
    talentPulseId: 'TP-EMP-8501',
    phone: '+31 6 3456 7890',
    status: 'active'
  },
  {
    id: 'emp-4',
    name: 'Liam de Vries',
    email: 'liam.dv@company.org',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Customer Success Specialist',
    department: 'Customer Care',
    contractHours: 32,
    hourlyRate: 34.50,
    talentPulseId: 'TP-EMP-8514',
    phone: '+31 6 4567 8901',
    status: 'active'
  },
  {
    id: 'emp-5',
    name: 'Anouk Bakker',
    email: 'anouk.b@company.org',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Logistics & Supply Coordinator',
    department: 'Logistics',
    contractHours: 40,
    hourlyRate: 38.00,
    talentPulseId: 'TP-EMP-8520',
    phone: '+31 6 5678 9012',
    status: 'active'
  },
  {
    id: 'emp-6',
    name: 'Kevin Smit',
    email: 'kevin.smit@company.org',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Technical Support Lead',
    department: 'Customer Care',
    contractHours: 36,
    hourlyRate: 36.00,
    talentPulseId: 'TP-EMP-8531',
    phone: '+31 6 6789 0123',
    status: 'active'
  }
];

export const INITIAL_PROJECTS: KopilotProject[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Portal v3 Redesign',
    client: 'Acme Holding NV',
    code: 'KOP-101',
    budgetHours: 240,
    color: '#3B82F6' // Blue
  },
  {
    id: 'proj-2',
    title: 'Automated Logistics & Warehouse API',
    client: 'Port Logistic Services',
    code: 'KOP-102',
    budgetHours: 180,
    color: '#10B981' // Emerald
  },
  {
    id: 'proj-3',
    title: 'Customer Care Escalation Queue',
    client: 'Global Retail BV',
    code: 'KOP-103',
    budgetHours: 120,
    color: '#8B5CF6' // Purple
  },
  {
    id: 'proj-4',
    title: 'Infrastructure Resilience & Audit',
    client: 'Internal Operations',
    code: 'KOP-104',
    budgetHours: 90,
    color: '#F59E0B' // Amber
  }
];

export const INITIAL_CONNECTED_APPS: ConnectedApp[] = [
  {
    id: 'talentpulse',
    name: 'TalentPulse-HRIS',
    category: 'Human Resources & Contracts',
    status: 'connected',
    lastSync: 'Today at 08:30',
    syncItemCount: 12,
    descriptionEn: 'Live synchronization with TalentPulse employee directory, leave balances, and contracted working hours.',
    descriptionNl: 'Live koppeling met het personeelsregister van TalentPulse, inclusief verlofsaldi en contractuele werkuren.',
    appVersion: 'v2.8.4'
  },
  {
    id: 'kopilot',
    name: 'Kopilot-Projects',
    category: 'Projects & Milestone Planning',
    status: 'connected',
    lastSync: 'Today at 08:35',
    syncItemCount: 4,
    descriptionEn: 'Direct allocation of scheduled shift hours to Kopilot client deliverables, tasks, and budget codes.',
    descriptionNl: 'Directe toewijzing van ingeplande diensturen aan Kopilot projecttaken, opleveringen en urenbudgetten.',
    appVersion: 'v3.1.0'
  },
  {
    id: 'boekhoudgemak',
    name: 'BoekhoudGemak',
    category: 'Accounting & Payroll Management',
    status: 'connected',
    lastSync: 'Today at 08:40',
    syncItemCount: 42,
    descriptionEn: 'Calculates base hours and overtime wage premiums, exporting verified timesheets directly to BoekhoudGemak.',
    descriptionNl: 'Berekent basisuren en overurentoeslagen en exporteert gecontroleerde urenstaten direct naar BoekhoudGemak.',
    appVersion: 'v4.0.2'
  }
];

// Helper to get dates for current week (Monday to Sunday)
export function getWeekDates(baseDate: Date = new Date()): { dayName: string; dateStr: string; fullDate: Date }[] {
  const current = new Date(baseDate);
  // Get Monday of current week
  const day = current.getDay();
  const diff = current.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(current.setDate(diff));

  const week = [];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    const dateStr = nextDate.toISOString().split('T')[0];
    week.push({
      dayName: dayKeys[i],
      dateStr,
      fullDate: nextDate
    });
  }
  return week;
}

// Generate realistic initial shifts for the week
export function generateInitialShifts(employees: Employee[], weekDates: { dateStr: string }[]): Shift[] {
  const shifts: Shift[] = [];
  
  if (weekDates.length < 5) return shifts;

  // Sarah Jenkins (Mon, Tue, Wed, Thu, Fri 09:00 - 17:00, 8h each = 40h)
  for (let i = 0; i < 5; i++) {
    shifts.push({
      id: `shift-sarah-${i}`,
      employeeId: 'emp-1',
      date: weekDates[i].dateStr,
      startTime: '09:00',
      endTime: '17:00',
      breakMinutes: 30,
      department: 'Engineering',
      projectId: 'proj-1',
      projectTitle: 'Enterprise Portal v3 Redesign',
      kopilotTaskId: 'KOP-101',
      roleLabel: 'Architecture & Review',
      color: '#3B82F6'
    });
  }

  // Daan van Dijk (Mon, Tue, Wed, Thu 08:30 - 17:00 = 32h)
  for (let i = 0; i < 4; i++) {
    shifts.push({
      id: `shift-daan-${i}`,
      employeeId: 'emp-2',
      date: weekDates[i].dateStr,
      startTime: '08:30',
      endTime: '17:00',
      breakMinutes: 30,
      department: 'Engineering',
      projectId: 'proj-1',
      projectTitle: 'Enterprise Portal v3 Redesign',
      kopilotTaskId: 'KOP-101',
      roleLabel: 'Frontend Implementation',
      color: '#3B82F6'
    });
  }

  // Elena Jansen (Mon, Tue, Wed, Thu, Fri 08:00 - 16:30 = 40h)
  for (let i = 0; i < 5; i++) {
    shifts.push({
      id: `shift-elena-${i}`,
      employeeId: 'emp-3',
      date: weekDates[i].dateStr,
      startTime: '08:00',
      endTime: '16:30',
      breakMinutes: 30,
      department: 'Operations',
      projectId: 'proj-4',
      projectTitle: 'Infrastructure Resilience & Audit',
      kopilotTaskId: 'KOP-104',
      roleLabel: 'Operations Dispatch',
      color: '#F59E0B'
    });
  }

  // Liam de Vries (Tue, Wed, Thu, Fri 10:00 - 18:00 = 30h)
  for (let i = 1; i < 5; i++) {
    shifts.push({
      id: `shift-liam-${i}`,
      employeeId: 'emp-4',
      date: weekDates[i].dateStr,
      startTime: '10:00',
      endTime: '18:00',
      breakMinutes: 45,
      department: 'Customer Care',
      projectId: 'proj-3',
      projectTitle: 'Customer Care Escalation Queue',
      kopilotTaskId: 'KOP-103',
      roleLabel: 'Priority Support Desk',
      color: '#8B5CF6'
    });
  }

  // Anouk Bakker (Mon, Wed, Fri 07:30 - 16:00, Sat 08:00 - 14:00 = 30h)
  [0, 2, 4].forEach(i => {
    shifts.push({
      id: `shift-anouk-${i}`,
      employeeId: 'emp-5',
      date: weekDates[i].dateStr,
      startTime: '07:30',
      endTime: '16:00',
      breakMinutes: 30,
      department: 'Logistics',
      projectId: 'proj-2',
      projectTitle: 'Automated Logistics & Warehouse API',
      kopilotTaskId: 'KOP-102',
      roleLabel: 'Warehouse Distribution',
      color: '#10B981'
    });
  });

  // Kevin Smit (Mon, Tue, Wed, Fri 11:00 - 19:30 = 32h)
  [0, 1, 2, 4].forEach(i => {
    shifts.push({
      id: `shift-kevin-${i}`,
      employeeId: 'emp-6',
      date: weekDates[i].dateStr,
      startTime: '11:00',
      endTime: '19:30',
      breakMinutes: 30,
      department: 'Customer Care',
      projectId: 'proj-3',
      projectTitle: 'Customer Care Escalation Queue',
      kopilotTaskId: 'KOP-103',
      roleLabel: 'Tier-2 Technical Escalations',
      color: '#8B5CF6'
    });
  });

  return shifts;
}

// Compute hours between two times
export function calculateShiftHours(startTime: string, endTime: string, breakMinutes: number = 0): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  
  const startTotal = startH * 60 + startM;
  let endTotal = endH * 60 + endM;
  
  if (endTotal < startTotal) {
    // Overnight shift
    endTotal += 24 * 60;
  }
  
  const netMinutes = Math.max(0, endTotal - startTotal - breakMinutes);
  return Number((netMinutes / 60).toFixed(1));
}

// Initial Sync Logs
export const INITIAL_SYNC_LOGS: SyncLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '08:40:12',
    appId: 'boekhoudgemak',
    appName: 'BoekhoudGemak',
    action: 'Verified Timesheets Sync',
    details: 'Received current payroll ledger parameters. Overtime surcharge rate confirmed at 150%.',
    type: 'success'
  },
  {
    id: 'log-2',
    timestamp: '08:35:45',
    appId: 'kopilot',
    appName: 'Kopilot-Projects',
    action: 'Active Projects Refreshed',
    details: 'Synced 4 billable project budget codes (KOP-101, KOP-102, KOP-103, KOP-104).',
    type: 'sync'
  },
  {
    id: 'log-3',
    timestamp: '08:30:19',
    appId: 'talentpulse',
    appName: 'TalentPulse-HRIS',
    action: 'Employee Contracts Imported',
    details: 'Imported 12 full-time and part-time employee records with verified contract limits.',
    type: 'success'
  }
];
