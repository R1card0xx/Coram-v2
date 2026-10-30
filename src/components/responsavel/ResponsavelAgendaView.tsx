import React, { useState } from 'react';
import { ArrowLeft, Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { Appointment, Patient } from '../../types';

interface ResponsavelAgendaViewProps {
  patient: Patient;
  appointments: Appointment[];
  onAddAppointment: (app: Omit<Appointment, 'id'>) => void;
  onBack: () => void;
}

export const ResponsavelAgendaView: React.FC<ResponsavelAgendaViewProps> = ({
  patient,
  appointments,
  onAddAppointment,
  onBack,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('22');
  const [time, setTime] = useState('14:00');
  const [location, setLocation] = useState('Clínica Exemplo · sala a confirmar');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddAppointment({
      patientId: patient.id,
      title: title.trim(),
      day: parseInt(day, 10) || 20,
      month: 'OUT',
      dateFormatted: `Outubro · ${time}`,
      fullDate: `2026-10-${day.padStart(2, '0')}`,
      location,
    });

    setTitle('');
    setShowAddModal(false);
  };

  // Calendar dates for October 2026 (Starts on Thursday Oct 1)
  // Weeks representation:
  // Row 1: blanks 4 days (Sun-Wed), 1, 2, 3
  // Row 2: 4, 5, 6, 7, 8, 9, 10
  // Row 3: 11, 12, 13, 14, 15, 16 (Hoje), 17
  // Row 4: 18, 19, 20 (Compromisso), 21, 22, 23, 24
  // Row 5: 25, 26, 27, 28 (Compromisso), 29, 30, 31
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const offsetDays = 4; // Oct 1, 2026 is Thursday (Dom=0, Seg=1, Ter=2, Qua=3, Qui=4)

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
          Sua agenda
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Hoje • 16 de outubro de 2026
        </p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-3.5 rounded-2xl bg-[#175246] text-white font-black text-xs flex items-center justify-center gap-2 hover:bg-[#124238] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Adicionar compromisso</span>
      </button>

      {/* Monthly Interactive Calendar (Matches Page 5 of PDF) */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        {/* Month selector */}
        <div className="flex items-center justify-between">
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-base font-black text-[#112A24]">
            Outubro de 2026
          </span>
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-500">
          <span>Dom</span>
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
          {/* Empty offset days */}
          {Array.from({ length: offsetDays }).map((_, i) => (
            <div key={`offset-${i}`} className="h-9" />
          ))}

          {daysInMonth.map((d) => {
            const isToday = d === 16;
            const hasAppointment = appointments.some((a) => a.day === d);

            return (
              <div
                key={d}
                className="h-9 flex flex-col items-center justify-center relative rounded-xl"
              >
                {isToday && (
                  <span className="absolute inset-0 rounded-xl border-2 border-[#175246]" />
                )}
                {hasAppointment && (
                  <span className="absolute inset-0 rounded-xl bg-emerald-100/70 border border-emerald-300" />
                )}
                <span
                  className={`relative z-10 ${
                    hasAppointment
                      ? 'font-black text-[#175246]'
                      : isToday
                      ? 'font-black text-[#112A24]'
                      : 'text-gray-700'
                  }`}
                >
                  {d}
                </span>
                {hasAppointment && (
                  <span className="h-1 w-1 bg-[#175246] rounded-full mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-3 border-t border-gray-100 text-[11px] font-bold text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-md bg-emerald-100 border border-emerald-300" />
            <span>Compromisso</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-md border-2 border-[#175246]" />
            <span>Hoje, dia 16</span>
          </div>
        </div>
      </div>

      {/* Compromissos do mês List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
          <span>Compromissos do mês</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF3F0] text-[#175246] font-black">
            {appointments.length}
          </span>
        </div>

        {appointments.map((app) => (
          <div
            key={app.id}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 shrink-0">
                <span className="text-xl font-black text-[#175246] leading-none">
                  {app.day}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 uppercase mt-0.5">
                  {app.month}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-black text-[#112A24]">
                  {app.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span>{app.dateFormatted}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{app.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Detalhes do compromisso: ${app.title} em ${app.dateFormatted}`)}
              className="w-full py-2.5 rounded-xl border border-[#175246] text-xs font-black text-[#175246] hover:bg-[#EAF3F0] transition-all cursor-pointer"
            >
              Ver compromisso
            </button>
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h2 className="text-xl font-black text-[#112A24]">
              Adicionar compromisso
            </h2>
            <form onSubmit={handleCreateAppointment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Título do compromisso
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Consulta com Cardiologista"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dia (Outubro)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Horário</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Local</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
