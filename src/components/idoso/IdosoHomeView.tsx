import React from 'react';
import { Smile, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { Medication, Patient, DoseRecord } from '../../types';

interface IdosoHomeViewProps {
  patient: Patient;
  medications: Medication[];
  records: DoseRecord[];
  onTriggerConfirmation: (med: Medication) => void;
  onCallCaregiver: () => void;
}

export const IdosoHomeView: React.FC<IdosoHomeViewProps> = ({
  patient,
  medications,
  records,
  onTriggerConfirmation,
  onCallCaregiver,
}) => {
  // Find next medicine (Losartana or first pending)
  const nextMed = medications.find((m) => m.name.toLowerCase().includes('losartana')) || medications[1] || medications[0];
  const laterMeds = medications.filter((m) => m.id !== nextMed?.id && m.shift !== 'manha');

  const confirmedCount = records.filter((r) => r.status === 'confirmed').length;

  return (
    <div className="space-y-6 pb-24 pt-4 px-4">
      {/* Salutation */}
      <div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight leading-tight">
          Bom dia, <br />
          Dona {patient.name}
        </h1>
        <p className="mt-1 text-sm font-semibold text-gray-500">
          09:40 Quarta-feira, 24 de Outubro
        </p>
      </div>

      {/* Routine Status Card */}
      <div className="flex items-center gap-3.5 rounded-2xl bg-[#EAF3F0] p-4 border border-[#D1E9E6]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#175246] text-white">
          <Smile className="h-6 w-6 text-emerald-200" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#112A24]">
            Tudo certo por aqui hoje!
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Seus {confirmedCount || 2} remédios da manhã já foram tomados.
          </p>
        </div>
      </div>

      {/* Next Medication Section */}
      {nextMed && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Seu próximo medicamento
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              <Clock className="h-3 w-3" />
              Faltam 20 minutos
            </span>
          </div>

          <div className="rounded-3xl border-2 border-blue-200 bg-white shadow-sm overflow-hidden">
            {/* Blue pill header */}
            <div className="flex items-center justify-between bg-blue-50 px-5 py-3 border-b border-blue-100">
              <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-sm">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{nextMed.scheduleTimes[0] || '10:00'} da manhã</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                <span className="text-base leading-none text-black">{nextMed.visualSymbol.symbol}</span>
                <span>Símbolo: {nextMed.visualSymbol.label}</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-2xl font-black text-[#112A24] leading-tight">
                {nextMed.name}
              </h3>
              <p className="text-sm font-semibold text-gray-600 mt-0.5">
                {nextMed.prescribedDose} • 1 comprimido
              </p>

              {/* Box Photo & Visual Tag */}
              <div className="mt-4 rounded-2xl bg-gray-50 p-4 border border-gray-100 flex items-center gap-4">
                <img
                  src={nextMed.packagePhotoUrl}
                  alt={nextMed.name}
                  className="h-20 w-24 object-cover rounded-xl border border-gray-200 shadow-xs shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wide uppercase bg-blue-100 text-blue-800 border border-blue-200">
                    ● {nextMed.visualColor.name}
                  </span>
                  <p className="text-xs font-bold text-gray-800 leading-snug">
                    {nextMed.doseInstructions}
                  </p>
                  <p className="text-xs text-gray-500 leading-snug">
                    {nextMed.usageNote || 'Uso contínuo após o café.'}
                  </p>
                </div>
              </div>

              {/* Big Action Button */}
              <button
                onClick={() => onTriggerConfirmation(nextMed)}
                className="mt-5 w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#175246] text-white font-black text-lg hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                <span>Já tomei este remédio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mais tarde hoje */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
            Mais tarde hoje
          </span>
          <span className="text-xs font-semibold text-gray-500">
            {laterMeds.length} horários restantes
          </span>
        </div>

        <div className="space-y-3">
          {laterMeds.map((med) => (
            <div
              key={med.id}
              onClick={() => onTriggerConfirmation(med)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-[#175246] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={med.packagePhotoUrl}
                  alt={med.name}
                  className="h-14 w-14 rounded-xl object-cover border border-gray-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#112A24]">
                      {med.scheduleTimes[0]}
                    </span>
                    <span className="text-xs font-bold text-gray-700">
                      {med.visualSymbol.symbol} {med.visualSymbol.label}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mt-0.5">
                    {med.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {med.doseInstructions}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-amber-800">
                    ● {med.visualColor.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caregiver call bar */}
      <div className="rounded-2xl bg-[#EAF3F0] p-4 border border-[#D1E9E6] space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#175246] text-white">
            <Phone className="h-5 w-5 text-emerald-200" />
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">Precisa de conversa ou dúvida?</p>
            <p className="text-sm font-black text-[#112A24]">{patient.caregiverName}</p>
          </div>
        </div>

        <button
          onClick={onCallCaregiver}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#175246] text-white font-bold text-sm hover:bg-[#124238] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Phone className="h-4 w-4" />
          <span>Ligar para Cláudia</span>
        </button>
      </div>
    </div>
  );
};
