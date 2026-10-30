import {
  Patient,
  Medication,
  DoseRecord,
  Appointment,
  PrescriptionRef,
  AuthSession,
  AccessibilitySettings,
  VisualColor,
  VisualSymbol
} from '../types';

export const AVAILABLE_COLORS: VisualColor[] = [
  { id: 'azul', name: 'Azul Anil', hex: '#2563EB', bgClass: 'bg-blue-600', borderClass: 'border-blue-600', textClass: 'text-blue-700' },
  { id: 'amarelo', name: 'Amarelo', hex: '#F59E0B', bgClass: 'bg-amber-400', borderClass: 'border-amber-400', textClass: 'text-amber-800' },
  { id: 'verde', name: 'Verde Esmeralda', hex: '#10B981', bgClass: 'bg-emerald-600', borderClass: 'border-emerald-600', textClass: 'text-emerald-700' },
  { id: 'roxo', name: 'Faixa Roxa', hex: '#8B5CF6', bgClass: 'bg-purple-600', borderClass: 'border-purple-600', textClass: 'text-purple-700' },
  { id: 'ambar', name: 'Faixa Âmbar', hex: '#D97706', bgClass: 'bg-amber-600', borderClass: 'border-amber-600', textClass: 'text-amber-700' },
  { id: 'vermelho', name: 'Vermelho Rubi', hex: '#EF4444', bgClass: 'bg-red-500', borderClass: 'border-red-500', textClass: 'text-red-700' },
];

export const AVAILABLE_SYMBOLS: VisualSymbol[] = [
  { id: 'estrela', name: 'Estrela', symbol: '★', label: 'Estrela' },
  { id: 'sol', name: 'Sol', symbol: '☀', label: 'Sol' },
  { id: 'cruz', name: 'Cruz', symbol: '✚', label: 'Cruz' },
  { id: 'losango', name: 'Losango', symbol: '◆', label: 'Losango' },
  { id: 'circulo', name: 'Círculo', symbol: '●', label: 'Círculo' },
  { id: 'lua', name: 'Lua', symbol: '☾', label: 'Lua' },
];

// Clean mock imagery representations for boxes
export const SAMPLE_MEDICINE_IMAGES = {
  losartana: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
  omeprazol: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80',
  vitamina: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80',
  atorvastatina: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80',
};

const DEFAULT_PATIENT: Patient = {
  id: 'patient-maria',
  name: 'Maria',
  age: 79,
  accessCode: '656838', // Matches PDF reference
  consentGiven: true,
  relationship: 'Mãe',
  caregiverName: 'Cláudia (Sua Filha)',
  caregiverPhone: '(11) 98765-4321',
  doctorName: 'Dr. Fernando (Médico Geriatra)',
  doctorPhone: '(11) 3456-7890',
  clinicInfo: 'Consultório Dra. Saúde · Seg a Sex 08h-18h',
};

