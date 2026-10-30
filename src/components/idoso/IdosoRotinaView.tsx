import React from 'react';
import { Volume2, ShieldCheck, Check, Clock, Phone } from 'lucide-react';
import { Medication, Patient, DoseRecord } from '../../types';

interface IdosoRotinaViewProps {
  patient: Patient;
  medications: Medication[];
  records: DoseRecord[];
  onTriggerConfirmation: (med: Medication) => void;
  onCallCaregiver: () => void;
}

export const IdosoRotinaView: React.FC<IdosoRotinaViewProps> = ({
  patient,
  medications,
  records,
  onTriggerConfirmation,
  onCallCaregiver,
}) => {
  const days = [
    { day: 'SEG', num: 22, isToday: false },
    { day: 'TER', num: 23, isToday: false },
    { day: 'HOJE', num: 24, isToday: true },
    { day: 'QUI', num: 25, isToday: false },
    { day: 'SEX', num: 26, isToday: false },
    { day: 'SÁB', num: 27, isToday: false },
    { day: 'DOM', num: 28, isToday: false },
  ];

  const confirmedCount = records.filter((r) => r.status === 'confirmed').length;
  const totalCount = medications.length;
  const percentage = Math.round((confirmedCount / (totalCount || 1)) * 100);

  return (
    <div className="space-y-5 pb-24 pt-3 px-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-gray-500">
            Quarta-feira, 24 de Outubro
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#175246] bg-[#EAF3F0] px-2.5 py-0.5 rounded-full">
            <Volume2 className="h-3 w-3" />
            Voz Ativa
          </span>
        </div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Sua Rotina de Hoje
        </h1>
        <p className="mt-1 text-sm text-gray-600 font-normal leading-relaxed">
          Olá, Dona {patient.name}! Vamos conferir seus cuidados com calma e carinho.
        </p>
      </div>

      {/* Week Calendar Strip */}
      <div className="flex items-center justify-between gap-1 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs">
        {days.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl text-center transition-all ${
              item.isToday
                ? 'bg-[#175246] text-white font-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-[10px] font-bold uppercase">{item.day}</span>
            <span className="text-sm font-black mt-0.5">{item.num}</span>
            {item.isToday && <span className="h-1 w-1 bg-emerald-300 rounded-full mt-0.5" />}
          </div>
        ))}
      </div>

      {/* Daily Progress Card */}
      <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3F0] text-[#175246]">
              <span className="text-xl">😊</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#112A24]">
                {percentage >= 50 ? 'Metade do dia concluída!' : 'Seus cuidados de hoje'}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {confirmedCount} de {totalCount} remédios tomados hoje
              </p>
            </div>
          </div>
          <span className="text-lg font-black text-[#175246]">{percentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#175246] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Supervised Notice */}
      <div className="flex items-center gap-3 rounded-2xl bg-[#EAF3F0] p-3.5 border border-[#D1E9E6]">
        <ShieldCheck className="h-6 w-6 text-[#175246] shrink-0" />
        <div>
          <h4 className="text-xs font-black text-[#175246]">Tudo sob cuidado</h4>
          <p className="text-xs text-gray-600 mt-0.5">
            Seus horários estão sendo acompanhados em tempo real pela sua cuidadora {patient.caregiverName.split(' ')[0]}.
          </p>
        </div>
      </div>

      {/* Medication Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#112A24]">
            Seus Medicamentos
          </h2>
          <span className="text-xs font-bold text-gray-500">{totalCount} doses hoje</span>
        </div>

        {medications.map((med, index) => {
          const record = records.find((r) => r.medicationId === med.id);
          const isConfirmed = record?.status === 'confirmed';
          const isNext = !isConfirmed && index === 2; // Vitamina D3 as next demo

          return (
            <div
              key={med.id}
              className={`rounded-2xl border p-4 bg-white transition-all shadow-xs ${
                isNext
                  ? 'border-amber-400 ring-2 ring-amber-100'
                  : 'border-gray-200'
              }`}
            >
              {/* Header of dose card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-xs font-black">
                    {med.visualSymbol.symbol}
                  </span>
                  <div>
                    <span className="text-sm font-black text-[#112A24]">
                      {med.scheduleTimes[0]} • {med.usageNote || (med.shift === 'manha' ? 'Manhã' : med.shift === 'tarde' ? 'Tarde' : 'Noite')}
                    </span>
                    <h3 className="text-base font-bold text-gray-800">
                      {med.name}
                    </h3>
                  </div>
                </div>

                {isConfirmed && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Check className="h-3.5 w-3.5" />
                    Tomado ({record?.confirmedAt || '07:05'})
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-1 pl-8">
                {med.doseInstructions}
              </p>

              {/* If it's upcoming, show prominent action box */}
              {isNext && (
                <div className="mt-4 pt-3 border-t border-amber-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-amber-900">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-700" />
                      PRÓXIMO REMÉDIO
                    </span>
                    <span className="bg-amber-100 px-2 py-0.5 rounded-md">Faltam 4 horas</span>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <img
                      src={med.packagePhotoUrl}
                      alt={med.name}
                      className="h-14 w-16 rounded-lg object-cover border"
                    />
                    <div className="text-xs text-gray-700">
                      <p className="font-bold">{med.name}</p>
                      <p className="text-gray-500">1 cápsula logo após o almoço</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onTriggerConfirmation(med)}
                    className="w-full py-3.5 rounded-xl bg-[#175246] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                  >
                    <Check className="h-4 w-4" />
                    <span>Tomar Agora</span>
                  </button>
                  <p className="text-center text-[11px] font-bold text-gray-500">
                    🔔 Lembrete Sonoro Programado
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Caregiver Helpline */}
      <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 p-4 shadow-xs">
        <div>
          <p className="text-xs text-gray-500 font-semibold">Dúvida sobre a receita?</p>
          <p className="text-sm font-black text-[#112A24]">
            Ligue para a cuidadora {patient.caregiverName.split(' ')[0]}
          </p>
        </div>
        <button
          onClick={onCallCaregiver}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#175246] text-white hover:bg-[#124238] active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
