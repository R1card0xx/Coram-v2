import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storage';

interface ResponsavelLoginViewProps {
  onBack: () => void;
  onSuccess: () => void;
  onGoToRegister: () => void;
}

export const ResponsavelLoginView: React.FC<ResponsavelLoginViewProps> = ({
  onBack,
  onSuccess,
  onGoToRegister,
}) => {
  const [email, setEmail] = useState('mateus@enfermagem.com');
  const [password, setPassword] = useState('senha123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Por favor, informe e-mail e senha.');
      return;
    }

    // Authenticate and save session
    storageService.saveSession({
      role: 'responsavel',
      userName: 'Enf. Mateus',
      userEmail: email.trim(),
      isProfessional: true,
    });

    onSuccess();
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
          Acesso do <br />
          responsável
        </h1>
        <p className="mt-2 text-base text-gray-700 leading-relaxed font-normal">
          Acesse sua conta para continuar cuidando de quem importa.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#185346] mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#175246] focus:outline-none focus:ring-2 focus:ring-[#175246]/10 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#185346] mb-1.5">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#175246] focus:outline-none focus:ring-2 focus:ring-[#175246]/10 text-base"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#175246] text-white font-bold text-lg hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              Continuar
            </button>
          </div>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-600">Não tem uma conta?</p>
            <button
              type="button"
              onClick={onGoToRegister}
              className="mt-1 text-base font-bold text-[#175246] hover:underline cursor-pointer"
            >
              Cadastre-se
            </button>
          </div>
        </form>
      </div>

      {/* Bottom decorative arc */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[10px] border-[#185346]" />
    </div>
  );
};
