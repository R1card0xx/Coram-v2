import React, { useState } from 'react';
import { ArrowLeft, User, LogOut, ChevronRight, Shield, FileText, HelpCircle, Bell, KeyRound } from 'lucide-react';

interface ResponsavelPerfilViewProps {
  userName: string;
  userEmail?: string;
  onLogout: () => void;
  onBack: () => void;
}

export const ResponsavelPerfilView: React.FC<ResponsavelPerfilViewProps> = ({
  userName,
  userEmail,
  onLogout,
  onBack,
}) => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#112A24] text-sm font-semibold hover:opacity-80 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Perfil e configurações
        </h1>
      </div>

      {/* User profile banner */}
      <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-white border border-gray-200 shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#112A24] text-white">
          <User className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#112A24]">
            {userName || 'Enf. Mateus'}
          </h2>
          <p className="text-xs text-gray-500">{userEmail || 'mateus@enfermagem.com'}</p>
        </div>
      </div>

      {/* Section: Perfil */}
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 pl-2">
          Perfil
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => setModalContent('Editar dados pessoais')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Editar dados pessoais</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setModalContent('Alterar senha')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Alterar senha</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setModalContent('Gerenciar notificações')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Gerenciar notificações</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Section: Outros */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 pl-2">
          Outros
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => setModalContent('Ajuda e suporte')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Ajuda e suporte</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setModalContent('Política de privacidade')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Política de privacidade</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setModalContent('Termos de uso')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#175246] transition-all cursor-pointer shadow-xs"
          >
            <span className="text-sm font-bold text-[#112A24]">Termos de uso</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          {/* Sair da conta (Explicit Logout) */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-all cursor-pointer shadow-xs mt-4"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <LogOut className="h-4 w-4" />
              <span>Sair da conta</span>
            </div>
            <span className="text-xs font-semibold">Encerrar sessão</span>
          </button>
        </div>
      </div>

      {/* Info modal for generic terms/support */}
      {modalContent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h2 className="text-lg font-black text-[#112A24]">{modalContent}</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              O CORAM foi desenvolvido para oferecer suporte e organização na rotina de cuidados de saúde. As informações cadastradas permanecem seguras e protegidas neste dispositivo.
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-3 rounded-xl bg-[#175246] text-white font-bold text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
