export interface Episode {
  id: string;
  title: string;
  podcastTitle: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
  isDownloaded?: boolean;
  progress?: number;
  completed?: boolean;
}

export interface PodcastFeed {
  id: string;
  title: string;
  author: string;
  description: string;
  feedUrl: string;
  imageUrl: string;
  episodes: Episode[];
}

export type TabType = 'discover' | 'library' | 'downloads' | 'settings';
