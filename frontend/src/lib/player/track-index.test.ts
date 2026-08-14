import { describe, it, expect } from "vitest";
import { filterTracks, indexTracksById, resolveTracks, ALL_GENRES } from "./track-index";
import type { PlayerTrack } from "@/types/player";

function track(overrides: Partial<PlayerTrack> & { id: PlayerTrack["id"]; title: string; genre: string }): PlayerTrack {
  return { artist: "", ...overrides };
}

const TRACKS: PlayerTrack[] = [
  track({ id: 1, title: "Хөх тэнгэр", artist: "Батаа", genre: "Поп", album: "Анхны алхам" }),
  track({ id: 2, title: "Уулын салхи", artist: "Сараа", genre: "Ардын" }),
  track({ id: "backend-3", title: "Talst Night", artist: "DJ Whisper", genre: "Электрон", album: "Neon Steppe" }),
];

describe("filterTracks", () => {
  it("returns everything when genre is ALL_GENRES and query is empty", () => {
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "" })).toHaveLength(3);
  });

  it("filters strictly by genre when a specific genre is selected", () => {
    const result = filterTracks(TRACKS, { genre: "Поп", query: "" });
    expect(result.map((t) => t.id)).toEqual([1]);
  });

  it("matches query case-insensitively across title, artist, and genre", () => {
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "БАтаа" }).map((t) => t.id)).toEqual([1]);
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "whisper" }).map((t) => t.id)).toEqual(["backend-3"]);
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "электрон" }).map((t) => t.id)).toEqual(["backend-3"]);
  });

  it("matches the album name too", () => {
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "neon steppe" }).map((t) => t.id)).toEqual(["backend-3"]);
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "анхны" }).map((t) => t.id)).toEqual([1]);
  });

  /* Талбаруудыг шууд залгавал цомоггүй дуу "undefined" гэсэн текст агуулж,
     "undef" гэж хайхад олдоно — хоосон талбарыг шүүж байгаагийн баталгаа. */
  it("does not leak undefined fields into the searchable text", () => {
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "undefined" })).toHaveLength(0);
  });

  it("combines genre and query filters (both must match)", () => {
    expect(filterTracks(TRACKS, { genre: "Поп", query: "уул" })).toHaveLength(0);
    expect(filterTracks(TRACKS, { genre: "Поп", query: "хөх" }).map((t) => t.id)).toEqual([1]);
  });

  it("trims whitespace from the query before matching", () => {
    expect(filterTracks(TRACKS, { genre: ALL_GENRES, query: "  батаа  " }).map((t) => t.id)).toEqual([1]);
  });
});

describe("indexTracksById / resolveTracks", () => {
  it("indexes both numeric and string ids as string keys", () => {
    const index = indexTracksById(TRACKS);
    expect(index.get("1")?.title).toBe("Хөх тэнгэр");
    expect(index.get("backend-3")?.title).toBe("Talst Night");
  });

  it("resolveTracks silently drops ids that are not found in the index", () => {
    const index = indexTracksById(TRACKS);
    const resolved = resolveTracks([1, "backend-3", "nonexistent"], index);
    expect(resolved.map((t) => t.id)).toEqual([1, "backend-3"]);
  });
});
