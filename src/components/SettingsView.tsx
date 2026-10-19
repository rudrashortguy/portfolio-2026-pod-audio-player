import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings as SettingsIcon, Moon, Bell, Info, RefreshCw, Database } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { podcasts, removePodcast } = useStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Customize your WaveCast experience.</p>
      </div>

      {/* Playback */}
      <SettingsSection title="Playback" icon={RefreshCw}>
        <SettingRow label="Auto-resume playback" description="Resume from where you left off" />
        <SettingRow label="Download over cellular only" description="Only download when on Wi-Fi" />
        <SettingRow label="Audio quality" description="Compressed (128 kbps)" />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance" icon={Moon}>
        <SettingRow label="Dark mode" description="Always on — WaveCast is dark by design" />
        <SettingRow label="Compact list" description="Show less info per episode" />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={Bell}>
        <SettingRow label="New episode alerts" description="Notify when your podcasts update" />
        <SettingRow label="Download complete" description="Notify when downloads finish" />
      </SettingsSection>

      {/* Data & Storage */}
      <SettingsSection title="Data & Storage" icon={Database}>
        <SettingRow label={`Stored podcasts: ${podcasts.length}`} />
        <SettingRow label="Cached audio" description="Clear all cached downloads" />
      </SettingsSection>

      {/* Danger Zone */}
      <div className="bg-slate-900/60 border border-red-900/30 rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-red-400 text-sm">Danger Zone</h3>
        <p className="text-xs text-slate-500">These actions cannot be undone.</p>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-slate-300">Reset to defaults</span>
          <button 
            onClick={() => setShowResetConfirm(!showResetConfirm)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg"
          >
            Reset
          </button>
        </div>

        {showResetConfirm && (
          <div className="pt-2 border-t border-red-900/20 flex gap-2">
            <button 
              onClick={handleReset}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium py-2 rounded-xl"
            >
              Confirm Reset
            </button>
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* About */}
      <div className="flex items-center gap-2 text-xs text-slate-600 py-4 border-t border-slate-800/60">
        <Info className="w-3 h-3" />
        <span>WaveCast v1.0.0 • Made with React + PWA + Workbox</span>
      </div>
    </div>
  );
};

const SettingsSection: React.FC<{ title: string; icon: React.FC<{ className?: string }>; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-slate-900/85 border border-slate-800/80 rounded-2xl overflow-hidden">
    <div className="px-4 py-3 border-b border-slate-800/60 flex items-center gap-2">
      <Icon className="w-4 h-4 text-indigo-400" />
      <h3 className="font-semibold text-white text-sm">{title}</h3>
    </div>
    <div className="divide-y divide-slate-800/50">
      {children}
    </div>
  </div>
);

const SettingRow: React.FC<{ label: string; description?: string }> = ({ label, description }) => (
  <div className="px-4 py-3.5 flex items-center justify-between">
    <div>
      <p className="text-sm text-white font-medium">{label}</p>
      {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
    </div>
    <div className="w-10 h-6 rounded-full bg-slate-800 border border-slate-700 relative">
      <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-indigo-500" />
    </div>
  </div>
);
