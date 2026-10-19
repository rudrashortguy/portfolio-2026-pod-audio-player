import React from 'react';
import { useStore } from '../store/useStore';
import { TabType } from '../types';
import { Compass, Library, Download, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, downloads } = useStore();
  const downloadCount = Object.values(downloads).filter(Boolean).length;

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'downloads', label: 'Downloads', icon: Download, badge: downloadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 pb-safe md:static md:w-64 md:border-r md:border-t-0 md:h-screen md:flex md:flex-col">
      <div className="hidden md:flex items-center gap-3 p-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/30">
          W
        </div>
        <div>
          <h1 className="font-bold text-lg text-white leading-none">WaveCast</h1>
          <span className="text-xs text-slate-400">Offline Podcast & Audio</span>
        </div>
      </div>

      <div className="flex md:flex-col justify-around md:justify-start md:p-4 gap-1 flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all relative ${
                isActive 
                  ? 'text-indigo-400 bg-indigo-500/10 md:bg-indigo-600/15 md:text-indigo-300' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline text-sm">{tab.label}</span>
              {tab.badge ? (
                <span className="absolute top-2 right-2 md:static ml-auto bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
