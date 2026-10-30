import React, { useState } from 'react';
import { ArrowLeft, Camera, Check, AlertCircle } from 'lucide-react';
import { Medication, VisualColor, VisualSymbol, Patient } from '../../types';
import { AVAILABLE_COLORS, AVAILABLE_SYMBOLS, SAMPLE_MEDICINE_IMAGES } from '../../services/storage';

interface ResponsavelMedicamentoFormProps {
  initialMedication?: Medication | null;
  patient: Patient;
  userName: string;
  onSave: (med: Omit<Medication, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const ResponsavelMedicamentoForm: React.FC<ResponsavelMedicamentoFormProps> = ({
  initialMedication,
  patient,
  userName,
  onSave,
  onCancel,
}) => {
  const isEditing = Boolean(initialMedication);

  const [name, setName] = useState(initialMedication?.name || '');
  const [category, setCategory] = useState<'Rotina pessoal' | 'Outros cuidados'>(
    initialMedication?.category || 'Rotina pessoal'
  );
  const [selectedColor, setSelectedColor] = useState<VisualColor>(
    initialMedication?.visualColor || AVAILABLE_COLORS[0]
  );
  const [selectedSymbol, setSelectedSymbol] = useState<VisualSymbol>(
    initialMedication?.visualSymbol || AVAILABLE_SYMBOLS[0]
  );
  const [photoUrl, setPhotoUrl] = useState<string>(
    initialMedication?.packagePhotoUrl || SAMPLE_MEDICINE_IMAGES.losartana
  );
  const [dose, setDose] = useState(initialMedication?.prescribedDose || '50 mg');
  const [doseInstructions, setDoseInstructions] = useState(
    initialMedication?.doseInstructions || '1 comprimido inteiro com água'
  );
  const [frequency, setFrequency] = useState(
    initialMedication?.prescribedFrequency || 'Conforme sua receita'
  );
  const [notes, setNotes] = useState(initialMedication?.prescriptionNotes || '');
  const [purpose, setPurpose] = useState(
    initialMedication?.purposeDescription || 'Para manter o tratamento e os cuidados conforme prescrição médica.'
  );
  const [time, setTime] = useState(initialMedication?.scheduleTimes[0] || '08:00');
  const [error, setError] = useState<string | null>(null);

  const handlePhotoPreset = () => {
    // Cycle between packaging samples or allows custom image url
    const options = Object.values(SAMPLE_MEDICINE_IMAGES);
    const currentIndex = options.indexOf(photoUrl);
    const nextIndex = (currentIndex + 1) % options.length;
    setPhotoUrl(options[nextIndex]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe o nome do medicamento.');
      return;
    }

    const shift = parseInt(time.split(':')[0], 10) >= 18 ? 'noite' : parseInt(time.split(':')[0], 10) >= 12 ? 'tarde' : 'manha';

    onSave({
      id: initialMedication?.id,
      patientId: patient.id,
      name: name.trim(),
      category,
      visualColor: selectedColor,
      visualSymbol: selectedSymbol,
      packagePhotoUrl: photoUrl,
      prescribedDose: dose.trim(),
      doseInstructions: doseInstructions.trim(),
      prescribedFrequency: frequency.trim(),
      prescriptionNotes: notes.trim(),
      purposeDescription: purpose.trim(),
      scheduleTimes: [time],
      active: true,
      shift,
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Back button */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-[#112A24] text-sm font-semibold hover:opacity-80 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#112A24] tracking-tight">
          {isEditing ? 'Editar medicamento' : 'Cadastrar medicamento'}
        </h1>
        <p className="text-xs font-bold text-gray-500 mt-1">
          Responsável autorizado • {userName || 'Ana'}
        </p>
        <span className="inline-block mt-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          {isEditing ? '✎ Alterações ainda não salvas' : '✎ Novo cadastro • ainda não salvo'}
        </span>
        <p className="text-xs text-gray-500 mt-2">
          Preencha com sua receita em mãos. Confira os dados antes de salvar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Foto de Embalagem */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Foto de embalagem
          </label>

          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-gray-50 border-2 border-gray-200 shrink-0">
              <img
                src={photoUrl}
                alt="Embalagem"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={handlePhotoPreset}
                className="px-3.5 py-2 rounded-xl border border-[#175246] text-xs font-bold text-[#175246] hover:bg-[#EAF3F0] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Adicionar / trocar foto</span>
              </button>
              <p className="text-[11px] text-gray-500 leading-snug">
                Use a embalagem real para facilitar o reconhecimento.
              </p>
            </div>
          </div>
        </div>

        {/* Cor de Identificação */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Cor de identificação
          </label>
          <p className="text-xs text-gray-500">
            Escolha uma cor para ajudar a identificar o medicamento.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {AVAILABLE_COLORS.map((col) => {
              const isSelected = selectedColor.id === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedColor(col)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#175246] bg-[#EAF3F0] font-black text-[#175246]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-xs">{col.name}</span>
                  </div>
                  {isSelected && <span className="text-[10px] font-bold">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Símbolo Preto */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Símbolo preto
          </label>
          <p className="text-xs text-gray-500">
            Escolha um símbolo preto para ajudar a identificar o medicamento.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {AVAILABLE_SYMBOLS.map((sym) => {
              const isSelected = selectedSymbol.id === sym.id;
              return (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => setSelectedSymbol(sym)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#175246] bg-[#EAF3F0] font-black text-[#175246]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-black">
                      {sym.symbol}
                    </span>
                    <span className="text-xs">{sym.label}</span>
                  </div>
                  {isSelected && <span className="text-[10px] font-bold">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nome para identificar */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Nome para identificar
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Medicamento A, Losartana Potássica"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
          />
        </div>

        {/* Categoria de Organização */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Categoria de organização
          </label>

          <div className="space-y-2">
            {[
              { id: 'Rotina pessoal', label: 'Rotina pessoal' },
              { id: 'Outros cuidados', label: 'Outros cuidados' },
            ].map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#175246] bg-[#EAF3F0] font-bold text-[#175246]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#175246] bg-[#175246]' : 'border-gray-400'
                    }`}
                  >
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horário Principal do Lembrete */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
          <label className="block text-sm font-black text-[#112A24]">
            Horário do lembrete
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base font-bold text-[#112A24] focus:border-[#175246] focus:outline-none"
          />
        </div>

        {/* Quantidade prescrita */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
          <label className="block text-sm font-black text-[#112A24]">
            Quantidade prescrita
          </label>
          <input
            type="text"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            placeholder="Ex: 50 mg, 1 comprimido"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
          />
          <p className="text-[11px] text-gray-500">
            Copie exatamente como está na receita.
          </p>
        </div>

        {/* Frequência prescrita */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
          <label className="block text-sm font-black text-[#112A24]">
            Frequência prescrita
          </label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="Ex: 1 vez ao dia, A cada 12 horas"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
          />
          <p className="text-[11px] text-gray-500">
            Transcreva da receita. Não sugerimos uma frequência.
          </p>
        </div>

        {/* Orientações da receita (opcional) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
          <label className="block text-sm font-black text-[#112A24]">
            Orientações da receita (opcional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Tomar com água após o café da manhã. Deixe em branco se não houver."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
          />
        </div>

        {/* Para que serve (descrição falada no app do idoso) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
          <label className="block text-sm font-black text-[#112A24]">
            Para que serve (Explicativo para o idoso)
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Ex: Para o coração e manter a pressão controlada."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#175246] focus:outline-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#175246] text-white font-black text-base flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <Check className="h-5 w-5" />
            <span>Salvar medicamento</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          >
            Cancelar cadastro
          </button>
        </div>
      </form>
    </div>
  );
};
