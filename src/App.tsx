import React from 'react';
import { useStore } from './store/useStore';
import { Navigation } from './components/Navigation';
import { DiscoverView } from './components/DiscoverView';
import { LibraryView } from './components/LibraryView';
import { DownloadsView } from './components/DownloadsView';
import { SettingsView } from './components/SettingsView';
import { Player } from './components/Player';
import { Radio } from 'lucide-react';

export function App() {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Navigation />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/30">
              <Radio className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">WaveCast</span>
          </div>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-semibold px-2 py-1 rounded-full border border-indigo-500/20">
            PWA Offline
          </span>
        </header>

        <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          {activeTab === 'discover' && <DiscoverView />}
          {activeTab === 'library' && <LibraryView />}
          {activeTab === 'downloads' && <DownloadsView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      <Player />
    </div>
  );
}

export default App;
