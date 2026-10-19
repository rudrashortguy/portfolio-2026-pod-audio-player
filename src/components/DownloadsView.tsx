import React from 'react';
import { useStore } from '../store/useStore';
import { Episode, PodcastFeed } from '../types';
import { Play, WifiOff } from 'lucide-react';

export const DownloadsView: React.FC = () => {
  const { podcasts, playEpisode, downloads } = useStore();

  const downloadedEpisodes: (Episode & { podcastTitle: string })[] = [];
  podcasts.forEach((podcast: PodcastFeed) => {
    podcast.episodes.forEach((ep: Episode) => {
      if (downloads[ep.id]) {
        downloadedEpisodes.push({ ...ep, podcastTitle: podcast.title });
      }
    });
  });

  if (downloadedEpisodes.length === 0) {
    return (
      <div className="space-y-4 pb-24 md:pb-12">
        <h2 className="text-2xl font-bold text-white tracking-tight">Downloads</h2>
        <div className="py-16 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <WifiOff className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-300">No offline episodes</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            Download episodes from the Discover tab to listen offline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 md:pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight">Downloads</h2>
        <span className="text-sm text-slate-400">{downloadedEpisodes.length} episode{downloadedEpisodes.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-3">
        {downloadedEpisodes.map((ep) => (
          <div
            key={ep.id}
            className="p-4 rounded-2xl bg-slate-900/85 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3"
            onClick={() => playEpisode(ep)}
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={ep.imageUrl} alt={ep.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">{ep.title}</h4>
              <p className="text-xs text-slate-400">{ep.podcastTitle}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                <WifiOff className="w-3 h-3" /> Offline • {ep.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
