export type Language = 'en' | 'nl';

export type Department = 'All' | 'Engineering' | 'Operations' | 'Customer Care' | 'Logistics';

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: Department;
  contractHours: number;
  hourlyRate: number; // in EUR
  talentPulseId: string;
  phone: string;
  status: 'active' | 'on_leave' | 'part_time';
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  breakMinutes: number;
  department: Department;
  projectId?: string;
  projectTitle?: string;
  kopilotTaskId?: string;
  roleLabel: string;
  color: string;
  notes?: string;
}

export interface KopilotProject {
  id: string;
  title: string;
  client: string;
  code: string;
  budgetHours: number;
  color: string;
}

export interface ConnectedApp {
  id: 'talentpulse' | 'kopilot' | 'boekhoudgemak';
  name: string;
  category: string;
  status: 'connected' | 'syncing' | 'synced';
  lastSync: string;
  syncItemCount: number;
  descriptionEn: string;
  descriptionNl: string;
  appVersion: string;
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  appId: 'talentpulse' | 'kopilot' | 'boekhoudgemak';
  appName: string;
  action: string;
  details: string;
  type: 'success' | 'sync' | 'export';
}

export type ViewTab = 'roster' | 'integrations' | 'seo_social' | 'export_payroll';
