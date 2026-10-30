import React from 'react';
import { Home, Pill, Calendar, User } from 'lucide-react';

export type ResponsavelTab = 'inicio' | 'medicamentos' | 'agenda' | 'perfil';

interface ResponsavelBottomNavProps {
  activeTab: ResponsavelTab;
  onChangeTab: (tab: ResponsavelTab) => void;
}

export const ResponsavelBottomNav: React.FC<ResponsavelBottomNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'medicamentos', label: 'Medicamentos', icon: Pill },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'perfil', label: 'Perfil', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-md bg-white border-t border-gray-200 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#EAF3F0] text-[#175246] font-extrabold'
                  : 'text-gray-500 hover:text-[#175246] hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-[#175246]' : 'text-gray-400'}`} />
              <span className="mt-1 text-xs tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
