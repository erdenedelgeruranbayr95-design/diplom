import { describe, it, expect } from "vitest";
import { parseLyrics, hasTimestamps, activeLyricIndex } from "./lyrics";

describe("parseLyrics", () => {
  it("parses LRC-style timestamped lines", () => {
    const lines = parseLyrics("[00:12.50] Эхний мөр\n[00:15.00] Хоёр дахь мөр");
    expect(lines).toEqual([
      { time: 12.5, text: "Эхний мөр" },
      { time: 15, text: "Хоёр дахь мөр" },
    ]);
  });

  it("parses timestamps without centiseconds", () => {
    const lines = parseLyrics("[01:05] Мөр");
    expect(lines[0].time).toBe(65);
  });

  it("treats lines without timestamps as free text", () => {
    const lines = parseLyrics("Энгийн мөр 1\nЭнгийн мөр 2");
    expect(lines).toEqual([
      { time: null, text: "Энгийн мөр 1" },
      { time: null, text: "Энгийн мөр 2" },
    ]);
  });

  it("skips blank lines", () => {
    const lines = parseLyrics("Мөр 1\n\n\nМөр 2");
    expect(lines).toHaveLength(2);
  });

  it("returns an empty array for empty input", () => {
    expect(parseLyrics("")).toEqual([]);
  });
});

describe("hasTimestamps", () => {
  it("is true when at least one line has a timestamp", () => {
    expect(hasTimestamps(parseLyrics("[00:01] a\nb"))).toBe(true);
  });
  it("is false when no line has a timestamp", () => {
    expect(hasTimestamps(parseLyrics("a\nb"))).toBe(false);
  });
});

describe("activeLyricIndex", () => {
  const lines = parseLyrics("[00:00] a\n[00:10] b\n[00:20] c");

  it("returns -1 before the first timestamp", () => {
    expect(activeLyricIndex(lines, -1)).toBe(-1);
  });
  it("returns the most recently crossed line", () => {
    expect(activeLyricIndex(lines, 0)).toBe(0);
    expect(activeLyricIndex(lines, 9.9)).toBe(0);
    expect(activeLyricIndex(lines, 10)).toBe(1);
    expect(activeLyricIndex(lines, 25)).toBe(2);
  });
  it("returns -1 for untimestamped lyrics regardless of currentTime", () => {
    expect(activeLyricIndex(parseLyrics("a\nb\nc"), 100)).toBe(-1);
  });
});
