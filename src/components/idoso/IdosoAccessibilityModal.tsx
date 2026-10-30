import React, { useState } from 'react';
import { ArrowLeft, User, LogOut, Check } from 'lucide-react';
import { AccessibilitySettings, Patient } from '../../types';
import { storageService } from '../../services/storage';

interface IdosoAccessibilityModalProps {
  patient: Patient;
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: AccessibilitySettings) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const IdosoAccessibilityModal: React.FC<IdosoAccessibilityModalProps> = ({
  patient,
  settings,
  onUpdateSettings,
  onLogout,
  onClose,
}) => {
  const [current, setCurrent] = useState<AccessibilitySettings>(settings);

  const handleSizeChange = (size: 'padrao' | 'grande' | 'muito-grande') => {
    const updated = { ...current, textSize: size };
    setCurrent(updated);
    storageService.saveAccessibility(updated);
    onUpdateSettings(updated);
  };

  const handleToggleContrast = () => {
    const updated = { ...current, highContrast: !current.highContrast };
    setCurrent(updated);
    storageService.saveAccessibility(updated);
    onUpdateSettings(updated);
  };

  const handleToggleExplanations = () => {
    const updated = { ...current, showExplanations: !current.showExplanations };
    setCurrent(updated);
    storageService.saveAccessibility(updated);
    onUpdateSettings(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-gray-700 font-bold text-sm hover:opacity-80 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          <h2 className="text-base font-black text-[#112A24]">
            Perfil e acessibilidade
          </h2>
          <div className="w-12" />
        </div>

        <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* User badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#175246] text-white">
              <User className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#112A24]">{patient.name}</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                ✓ Preferências salvas
              </span>
            </div>
          </div>

          {/* Text Size */}
          <div className="space-y-3">
            <div>
              <h4 className="text-base font-black text-[#112A24]">Tamanho do texto</h4>
              <p className="text-xs text-gray-500">Escolha o tamanho mais confortável.</p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'padrao', label: 'Padrão' },
                { id: 'grande', label: 'Grande' },
                { id: 'muito-grande', label: 'Muito grande' },
              ].map((opt) => {
                const isSelected = current.textSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSizeChange(opt.id as any)}
                    className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#175246] bg-[#EAF3F0] font-black text-[#175246]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold bg-[#175246] text-white px-2.5 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> selecionado
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Preview Box */}
            <div className="rounded-2xl bg-gray-50 p-3.5 border border-gray-200">
              <span className="text-[11px] font-bold text-gray-400 block mb-1">
                Prévia do texto {current.textSize}:
              </span>
              <p
                className={`text-[#112A24] font-black ${
                  current.textSize === 'muito-grande'
                    ? 'text-xl'
                    : current.textSize === 'grande'
                    ? 'text-lg'
                    : 'text-base'
                }`}
              >
                Seu cuidado, no seu tempo.
              </p>
            </div>
          </div>

          {/* Contrast & Reading */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="text-base font-black text-[#112A24]">Contraste e leitura</h4>

            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200">
              <div>
                <span className="text-sm font-bold text-[#112A24] block">Alto contraste</span>
                <span className="text-xs text-gray-500">
                  Deixa os textos e controles mais fáceis de distinguir.
                </span>
              </div>
              <button
                onClick={handleToggleContrast}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  current.highContrast ? 'bg-[#175246]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    current.highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Usage Preferences */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="text-base font-black text-[#112A24]">Preferências de uso</h4>

            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200">
              <div>
                <span className="text-sm font-bold text-[#112A24] block">Mostrar explicações</span>
                <span className="text-xs text-gray-500">
                  Mantém as instruções curtas visíveis nas telas.
                </span>
              </div>
              <button
                onClick={handleToggleExplanations}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  current.showExplanations ? 'bg-[#175246]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    current.showExplanations ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Actions: Concluir & Sair da conta */}
          <div className="space-y-2.5 pt-4">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-base flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <span>Concluir</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full py-3 rounded-2xl bg-red-50 text-red-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 active:scale-95 transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair da conta (Trocar usuário)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
