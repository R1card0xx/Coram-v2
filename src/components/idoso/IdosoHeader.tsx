import React from 'react';
import { User, AlertTriangle } from 'lucide-react';

interface IdosoHeaderProps {
  onOpenSOS: () => void;
  onOpenAccessibility: () => void;
}

export const IdosoHeader: React.FC<IdosoHeaderProps> = ({
  onOpenSOS,
  onOpenAccessibility,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-5 py-3.5 border-b border-gray-100 shadow-xs">
      {/* Brand logo */}
      <div className="flex items-center gap-1">
        <img
          src="/assets/aistudio/App-logo_83c67dbf.svg"
          alt="Coram+"
          className="h-8 object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* SOS Alert Badge */}
        <button
          onClick={onOpenSOS}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-extrabold text-xs tracking-wider border border-red-200 hover:bg-red-200 active:scale-95 transition-all cursor-pointer"
        >
          <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
          <span>SOS Ajuda</span>
        </button>

        {/* User Profile / Accessibility Icon */}
        <button
          onClick={onOpenAccessibility}
          aria-label="Abrir perfil e configurações de acessibilidade"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#175246] text-white hover:bg-[#124238] active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