const DEFAULT_MEDICATIONS: Medication[] = [
  {
    id: 'med-omeprazol',
    patientId: 'patient-maria',
    name: 'Omeprazol 20mg',
    category: 'Rotina pessoal',
    visualColor: AVAILABLE_COLORS[2], // Verde Esmeralda
    visualSymbol: AVAILABLE_SYMBOLS[4], // Círculo
    packagePhotoUrl: SAMPLE_MEDICINE_IMAGES.omeprazol,
    prescribedDose: '20 mg',
    doseInstructions: '1 cápsula em jejum com água',
    usageNote: 'Em jejum',
    prescribedFrequency: '1 vez ao dia pela manhã',
    purposeDescription: 'Para proteger o seu estômago antes da primeira refeição.',
    scheduleTimes: ['07:00'],
    active: true,
    shift: 'manha',
  },
  {
    id: 'med-losartana',
    patientId: 'patient-maria',
    name: 'Losartana Potássica 50mg',
    category: 'Rotina pessoal',
    visualColor: AVAILABLE_COLORS[0], // Faixa Azul Anil
    visualSymbol: AVAILABLE_SYMBOLS[2], // Cruz
    packagePhotoUrl: SAMPLE_MEDICINE_IMAGES.losartana,
    prescribedDose: '50 mg',
    doseInstructions: '1 comprimido inteiro com água',
    usageNote: 'Uso contínuo após o café da manhã',
    prescribedFrequency: '1 vez ao dia às 10h',
    purposeDescription: 'Para o coração e manter a pressão arterial controlada.',
    scheduleTimes: ['10:00'],
    active: true,
    shift: 'manha',
  },
  {
    id: 'med-vitamina-d',
    patientId: 'patient-maria',
    name: 'Vitamina D3 2.000 UI',
    category: 'Outros cuidados',
    visualColor: AVAILABLE_COLORS[4], // Faixa Âmbar
    visualSymbol: AVAILABLE_SYMBOLS[3], // Losango
    packagePhotoUrl: SAMPLE_MEDICINE_IMAGES.vitamina,
    prescribedDose: '2.000 UI',
    doseInstructions: '1 cápsula logo após o almoço',
    usageNote: 'Após o almoço',
    prescribedFrequency: '1 vez ao dia no almoço',
    purposeDescription: 'Para fortalecer os ossos e aumentar a sua imunidade.',
    scheduleTimes: ['14:00'],
    active: true,
    shift: 'tarde',
  },
  {
    id: 'med-atorvastatina',
    patientId: 'patient-maria',
    name: 'Atorvastatina 20mg',
    category: 'Outros cuidados',
    visualColor: AVAILABLE_COLORS[3], // Faixa Roxa
    visualSymbol: AVAILABLE_SYMBOLS[0], // Estrela
    packagePhotoUrl: SAMPLE_MEDICINE_IMAGES.atorvastatina,
    prescribedDose: '20 mg',
    doseInstructions: '1 comprimido antes de dormir com água',
    usageNote: 'Após o jantar',
    prescribedFrequency: '1 vez ao dia à noite',
    purposeDescription: 'Para controlar o colesterol e proteger suas artérias.',
    scheduleTimes: ['20:00'],
    active: true,
    shift: 'noite',
  },
];

const DEFAULT_RECORDS: DoseRecord[] = [
  {
    id: 'rec-1',
    medicationId: 'med-omeprazol',
    patientId: 'patient-maria',
    medicationName: 'Omeprazol 20mg',
    scheduledTime: '07:00',
    scheduledDate: '2026-10-16',
    status: 'confirmed',
    confirmedAt: '07:05',
    confirmedDateLabel: 'Hoje às 07:05',
  },
  {
    id: 'rec-2',
    medicationId: 'med-losartana',
    patientId: 'patient-maria',
    medicationName: 'Losartana Potássica 50mg',
    scheduledTime: '10:00',
    scheduledDate: '2026-10-16',
    status: 'confirmed',
    confirmedAt: '08:05',
    confirmedDateLabel: 'Hoje às 08:05',
  },
  {
    id: 'rec-3',
    medicationId: 'med-vitamina-d',
    patientId: 'patient-maria',
    medicationName: 'Vitamina D3 2.000 UI',
    scheduledTime: '14:00',
    scheduledDate: '2026-10-16',
    status: 'pending',
  },
  {
    id: 'rec-4',
    medicationId: 'med-atorvastatina',
    patientId: 'patient-maria',
    medicationName: 'Atorvastatina 20mg',
    scheduledTime: '20:00',
    scheduledDate: '2026-10-16',
    status: 'pending',
  },
  // Yesterday's historical records
  {
    id: 'rec-y1',
    medicationId: 'med-atorvastatina',
    patientId: 'patient-maria',
    medicationName: 'Medicamento B (Atorvastatina)',
    scheduledTime: '14:00',
    scheduledDate: '2026-10-15',
    status: 'pending',
  },
  {
    id: 'rec-y2',
    medicationId: 'med-losartana',
    patientId: 'patient-maria',
    medicationName: 'Medicamento A (Losartana)',
    scheduledTime: '09:00',
    scheduledDate: '2026-10-15',
    status: 'pending',
  },
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'patient-maria',
    title: 'Visita a Dona Maria',
    day: 20,
    month: 'OUT',
    dateFormatted: 'Terça-feira · 14:00',
    fullDate: '2026-10-20',
    location: 'Clínica Exemplo · sala a confirmar',
  },
  {
    id: 'app-2',
    patientId: 'patient-maria',
    title: 'Exames do seu João',
    day: 28,
    month: 'OUT',
    dateFormatted: 'Quarta-feira · 09:00',
    fullDate: '2026-10-28',
    location: 'Clínica Exemplo · sala a confirmar',
  },
];

