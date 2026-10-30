import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storage';

interface ResponsavelRegisterViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ResponsavelRegisterView: React.FC<ResponsavelRegisterViewProps> = ({
  onBack,
  onSuccess,
}) => {
  const [profileType, setProfileType] = useState<'responsavel' | 'profissional'>('responsavel');
  const [step, setStep] = useState<number>(1);

  // Form states
  const [relationship, setRelationship] = useState('Familiar / Filho(a)');
  
  // Professional data
  const [profession, setProfession] = useState('Enfermeiro(a)');
  const [council, setCouncil] = useState('COREN');
  const [councilNumber, setCouncilNumber] = useState('');
  const [councilUF, setCouncilUF] = useState('SP');
  const [workplace, setWorkplace] = useState('');
  const [city, setCity] = useState('');
  const [stateUF, setStateUF] = useState('SP');
  const [workHours, setWorkHours] = useState('08h às 18h');

  // Personal data
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (profileType === 'responsavel') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3); // Go to personal data
      } else {
        // Submit
        submitRegistration();
      }
    } else {
      // Profissional
      if (step === 1) {
        setStep(2); // Professional registry
      } else if (step === 2) {
        setStep(3); // Workplace
      } else if (step === 3) {
        setStep(4); // Personal data
      } else {
        submitRegistration();
      }
    }
  };

  const submitRegistration = () => {
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Informe e-mail e senha para criar sua conta.');
      return;
    }

    // Save session
    storageService.saveSession({
      role: 'responsavel',
      userName: name.trim(),
      userEmail: email.trim(),
      isProfessional: profileType === 'profissional',
    });

    onSuccess();
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col justify-between bg-white px-6 py-6 overflow-hidden select-none">
      {/* Top right decorative circle */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full border-[10px] border-[#185346]" />

      <div className="relative z-10">
        {/* Back Button */}
        <button
          onClick={handleBackStep}
          className="flex items-center gap-2 text-[#112A24] text-base font-medium py-2 hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>

        {/* Logo */}
        <div className="mt-6 mb-6">
          <img
            src="/assets/aistudio/App-logo_83c67dbf.svg"
            alt="Coram+"
            className="h-9 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          Criar conta
        </h1>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed font-normal">
          Crie sua conta e faça parte de uma rotina de cuidados mais simples, organizada e acolhedora.
        </p>

        <form onSubmit={handleNext} className="mt-6 space-y-4">
          {/* STEP 1: Escolha do perfil */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#185346] mb-2">
                  Você é profissional ou responsável?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setProfileType('responsavel')}
                    className={`w-full p-4 rounded-xl text-left border-2 flex items-center justify-between cursor-pointer transition-all ${
                      profileType === 'responsavel'
                        ? 'border-[#175246] bg-[#EAF3F0] font-bold text-[#175246]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>Responsável</span>
                    {profileType === 'responsavel' && <span className="text-xs bg-[#175246] text-white px-2 py-0.5 rounded-full">Selecionado</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileType('profissional')}
                    className={`w-full p-4 rounded-xl text-left border-2 flex items-center justify-between cursor-pointer transition-all ${
                      profileType === 'profissional'
                        ? 'border-[#175246] bg-[#EAF3F0] font-bold text-[#175246]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>Profissional de Saúde</span>
                    {profileType === 'profissional' && <span className="text-xs bg-[#175246] text-white px-2 py-0.5 rounded-full">Selecionado</span>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESPONSAVEL STEP 2: Relação com o paciente */}
          {profileType === 'responsavel' && step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#185346] mb-1.5">
                  Qual sua relação com o paciente?
                </label>
                <input
                  type="text"
                  required
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="Ex: Filho(a), Cônjuge, Cuidador"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 focus:border-[#175246] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* PROFISSIONAL STEP 2: Registro profissional */}
          {profileType === 'profissional' && step === 2 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#185346]">Registro profissional</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Profissão</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Enfermeiro(a), Médico(a)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Conselho profissional</label>
                <input
                  type="text"
                  value={council}
                  onChange={(e) => setCouncil(e.target.value)}
                  placeholder="COREN, CRM"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Número de registro</label>
                  <input
                    type="text"
                    value={councilNumber}
                    onChange={(e) => setCouncilNumber(e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">UF</label>
                  <input
                    type="text"
                    value={councilUF}
                    onChange={(e) => setCouncilUF(e.target.value)}
                    placeholder="SP"
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm uppercase focus:border-[#175246] focus:outline-none text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROFISSIONAL STEP 3: Local de trabalho */}
          {profileType === 'profissional' && step === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#185346]">Local de trabalho</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Endereço / Unidade</label>
                <input
                  type="text"
                  value={workplace}
                  onChange={(e) => setWorkplace(e.target.value)}
                  placeholder="Av. Principal, 100 - Clínica Bem Viver"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="São Paulo"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Estado (UF)</label>
                  <input
                    type="text"
                    value={stateUF}
                    onChange={(e) => setStateUF(e.target.value)}
                    placeholder="SP"
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm uppercase focus:border-[#175246] focus:outline-none text-center"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Horário de funcionamento</label>
                <input
                  type="text"
                  value={workHours}
                  onChange={(e) => setWorkHours(e.target.value)}
                  placeholder="08h às 18h"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* FINAL STEP: Dados pessoais (Nome, CPF, Data Nasc, Número, E-mail, Senha) */}
          {((profileType === 'responsavel' && step === 3) || (profileType === 'profissional' && step === 4)) && (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">Nome completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Fulano da Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">Data de Nascimento</label>
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="00/00/0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">Telefone (Número)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 90000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#185346] mb-1">Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
                />
              </div>
            </div>
          )}

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
              {((profileType === 'responsavel' && step === 3) || (profileType === 'profissional' && step === 4))
                ? 'Concluir cadastro'
                : 'Continuar'}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom decorative arc */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[10px] border-[#185346]" />
    </div>
  );
};
