export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  careerInfo: string | null;
  photoUrl: string | null;
  createdAt: string;
  _count?: { songs: number };
}

export interface ArtistWithSongs extends Artist {
  songs: Song[];
}

export interface Song {
  id: string;
  title: string;
  artist: string | null;
  artistId: string | null;
  artistRef?: Artist | null;
  genre: string | null;
  description: string | null;
  releaseYear: number | null;
  coverUrl: string | null;
  featured: boolean;
  fileUrl: string;
  duration: number | null;
  bpm: number | null;
  uploadedBy: string;
  createdAt: string;

  analyzedBpm: number | null;
  beatCount: number | null;
  beatTimestamps: number[] | null;
  rms: number | null;
  peak: number | null;
  bassEnergy: number | null;
  midEnergy: number | null;
  trebleEnergy: number | null;
  waveformPeaks: number[] | null;
  analyzedAt: string | null;
}

export interface AnalyzeSongPayload {
  duration?: number;
  bpm?: number;
  beatCount?: number;
  beatTimestamps?: number[];
  rms?: number;
  peak?: number;
  bassEnergy?: number;
  midEnergy?: number;
  trebleEnergy?: number;
  waveformPeaks?: number[];
}

export interface ListenHistoryRow {
  id: string;
  userId: string;
  songId: string;
  playedAt: string;
  durationMs: number | null;
  bpm: number | null;
  visualizerStyle: string | null;
  song: {
    id: string;
    title: string;
    artist: string | null;
    genre: string | null;
    fileUrl: string;
  };
}

export interface CreateHistoryPayload {
  songId: string;
  durationMs?: number;
  bpm?: number;
  visualizerStyle?: string;
}

export interface HistoryPage {
  items: ListenHistoryRow[];
  total: number;
}
