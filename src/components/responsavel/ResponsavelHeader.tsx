import React from 'react';
import { User } from 'lucide-react';

interface ResponsavelHeaderProps {
  onOpenProfile: () => void;
}

export const ResponsavelHeader: React.FC<ResponsavelHeaderProps> = ({ onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-5 py-3.5 border-b border-gray-100 shadow-xs">
      <div className="flex items-center gap-1">
        <img
          src="/assets/aistudio/App-logo_83c67dbf.svg"
          alt="Coram+"
          className="h-8 object-contain"
        />
      </div>

      <button
        onClick={onOpenProfile}
        aria-label="Abrir perfil do responsável"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#112A24] text-white hover:bg-[#185346] active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        <User className="h-5 w-5" />
      </button>
    </header>
  );
};
