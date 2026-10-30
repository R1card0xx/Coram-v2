/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/common/SplashScreen';
import { WelcomeView } from './components/auth/WelcomeView';
import { IdosoLoginView } from './components/auth/IdosoLoginView';
import { ResponsavelLoginView } from './components/auth/ResponsavelLoginView';
import { ResponsavelRegisterView } from './components/auth/ResponsavelRegisterView';

// Idoso views
import { IdosoHeader } from './components/idoso/IdosoHeader';
import { IdosoBottomNav, IdosoTab } from './components/idoso/IdosoBottomNav';
import { IdosoHomeView } from './components/idoso/IdosoHomeView';
import { IdosoRemediosView } from './components/idoso/IdosoRemediosView';
import { IdosoRotinaView } from './components/idoso/IdosoRotinaView';
import { IdosoCuidadorView } from './components/idoso/IdosoCuidadorView';
import { IdosoConfirmModal } from './components/idoso/IdosoConfirmModal';
import { IdosoSuccessModal } from './components/idoso/IdosoSuccessModal';
import { IdosoAccessibilityModal } from './components/idoso/IdosoAccessibilityModal';
import { IdosoSOSModal } from './components/idoso/IdosoSOSModal';

// Responsável views
import { ResponsavelHeader } from './components/responsavel/ResponsavelHeader';
import { ResponsavelBottomNav, ResponsavelTab } from './components/responsavel/ResponsavelBottomNav';
import { ResponsavelDashboardView } from './components/responsavel/ResponsavelDashboardView';
import { ResponsavelPacientesView } from './components/responsavel/ResponsavelPacientesView';
import { ResponsavelMedicamentosView } from './components/responsavel/ResponsavelMedicamentosView';
import { ResponsavelMedicamentoDetalhe } from './components/responsavel/ResponsavelMedicamentoDetalhe';
import { ResponsavelMedicamentoForm } from './components/responsavel/ResponsavelMedicamentoForm';
import { ResponsavelFrequenciaHorarios } from './components/responsavel/ResponsavelFrequenciaHorarios';
import { ResponsavelAlarmesView } from './components/responsavel/ResponsavelAlarmesView';
import { ResponsavelReceituarioView } from './components/responsavel/ResponsavelReceituarioView';
import { ResponsavelAgendaView } from './components/responsavel/ResponsavelAgendaView';
import { ResponsavelHistoricoView } from './components/responsavel/ResponsavelHistoricoView';
import { ResponsavelPerfilView } from './components/responsavel/ResponsavelPerfilView';

import { storageService } from './services/storage';
import {
  AuthSession,
  Patient,
  Medication,
  DoseRecord,
  Appointment,
  PrescriptionRef,
  AccessibilitySettings,
} from './types';

type AuthStep =
  | 'splash'
  | 'welcome'
  | 'idoso-login'
  | 'responsavel-login'
  | 'responsavel-register'
  | 'authenticated';

type ResponsavelSubView =
  | 'dashboard'
  | 'pacientes'
  | 'medicamentos'
  | 'medicamento-detalhe'
  | 'medicamento-form'
  | 'frequencia-horarios'
  | 'alarmes'
  | 'receituario'
  | 'agenda'
  | 'historico'
  | 'perfil';

