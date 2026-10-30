import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, AlertCircle, Copy, CheckCheck } from 'lucide-react';
import { Patient } from '../../types';
import { generateAccessCode } from '../../utils/rules';

interface ResponsavelPacientesViewProps {
  patients: Patient[];
  activePatient: Patient;
  onSelectPatient: (patient: Patient) => void;
  onSavePatient: (patient: Omit<Patient, 'id'>) => void;
  onOpenMedicamentos: () => void;
  onOpenHistorico: () => void;
  onBack: () => void;
}

export const ResponsavelPacientesView: React.FC<ResponsavelPacientesViewProps> = ({
  patients,
  activePatient,
  onSelectPatient,
  onSavePatient,
  onOpenMedicamentos,
  onOpenHistorico,
  onBack,
}) => {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setError('Por favor, informe o nome da pessoa.');
      return;
    }
    if (!consent) {
      setError('É obrigatório que a pessoa tenha autorizado o acompanhamento.');
      return;
    }

    const generatedCode = generateAccessCode();
    onSavePatient({
      name: newName.trim(),
      age: parseInt(newAge, 10) || 75,
      accessCode: generatedCode,
      consentGiven: true,
      caregiverName: 'Responsável Autorizado',
    });

    setNewName('');
    setNewAge('');
    setConsent(false);
    setError(null);
    setShowAddForm(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Top back navigation */}
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
          Pessoas acompanhadas
        </h1>
        <p className="text-xs font-black text-emerald-800 uppercase tracking-wide mt-1">
          Área do responsável
        </p>
        <p className="text-xs text-gray-500 font-normal">
          Profissional ou responsável autorizado
        </p>
      </div>

      {/* Pessoas salvas Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#112A24]">Pessoas salvas</h2>

        {patients.map((patient) => {
          const isSelected = patient.id === activePatient.id;

          return (
            <div
              key={patient.id}
              className={`rounded-3xl border bg-white p-5 shadow-xs space-y-4 transition-all ${
                isSelected ? 'border-[#175246] ring-1 ring-[#175246]/20' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3F0] text-xl font-black text-[#175246]">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#112A24]">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {patient.age || 79} anos • código: <strong>{patient.accessCode}</strong>
                    </p>
                  </div>
                </div>

                {isSelected && <Check className="h-5 w-5 text-[#175246]" />}
              </div>

              {/* Code copy badge for the caregiver */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-600">
                  Código de acesso do idoso: <strong>{patient.accessCode}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(patient.accessCode)}
                  className="flex items-center gap-1 font-bold text-[#175246] hover:underline cursor-pointer"
                >
                  {copiedCode === patient.accessCode ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {isSelected && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#175246]">
                    <Check className="h-4 w-4" />
                    <span>{patient.name} selecionada</span>
                  </div>

                  {/* Gerenciar medicamentos */}
                  <button
                    onClick={onOpenMedicamentos}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer"
                  >
                    <div>
                      <span className="block text-sm font-black text-[#112A24]">
                        Gerenciar medicamentos
                      </span>
                      <span className="text-xs text-gray-500">
                        Cadastrar, ver detalhes e horários
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>

                  {/* Histórico de confirmações */}
                  <button
                    onClick={onOpenHistorico}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:border-[#175246] text-left transition-all cursor-pointer"
                  >
                    <div>
                      <span className="block text-sm font-black text-[#112A24]">
                        Histórico de confirmações
                      </span>
                      <span className="text-xs text-gray-500">
                        Consultar os registros de {patient.name}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              )}

              {!isSelected && (
                <button
                  onClick={() => onSelectPatient(patient)}
                  className="w-full py-2.5 rounded-xl border border-[#175246] text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
                >
                  Selecionar esta pessoa
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Adicionar nova pessoa Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#112A24]">
            Adicionar nova pessoa
          </h2>
          <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
            Rascunho • não salvo
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#185346] mb-1.5">
              Nome para identificar
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Digite o nome da pessoa"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#185346] mb-1.5">
              Idade (opcional)
            </label>
            <input
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
              placeholder="Ex: 80"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-1.5 pt-1">
            <span className="block text-xs font-semibold text-[#185346]">
              Autorização para acompanhar
            </span>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded text-[#175246] focus:ring-[#175246] border-gray-300"
              />
              <span className="text-xs text-gray-800 font-medium leading-snug">
                A pessoa autorizou meu acompanhamento.
              </span>
            </label>
            <p className="text-[11px] text-gray-500 italic pl-6">
              É necessário consentimento ou autorização. Acompanhe somente quem autorizou.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setNewName('');
                setConsent(false);
                setError(null);
              }}
              className="flex-1 py-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl bg-[#175246] text-white text-xs font-black hover:bg-[#124238] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Salvar pessoa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
