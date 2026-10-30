import React from 'react';
import { Users, User } from 'lucide-react';

interface WelcomeViewProps {
  onSelectRole: (role: 'responsavel' | 'idoso') => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onSelectRole }) => {
  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col justify-between bg-white px-6 py-8 overflow-hidden select-none">
      {/* Top right decorative circle */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full border-[10px] border-[#185346]" />

      {/* Main Content */}
      <div className="relative z-10 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-1.5 mb-10">
          <img
            src="/assets/aistudio/App-logo_83c67dbf.svg"
            alt="Coram+"
            className="h-10 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#112A24] leading-tight">
          Bem-vindo ao <br />
          <span className="text-[#176B63]">Coram!</span>
        </h1>

        <p className="mt-3 text-base text-gray-700 font-normal leading-relaxed">
          Cuidado, autonomia e segurança na sua rotina.
        </p>

        {/* Mode Selector Section */}
        <div className="mt-12">
          <h2 className="text-center text-lg font-bold text-[#185346] mb-6">
            Como deseja acessar?
          </h2>

          <div className="space-y-4">
            {/* Card 1: Profissional ou responsável */}
            <button
              onClick={() => onSelectRole('responsavel')}
              className="w-full text-left p-5 rounded-2xl bg-[#175246] text-white shadow-sm hover:bg-[#124238] active:scale-[0.98] transition-all flex items-start gap-4 cursor-pointer"
            >
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-lg font-bold leading-tight">
                  Sou profissional ou responsável
                </span>
                <span className="mt-1 block text-xs text-white/85 leading-normal">
                  Gerencie medicamentos, horários e acompanhe os cuidados.
                </span>
              </div>
            </button>

            {/* Card 2: Paciente (Idoso) */}
            <button
              onClick={() => onSelectRole('idoso')}
              className="w-full text-left p-5 rounded-2xl bg-white border-2 border-[#175246] text-[#112A24] shadow-sm hover:bg-[#EAF3F0] active:scale-[0.98] transition-all flex items-start gap-4 cursor-pointer"
            >
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#175246]/10">
                <User className="h-6 w-6 text-[#175246]" />
              </div>
              <div>
                <span className="block text-lg font-bold text-[#175246] leading-tight">
                  Sou paciente
                </span>
                <span className="mt-1 block text-xs text-gray-600 leading-normal">
                  Consulte seus medicamentos, receba lembretes e acompanhe sua rotina.
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative arc */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[10px] border-[#185346]" />
    </div>
  );
};