export default function App() {
  // Check for test autostart query param
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isAutoStart = urlParams?.get('autostart') === '1';

  const [authStep, setAuthStep] = useState<AuthStep>(isAutoStart ? 'welcome' : 'splash');
  const [session, setSession] = useState<AuthSession | null>(() => storageService.getSession());

  // Data states
  const [patients, setPatients] = useState<Patient[]>(() => storageService.getPatients());
  const [activePatient, setActivePatient] = useState<Patient>(() => storageService.getActivePatient());
  const [medications, setMedications] = useState<Medication[]>(() =>
    storageService.getMedications(activePatient.id)
  );
  const [records, setRecords] = useState<DoseRecord[]>(() => storageService.getRecords(activePatient.id));
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    storageService.getAppointments(activePatient.id)
  );
  const [prescriptions, setPrescriptions] = useState<PrescriptionRef[]>(() =>
    storageService.getPrescriptions(activePatient.id)
  );
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() =>
    storageService.getAccessibility()
  );

  // Idoso navigation & modal states
  const [idosoTab, setIdosoTab] = useState<IdosoTab>('inicio');
  const [confirmingMed, setConfirmingMed] = useState<Medication | null>(null);
  const [confirmedRecord, setConfirmedRecord] = useState<DoseRecord | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Responsável navigation & modal states
  const [responsavelTab, setResponsavelTab] = useState<ResponsavelTab>('inicio');
  const [responsavelView, setResponsavelView] = useState<ResponsavelSubView>('dashboard');
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  // Handle Splash Screen completion
  const handleSplashComplete = () => {
    const saved = storageService.getSession();
    if (saved) {
      setSession(saved);
      if (saved.patientId) {
        const p = patients.find((pat) => pat.id === saved.patientId) || activePatient;
        setActivePatient(p);
      }
      setAuthStep('authenticated');
    } else {
      setAuthStep('welcome');
    }
  };

  // Synchronize active patient medications and records
  useEffect(() => {
    setMedications(storageService.getMedications(activePatient.id));
    setRecords(storageService.getRecords(activePatient.id));
    setAppointments(storageService.getAppointments(activePatient.id));
    setPrescriptions(storageService.getPrescriptions(activePatient.id));
  }, [activePatient]);

  // Auth Handlers
  const handleSelectRole = (role: 'responsavel' | 'idoso') => {
    if (role === 'idoso') {
      setAuthStep('idoso-login');
    } else {
      setAuthStep('responsavel-login');
    }
  };

  const handleIdosoLoginSuccess = (patient: Patient) => {
    setActivePatient(patient);
    setSession({
      role: 'idoso',
      patientId: patient.id,
      patientName: patient.name,
    });
    setAuthStep('authenticated');
    setIdosoTab('inicio');
  };

  const handleResponsavelLoginSuccess = () => {
    const currentSession = storageService.getSession() || {
      role: 'responsavel',
      userName: 'Enf. Mateus',
      isProfessional: true,
    };
    setSession(currentSession);
    setAuthStep('authenticated');
    setResponsavelTab('inicio');
    setResponsavelView('dashboard');
  };

  const handleLogout = () => {
    storageService.clearSession();
    setSession(null);
    setShowAccessibilityModal(false);
    setAuthStep('welcome');
    setResponsavelView('dashboard');
  };

  // Idoso Dose Confirmation
  const handleTriggerConfirmation = (med: Medication) => {
    setConfirmingMed(med);
  };

  const handleConfirmDose = () => {
    if (!confirmingMed) return;
    const record = storageService.confirmDose(confirmingMed.id, activePatient.id);
    setRecords(storageService.getRecords(activePatient.id));
    setConfirmedRecord(record);
    setConfirmingMed(null);
    setShowSuccessModal(true);
  };

  const handleSnoozeDose = () => {
    setConfirmingMed(null);
    alert('Lembrete adiado em 10 minutos.');
  };

  // Responsavel Patient and Medication Actions
  const handleSelectAccompaniedPatient = (p: Patient) => {
    setActivePatient(p);
    storageService.setActivePatientId(p.id);
    setResponsavelView('dashboard');
  };

  const handleSaveAccompaniedPatient = (newPatData: Omit<Patient, 'id'>) => {
    const saved = storageService.savePatient(newPatData);
    setPatients(storageService.getPatients());
    setActivePatient(saved);
  };

  const handleSaveMedication = (medData: Omit<Medication, 'id'> & { id?: string }) => {
    storageService.saveMedication(medData);
    setMedications(storageService.getMedications(activePatient.id));
    setResponsavelView('medicamentos');
  };

  const handleSaveScheduleTimes = (times: string[]) => {
    if (selectedMed) {
      storageService.saveMedication({
        ...selectedMed,
        scheduleTimes: times,
      });
      setMedications(storageService.getMedications(activePatient.id));
    }
  };

  const handleToggleHistoryRecord = (recordId: string) => {
    const all = storageService.getRecords();
    const target = all.find((r) => r.id === recordId);
    if (target) {
      target.status = target.status === 'confirmed' ? 'pending' : 'confirmed';
      if (target.status === 'confirmed') {
        const timeFormatted = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        target.confirmedAt = timeFormatted;
        target.confirmedDateLabel = `Hoje às ${timeFormatted}`;
      } else {
        target.confirmedAt = undefined;
      }
      localStorage.setItem('coram_dose_records', JSON.stringify(all));
      setRecords(storageService.getRecords(activePatient.id));
    }
  };

  const handleAddAppointment = (appData: Omit<Appointment, 'id'>) => {
    storageService.saveAppointment(appData);
    setAppointments(storageService.getAppointments(activePatient.id));
  };

  // Responsavel Tab switching
  const handleResponsavelTabChange = (tab: ResponsavelTab) => {
    setResponsavelTab(tab);
    if (tab === 'inicio') setResponsavelView('dashboard');
    if (tab === 'medicamentos') setResponsavelView('medicamentos');
    if (tab === 'agenda') setResponsavelView('agenda');
    if (tab === 'perfil') setResponsavelView('perfil');
  };

  // Calculate accessibility CSS classes
  const textSizeClass =
    accessibility.textSize === 'muito-grande'
      ? 'text-lg'
      : accessibility.textSize === 'grande'
      ? 'text-base'
      : 'text-sm';

  const contrastClass = accessibility.highContrast ? 'contrast-125 saturate-150 font-medium' : '';

  return (
    <div className={`min-h-screen bg-[#F8FAF9] text-[#112A24] ${textSizeClass} ${contrastClass}`}>
      {/* 1. Splash Screen */}
      {authStep === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}

      {/* 2. Welcome Mode Selection */}
      {authStep === 'welcome' && (
        <WelcomeView onSelectRole={handleSelectRole} />
      )}

      {/* 3. Idoso 6-Digit Code Login */}
      {authStep === 'idoso-login' && (
        <IdosoLoginView
          onBack={() => setAuthStep('welcome')}
          onSuccess={handleIdosoLoginSuccess}
        />
      )}

      {/* 4. Responsavel Login */}
      {authStep === 'responsavel-login' && (
        <ResponsavelLoginView
          onBack={() => setAuthStep('welcome')}
          onSuccess={handleResponsavelLoginSuccess}
          onGoToRegister={() => setAuthStep('responsavel-register')}
        />
      )}

      {/* 5. Responsavel Register Wizard */}
      {authStep === 'responsavel-register' && (
        <ResponsavelRegisterView
          onBack={() => setAuthStep('responsavel-login')}
          onSuccess={handleResponsavelLoginSuccess}
        />
      )}

      {/* 6. Authenticated: IDOSO Interface */}
      {authStep === 'authenticated' && session?.role === 'idoso' && (
        <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl relative flex flex-col justify-between">
          <IdosoHeader
            onOpenSOS={() => setShowSOSModal(true)}
            onOpenAccessibility={() => setShowAccessibilityModal(true)}
          />

          <main className="flex-1">
            {idosoTab === 'inicio' && (
              <IdosoHomeView
                patient={activePatient}
                medications={medications}
                records={records}
                onTriggerConfirmation={handleTriggerConfirmation}
                onCallCaregiver={() => setIdosoTab('cuidador')}
              />
            )}

            {idosoTab === 'remedios' && (
              <IdosoRemediosView
                medications={medications}
                onOpenCuidador={() => setIdosoTab('cuidador')}
              />
            )}

            {idosoTab === 'rotina' && (
              <IdosoRotinaView
                patient={activePatient}
                medications={medications}
                records={records}
                onTriggerConfirmation={handleTriggerConfirmation}
                onCallCaregiver={() => setIdosoTab('cuidador')}
              />
            )}

            {idosoTab === 'cuidador' && (
              <IdosoCuidadorView
                patient={activePatient}
                onOpenSOSModal={() => setShowSOSModal(true)}
              />
            )}
          </main>

          <IdosoBottomNav activeTab={idosoTab} onChangeTab={setIdosoTab} />

          {/* Idoso Active Reminder Confirmation Modal */}
          {confirmingMed && (
            <IdosoConfirmModal
              medication={confirmingMed}
              patient={activePatient}
              onConfirm={handleConfirmDose}
              onSnooze={handleSnoozeDose}
              onClose={() => setConfirmingMed(null)}
            />
          )}

          {/* Idoso Success Confirmation Celebration Modal */}
          {showSuccessModal && confirmingMed === null && (
            <IdosoSuccessModal
              medication={
                medications.find((m) => m.id === confirmedRecord?.medicationId) || medications[0]
              }
              patient={activePatient}
              record={confirmedRecord || records[0]}
              onClose={() => setShowSuccessModal(false)}
              onViewDetails={() => {
                setShowSuccessModal(false);
                setIdosoTab('remedios');
              }}
            />
          )}

          {/* Idoso Accessibility & Profile Modal */}
          {showAccessibilityModal && (
            <IdosoAccessibilityModal
              patient={activePatient}
              settings={accessibility}
              onUpdateSettings={setAccessibility}
              onLogout={handleLogout}
              onClose={() => setShowAccessibilityModal(false)}
            />
          )}

          {/* Idoso SOS Immediate Emergency Modal */}
          {showSOSModal && (
            <IdosoSOSModal
              patient={activePatient}
              onClose={() => setShowSOSModal(false)}
            />
          )}
        </div>
      )}

      {/* 7. Authenticated: RESPONSÁVEL / PROFISSIONAL Interface */}
      {authStep === 'authenticated' && session?.role === 'responsavel' && (
        <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl relative flex flex-col justify-between">
          <ResponsavelHeader onOpenProfile={() => setResponsavelView('perfil')} />

          <main className="flex-1">
            {responsavelView === 'dashboard' && (
              <ResponsavelDashboardView
                userName={session.userName || 'Enf. Mateus'}
                activePatient={activePatient}
                medications={medications}
                appointments={appointments}
                onOpenPacientes={() => setResponsavelView('pacientes')}
                onOpenMedicamentos={() => setResponsavelView('medicamentos')}
                onOpenAddMedicamento={() => {
                  setEditingMed(null);
                  setResponsavelView('medicamento-form');
                }}
                onOpenAgenda={() => setResponsavelView('agenda')}
                onOpenHistorico={() => setResponsavelView('historico')}
                onOpenAlarmes={() => setResponsavelView('alarmes')}
                onEditMedication={(med) => {
                  setEditingMed(med);
                  setResponsavelView('medicamento-form');
                }}
              />
            )}

            {responsavelView === 'pacientes' && (
              <ResponsavelPacientesView
                patients={patients}
                activePatient={activePatient}
                onSelectPatient={handleSelectAccompaniedPatient}
                onSavePatient={handleSaveAccompaniedPatient}
                onOpenMedicamentos={() => setResponsavelView('medicamentos')}
                onOpenHistorico={() => setResponsavelView('historico')}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}

            {responsavelView === 'medicamentos' && (
              <ResponsavelMedicamentosView
                patient={activePatient}
                medications={medications}
                records={records}
                onOpenDetalhe={(med) => {
                  setSelectedMed(med);
                  setResponsavelView('medicamento-detalhe');
                }}
                onOpenAdd={() => {
                  setEditingMed(null);
                  setResponsavelView('medicamento-form');
                }}
                onOpenReceituario={() => setResponsavelView('receituario')}
                onOpenHistorico={() => setResponsavelView('historico')}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}

            {responsavelView === 'medicamento-detalhe' && selectedMed && (
              <ResponsavelMedicamentoDetalhe
                medication={selectedMed}
                record={records.find((r) => r.medicationId === selectedMed.id)}
                onEdit={() => {
                  setEditingMed(selectedMed);
                  setResponsavelView('medicamento-form');
                }}
                onOpenFrequencia={() => setResponsavelView('frequencia-horarios')}
                onOpenReceita={() => setResponsavelView('receituario')}
                onOpenHistorico={() => setResponsavelView('historico')}
                onBack={() => setResponsavelView('medicamentos')}
              />
            )}

            {responsavelView === 'medicamento-form' && (
              <ResponsavelMedicamentoForm
                initialMedication={editingMed}
                patient={activePatient}
                userName={session.userName || 'Enf. Mateus'}
                onSave={handleSaveMedication}
                onCancel={() => setResponsavelView('medicamentos')}
              />
            )}

            {responsavelView === 'frequencia-horarios' && selectedMed && (
              <ResponsavelFrequenciaHorarios
                medication={selectedMed}
                onSaveSchedule={handleSaveScheduleTimes}
                onBack={() => setResponsavelView('medicamento-detalhe')}
              />
            )}

            {responsavelView === 'alarmes' && (
              <ResponsavelAlarmesView
                patient={activePatient}
                medications={medications}
                onEditMedication={(med) => {
                  setEditingMed(med);
                  setResponsavelView('medicamento-form');
                }}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}

            {responsavelView === 'receituario' && (
              <ResponsavelReceituarioView
                patient={activePatient}
                prescriptions={prescriptions}
                onBack={() => setResponsavelView('medicamentos')}
              />
            )}

            {responsavelView === 'agenda' && (
              <ResponsavelAgendaView
                patient={activePatient}
                appointments={appointments}
                onAddAppointment={handleAddAppointment}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}

            {responsavelView === 'historico' && (
              <ResponsavelHistoricoView
                patient={activePatient}
                records={records}
                medications={medications}
                onToggleStatus={handleToggleHistoryRecord}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}

            {responsavelView === 'perfil' && (
              <ResponsavelPerfilView
                userName={session.userName || 'Enf. Mateus'}
                userEmail={session.userEmail}
                onLogout={handleLogout}
                onBack={() => setResponsavelView('dashboard')}
              />
            )}
          </main>

          <ResponsavelBottomNav
            activeTab={responsavelTab}
            onChangeTab={handleResponsavelTabChange}
          />
        </div>
      )}
    </div>
  );
}
