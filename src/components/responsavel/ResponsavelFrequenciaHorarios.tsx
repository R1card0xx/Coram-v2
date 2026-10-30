import React, { useState } from 'react';
import { ArrowLeft, Clock, AlertCircle, Plus, Check } from 'lucide-react';
import { Medication } from '../../types';

interface ResponsavelFrequenciaHorariosProps {
  medication: Medication;
  onSaveSchedule: (times: string[]) => void;
  onBack: () => void;
}

export const ResponsavelFrequenciaHorarios: React.FC<ResponsavelFrequenciaHorariosProps> = ({
  medication,
  onSaveSchedule,
  onBack,
}) => {
  const [times, setTimes] = useState<string[]>(medication.scheduleTimes || ['08:00']);
  const [newTime, setNewTime] = useState('14:00');
  const [showAdd, setShowAdd] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAddTime = () => {
    if (!times.includes(newTime)) {
      setTimes([...times, newTime].sort());
    }
    setShowAdd(false);
  };

  const handleRemoveTime = (target: string) => {
    if (times.length > 1) {
      setTimes(times.filter((t) => t !== target));
    }
  };

  const handleConclude = () => {
    onSaveSchedule(times);
    setSavedNotice(true);
    setTimeout(() => {
      onBack();
    }, 800);
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
          Frequência e horários
        </h1>
        <p className="text-sm font-bold text-gray-700 mt-1">{medication.name}</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#EAF3F0] text-gray-700 text-xs border border-[#D1E9E6]">
        <AlertCircle className="h-4 w-4 text-[#175246] shrink-0 mt-0.5" />
        <p>
          Siga sua receita. O horário abaixo é apenas um exemplo de lembrete, não uma prescrição.
        </p>
      </div>

      {/* Frequência Prescrita Info */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
        <label className="block text-xs font-bold text-[#185346] uppercase">
          Frequência prescrita
        </label>
        <div className="p-3.5 rounded-xl bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200">
          {medication.prescribedFrequency || 'Não informado'}
        </div>
        <p className="text-[11px] text-gray-500">
          Campo vazio. Transcreva exatamente da receita.
        </p>
      </div>

      {/* Horário do lembrete Card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-[#112A24]">
            Horário do lembrete
          </label>
          <span className="text-[11px] font-bold text-gray-400">
            Exemplo salvo para mostrar a organização.
          </span>
        </div>

        {times.map((t, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#EAF3F0] border border-[#D1E9E6]"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#175246]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  ✓ Salvo
                </span>
                <span className="text-2xl font-black text-[#112A24]">{t}</span>
              </div>
            </div>

            {times.length > 1 && (
              <button
                onClick={() => handleRemoveTime(t)}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        {showAdd ? (
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <label className="text-xs font-bold text-gray-700 block">Novo horário:</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-base font-bold"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2 text-xs font-bold text-gray-600 border rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddTime}
                className="flex-1 py-2 text-xs font-bold bg-[#175246] text-white rounded-xl"
              >
                Adicionar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full py-3 rounded-xl border border-[#175246] text-xs font-black text-[#175246] flex items-center justify-center gap-1.5 hover:bg-[#EAF3F0] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar horário da receita</span>
          </button>
        )}
      </div>

      {/* Dias e Frequência Note */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-1 text-xs">
        <span className="font-bold text-gray-500 block">Dias e frequência</span>
        <span className="text-sm font-black text-[#112A24] block">Conforme sua receita</span>
        <p className="text-gray-500 pt-1">
          Nenhum esquema de frequência é sugerido neste exemplo.
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleConclude}
        className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-base flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
      >
        <Check className="h-5 w-5" />
        <span>{savedNotice ? 'Horários salvos!' : 'Concluir'}</span>
      </button>
    </div>
  );
};
