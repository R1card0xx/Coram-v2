import React from 'react';
import { Home, Pill, CalendarCheck, Users } from 'lucide-react';

export type IdosoTab = 'inicio' | 'remedios' | 'rotina' | 'cuidador';

interface IdosoBottomNavProps {
  activeTab: IdosoTab;
  onChangeTab: (tab: IdosoTab) => void;
}

export const IdosoBottomNav: React.FC<IdosoBottomNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'remedios', label: 'Remédios', icon: Pill },
    { id: 'rotina', label: 'Rotina', icon: CalendarCheck },
    { id: 'cuidador', label: 'Cuidador', icon: Users },
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
                  ? 'bg-[#175246] text-white font-bold shadow-xs'
                  : 'text-gray-600 hover:text-[#175246] hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="mt-1 text-xs tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
