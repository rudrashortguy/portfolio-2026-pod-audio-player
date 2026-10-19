import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Download, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Gauge 
} from 'lucide-react';

export const Player: React.FC = () => {
  const { 
    currentEpisode, 
    isPlaying, 
    togglePlay, 
    playbackRate, 
    setPlaybackRate, 
    currentTime, 
    setCurrentTime, 
    duration,
    downloads,
    toggleDownload
  } = useStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!currentEpisode) return null;

  const isDownloaded = downloads[currentEpisode.id];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const speeds = [0.8, 1.0, 1.25, 1.5, 1.75, 2.0];
  const cycleSpeed = () => {
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 transition-all duration-300">
      {/* Mini Player */}
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <img 
          src={currentEpisode.imageUrl} 
          alt={currentEpisode.title} 
          className="w-12 h-12 rounded-lg object-cover shadow border border-slate-700/50 cursor-pointer flex-shrink-0"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h4 className="text-sm font-semibold text-white truncate">{currentEpisode.title}</h4>
          <p className="text-xs text-slate-400 truncate">{currentEpisode.podcastTitle}</p>
          
          {/* Progress bar (mini) */}
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-150"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Modal Player */}
      {isExpanded && (
        <div className="max-w-md mx-auto px-6 pb-6 pt-2 animate-in fade-in duration-200">
          <div className="text-center my-4">
            <img 
              src={currentEpisode.imageUrl} 
              alt={currentEpisode.title} 
              className="w-60 h-60 rounded-2xl mx-auto shadow-2xl object-cover border border-slate-700/60"
            />
            <h3 className="text-lg font-bold text-white mt-4 line-clamp-1">{currentEpisode.title}</h3>
            <p className="text-sm text-indigo-400 font-medium">{currentEpisode.podcastTitle}</p>
          </div>

          {/* Scrubber */}
          <div className="space-y-1">
            <input 
              type="range" 
              min={0} 
              max={duration} 
              value={currentTime} 
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={cycleSpeed}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-1 border border-slate-700"
            >
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              {playbackRate}x
            </button>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                className="p-2 text-slate-300 hover:text-white active:scale-90 transition-transform"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button 
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
              </button>

              <button 
                onClick={() => setCurrentTime(Math.min(duration, currentTime + 30))}
                className="p-2 text-slate-300 hover:text-white active:scale-90 transition-transform"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <button 
              onClick={() => toggleDownload(currentEpisode.id)}
              className={`p-2 rounded-full border border-slate-700 ${
                isDownloaded ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