const DEFAULT_PRESCRIPTIONS: PrescriptionRef[] = [
  {
    id: 'presc-1',
    patientId: 'patient-maria',
    medicationId: 'med-losartana',
    medicationName: 'Medicamento A (Losartana Potássica)',
    title: 'Referência A',
    doctorName: 'Não informado',
    date: 'Não informado',
    notes: 'Consulte sua receita original. Esta referência serve apenas para organização.',
    hasDocument: false,
  },
  {
    id: 'presc-2',
    patientId: 'patient-maria',
    medicationId: 'med-atorvastatina',
    medicationName: 'Medicamento B',
    title: 'Referência B',
    doctorName: 'Dr. Fernando',
    date: '10/10/2026',
    notes: 'Ainda não há referência de receita vinculada.',
    hasDocument: false,
  },
];

class StorageService {
  private readonly KEYS = {
    SESSION: 'coram_auth_session',
    PATIENTS: 'coram_patients',
    ACTIVE_PATIENT: 'coram_active_patient_id',
    MEDICATIONS: 'coram_medications',
    RECORDS: 'coram_dose_records',
    APPOINTMENTS: 'coram_appointments',
    PRESCRIPTIONS: 'coram_prescriptions',
    ACCESSIBILITY: 'coram_accessibility',
  };

  constructor() {
    this.initDefaults();
  }

