import { describe, it, expect } from "vitest";
import { BeatScheduler } from "./beat-scheduler";

describe("BeatScheduler", () => {
  it("hasTimestamps is false with no track set", () => {
    const s = new BeatScheduler();
    expect(s.hasTimestamps).toBe(false);
  });

  it("hasTimestamps is true once a non-empty track is set, sorted ascending", () => {
    const s = new BeatScheduler();
    s.setTrack([2, 0.5, 1]);
    expect(s.hasTimestamps).toBe(true);
  });

  it("setTrack with null/undefined/empty clears timestamps", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 2, 3]);
    s.setTrack(null);
    expect(s.hasTimestamps).toBe(false);
    s.setTrack([1]);
    s.setTrack(undefined);
    expect(s.hasTimestamps).toBe(false);
    s.setTrack([1]);
    s.setTrack([]);
    expect(s.hasTimestamps).toBe(false);
  });

  it("poll() fires exactly once per timestamp crossed, not on every call", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 2, 3]);
    expect(s.poll(0.5)).toBe(false); // before first beat
    expect(s.poll(1.0)).toBe(true); // crosses beat at 1
    expect(s.poll(1.0)).toBe(false); // same time again — already fired
    expect(s.poll(1.5)).toBe(false); // between beats
    expect(s.poll(2.5)).toBe(true); // crosses beat at 2
  });

  it("poll() fires once even if multiple beats are crossed in a single jump (e.g. frame drop)", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 1.1, 1.2]);
    expect(s.poll(5.0)).toBe(true); // jumped past all three beats at once
    expect(s.poll(5.1)).toBe(false); // nothing left to cross
  });

  it("pollDetailed() reports the exact ground-truth timestamp that was crossed (for latency measurement)", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 2, 3]);
    const result = s.pollDetailed(1.05);
    expect(result.fired).toBe(true);
    expect(result.crossedAt).toBe(1);
  });

  it("handles a seek backwards by resetting the cursor to the correct position", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 2, 3, 4]);
    s.poll(2.5); // fires for beats at 1 and 2
    // seek back to before beat 2
    expect(s.poll(1.5)).toBe(false); // cursor rewound, beat at 2 not yet reached again
    expect(s.poll(2.1)).toBe(true); // beat at 2 fires again after the seek
  });

  it("reset() rewinds the cursor to the start without needing setTrack again", () => {
    const s = new BeatScheduler();
    s.setTrack([1, 2]);
    s.poll(3); // fires for both
    s.reset();
    expect(s.poll(1.1)).toBe(true); // fires again from the start
  });
});
