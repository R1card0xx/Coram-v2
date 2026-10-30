import React, { useState } from 'react';
import { ArrowLeft, Plus, FileText, AlertCircle, Edit2 } from 'lucide-react';
import { PrescriptionRef, Patient } from '../../types';

interface ResponsavelReceituarioViewProps {
  patient: Patient;
  prescriptions: PrescriptionRef[];
  onBack: () => void;
}

export const ResponsavelReceituarioView: React.FC<ResponsavelReceituarioViewProps> = ({
  patient,
  prescriptions,
  onBack,
}) => {
  const [selectedRef, setSelectedRef] = useState<PrescriptionRef | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMed, setNewMed] = useState('Medicamento A');
  const [refsList, setRefsList] = useState<PrescriptionRef[]>(prescriptions);

  const handleAddRef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPresc: PrescriptionRef = {
      id: `presc-${Date.now()}`,
      patientId: patient.id,
      title: newTitle.trim(),
      medicationName: newMed,
      doctorName: 'Dr. Fernando',
      date: new Date().toLocaleDateString('pt-BR'),
      notes: 'Consulte o documento original emitido pelo profissional prescritor.',
      hasDocument: false,
    };

    setRefsList([...refsList, newPresc]);
    setNewTitle('');
    setShowAddModal(false);
  };

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
          Receituário
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Guarde referências para encontrar suas receitas com facilidade.
        </p>
      </div>

      {/* Add Reference Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-3.5 rounded-2xl bg-[#175246] text-white font-black text-xs flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Adicionar referência de receita</span>
      </button>

      {/* List of references */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
          <span>Suas referências</span>
          <span>{refsList.length} referências cadastradas</span>
        </div>

        {refsList.map((ref) => (
          <div
            key={ref.id}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#112A24]">{ref.title}</h3>
                <p className="text-xs text-gray-600">{ref.medicationName || 'Medicamento'}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-gray-400" />
              <span>Sem documento anexado</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Nome de organização. Não é uma receita médica.
            </p>

            <button
              onClick={() => setSelectedRef(ref)}
              className="w-full py-2.5 rounded-xl border border-[#175246] text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
            >
              Ver referência
            </button>
          </div>
        ))}

        {/* Empty placeholder card matching PDF */}
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 space-y-1">
          <h4 className="text-xs font-black text-gray-700">Medicamento B</h4>
          <p className="text-xs text-gray-500">
            Ainda não há referência de receita vinculada.
          </p>
        </div>
      </div>

      {/* Manual fill info note */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-gray-50 text-gray-500 text-xs border border-gray-200">
        <AlertCircle className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
        <p>
          O preenchimento é manual. Não há leitura automática nem validação de receitas neste exemplo.
        </p>
      </div>

      {/* Detail Reference Modal (Matches Page 3 of respons_vel_b8f1702c.pdf) */}
      {selectedRef && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-black text-[#112A24]">
                {selectedRef.title}
              </h2>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Exemplo • sem valor clínico
              </span>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center border border-gray-200 space-y-2">
              <FileText className="h-10 w-10 text-gray-400 mx-auto" />
              <h3 className="text-sm font-black text-[#112A24]">
                Nenhuma receita anexada
              </h3>
              <p className="text-xs text-gray-500">
                Esta tela não contém documento, assinatura ou prescrição médica.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-gray-200 p-4 text-xs">
              <div>
                <span className="font-bold text-gray-400 block">Medicamento vinculado</span>
                <span className="text-sm font-black text-[#112A24]">
                  {selectedRef.medicationName || 'Medicamento A'}
                </span>
              </div>
              <div className="pt-2 border-t">
                <span className="font-bold text-gray-400 block">Data da receita</span>
                <span className="text-sm font-semibold text-gray-700">
                  {selectedRef.date || 'Não informado'}
                </span>
              </div>
              <div className="pt-2 border-t">
                <span className="font-bold text-gray-400 block">Profissional responsável</span>
                <span className="text-sm font-semibold text-gray-700">
                  {selectedRef.doctorName || 'Não informado'}
                </span>
              </div>
              <div className="pt-2 border-t">
                <span className="font-bold text-gray-400 block">Orientações clínicas</span>
                <span className="text-sm font-semibold text-gray-700">
                  Consulte sua receita original
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 text-[11px] text-gray-500 border">
              <AlertCircle className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
              <p>
                Esta referência serve apenas para organização. Use o documento original para conferir as informações.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setSelectedRef(null)}
                className="w-full py-3.5 rounded-xl bg-[#175246] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Editar referência</span>
              </button>

              <button
                onClick={() => setSelectedRef(null)}
                className="w-full py-3 rounded-xl border border-[#175246] text-[#175246] font-bold text-xs cursor-pointer"
              >
                Voltar ao receituário
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Reference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h2 className="text-lg font-black text-[#112A24]">
              Adicionar referência de receita
            </h2>
            <form onSubmit={handleAddRef} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Título da referência</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Receita Consulta Setembro"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Medicamento vinculado</label>
                <input
                  type="text"
                  value={newMed}
                  onChange={(e) => setNewMed(e.target.value)}
                  placeholder="Ex: Losartana"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 text-xs font-bold border rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold bg-[#175246] text-white rounded-xl"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
