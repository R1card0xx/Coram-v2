export type UserRole = 'idoso' | 'responsavel' | 'profissional';

export interface VisualColor {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export interface VisualSymbol {
  id: string;
  name: string;
  symbol: string;
  label: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  category: 'Rotina pessoal' | 'Outros cuidados';
  visualColor: VisualColor;
  visualSymbol: VisualSymbol;
  packagePhotoUrl: string;
  prescribedDose: string; // e.g. "50 mg", "20 mg", "1 cápsula"
  doseInstructions: string; // e.g. "Tomar 1 comprimido com água", "1 cápsula em jejum"
  usageNote?: string; // e.g. "Após o café da manhã", "Antes da primeira refeição"
  prescribedFrequency: string; // e.g. "Conforme sua receita" ou "1 vez ao dia"
  prescriptionNotes?: string;
  purposeDescription?: string; // "Para que serve" e.g. "Para o coração e manter a pressão arterial controlada."
  scheduleTimes: string[]; // ['08:00', '14:00']
  active: boolean;
  shift: 'manha' | 'tarde' | 'noite';
}

export interface DoseRecord {
  id: string;
  medicationId: string;
  patientId: string;
  medicationName: string;
  scheduledTime: string;
  scheduledDate: string; // YYYY-MM-DD
  status: 'confirmed' | 'pending';
  confirmedAt?: string; // e.g. "08:05" ou ISO
  confirmedDateLabel?: string; // e.g. "Hoje às 08:05"
}

export interface Patient {
  id: string;
  name: string;
  age?: number;
  accessCode: string; // 6-digit code, e.g. "656838"
  consentGiven: boolean;
  relationship?: string;
  caregiverName: string; // e.g. "Cláudia (Sua Filha)"
  caregiverPhone?: string;
  doctorName?: string; // e.g. "Dr. Fernando (Médico Geriatra)"
  doctorPhone?: string;
  clinicInfo?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  title: string;
  day: number;
  month: string; // "OUT"
  dateFormatted: string; // "Terça-feira · 14:00"
  fullDate: string; // "2026-10-20"
  location: string;
  roomInfo?: string;
}

export interface PrescriptionRef {
  id: string;
  patientId: string;
  medicationId?: string;
  medicationName?: string;
  title: string; // "Referência A"
  doctorName?: string;
  date?: string;
  notes?: string;
  hasDocument: boolean;
}

export interface AuthSession {
  role: 'idoso' | 'responsavel';
  patientId?: string;
  patientName?: string;
  userName?: string;
  userEmail?: string;
  isProfessional?: boolean;
}

export interface AccessibilitySettings {
  textSize: 'padrao' | 'grande' | 'muito-grande';
  highContrast: boolean;
  showExplanations: boolean;
}
