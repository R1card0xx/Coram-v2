import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAccessCode,
  generateAccessCode,
  classifyShift,
  calculateAdherencePercentage,
  filterMedicationsByShift,
  findNextMedication
} from './rules';
import { Medication, DoseRecord } from '../types';

test('validateAccessCode verifies 6-digit codes correctly', () => {
  assert.equal(validateAccessCode('656838'), true);
  assert.equal(validateAccessCode('123456'), true);
  assert.equal(validateAccessCode(' 656838 '), true);
  assert.equal(validateAccessCode('12345'), false); // 5 digits
  assert.equal(validateAccessCode('1234567'), false); // 7 digits
  assert.equal(validateAccessCode(''), false);
  assert.equal(validateAccessCode('abc123'), false);
});

test('generateAccessCode produces a valid 6-digit string', () => {
  const code = generateAccessCode();
  assert.equal(code.length, 6);
  assert.equal(/^\d{6}$/.test(code), true);
  assert.equal(validateAccessCode(code), true);
});

test('classifyShift accurately handles hours across the day', () => {
  assert.equal(classifyShift('07:00'), 'manha');
  assert.equal(classifyShift('10:00'), 'manha');
  assert.equal(classifyShift('11:59'), 'manha');
  assert.equal(classifyShift('12:00'), 'tarde');
  assert.equal(classifyShift('14:30'), 'tarde');
  assert.equal(classifyShift('17:59'), 'tarde');
  assert.equal(classifyShift('18:00'), 'noite');
  assert.equal(classifyShift('20:00'), 'noite');
  assert.equal(classifyShift('23:00'), 'noite');
});

test('calculateAdherencePercentage calculates ratio of confirmed records', () => {
  const records: DoseRecord[] = [
    { id: '1', medicationId: 'm1', patientId: 'p1', medicationName: 'Med A', scheduledTime: '08:00', scheduledDate: '2026-10-16', status: 'confirmed' },
    { id: '2', medicationId: 'm2', patientId: 'p1', medicationName: 'Med B', scheduledTime: '10:00', scheduledDate: '2026-10-16', status: 'confirmed' },
    { id: '3', medicationId: 'm3', patientId: 'p1', medicationName: 'Med C', scheduledTime: '14:00', scheduledDate: '2026-10-16', status: 'pending' },
    { id: '4', medicationId: 'm4', patientId: 'p1', medicationName: 'Med D', scheduledTime: '20:00', scheduledDate: '2026-10-16', status: 'pending' },
  ];
  assert.equal(calculateAdherencePercentage(records), 50); // 2 out of 4 = 50%

  const allConfirmed: DoseRecord[] = [
    { id: '1', medicationId: 'm1', patientId: 'p1', medicationName: 'Med A', scheduledTime: '08:00', scheduledDate: '2026-10-16', status: 'confirmed' },
    { id: '2', medicationId: 'm2', patientId: 'p1', medicationName: 'Med B', scheduledTime: '10:00', scheduledDate: '2026-10-16', status: 'confirmed' },
  ];
  assert.equal(calculateAdherencePercentage(allConfirmed), 100);
});

test('findNextMedication identifies the closest upcoming medication', () => {
  const dummyColor = { id: 'blue', name: 'Azul', hex: '#2563EB', bgClass: 'bg-blue-500', borderClass: 'border-blue-500', textClass: 'text-blue-600' };
  const dummySymbol = { id: 'star', name: 'Estrela', symbol: '★', label: 'Estrela' };

  const meds: Medication[] = [
    {
      id: 'm1',
      patientId: 'p1',
      name: 'Omeprazol',
      category: 'Rotina pessoal',
      visualColor: dummyColor,
      visualSymbol: dummySymbol,
      packagePhotoUrl: '',
      prescribedDose: '20mg',
      doseInstructions: '1 cápsula',
      prescribedFrequency: '1x dia',
      scheduleTimes: ['07:00'],
      active: true,
      shift: 'manha'
    },
    {
      id: 'm2',
      patientId: 'p1',
      name: 'Losartana',
      category: 'Rotina pessoal',
      visualColor: dummyColor,
      visualSymbol: dummySymbol,
      packagePhotoUrl: '',
      prescribedDose: '50mg',
      doseInstructions: '1 comprimido',
      prescribedFrequency: '1x dia',
      scheduleTimes: ['10:00'],
      active: true,
      shift: 'manha'
    },
    {
      id: 'm3',
      patientId: 'p1',
      name: 'Vitamina D3',
      category: 'Outros cuidados',
      visualColor: dummyColor,
      visualSymbol: dummySymbol,
      packagePhotoUrl: '',
      prescribedDose: '2000 UI',
      doseInstructions: '1 cápsula',
      prescribedFrequency: '1x dia',
      scheduleTimes: ['14:00'],
      active: true,
      shift: 'tarde'
    }
  ];

  // At 09:40, next med should be Losartana at 10:00
  const next = findNextMedication(meds, '09:40');
  assert.equal(next?.name, 'Losartana');

  // At 11:00, next med should be Vitamina D3 at 14:00
  const nextLater = findNextMedication(meds, '11:00');
  assert.equal(nextLater?.name, 'Vitamina D3');
});
