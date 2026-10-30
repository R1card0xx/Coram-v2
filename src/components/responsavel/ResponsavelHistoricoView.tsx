import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, Edit2, Check } from 'lucide-react';
import { DoseRecord, Medication, Patient } from '../../types';

interface ResponsavelHistoricoViewProps {
  patient: Patient;
  records: DoseRecord[];
  medications: Medication[];
  onToggleStatus: (recordId: string) => void;
  onBack: () => void;
}

export const ResponsavelHistoricoView: React.FC<ResponsavelHistoricoViewProps> = ({
  patient,
  records,
  medications,
  onToggleStatus,
  onBack,
}) => {
  const [filter, setFilter] = useState<'todos' | 'por-medicamento'>('todos');
  const [selectedMedId, setSelectedMedId] = useState<string>('todos');
  const [correctionNotice, setCorrectionNotice] = useState<string | null>(null);

  const todayRecords = records.filter((r) => r.scheduledDate === '2026-10-16' || !r.scheduledDate.includes('15'));
  const yesterdayRecords = records.filter((r) => r.scheduledDate === '2026-10-15');

  const getMedInfo = (medId: string) => {
    return medications.find((m) => m.id === medId) || medications[0];
  };

  const handleToggle = (id: string, name: string) => {
    onToggleStatus(id);
    setCorrectionNotice(`Status de registro atualizado para ${name}.`);
    setTimeout(() => setCorrectionNotice(null), 3000);
  };

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#112A24] text-sm font-semibold hover:opacity-80 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Histórico de registros
        </h1>
        <p className="text-xs text-gray-500 font-normal mt-1.5 leading-relaxed">
          Consulte os registros de {patient.name}. A pessoa e o responsável autorizado podem revisar o histórico.
        </p>
      </div>

      {correctionNotice && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{correctionNotice}</span>
        </div>
      )}

      {/* Filter Tabs: Todos / Por medicamento */}
      <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl">
        <button
          onClick={() => setFilter('todos')}
          className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
            filter === 'todos'
              ? 'bg-white text-[#175246] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('por-medicamento')}
          className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
            filter === 'por-medicamento'
              ? 'bg-white text-[#175246] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Por medicamento
        </button>
      </div>

      {/* Sub-selector if "Por medicamento" is active */}
      {filter === 'por-medicamento' && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedMedId('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${
              selectedMedId === 'todos' ? 'bg-[#175246] text-white' : 'bg-white border text-gray-700'
            }`}
          >
            Todos
          </button>
          {medications.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMedId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${
                selectedMedId === m.id ? 'bg-[#175246] text-white' : 'bg-white border text-gray-700'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      )}

      {/* Hoje Section */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-black text-[#112A24]">
            Hoje • 16 de outubro
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Sem confirmação não significa que o medicamento não foi tomado.
          </p>
        </div>

        <div className="space-y-3">
          {todayRecords
            .filter((r) => selectedMedId === 'todos' || r.medicationId === selectedMedId)
            .map((rec) => {
              const med = getMedInfo(rec.medicationId);
              const isConfirmed = rec.status === 'confirmed';

              return (
                <div
                  key={rec.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={med.packagePhotoUrl}
                      alt={med.name}
                      className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-black">
                          {med.visualSymbol.symbol}
                        </span>
                        <h3 className="text-sm font-black text-[#112A24]">
                          {rec.medicationName || med.name}
                        </h3>
                      </div>
                      <p className="text-[11px] font-bold text-gray-500">
                        {med.visualColor.name} • {med.visualSymbol.label}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#112A24]">
                      {rec.scheduledTime} • {rec.medicationName || med.name}
                    </span>
                  </div>

                  {isConfirmed ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Confirmado às {rec.confirmedAt || '08:05'}</span>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Horário registrado de exemplo. É possível corrigir.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 w-fit">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Sem confirmação</span>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Próximo lembrete. O horário ainda não chegou.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleToggle(rec.id, rec.medicationName || med.name)}
                    className="text-xs font-bold text-[#175246] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>{isConfirmed ? 'Desmarcar ou alterar registro' : 'Marcar como tomado manualmente'}</span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      {/* Ontem Section */}
      <div className="space-y-3 pt-2">
        <h2 className="text-sm font-black text-[#112A24]">
          Ontem • 15 de outubro
        </h2>

        <div className="space-y-3">
          {yesterdayRecords
            .filter((r) => selectedMedId === 'todos' || r.medicationId === selectedMedId)
            .map((rec) => {
              const med = getMedInfo(rec.medicationId);

              return (
                <div
                  key={rec.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={med.packagePhotoUrl}
                      alt={med.name}
                      className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-black">
                          {med.visualSymbol.symbol}
                        </span>
                        <h3 className="text-sm font-black text-[#112A24]">
                          {rec.medicationName}
                        </h3>
                      </div>
                      <p className="text-[11px] font-bold text-gray-500">
                        {med.visualColor.name} • {med.visualSymbol.label}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#112A24]">
                      {rec.scheduledTime} • {rec.medicationName}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 w-fit">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Sem confirmação</span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Sem confirmação. Não significa que o medicamento não foi tomado.
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => {
          if (todayRecords[0]) {
            handleToggle(todayRecords[0].id, todayRecords[0].medicationName);
          }
        }}
        className="w-full py-4 rounded-2xl border-2 border-[#175246] text-[#175246] font-black text-sm hover:bg-[#EAF3F0] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
      >
        Ver ou corrigir um registro
      </button>
    </div>
  );
};
