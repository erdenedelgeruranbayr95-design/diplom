import { describe, it, expect } from "vitest";
import { toProgressChartData, averageOf, completedSessions } from "./progress-chart";
import type { Progress, TherapySession } from "@/types/therapy";

function progress(overrides: Partial<Progress> & { id: string; recordedAt: string }): Progress {
  return { userId: "u1", therapySessionId: null, completionPct: null, engagementScore: null, ...overrides };
}

function session(overrides: Partial<TherapySession> & { id: string; status: TherapySession["status"] }): TherapySession {
  return {
    therapistId: "t1",
    userId: "u1",
    songId: null,
    notes: null,
    scheduledAt: null,
    completedAt: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("toProgressChartData", () => {
  it("sorts ascending by recordedAt regardless of input order", () => {
    const input = [
      progress({ id: "p3", recordedAt: "2026-03-01T00:00:00.000Z", completionPct: 30 }),
      progress({ id: "p1", recordedAt: "2026-01-01T00:00:00.000Z", completionPct: 10 }),
      progress({ id: "p2", recordedAt: "2026-02-01T00:00:00.000Z", completionPct: 20 }),
    ];
    const result = toProgressChartData(input);
    expect(result.map((r) => r.completionPct)).toEqual([10, 20, 30]);
  });

  it("does not mutate the original array", () => {
    const input = [
      progress({ id: "p2", recordedAt: "2026-02-01T00:00:00.000Z" }),
      progress({ id: "p1", recordedAt: "2026-01-01T00:00:00.000Z" }),
    ];
    const originalOrder = input.map((p) => p.id);
    toProgressChartData(input);
    expect(input.map((p) => p.id)).toEqual(originalOrder);
  });

  it("normalizes null completionPct/engagementScore to null (not undefined or 0)", () => {
    const [point] = toProgressChartData([progress({ id: "p1", recordedAt: "2026-01-01T00:00:00.000Z" })]);
    expect(point.completionPct).toBeNull();
    expect(point.engagementScore).toBeNull();
  });

  it("returns an empty array for empty input", () => {
    expect(toProgressChartData([])).toEqual([]);
  });
});

describe("averageOf", () => {
  it("returns 0 for an empty array (no division by zero)", () => {
    expect(averageOf([], "completionPct")).toBe(0);
  });

  it("computes the rounded average of a numeric field", () => {
    const rows = [
      progress({ id: "p1", recordedAt: "2026-01-01T00:00:00.000Z", completionPct: 50 }),
      progress({ id: "p2", recordedAt: "2026-01-02T00:00:00.000Z", completionPct: 75 }),
    ];
    expect(averageOf(rows, "completionPct")).toBe(63); // (50+75)/2 = 62.5 -> rounds to 63
  });

  it("treats null values as 0 in the average (not excluded from the divisor)", () => {
    const rows = [
      progress({ id: "p1", recordedAt: "2026-01-01T00:00:00.000Z", completionPct: 100 }),
      progress({ id: "p2", recordedAt: "2026-01-02T00:00:00.000Z", completionPct: null }),
    ];
    expect(averageOf(rows, "completionPct")).toBe(50);
  });
});

describe("completedSessions", () => {
  it("filters to only COMPLETED status", () => {
    const sessions = [
      session({ id: "s1", status: "COMPLETED" }),
      session({ id: "s2", status: "SCHEDULED" }),
      session({ id: "s3", status: "IN_PROGRESS" }),
      session({ id: "s4", status: "COMPLETED" }),
      session({ id: "s5", status: "CANCELLED" }),
    ];
    expect(completedSessions(sessions).map((s) => s.id)).toEqual(["s1", "s4"]);
  });

  it("returns an empty array when nothing is completed", () => {
    expect(completedSessions([session({ id: "s1", status: "SCHEDULED" })])).toEqual([]);
  });
});
