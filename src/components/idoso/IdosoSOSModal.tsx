import React, { useState } from 'react';
import { AlertTriangle, Phone, CheckCircle2, X } from 'lucide-react';
import { Patient } from '../../types';

interface IdosoSOSModalProps {
  patient: Patient;
  onClose: () => void;
}

export const IdosoSOSModal: React.FC<IdosoSOSModalProps> = ({ patient, onClose }) => {
  const [alertSent, setAlertSent] = useState(false);

  const handleSendEmergencyAlert = () => {
    setAlertSent(true);
    setTimeout(() => {
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-black">SOS - Ajuda Rápida</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {alertSent ? (
          <div className="text-center py-6 space-y-3">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 animate-pulse">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Alerta de Emergência Enviado!</h3>
            <p className="text-sm text-gray-600">
              {patient.caregiverName} recebeu seu chamado prioritário com sua localização aproximada. Mantenha a calma.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Você não está se sentindo bem ou precisa de atendimento imediato?
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSendEmergencyAlert}
                className="w-full py-4 rounded-2xl bg-red-600 text-white font-black text-base flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>AVISAR CUIDADORA AGORA</span>
              </button>

              <button
                onClick={() => alert('Ligando para SAMU (192)...')}
                className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <Phone className="h-5 w-5" />
                <span>LIGAR PARA SAMU (192)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              >
                Voltar / Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
