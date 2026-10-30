import React, { useState } from 'react';
import { Phone, MessageCircle, AlertTriangle, CheckCircle2, Stethoscope } from 'lucide-react';
import { Patient } from '../../types';

interface IdosoCuidadorViewProps {
  patient: Patient;
  onOpenSOSModal: () => void;
}

export const IdosoCuidadorView: React.FC<IdosoCuidadorViewProps> = ({
  patient,
  onOpenSOSModal,
}) => {
  const [callAlert, setCallAlert] = useState<string | null>(null);

  const handleCall = (name: string, phone: string) => {
    setCallAlert(`Ligando para ${name} (${phone})...`);
    setTimeout(() => setCallAlert(null), 3000);
  };

  const handleWhatsApp = (name: string) => {
    setCallAlert(`Abrindo conversa de voz no WhatsApp com ${name}...`);
    setTimeout(() => setCallAlert(null), 3000);
  };

  return (
    <div className="space-y-6 pb-24 pt-3 px-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Rede Ativa</span>
        </div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Quem Cuida de Você
        </h1>
        <p className="mt-1 text-sm text-gray-600 font-normal leading-relaxed">
          Toque no botão verde grande para falar agora por telefone ou mensagem.
        </p>
      </div>

      {callAlert && (
        <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{callAlert}</span>
        </div>
      )}

      {/* Main Caregiver Card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
            SUA CUIDADORA PRINCIPAL
          </span>
          <div className="mt-3 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                alt={patient.caregiverName}
                className="h-24 w-24 rounded-full object-cover border-4 border-[#EAF3F0] shadow-sm"
              />
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
          </div>
          <h2 className="text-xl font-black text-[#112A24] mt-2">
            {patient.caregiverName}
          </h2>
          <p className="text-xs font-bold text-emerald-700 mt-0.5">
            Disponível agora • Cuidando de você hoje
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => handleCall('Cláudia', patient.caregiverPhone || '(11) 98765-4321')}
            className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-base flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <Phone className="h-5 w-5" />
            <span>LIGAR PARA CLÁUDIA</span>
          </button>

          <button
            onClick={() => handleWhatsApp('Cláudia')}
            className="w-full py-3.5 rounded-2xl bg-[#EAF3F0] text-[#175246] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#DCEBE6] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle className="h-5 w-5 text-emerald-700" />
            <span>MANDAR ÁUDIO NO WHATSAPP</span>
          </button>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 border border-gray-100 flex items-start gap-2.5 text-xs text-gray-600">
          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
          <p>
            A Cláudia recebe uma notificação no celular dela toda vez que você aperta o botão <strong>"JÁ TOMEI"</strong> nos remédios.
          </p>
        </div>
      </div>

      {/* Medical Support Doctor Card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div className="text-center">
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
            Apoio Médico
          </span>
          <div className="mt-3 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
              alt="Médico"
              className="h-20 w-20 rounded-full object-cover border-4 border-gray-100 shadow-sm"
            />
          </div>
          <h3 className="text-base font-black text-[#112A24] mt-2">
            {patient.doctorName || 'Dr. Fernando (Médico Geriatra)'}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {patient.clinicInfo || 'Consultório Dra. Saúde • Seg a Sex 08h-18h'}
          </p>
        </div>

        <button
          onClick={() => handleCall('Consultório', patient.doctorPhone || '(11) 3456-7890')}
          className="w-full py-3 rounded-xl bg-white border-2 border-[#175246] text-[#175246] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#EAF3F0] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Stethoscope className="h-4 w-4" />
          <span>Ligar para o Consultório</span>
        </button>
      </div>

      {/* SOS Immediate Emergency Card */}
      <div className="rounded-3xl bg-red-50 border-2 border-red-200 p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5 text-red-700">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <h4 className="text-sm font-black uppercase tracking-wide">
            Precisa de Ajuda Imediata?
          </h4>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed font-normal">
          Aperte este botão se não estiver se sentindo bem. Vamos avisar a Cláudia e enviar sua localização agora mesmo.
        </p>

        <button
          onClick={onOpenSOSModal}
          className="w-full py-4 rounded-2xl bg-red-600 text-white font-black text-base flex items-center justify-center gap-2 hover:bg-red-700 active:scale-[0.98] transition-all shadow-md cursor-pointer animate-pulse"
        >
          <span>SOS AJUDA RÁPIDA</span>
        </button>
      </div>
    </div>
  );
};