  private initDefaults(): void {
    if (!localStorage.getItem(this.KEYS.PATIENTS)) {
      localStorage.setItem(this.KEYS.PATIENTS, JSON.stringify([DEFAULT_PATIENT]));
    }
    if (!localStorage.getItem(this.KEYS.ACTIVE_PATIENT)) {
      localStorage.setItem(this.KEYS.ACTIVE_PATIENT, DEFAULT_PATIENT.id);
    }
    if (!localStorage.getItem(this.KEYS.MEDICATIONS)) {
      localStorage.setItem(this.KEYS.MEDICATIONS, JSON.stringify(DEFAULT_MEDICATIONS));
    }
    if (!localStorage.getItem(this.KEYS.RECORDS)) {
      localStorage.setItem(this.KEYS.RECORDS, JSON.stringify(DEFAULT_RECORDS));
    }
    if (!localStorage.getItem(this.KEYS.APPOINTMENTS)) {
      localStorage.setItem(this.KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
    }
    if (!localStorage.getItem(this.KEYS.PRESCRIPTIONS)) {
      localStorage.setItem(this.KEYS.PRESCRIPTIONS, JSON.stringify(DEFAULT_PRESCRIPTIONS));
    }
  }

  // Session
  public getSession(): AuthSession | null {
    const raw = localStorage.getItem(this.KEYS.SESSION);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public saveSession(session: AuthSession): void {
    localStorage.setItem(this.KEYS.SESSION, JSON.stringify(session));
  }

  public clearSession(): void {
    localStorage.removeItem(this.KEYS.SESSION);
  }

  // Patients
  public getPatients(): Patient[] {
    const raw = localStorage.getItem(this.KEYS.PATIENTS);
    return raw ? JSON.parse(raw) : [DEFAULT_PATIENT];
  }

  public getPatientByCode(code: string): Patient | null {
    const cleanCode = code.trim().replace(/\D/g, '');
    const patients = this.getPatients();
    return patients.find((p) => p.accessCode === cleanCode) || null;
  }

  public getActivePatient(): Patient {
    const id = localStorage.getItem(this.KEYS.ACTIVE_PATIENT);
    const patients = this.getPatients();
    return patients.find((p) => p.id === id) || patients[0] || DEFAULT_PATIENT;
  }

  public setActivePatientId(patientId: string): void {
    localStorage.setItem(this.KEYS.ACTIVE_PATIENT, patientId);
  }

  public savePatient(patient: Omit<Patient, 'id'> & { id?: string }): Patient {
    const patients = this.getPatients();
    const id = patient.id || `patient-${Date.now()}`;
    const fullPatient: Patient = {
      ...patient,
      id,
      caregiverName: patient.caregiverName || 'Responsável Cadastrado',
      consentGiven: patient.consentGiven !== undefined ? patient.consentGiven : true,
    };

    const existingIndex = patients.findIndex((p) => p.id === id);
    if (existingIndex >= 0) {
      patients[existingIndex] = fullPatient;
    } else {
      patients.push(fullPatient);
    }

    localStorage.setItem(this.KEYS.PATIENTS, JSON.stringify(patients));
    this.setActivePatientId(id);
    return fullPatient;
  }

  // Medications
  public getMedications(patientId?: string): Medication[] {
    const raw = localStorage.getItem(this.KEYS.MEDICATIONS);
    const all: Medication[] = raw ? JSON.parse(raw) : DEFAULT_MEDICATIONS;
    if (patientId) {
      return all.filter((m) => m.patientId === patientId);
    }
    return all;
  }

  public saveMedication(med: Omit<Medication, 'id'> & { id?: string }): Medication {
    const all = this.getMedications();
    const id = med.id || `med-${Date.now()}`;
    const fullMed: Medication = {
      ...med,
      id,
    };

    const index = all.findIndex((m) => m.id === id);
    if (index >= 0) {
      all[index] = fullMed;
    } else {
      all.push(fullMed);
    }

    localStorage.setItem(this.KEYS.MEDICATIONS, JSON.stringify(all));
    return fullMed;
  }

  public deleteMedication(id: string): void {
    const all = this.getMedications().filter((m) => m.id !== id);
    localStorage.setItem(this.KEYS.MEDICATIONS, JSON.stringify(all));
  }

  // Dose Confirmation Records
  public getRecords(patientId?: string): DoseRecord[] {
    const raw = localStorage.getItem(this.KEYS.RECORDS);
    const all: DoseRecord[] = raw ? JSON.parse(raw) : DEFAULT_RECORDS;
    if (patientId) {
      return all.filter((r) => r.patientId === patientId);
    }
    return all;
  }

  public confirmDose(medicationId: string, patientId: string): DoseRecord {
    const all = this.getRecords();
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const dateFormatted = now.toISOString().split('T')[0];

    // Find existing pending record for today or create new one
    let record = all.find(
      (r) => r.medicationId === medicationId && r.patientId === patientId && r.scheduledDate === dateFormatted
    );

    const med = this.getMedications().find((m) => m.id === medicationId);
    const medName = med ? med.name : 'Medicamento';

    if (record) {
      record.status = 'confirmed';
      record.confirmedAt = timeFormatted;
      record.confirmedDateLabel = `Hoje às ${timeFormatted}`;
    } else {
      record = {
        id: `rec-${Date.now()}`,
        medicationId,
        patientId,
        medicationName: medName,
        scheduledTime: timeFormatted,
        scheduledDate: dateFormatted,
        status: 'confirmed',
        confirmedAt: timeFormatted,
        confirmedDateLabel: `Hoje às ${timeFormatted}`,
      };
      all.unshift(record);
    }

    localStorage.setItem(this.KEYS.RECORDS, JSON.stringify(all));
    return record;
  }

  // Appointments
  public getAppointments(patientId?: string): Appointment[] {
    const raw = localStorage.getItem(this.KEYS.APPOINTMENTS);
    const all: Appointment[] = raw ? JSON.parse(raw) : DEFAULT_APPOINTMENTS;
    if (patientId) {
      return all.filter((a) => a.patientId === patientId);
    }
    return all;
  }

  public saveAppointment(app: Omit<Appointment, 'id'> & { id?: string }): Appointment {
    const all = this.getAppointments();
    const id = app.id || `app-${Date.now()}`;
    const fullApp: Appointment = { ...app, id };
    all.push(fullApp);
    localStorage.setItem(this.KEYS.APPOINTMENTS, JSON.stringify(all));
    return fullApp;
  }

  // Prescriptions
  public getPrescriptions(patientId?: string): PrescriptionRef[] {
    const raw = localStorage.getItem(this.KEYS.PRESCRIPTIONS);
    const all: PrescriptionRef[] = raw ? JSON.parse(raw) : DEFAULT_PRESCRIPTIONS;
    if (patientId) {
      return all.filter((p) => p.patientId === patientId);
    }
    return all;
  }

  // Accessibility
  public getAccessibility(): AccessibilitySettings {
    const raw = localStorage.getItem(this.KEYS.ACCESSIBILITY);
    if (!raw) {
      return { textSize: 'grande', highContrast: false, showExplanations: true };
    }
    try {
      return JSON.parse(raw);
    } catch {
      return { textSize: 'grande', highContrast: false, showExplanations: true };
    }
  }

  public saveAccessibility(settings: AccessibilitySettings): void {
    localStorage.setItem(this.KEYS.ACCESSIBILITY, JSON.stringify(settings));
  }
}

export const storageService = new StorageService();
