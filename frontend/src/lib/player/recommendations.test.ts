import { describe, it, expect } from "vitest";
import { scoreRecommendations, type Scorable } from "./recommendations";
import type { ListeningStats } from "@/types/track";

interface T extends Scorable {
  id: string;
}

function t(id: string, genre: string, title = id): T {
  return { id, title, genre };
}

function stats(overrides: Partial<ListeningStats> = {}): ListeningStats {
  return { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {}, ...overrides };
}

describe("scoreRecommendations", () => {
  it("never recommends a track already liked or saved", () => {
    const candidates = [t("liked-1", "Поп"), t("saved-1", "Рок"), t("new-1", "Поп")];
    const result = scoreRecommendations(candidates, {
      stats: stats({ byGenre: { Поп: 100 } }),
      likedIds: ["liked-1"],
      savedIds: ["saved-1"],
      recentTracks: [],
    });
    expect(result.map((r) => r.track.id)).not.toContain("liked-1");
    expect(result.map((r) => r.track.id)).not.toContain("saved-1");
  });

  it("excludes ids passed via excludeIds (e.g. the currently playing track)", () => {
    const candidates = [t("cur", "Поп"), t("other", "Поп")];
    const result = scoreRecommendations(candidates, {
      stats: stats({ byGenre: { Поп: 100 } }),
      likedIds: [],
      savedIds: [],
      recentTracks: [],
      excludeIds: ["cur"],
    });
    expect(result.map((r) => r.track.id)).not.toContain("cur");
  });

  it("scores a candidate in the most-listened genre higher than one in an unheard genre", () => {
    const candidates = [t("pop-1", "Поп"), t("jazz-1", "Жаз")];
    const result = scoreRecommendations(candidates, {
      stats: stats({ byGenre: { Поп: 1000 } }), // heavily listened to Pop, zero Jazz
      likedIds: [],
      savedIds: [],
      recentTracks: [],
    });
    const popScore = result.find((r) => r.track.id === "pop-1")?.score ?? 0;
    const jazzResult = result.find((r) => r.track.id === "jazz-1");
    expect(jazzResult).toBeUndefined(); // zero-affinity, zero-signal candidate is dropped entirely
    expect(popScore).toBeGreaterThan(0);
  });

  it("does not recommend a candidate with zero score from any signal (no fabricated reasons)", () => {
    const candidates = [t("unknown", "НикогдаСонсоогүй")];
    const result = scoreRecommendations(candidates, {
      stats: null,
      likedIds: [],
      savedIds: [],
      recentTracks: [],
    });
    expect(result).toHaveLength(0);
  });

  it("boosts genres shared with liked tracks and includes a matching reason", () => {
    const candidates = [t("liked-genre-match", "Ардын"), t("liked-1", "Ардын")];
    const result = scoreRecommendations(candidates, {
      stats: null,
      likedIds: ["liked-1"],
      savedIds: [],
      recentTracks: [],
    });
    const match = result.find((r) => r.track.id === "liked-genre-match");
    expect(match).toBeDefined();
    expect(match!.reasons.some((r) => r.includes("дуртай"))).toBe(true);
  });

  it("respects the limit option and sorts descending by score", () => {
    const candidates = [t("a", "Поп"), t("b", "Ардын"), t("c", "Рок")];
    const result = scoreRecommendations(candidates, {
      stats: stats({ byGenre: { Поп: 100, Ардын: 50, Рок: 10 } }),
      likedIds: [],
      savedIds: [],
      recentTracks: [],
      limit: 2,
    });
    expect(result).toHaveLength(2);
    expect(result[0].score).toBeGreaterThanOrEqual(result[1].score);
  });

  it("caps reasons at 2 per recommendation even when multiple signals apply", () => {
    const candidates = [t("multi", "Поп")];
    const result = scoreRecommendations(candidates, {
      stats: stats({ byGenre: { Поп: 1000 } }),
      likedIds: ["other-pop"], // not a real candidate id, only used to derive likedGenres via a same-genre candidate below
      savedIds: [],
      recentTracks: [t("recent-pop", "Поп", "Recent")],
    });
    const match = result.find((r) => r.track.id === "multi");
    expect(match!.reasons.length).toBeLessThanOrEqual(2);
  });
});
