import { create } from 'zustand';
import { Episode, PodcastFeed, TabType } from '../types';

interface StoreState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  podcasts: PodcastFeed[];
  addPodcast: (feed: PodcastFeed) => void;
  removePodcast: (id: string) => void;
  
  currentEpisode: Episode | null;
  isPlaying: boolean;
  playbackRate: number;
  volume: number;
  currentTime: number;
  duration: number;
  
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  setPlaybackRate: (rate: number) => void;
  setVolume: (vol: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  
  downloads: Record<string, boolean>;
  toggleDownload: (episodeId: string) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const INITIAL_PODCASTS: PodcastFeed[] = [
  {
    id: 'p1',
    title: 'Syntax - Tasty Web Development Treats',
    author: 'Wes Bos & Scott Tolinski',
    description: 'Full Stack JavaScript Web Development, HTML, CSS, React, Node, and more!',
    feedUrl: 'https://syntax.fm/rss',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80',
    episodes: [
      {
        id: 'e1_1',
        title: 'SF 782: AI Coding Assistants in 2026',
        podcastTitle: 'Syntax',
        description: 'Deep dive into autonomous coding agents, workspace orchestration, and developer productivity.',
        pubDate: 'Oct 18, 2026',
        duration: '45:20',
        audioUrl: 'https://traffic.libsyn.com/syntax/Syntax_0782.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80',
      },
      {
        id: 'e1_2',
        title: 'SF 781: React 19 & Server Actions Masterclass',
        podcastTitle: 'Syntax',
        description: 'Everything you need to know about React 19 architecture, hooks, and performance.',
        pubDate: 'Oct 15, 2026',
        duration: '52:10',
        audioUrl: 'https://traffic.libsyn.com/syntax/Syntax_0781.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'p2',
    title: 'The Changelog - Open Source & Software',
    author: 'Jerod Santo & Adam Stacoviak',
    description: 'Conversations with the hackers, leaders, and innovators of open source software.',
    feedUrl: 'https://changelog.com/podcast/feed',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&auto=format&fit=crop&q=80',
    episodes: [
      {
        id: 'e2_1',
        title: 'Building Resilient Offline-First PWAs',
        podcastTitle: 'The Changelog',
        description: 'Exploring modern Service Workers, IndexedDB, and Workbox for robust web apps.',
        pubDate: 'Oct 17, 2026',
        duration: '1:08:45',
        audioUrl: 'https://anchor.fm/s/1234/podcast/play/5678.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&auto=format&fit=crop&q=80',
      }
    ]
  }
];

export const useStore = create<StoreState>((set) => ({
  activeTab: 'discover',
  setActiveTab: (activeTab) => set({ activeTab }),
  
  podcasts: INITIAL_PODCASTS,
  addPodcast: (feed) => set((state) => ({ podcasts: [feed, ...state.podcasts] })),
  removePodcast: (id) => set((state) => ({ podcasts: state.podcasts.filter(p => p.id !== id) })),
  
  currentEpisode: INITIAL_PODCASTS[0].episodes[0],
  isPlaying: false,
  playbackRate: 1.0,
  volume: 1.0,
  currentTime: 0,
  duration: 2720,
  
  playEpisode: (episode) => set({ currentEpisode: episode, isPlaying: true, currentTime: 0 }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
  setVolume: (volume) => set({ volume }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  
  downloads: { 'e1_1': true },
  toggleDownload: (episodeId) => set((state) => ({
    downloads: { ...state.downloads, [episodeId]: !state.downloads[episodeId] }
  })),
  
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
