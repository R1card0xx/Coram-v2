import React, { useEffect } from 'react';
import { ArrowLeft, Volume2, RotateCcw, Check, Clock, Users, Pill } from 'lucide-react';
import { Medication, Patient } from '../../types';
import { audioService } from '../../services/audio';

interface IdosoConfirmModalProps {
  medication: Medication;
  patient: Patient;
  onConfirm: () => void;
  onSnooze: () => void;
  onClose: () => void;
}

export const IdosoConfirmModal: React.FC<IdosoConfirmModalProps> = ({
  medication,
  patient,
  onConfirm,
  onSnooze,
  onClose,
}) => {
  const timeLabel = medication.scheduleTimes[0] || '10:00';

  const speakAlert = () => {
    audioService.playReminderChime();
    setTimeout(() => {
      audioService.speak(
        `Dona ${patient.name}, está na hora do seu remédio das ${timeLabel}! ${medication.name}. ${medication.doseInstructions}`
      );
    }, 450);
  };

  useEffect(() => {
    // Automatically play gentle chime and voice when modal opens
    speakAlert();
    return () => {
      audioService.stop();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-gray-700 font-bold text-sm hover:opacity-80 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          <h2 className="text-base font-black text-[#112A24]">Confirmar Remedio</h2>
          <div className="w-12" />
        </div>

        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Active Sound / Voice Banner */}
          <div className="rounded-2xl bg-[#EAF3F0] p-4 border border-[#D1E9E6] space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#175246] text-white shadow-xs">
                <Volume2 className="h-6 w-6 text-emerald-200" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block">
                  ● AVISO SONORO ATIVO
                </span>
                <p className="text-base font-black text-[#112A24] leading-snug mt-0.5">
                  “Dona {patient.name}, está na hora do seu remédio das {timeLabel}!”
                </p>
              </div>
            </div>

            {/* Sub-controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#D1E9E6]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <span className="flex gap-0.5">
                  <span className="h-3 w-1 bg-[#175246] rounded-full inline-block animate-pulse" />
                  <span className="h-4 w-1 bg-[#175246] rounded-full inline-block animate-pulse" />
                  <span className="h-2 w-1 bg-[#175246] rounded-full inline-block animate-pulse" />
                </span>
                <span>Voz sintetizada</span>
              </div>

              <button
                onClick={speakAlert}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#175246] font-extrabold text-xs border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Ouvir de novo</span>
              </button>
            </div>
          </div>

          {/* Identification Tags Row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-extrabold">
              <Clock className="h-3.5 w-3.5 text-gray-600" />
              <span>{timeLabel} (Agora)</span>
            </div>

            <div
              className="px-3.5 py-1.5 rounded-full text-xs font-black text-white"
              style={{ backgroundColor: medication.visualColor.hex }}
            >
              ● {medication.visualColor.name.toUpperCase()}
            </div>
          </div>

          {/* Symbol + Packaging Photo Preview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 rounded-2xl bg-gray-50 border border-gray-200 p-3 flex flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-2xl font-black">
                {medication.visualSymbol.symbol}
              </span>
              <span className="mt-2 text-[10px] uppercase font-bold text-gray-500 block">
                SÍMBOLO
              </span>
              <span className="text-xs font-black text-gray-800">
                {medication.visualSymbol.label}
              </span>
            </div>

            <div className="col-span-2 relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              <img
                src={medication.packagePhotoUrl}
                alt={medication.name}
                className="h-28 w-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold">
                Foto da sua caixa
              </span>
            </div>
          </div>

          {/* Medicine Name and Dosage */}
          <div className="text-center pt-1">
            <h3 className="text-2xl font-black text-[#112A24] tracking-tight uppercase">
              {medication.name.split(' ')[0]}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3F0] text-[#175246] font-black text-sm mt-1">
              <Pill className="h-4 w-4" />
              <span>{medication.prescribedDose}</span>
            </div>
            <p className="mt-2 text-sm font-extrabold text-gray-800">
              {medication.doseInstructions}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Recomendado: {medication.usageNote || 'após o café da manhã'}
            </p>
          </div>

          {/* Big Action Button "JÁ TOMEI" */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onConfirm}
              className="w-full py-5 rounded-2xl bg-[#175246] text-white font-black text-2xl flex items-center justify-center gap-3 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
            >
              <Check className="h-8 w-8 text-emerald-300 stroke-[3]" />
              <span>JÁ TOMEI</span>
            </button>
            <p className="text-center text-xs text-gray-600 font-semibold px-4">
              Toque no botão verde grande assim que engolir o comprimido.
            </p>
          </div>

          {/* Snooze Button */}
          <button
            onClick={onSnooze}
            className="w-full py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Lembrar em 10 minutos</span>
          </button>

          {/* Caregiver notification footnote */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 text-center pt-1">
            <Users className="h-4 w-4 text-[#175246]" />
            <span>
              Sua cuidadora {patient.caregiverName.split(' ')[0]} será avisada assim que você confirmar.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
