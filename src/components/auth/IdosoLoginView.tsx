import React, { useState, useRef } from 'react';
import { ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storage';
import { Patient } from '../../types';

interface IdosoLoginViewProps {
  onBack: () => void;
  onSuccess: (patient: Patient) => void;
}

export const IdosoLoginView: React.FC<IdosoLoginViewProps> = ({ onBack, onSuccess }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...digits];

    if (cleaned.length > 0) {
      newDigits[index] = cleaned[cleaned.length - 1];
      setDigits(newDigits);
      setError(null);
      // Move to next input if available
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      newDigits[index] = '';
      setDigits(newDigits);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      const newDigits = [...digits];
      for (let i = 0; i < pasteData.length; i++) {
        newDigits[i] = pasteData[i];
      }
      setDigits(newDigits);
      if (pasteData.length === 6) {
        inputRefs.current[5]?.focus();
      } else {
        inputRefs.current[pasteData.length]?.focus();
      }
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) {
      setError('Por favor, digite os 6 dígitos do código.');
      return;
    }

    const patient = storageService.getPatientByCode(code);
    if (!patient) {
      setError('Código não encontrado. Verifique com seu responsável ou cuidador.');
      return;
    }

    // Save session
    storageService.saveSession({
      role: 'idoso',
      patientId: patient.id,
      patientName: patient.name,
    });

    onSuccess(patient);
  };

  const handleFillDemoCode = () => {
    setDigits(['6', '5', '6', '8', '3', '8']);
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col justify-between bg-white px-6 py-6 overflow-hidden select-none">
      {/* Top right decorative circle */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full border-[10px] border-[#185346]" />

      <div className="relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#112A24] text-base font-medium py-2 hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>

        {/* Logo */}
        <div className="mt-8 mb-8">
          <img
            src="/assets/aistudio/App-logo_83c67dbf.svg"
            alt="Coram+"
            className="h-9 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Vamos começar?
        </h1>
        <p className="mt-2.5 text-base text-gray-700 leading-relaxed font-normal">
          Peça ao seu cuidador ou responsável o código de acesso para entrar no CORAM.
        </p>

        {/* Code Input Form */}
        <form onSubmit={handleContinue} className="mt-10">
          <label className="block text-sm font-semibold text-[#185346] mb-3">
            Código de acesso
          </label>

          <div className="flex justify-between gap-2">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="h-14 w-12 text-center text-2xl font-bold text-[#112A24] bg-white rounded-xl border-2 border-gray-300 focus:border-[#175246] focus:outline-none focus:ring-2 focus:ring-[#175246]/20 transition-all shadow-xs"
              />
            ))}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Helper */}
          <div className="mt-6 p-3 bg-[#EAF3F0] rounded-xl flex items-center justify-between text-xs text-[#185346]">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#175246]" />
              <span>Código teste (Dona Maria): <strong>656838</strong></span>
            </div>
            <button
              type="button"
              onClick={handleFillDemoCode}
              className="text-xs font-bold underline hover:text-[#112A24] cursor-pointer"
            >
              Preencher
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#175246] text-white font-bold text-lg hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>

      {/* Bottom decorative arc */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[10px] border-[#185346]" />
    </div>
  );
};
