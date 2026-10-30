import React, { useState } from 'react';
import { Volume2, HelpCircle } from 'lucide-react';
import { Medication } from '../../types';
import { audioService } from '../../services/audio';

interface IdosoRemediosViewProps {
  medications: Medication[];
  onOpenCuidador: () => void;
}

export const IdosoRemediosView: React.FC<IdosoRemediosViewProps> = ({
  medications,
  onOpenCuidador,
}) => {
  const [filterShift, setFilterShift] = useState<'todos' | 'manha' | 'tarde' | 'noite'>('todos');
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  const manhaCount = medications.filter((m) => m.shift === 'manha').length;
  const tardeCount = medications.filter((m) => m.shift === 'tarde').length;
  const noiteCount = medications.filter((m) => m.shift === 'noite').length;

  const filteredMeds = medications.filter((m) => {
    if (filterShift === 'todos') return true;
    return m.shift === filterShift;
  });

  const handleSpeakMedication = (med: Medication) => {
    setCurrentlySpeakingId(med.id);
    const textToSpeak = `${med.name}. Horário: ${med.scheduleTimes[0] || 'indicado'}. ${med.doseInstructions}. ${med.purposeDescription || ''}`;
    
    // Also play gentle chime first, then voice
    audioService.playReminderChime();
    setTimeout(() => {
      audioService.speak(textToSpeak, () => {
        setCurrentlySpeakingId(null);
      });
    }, 400);
  };

  return (
    <div className="space-y-5 pb-24 pt-3 px-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mb-2">
          <span>●</span>
          <span>Consulta Fácil</span>
        </div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Meus Remédios
        </h1>
        <p className="mt-1.5 text-sm text-gray-600 font-normal leading-relaxed">
          Veja as caixinhas dos seus remédios e para que servem no seu dia a dia.
        </p>
      </div>

      {/* Shift Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setFilterShift('todos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            filterShift === 'todos'
              ? 'bg-[#175246] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span>Todos ({medications.length})</span>
        </button>

        <button
          onClick={() => setFilterShift('manha')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            filterShift === 'manha'
              ? 'bg-[#175246] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span>☀ Manhã ({manhaCount})</span>
        </button>

        <button
          onClick={() => setFilterShift('tarde')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            filterShift === 'tarde'
              ? 'bg-[#175246] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span>🌤 Tarde ({tardeCount})</span>
        </button>

        <button
          onClick={() => setFilterShift('noite')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            filterShift === 'noite'
              ? 'bg-[#175246] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span>☾ Noite ({noiteCount})</span>
        </button>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-4">
        {filteredMeds.map((med) => {
          const isSpeaking = currentlySpeakingId === med.id;

          return (
            <div
              key={med.id}
              className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-xs"
            >
              {/* Card top banner with color & symbol */}
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ backgroundColor: `${med.visualColor.hex}15` }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-xs font-black">
                    {med.visualSymbol.symbol}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block leading-none">
                      ETIQUETA DE COR
                    </span>
                    <span
                      className="text-xs font-extrabold"
                      style={{ color: med.visualColor.hex }}
                    >
                      {med.visualColor.name} • {med.visualSymbol.label}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white font-black text-xs text-gray-800 border border-gray-200">
                  {med.scheduleTimes[0]}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-40">
                  <img
                    src={med.packagePhotoUrl}
                    alt={med.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/75 text-white text-[11px] font-bold">
                    Caixa Oficial
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#112A24]">
                    {med.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">
                    {med.scheduleTimes[0]} ({med.doseInstructions})
                  </p>
                </div>

                {med.purposeDescription && (
                  <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                    <span className="text-xs font-black text-[#175246] block mb-1">
                      Para que serve:
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {med.purposeDescription}
                    </p>
                  </div>
                )}

                {/* Audio button */}
                <button
                  onClick={() => handleSpeakMedication(med)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      : 'bg-[#EAF3F0] text-[#175246] hover:bg-[#DCEBE6] active:scale-[0.98]'
                  }`}
                >
                  <Volume2 className={`h-4 w-4 ${isSpeaking ? 'animate-bounce text-amber-800' : 'text-[#175246]'}`} />
                  <span>{isSpeaking ? 'Falando orientações...' : 'Ouvir como tomar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Doubt Support Footer Box */}
      <div className="rounded-2xl bg-white border border-gray-200 p-4 flex items-start gap-3 shadow-xs">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#175246] text-white">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-black text-[#112A24]">
            Dúvida sobre algum remédio?
          </h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Toque no botão <strong>Cuidador</strong> abaixo para ligar e pedir orientação a qualquer hora.
          </p>
          <button
            onClick={onOpenCuidador}
            className="mt-2 text-xs font-bold text-[#175246] underline hover:text-[#112A24] cursor-pointer"
          >
            Falar com Cuidador agora →
          </button>
        </div>
      </div>
    </div>
  );
};
