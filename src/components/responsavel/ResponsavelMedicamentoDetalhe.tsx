import React from 'react';
import { ArrowLeft, Edit3, ChevronRight, CheckCircle2, Clock, AlertCircle, Pill } from 'lucide-react';
import { Medication, DoseRecord } from '../../types';

interface ResponsavelMedicamentoDetalheProps {
  medication: Medication;
  record?: DoseRecord;
  onEdit: () => void;
  onOpenFrequencia: () => void;
  onOpenReceita: () => void;
  onOpenHistorico: () => void;
  onBack: () => void;
}

export const ResponsavelMedicamentoDetalhe: React.FC<ResponsavelMedicamentoDetalheProps> = ({
  medication,
  record,
  onEdit,
  onOpenFrequencia,
  onOpenReceita,
  onOpenHistorico,
  onBack,
}) => {
  const isConfirmed = record?.status === 'confirmed';

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
          {medication.name}
        </h1>
      </div>

      {/* Identificação Visual Box */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-black text-[#112A24]">
            Identificação visual
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Foto da embalagem, cor e símbolo usados para reconhecer o medicamento.
          </p>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
          <img
            src={medication.packagePhotoUrl}
            alt={medication.name}
            className="h-16 w-16 rounded-xl object-cover border border-gray-200"
          />
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Pill className="h-3.5 w-3.5" />
              <span>{medication.category}</span>
            </div>
            <h3 className="text-base font-black text-[#112A24] mt-0.5">
              {medication.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs font-bold"
                style={{ color: medication.visualColor.hex }}
              >
                ● {medication.visualColor.name}
              </span>
              <span className="text-xs font-bold text-gray-700">
                {medication.visualSymbol.symbol} {medication.visualSymbol.label}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 italic">
          Foto demonstrativa de embalagem
        </p>

        <div className="pt-2 border-t border-gray-100 text-xs font-bold text-gray-700">
          Categoria: <span className="font-normal">{medication.category}</span>
        </div>
      </div>

      {/* Status da Dose Hoje */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Confirmado hoje, às {record?.confirmedAt || '08:05'}</span>
        </div>
        <p className="text-xs text-gray-500">
          Lembrete de: {medication.scheduleTimes[0] || '08:00'}
        </p>

        <button
          onClick={onOpenHistorico}
          className="w-full py-2.5 rounded-xl border border-[#175246] text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
        >
          Ver registro
        </button>
      </div>

      {/* Prescribed details */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div>
          <span className="text-xs font-bold text-gray-500 block">
            Quantidade prescrita
          </span>
          <span className="text-sm font-black text-[#112A24]">
            {medication.prescribedDose || 'Não informado'}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 block">
            Frequência prescrita
          </span>
          <span className="text-sm font-black text-[#112A24]">
            {medication.prescribedFrequency || 'Conforme sua receita'}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 block">
            Orientações da receita
          </span>
          <span className="text-sm font-black text-[#112A24]">
            {medication.prescriptionNotes || medication.doseInstructions || 'Não informado'}
          </span>
        </div>
      </div>

      {/* Action: Editar Medicamento */}
      <button
        onClick={onEdit}
        className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
      >
        <Edit3 className="h-4 w-4" />
        <span>Editar medicamento</span>
      </button>

      {/* Links to Frequência e Receita */}
      <div className="space-y-3">
        <button
          onClick={onOpenFrequencia}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer shadow-xs"
        >
          <div>
            <span className="block text-sm font-black text-[#112A24]">
              Frequência e horários
            </span>
            <span className="text-xs text-gray-500">
              Confira o que foi informado
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button
          onClick={onOpenReceita}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer shadow-xs"
        >
          <div>
            <span className="block text-sm font-black text-[#112A24]">
              Receita vinculada
            </span>
            <span className="text-xs text-gray-500">
              Referência A • sem documento
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Legal disclaimer */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-gray-50 text-gray-500 text-xs">
        <AlertCircle className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
        <p>Os dados de organização não substituem sua receita.</p>
      </div>
    </div>
  );
};
