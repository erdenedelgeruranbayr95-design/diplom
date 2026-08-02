export interface Track {
  id: number | string;
  title: string;
  artist?: string;
  singer?: string;
  composer?: string;
  genre: string;
  file?: string;
  cover?: string;
  hasCover?: boolean;
  coverUrl?: string;
  added?: number;
}

export interface FeedItem {
  id: number;
  text: string;
  icon: string;
  date: number;
}

export interface ListeningStats {
  total: number;
  vib: number;
  byGenre: Record<string, number>;
  byTrack: Record<string, number>;
  days: Record<string, number>;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: (number | string)[];
  created: number;
}
