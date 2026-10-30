import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Calendar,
  ChevronRight,
  UserPlus,
  History,
  PlusCircle,
  Clock,
  Edit2
} from 'lucide-react';
import { Patient, Medication, Appointment } from '../../types';

interface ResponsavelDashboardViewProps {
  userName: string;
  activePatient: Patient;
  medications: Medication[];
  appointments: Appointment[];
  onOpenPacientes: () => void;
  onOpenMedicamentos: () => void;
  onOpenAddMedicamento: () => void;
  onOpenAgenda: () => void;
  onOpenHistorico: () => void;
  onOpenAlarmes: () => void;
  onEditMedication: (med: Medication) => void;
}

export const ResponsavelDashboardView: React.FC<ResponsavelDashboardViewProps> = ({
  userName,
  activePatient,
  medications,
  appointments,
  onOpenPacientes,
  onOpenMedicamentos,
  onOpenAddMedicamento,
  onOpenAgenda,
  onOpenHistorico,
  onOpenAlarmes,
  onEditMedication,
}) => {
  const [activeToggle, setActiveToggle] = useState(true);

  // Focus medication (Medicamento A / Losartana)
  const focusMed = medications[1] || medications[0];

  return (
    <div className="space-y-6 pb-24 pt-4 px-4">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Bom dia, <br />
          {userName || 'Enf. Mateus'} :)
        </h1>
      </div>

      {/* Pessoas Cadastradas Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#112A24]">
            Pessoas Cadastradas
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF3F0] text-xs font-black text-[#175246]">
            1
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3F0] text-lg font-black text-[#175246]">
              A
            </div>
            <div>
              <h2 className="text-base font-black text-[#112A24]">
                {activePatient.name}
              </h2>
              <p className="text-xs text-gray-500">
                {activePatient.age || 79} anos • salvo • cód: {activePatient.accessCode}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPacientes}
            className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-[#175246] hover:bg-[#EAF3F0] active:scale-95 transition-all cursor-pointer"
          >
            trocar
          </button>
        </div>
      </div>

      {/* Active Reminder Card (Medicamento A - 08:00) */}
      {focusMed && (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-black text-[#112A24]">08:00</span>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => setActiveToggle(!activeToggle)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                activeToggle ? 'bg-[#175246]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                  activeToggle ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="text-xs text-gray-500 -mt-2">
            <span>Medicamento A</span> • <span className="font-semibold text-emerald-700">Ativado</span>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-100">
            <img
              src={focusMed.packagePhotoUrl}
              alt={focusMed.name}
              className="h-16 w-16 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <h3 className="text-sm font-black text-[#112A24]">
                {focusMed.name}
              </h3>
              <p className="text-xs text-gray-500">{focusMed.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-bold text-blue-700">
                  ● {focusMed.visualColor.name}
                </span>
                <span className="text-[11px] font-bold text-gray-700">
                  {focusMed.visualSymbol.symbol} {focusMed.visualSymbol.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Confirmado às 08:05</span>
          </div>

          <button
            onClick={() => onEditMedication(focusMed)}
            className="w-full py-3 rounded-xl border border-gray-300 text-xs font-black text-[#175246] flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-98 transition-all cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Editar</span>
          </button>
        </div>
      )}

      {/* Compromissos do mês */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[#112A24]">
            Compromissos do mês
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF3F0] text-xs font-black text-[#175246]">
            {appointments.length}
          </span>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-xs space-y-4">
          {appointments.slice(0, 2).map((app) => (
            <div key={app.id} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-gray-50 border border-gray-200 shrink-0">
                <span className="text-base font-black text-[#112A24] leading-none">
                  {app.day}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">
                  {app.month}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-[#112A24]">
                  {app.title}
                </h4>
                <p className="text-xs text-gray-500">{app.dateFormatted}</p>
                <p className="text-xs text-gray-400 mt-0.5">{app.location}</p>
              </div>
            </div>
          ))}

          <button
            onClick={onOpenAgenda}
            className="w-full pt-2 flex items-center justify-center gap-1.5 text-xs font-black text-[#175246] hover:underline cursor-pointer border-t border-gray-100"
          >
            <Calendar className="h-4 w-4" />
            <span>Ver agenda →</span>
          </button>
        </div>
      </div>

      {/* Ações rápidas (4 grid cards) */}
      <div>
        <h3 className="text-sm font-bold text-[#112A24] mb-3">
          Ações rápidas
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenPacientes}
            className="p-4 rounded-2xl bg-white border border-gray-200 text-left hover:border-[#175246] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <UserPlus className="h-5 w-5 text-[#175246] mb-2" />
            <span className="block text-xs font-black text-[#112A24] leading-tight">
              Adicionar novo <br /> paciente
            </span>
          </button>

          <button
            onClick={onOpenHistorico}
            className="p-4 rounded-2xl bg-white border border-gray-200 text-left hover:border-[#175246] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <History className="h-5 w-5 text-[#175246] mb-2" />
            <span className="block text-xs font-black text-[#112A24] leading-tight">
              Verificar histórico <br /> dos pacientes
            </span>
          </button>

          <button
            onClick={onOpenAddMedicamento}
            className="p-4 rounded-2xl bg-white border border-gray-200 text-left hover:border-[#175246] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <PlusCircle className="h-5 w-5 text-[#175246] mb-2" />
            <span className="block text-xs font-black text-[#112A24] leading-tight">
              Adicionar novo <br /> medicamento
            </span>
          </button>

          <button
            onClick={onOpenAlarmes}
            className="p-4 rounded-2xl bg-white border border-gray-200 text-left hover:border-[#175246] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <Clock className="h-5 w-5 text-[#175246] mb-2" />
            <span className="block text-xs font-black text-[#112A24] leading-tight">
              Adicionar <br /> lembrete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
