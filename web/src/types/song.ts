export interface Song {
  id: string;
  title: string;
  artist: string | null;
  genre: string | null;
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
