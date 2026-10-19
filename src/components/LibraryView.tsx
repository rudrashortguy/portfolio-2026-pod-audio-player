import React from 'react';
import { useStore } from '../store/useStore';
import { PodcastFeed, Episode } from '../types';
import { Play, Clock, CheckCircle2, SkipForward } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { podcasts, playEpisode, downloads } = useStore();
  const allEpisodes: Episode[] = podcasts.flatMap(p => p.episodes.map(e => ({ ...e, podcastTitle: p.title, podcastId: p.id })));

  if (allEpisodes.length === 0) {
    return <EmptyState icon={<Play />} title="No episodes yet" subtitle="Discover and add podcasts to get started." />;
  }

  return (
    <div className="space-y-4 pb-24 md:pb-12">
      <h2 className="text-2xl font-bold text-white tracking-tight">Your Library</h2>

      <div className="space-y-3">
        {allEpisodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} isDownloaded={!!downloads[ep.id]} />
        ))}
      </div>
    </div>
  );
};

interface EpisodeCardProps {
  episode: Episode & { podcastId?: string };
  isDownloaded: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, isDownloaded }) => {
  const { playEpisode, currentEpisode, isPlaying } = useStore();
  const isActive = currentEpisode?.id === episode.id;

  return (
    <div 
      className={`p-4 rounded-2xl border transition-all ${
        isActive 
          ? 'bg-indigo-600/10 border-indigo-500/40' 
          : 'bg-slate-900/85 border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={() => playEpisode(episode)}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 ${
            isActive && isPlaying
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40'
              : 'bg-slate-800 text-white hover:bg-indigo-600'
          }`}
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>

        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold truncate ${isActive ? 'text-indigo-300' : 'text-white'}`}>
            {episode.title}
          </h4>
          <p className="text-xs text-slate-400 truncate">{episode.podcastTitle}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3" /> {episode.duration}
            </span>
            {isDownloaded && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Offline
              </span>
            )}
            {isActive && isPlaying && (
              <span className="flex items-center gap-1 text-[10px] text-indigo-400 animate-pulse">
                Playing
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="py-16 flex flex-col items-center text-center space-y-4">
    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-300">{title}</h3>
    <p className="text-sm text-slate-500 max-w-xs">{subtitle}</p>
  </div>
);
