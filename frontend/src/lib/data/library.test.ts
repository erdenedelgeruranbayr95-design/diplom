import { describe, it, expect, beforeEach } from "vitest";
import { loadSongsCache, saveSongsCache } from "./library";
import type { Song } from "@/types/song";

function song(id: string): Song {
  return {
    id,
    title: `Song ${id}`,
    artist: null,
    artistId: null,
    artistRef: null,
    genre: null,
    description: null,
    lyrics: null,
    releaseYear: null,
    coverUrl: null,
    featured: false,
    fileUrl: "https://example.com/a.mp3",
    duration: null,
    bpm: null,
    uploadedBy: "u1",
    createdAt: "2026-01-01T00:00:00.000Z",
    analyzedBpm: null,
    beatCount: null,
    beatTimestamps: null,
    rms: null,
    peak: null,
    bassEnergy: null,
    midEnergy: null,
    trebleEnergy: null,
    bandEnergies: null,
    waveformPeaks: null,
    analyzedAt: null,
    fileHash: null,
    scoreUrl: null,
    analysisStatus: "PENDING",
    analysisError: null,
    musicalKey: null,
    license: null,
    licenseSrc: null,
    published: true,
    publishedAt: null,
    jamendoId: null,
    uploadConfirmed: true,
    hlsUrl: null,
    coverThumbUrl: null,
    coverMediumUrl: null,
    coverLargeUrl: null,
  };
}

describe("songs offline cache", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty array when nothing has been cached", () => {
    expect(loadSongsCache()).toEqual([]);
  });

  it("round-trips a saved song list", () => {
    const songs = [song("s1"), song("s2")];
    saveSongsCache(songs);
    expect(loadSongsCache()).toEqual(songs);
  });

  it("overwrites the previous cache on each save", () => {
    saveSongsCache([song("s1")]);
    saveSongsCache([song("s2")]);
    expect(loadSongsCache().map((s) => s.id)).toEqual(["s2"]);
  });
});
