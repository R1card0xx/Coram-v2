import React from 'react';
import { ArrowLeft, Plus, ChevronRight, Pill, CheckCircle2, Clock } from 'lucide-react';
import { Medication, Patient, DoseRecord } from '../../types';

interface ResponsavelMedicamentosViewProps {
  patient: Patient;
  medications: Medication[];
  records: DoseRecord[];
  onOpenDetalhe: (med: Medication) => void;
  onOpenAdd: () => void;
  onOpenReceituario: () => void;
  onOpenHistorico: () => void;
  onBack: () => void;
}

export const ResponsavelMedicamentosView: React.FC<ResponsavelMedicamentosViewProps> = ({
  patient,
  medications,
  records,
  onOpenDetalhe,
  onOpenAdd,
  onOpenReceituario,
  onOpenHistorico,
  onBack,
}) => {
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
          Medicamento de {patient.name}
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          {patient.name} • Fotos e dados demonstrativos.
        </p>
      </div>

      {/* Categorias de organização info */}
      <div className="rounded-2xl bg-[#EAF3F0] p-3 border border-[#D1E9E6]">
        <h3 className="text-xs font-black text-[#175246]">
          Categorias de organização
        </h3>
        <p className="text-xs text-gray-600 mt-0.5">
          As categorias não alteram sua receita.
        </p>
      </div>

      {/* Medications list */}
      <div className="space-y-4">
        {medications.map((med) => {
          const record = records.find((r) => r.medicationId === med.id);
          const isConfirmed = record?.status === 'confirmed';

          return (
            <div
              key={med.id}
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-xs space-y-3 hover:border-[#175246] transition-all"
            >
              <div className="flex items-start gap-3">
                <img
                  src={med.packagePhotoUrl}
                  alt={med.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-gray-200 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Pill className="h-3.5 w-3.5" />
                    <span>{med.category}</span>
                  </div>
                  <h3 className="text-base font-black text-[#112A24] mt-0.5">
                    {med.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: med.visualColor.hex }}
                    >
                      ● {med.visualColor.name}
                    </span>
                    <span className="text-[11px] font-bold text-gray-700">
                      {med.visualSymbol.symbol} {med.visualSymbol.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status row */}
              <div className="text-xs text-gray-600">
                {isConfirmed ? (
                  <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Confirmado às {record?.confirmedAt || '08:05'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    Próximo lembrete: hoje, {med.scheduleTimes[0]}
                  </span>
                )}
              </div>

              {/* Action */}
              <button
                onClick={() => onOpenDetalhe(med)}
                className="w-full py-2.5 rounded-xl border border-[#175246] text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
              >
                Ver medicamento
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Medication Button */}
      <button
        onClick={onOpenAdd}
        className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Adicionar medicamento</span>
      </button>

      {/* Related links */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onOpenReceituario}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer shadow-xs"
        >
          <div>
            <span className="block text-sm font-black text-[#112A24]">
              Receituário
            </span>
            <span className="text-xs text-gray-500">
              Organize suas referências de receita
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button
          onClick={onOpenHistorico}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer shadow-xs"
        >
          <div>
            <span className="block text-sm font-black text-[#112A24]">
              Histórico de registros
            </span>
            <span className="text-xs text-gray-500">
              Veja o que foi ou não registrado
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
