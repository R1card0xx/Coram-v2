import React from 'react';
import { Check, CheckCircle2, Bell, HeartHandshake } from 'lucide-react';
import { Medication, Patient, DoseRecord } from '../../types';

interface IdosoSuccessModalProps {
  medication: Medication;
  patient: Patient;
  record: DoseRecord;
  onClose: () => void;
  onViewDetails?: () => void;
}

export const IdosoSuccessModal: React.FC<IdosoSuccessModalProps> = ({
  medication,
  patient,
  record,
  onClose,
  onViewDetails,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 space-y-5 max-h-[90vh] overflow-y-auto">
          {/* Big Green Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF3F0] border-4 border-emerald-100 shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#175246] text-white">
                <Check className="h-8 w-8 text-emerald-300 stroke-[3]" />
              </div>
            </div>

            <span className="mt-4 text-xs font-black uppercase tracking-wider text-[#175246] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Registro confirmado com segurança
            </span>

            <h2 className="text-2xl font-black text-[#112A24] mt-1 tracking-tight">
              Muito bem, Dona {patient.name}!
            </h2>
            <p className="text-sm font-semibold text-gray-600 mt-0.5">
              Você tomou o remédio certinho.
            </p>
          </div>

          {/* Medication Taken Details */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                MEDICAMENTO DAS {medication.scheduleTimes[0] || '10:00'}
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <Check className="h-3 w-3" /> Feito
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={medication.packagePhotoUrl}
                alt={medication.name}
                className="h-14 w-14 rounded-xl object-cover border border-gray-200 shadow-xs"
              />
              <div>
                <h3 className="text-base font-black text-[#112A24]">
                  {medication.name}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  {medication.doseInstructions}
                </p>
              </div>
            </div>
          </div>

          {/* Confirm Timestamps & Caregiver Alerted */}
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  Confirmado {record.confirmedDateLabel || 'hoje'}
                </span>
                <span className="text-gray-600 text-[11px]">
                  Registrado no seu histórico diário.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#EAF3F0] border border-[#D1E9E6] text-xs text-[#175246]">
              <HeartHandshake className="h-4 w-4 text-[#175246] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {patient.caregiverName} avisada ✓
                </span>
                <span className="text-gray-600 text-[11px]">
                  Ela já recebeu a mensagem no celular confirmando que você tomou.
                </span>
              </div>
            </div>
          </div>

          {/* Next Care Sneak Peek */}
          <div className="rounded-2xl border border-gray-200 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span className="uppercase">Próximo Cuidado</span>
              <span>Hoje à tarde</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-[#112A24]">14:00</span>
                <p className="text-xs font-bold text-gray-800">Vitamina D3 2.000 UI</p>
                <p className="text-[11px] text-gray-500">1 cápsula • Antes do lanche da tarde</p>
              </div>
              <span className="text-2xl">💊</span>
            </div>
            <div className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-gray-500 border-t border-gray-100">
              <Bell className="h-3.5 w-3.5 text-gray-400" />
              <span>Nós vamos avisar no som alto quando der a hora.</span>
            </div>
          </div>

          {/* Daily Goal Badge */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
            <div>
              <p className="text-xs font-black text-[#112A24]">
                Meta de hoje: 3 de 4 tomados
              </p>
              <p className="text-[11px] text-gray-500">
                Falta apenas 1 remédio para concluir seu dia!
              </p>
            </div>
            <span className="text-base font-black text-[#175246] bg-[#EAF3F0] px-2.5 py-1 rounded-full">
              75%
            </span>
          </div>

          {/* Primary & Secondary Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-base flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <span>VOLTAR PARA O INÍCIO</span>
            </button>

            {onViewDetails && (
              <button
                onClick={onViewDetails}
                className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              >
                <span>Ver Detalhes do Remédio</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
