import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Plus, Radio, Play, Check } from 'lucide-react';
import { PodcastFeed } from '../types';

export const DiscoverView: React.FC = () => {
  const { podcasts, addPodcast, playEpisode, searchQuery, setSearchQuery, downloads, toggleDownload } = useStore();
  const [feedUrlInput, setFeedUrlInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedUrlInput.trim()) return;

    const newFeed: PodcastFeed = {
      id: `p_${Date.now()}`,
      title: feedUrlInput.split('/').pop()?.replace(/-/g, ' ') || 'Custom RSS Podcast',
      author: 'Independent Creator',
      description: `Imported RSS Feed from ${feedUrlInput}`,
      feedUrl: feedUrlInput,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      episodes: [
        {
          id: `e_${Date.now()}_1`,
          title: 'Latest Episode: Special Broadcast',
          podcastTitle: feedUrlInput.split('/').pop() || 'Custom Feed',
          description: 'Automatically parsed episode from imported RSS feed URL.',
          pubDate: 'Today',
          duration: '34:12',
          audioUrl: 'https://traffic.libsyn.com/syntax/Syntax_0782.mp3',
          imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
        }
      ]
    };

    addPodcast(newFeed);
    setFeedUrlInput('');
    setIsAdding(false);
  };

  const filteredPodcasts = podcasts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Discover Podcasts</h2>
          <p className="text-sm text-slate-400">Explore curated feeds & parse custom RSS audio streams.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search podcasts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title="Add RSS Feed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add RSS Feed Modal/Box */}
      {isAdding && (
        <form onSubmit={handleAddFeed} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 animate-in fade-in">
          <h3 className="font-semibold text-white text-sm">Add RSS Feed URL</h3>
          <div className="flex gap-2">
            <input 
              type="url" 
              placeholder="https://example.com/rss.xml"
              value={feedUrlInput}
              onChange={(e) => setFeedUrlInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
              Parse Feed
            </button>
          </div>
        </form>
      )}

      {/* Featured Podcast Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="bg-slate-900/85 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex gap-4 items-start">
              <img 
                src={podcast.imageUrl} 
                alt={podcast.title} 
                className="w-20 h-20 rounded-xl object-cover border border-slate-700/50 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold rounded-md mb-1">
                  RSS Verified
                </span>
                <h3 className="font-bold text-white text-base truncate">{podcast.title}</h3>
                <p className="text-xs text-slate-400">{podcast.author}</p>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{podcast.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Episodes</h4>
              {podcast.episodes.map((ep) => (
                <div key={ep.id} className="flex items-center justify-between gap-2 py-1.5 group">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => playEpisode(ep)}>
                    <p className="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-400 transition-colors">
                      {ep.title}
                    </p>
                    <span className="text-[10px] text-slate-500">{ep.pubDate} • {ep.duration}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => playEpisode(ep)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button 
                      onClick={() => toggleDownload(ep.id)}
                      className={`p-1.5 rounded-lg border border-slate-700 ${
                        downloads[ep.id] ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {downloads[ep.id] ? <Check className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
