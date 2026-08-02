import { describe, it, expect } from "vitest";
import { songToPlayerTrack, fallbackCover } from "./song-mapper";
import type { Song } from "@/types/song";

function song(overrides: Partial<Song> & { id: string; title: string }): Song {
  return {
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
    ...overrides,
  };
}

describe("songToPlayerTrack", () => {
  it("maps the core fields directly (id, title, file, songId)", () => {
    const s = song({ id: "song-1", title: "Хөх тэнгэр", fileUrl: "https://cdn/x.mp3" });
    const track = songToPlayerTrack(s);
    expect(track.id).toBe("song-1");
    expect(track.songId).toBe("song-1");
    expect(track.title).toBe("Хөх тэнгэр");
    expect(track.file).toBe("https://cdn/x.mp3");
  });

  it("prefers song.artist, then artistRef.name, then explicit artistName param, then fallback track, then 'Тодорхойгүй'", () => {
    const withArtist = songToPlayerTrack(song({ id: "s1", title: "T", artist: "Батаа" }));
    expect(withArtist.artist).toBe("Батаа");

    const withRef = songToPlayerTrack(song({ id: "s2", title: "T", artist: null, artistRef: { id: "a1", name: "Сараа", bio: null, careerInfo: null, photoUrl: null, createdAt: "" } }));
    expect(withRef.artist).toBe("Сараа");

    const withParam = songToPlayerTrack(song({ id: "s3", title: "T", artist: null }), null, "Гадаад нэр");
    expect(withParam.artist).toBe("Гадаад нэр");

    const withFallback = songToPlayerTrack(song({ id: "s4", title: "T", artist: null }), { id: "prev", title: "P", artist: "Хуучин", genre: "Поп", file: "" });
    expect(withFallback.artist).toBe("Хуучин");

    const withNone = songToPlayerTrack(song({ id: "s5", title: "T", artist: null }));
    expect(withNone.artist).toBe("Тодорхойгүй");
  });

  it("uses coverUrl when present, otherwise falls back to fallback track's cover, otherwise a stable computed fallback", () => {
    const withCover = songToPlayerTrack(song({ id: "s1", title: "T", coverUrl: "https://cdn/cover.jpg" }));
    expect(withCover.cover).toBe("https://cdn/cover.jpg");

    const withFallbackCover = songToPlayerTrack(song({ id: "s2", title: "T", coverUrl: null }), { id: "prev", title: "P", artist: "", genre: "", file: "", cover: "https://cdn/prev-cover.jpg" });
    expect(withFallbackCover.cover).toBe("https://cdn/prev-cover.jpg");

    const withComputedFallback = songToPlayerTrack(song({ id: "s3", title: "Same Title" }));
    expect(withComputedFallback.cover).toBe(fallbackCover("Same Title"));
  });

  it("defaults genre to 'Бусад' when the song has none and no fallback provides one", () => {
    const track = songToPlayerTrack(song({ id: "s1", title: "T", genre: null }));
    expect(track.genre).toBe("Бусад");
  });

  it("passes through duration and releaseYear when present, undefined when absent with no fallback", () => {
    const withValues = songToPlayerTrack(song({ id: "s1", title: "T", duration: 245, releaseYear: 2024 }));
    expect(withValues.duration).toBe(245);
    expect(withValues.releaseYear).toBe(2024);

    const withoutValues = songToPlayerTrack(song({ id: "s2", title: "T", duration: null, releaseYear: null }));
    expect(withoutValues.duration).toBeUndefined();
    expect(withoutValues.releaseYear).toBeUndefined();
  });
});

describe("fallbackCover", () => {
  it("is deterministic — same title always yields the same cover", () => {
    expect(fallbackCover("Тогтвортой нэр")).toBe(fallbackCover("Тогтвортой нэр"));
  });
});
