import { DoseRecord, Medication } from '../types';

/**
 * Validates a 6-digit patient access code
 */
export function validateAccessCode(code: string): boolean {
  if (!code) return false;
  const clean = code.trim().replace(/\D/g, '');
  return clean.length === 6;
}

/**
 * Generates a random 6-digit access code
 */
export function generateAccessCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Classifies a time string (e.g. "08:00", "14:00") into a daily shift
 */
export function classifyShift(timeStr: string): 'manha' | 'tarde' | 'noite' {
  if (!timeStr) return 'manha';
  const hour = parseInt(timeStr.split(':')[0], 10);
  if (isNaN(hour)) return 'manha';
  if (hour >= 5 && hour < 12) return 'manha';
  if (hour >= 12 && hour < 18) return 'tarde';
  return 'noite';
}

/**
 * Filters medications by day shift
 */
export function filterMedicationsByShift(
  medications: Medication[],
  shift: 'todos' | 'manha' | 'tarde' | 'noite'
): Medication[] {
  if (shift === 'todos') return medications;
  return medications.filter((m) => {
    // If explicit shift is set, use it; otherwise compute from primary scheduleTime
    if (m.shift === shift) return true;
    if (m.scheduleTimes && m.scheduleTimes.length > 0) {
      return classifyShift(m.scheduleTimes[0]) === shift;
    }
    return false;
  });
}

/**
 * Computes adherence rate (percentage of confirmed doses)
 */
export function calculateAdherencePercentage(records: DoseRecord[]): number {
  if (!records || records.length === 0) return 0;
  const confirmed = records.filter((r) => r.status === 'confirmed').length;
  return Math.round((confirmed / records.length) * 100);
}

/**
 * Finds the upcoming medication from the list
 */
export function findNextMedication(
  medications: Medication[],
  currentTimeStr: string = '09:40'
): Medication | null {
  if (!medications || medications.length === 0) return null;

  const currentMinutes = timeToMinutes(currentTimeStr);

  // Look for first active med with a schedule time >= current time
  const activeMeds = medications.filter((m) => m.active);
  let bestMed: Medication | null = null;
  let bestDiff = Infinity;

  for (const med of activeMeds) {
    for (const time of med.scheduleTimes) {
      const minutes = timeToMinutes(time);
      const diff = minutes - currentMinutes;
      if (diff >= 0 && diff < bestDiff) {
        bestDiff = diff;
        bestMed = med;
      }
    }
  }

  // If no future time today, wrap around to first active medication
  return bestMed || activeMeds[0] || null;
}

export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map((v) => parseInt(v, 10) || 0);
  return h * 60 + m;
}

export function minutesDiff(time1: string, time2: string): number {
  return Math.abs(timeToMinutes(time1) - timeToMinutes(time2));
}
