import React, { useState } from 'react';
import { ArrowLeft, Bell, Volume2, CheckCircle2, Clock, Check } from 'lucide-react';
import { Medication, Patient } from '../../types';
import { audioService } from '../../services/audio';

interface ResponsavelAlarmesViewProps {
  patient: Patient;
  medications: Medication[];
  onEditMedication: (med: Medication) => void;
  onBack: () => void;
}

export const ResponsavelAlarmesView: React.FC<ResponsavelAlarmesViewProps> = ({
  patient,
  medications,
  onEditMedication,
  onBack,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
    '2': true,
    '3': true,
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggle = (key: string) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const handlePlayAudioSample = () => {
    setIsPlayingAudio(true);
    audioService.playReminderChime();
    setTimeout(() => {
      audioService.speak(
        `Atenção. Dona ${patient.name}, está na hora do seu remédio das 08:00! Losartana Potássica. Tomar 1 comprimido com água.`,
        () => setIsPlayingAudio(false)
      );
    }, 400);
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
          Alarmes e lembretes
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Lembretes salvos para {patient.name}
        </p>
      </div>

      {/* Lembretes salvos */}
      <div className="space-y-4">
        {medications.map((med, idx) => {
          const isEnabled = toggles[idx.toString()] !== false;

          return (
            <div
              key={med.id}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="text-2xl font-black text-[#112A24]">
                    {med.scheduleTimes[0] || '08:00'}
                  </span>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => handleToggle(idx.toString())}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEnabled ? 'bg-[#175246]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="text-xs text-gray-500 -mt-2">
                <span>{med.name}</span> •{' '}
                <span className={isEnabled ? 'font-bold text-emerald-700' : 'text-gray-400'}>
                  {isEnabled ? 'Ativado' : 'Desativado'}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <img
                  src={med.packagePhotoUrl}
                  alt={med.name}
                  className="h-14 w-14 rounded-xl object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-black text-[#112A24]">{med.name}</h4>
                  <p className="text-xs text-gray-500">{med.category}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold" style={{ color: med.visualColor.hex }}>
                      ● {med.visualColor.name}
                    </span>
                    <span className="text-[11px] font-bold text-gray-700">
                      {med.visualSymbol.symbol} {med.visualSymbol.label}
                    </span>
                  </div>
                </div>
              </div>

              {idx === 0 ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Confirmado às 08:05</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Próximo lembrete de hoje</span>
                </div>
              )}

              <button
                onClick={() => onEditMedication(med)}
                className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
              >
                Editar
              </button>
            </div>
          );
        })}
      </div>

      {/* Como avisar Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <h3 className="text-base font-black text-[#112A24]">Como avisar</h3>

        {/* Som do lembrete */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <span className="text-sm font-bold text-[#112A24] block">Som do lembrete</span>
            <span className="text-xs text-gray-500">
              {soundEnabled ? 'Ativado' : 'Silencioso'}
            </span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              soundEnabled ? 'bg-[#175246]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Vibração */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <span className="text-sm font-bold text-[#112A24] block">Vibração</span>
            <span className="text-xs text-gray-500">
              {vibrationEnabled ? 'Ativado' : 'Desativado'}
            </span>
          </div>
          <button
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              vibrationEnabled ? 'bg-[#175246]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                vibrationEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Mensagem de voz */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <span className="text-sm font-bold text-[#112A24] block">Mensagem de voz</span>
            <span className="text-xs text-emerald-700 font-semibold">
              Ativado • demonstrativo
            </span>
          </div>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              voiceEnabled ? 'bg-[#175246]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                voiceEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Ouvir exemplo button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-sm font-bold text-[#112A24] block">Ouvir exemplo</span>
            <span className="text-xs text-gray-400">Representação sonora</span>
          </div>

          <button
            onClick={handlePlayAudioSample}
            disabled={isPlayingAudio}
            className={`px-4 py-2.5 rounded-xl border border-[#175246] text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse'
                : 'text-[#175246] hover:bg-[#EAF3F0]'
            }`}
          >
            <Volume2 className="h-4 w-4" />
            <span>{isPlayingAudio ? 'Reproduzindo...' : 'Ouvir exemplo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
