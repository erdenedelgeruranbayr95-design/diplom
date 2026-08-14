import { describe, it, expect } from "vitest";
import { beatTimingPattern, beatWaveform, waveformDurationMs, type LevelShape } from "./beat-pattern";

const MID: LevelShape = { peak: 0.95, body: 1.0 };

/* Эдгээр тест нь «чичиргээ нэг хэмнэлээр л явна» гэсэн алдааг дахин гаргахаас
   сэргийлнэ: эрчим өөрчлөгдөхөд ГАРАЛТ ЗААВАЛ өөрчлөгдөх ёстой — хоёр сувагт
   хоёуланд нь. */

describe("beatWaveform (амплитудтай суваг)", () => {
  it("эрчим өсөхөд оргил амплитуд өснө", () => {
    const soft = beatWaveform(0.35, 0.3, MID);
    const loud = beatWaveform(1.0, 0.3, MID);
    expect(Math.max(...loud.amplitudes)).toBeGreaterThan(Math.max(...soft.amplitudes));
  });

  it("гүн цохилт хурцаас УРТ үргэлжилнэ", () => {
    const deep = beatWaveform(0.8, 0.0, MID);
    const sharp = beatWaveform(0.8, 1.0, MID);
    expect(waveformDurationMs(deep)).toBeGreaterThan(waveformDurationMs(sharp));
  });

  it("дугтуй буурна — эхний алхам хамгийн хүчтэй", () => {
    const w = beatWaveform(1.0, 0.0, MID);
    const steps = w.amplitudes.slice(1); // [0] нь хүлээх алхам
    expect(steps.length).toBeGreaterThan(1);
    for (let i = 1; i < steps.length; i++) expect(steps[i]).toBeLessThan(steps[i - 1]);
  });

  it("онсет (accent < 1) цохилтоос сул бөгөөд богино", () => {
    const beat = beatWaveform(0.8, 0.3, MID, 1);
    const onset = beatWaveform(0.8, 0.3, MID, 0.55);
    expect(Math.max(...onset.amplitudes)).toBeLessThan(Math.max(...beat.amplitudes));
    expect(waveformDurationMs(onset)).toBeLessThan(waveformDurationMs(beat));
  });

  it("хамгийн сул цохилт ч мэдрэгдэх амплитудтай үлдэнэ", () => {
    const w = beatWaveform(0.01, 0.5, MID);
    expect(Math.max(...w.amplitudes)).toBeGreaterThanOrEqual(45);
  });
});

describe("beatTimingPattern (амплитудгүй суваг — браузер)", () => {
  it("эрчмийг ХУГАЦААГААР илэрхийлнэ: хүчтэй нь урт", () => {
    const soft = beatTimingPattern(0.35, 0.3, MID)[0];
    const loud = beatTimingPattern(1.0, 0.3, MID)[0];
    expect(loud).toBeGreaterThan(soft);
  });

  /* Энэ бол алдааны ГОЛ шалгуур: өмнө нь дунд/өндөр бүсийн цохилт тогтмол
     хугацаатай байсан тул эрчим ялгарахгүй байв. */
  it("эрчмийн бүх мужид ялгаатай урт өгнө (тогтмол БИШ)", () => {
    const lengths = [0.35, 0.5, 0.65, 0.8, 1.0].map((i) => beatTimingPattern(i, 0.3, MID)[0]);
    expect(new Set(lengths).size).toBe(lengths.length);
  });

  it("гүн цохилт хурцаас урт", () => {
    expect(beatTimingPattern(0.8, 0.0, MID)[0]).toBeGreaterThan(beatTimingPattern(0.8, 1.0, MID)[0]);
  });

  it("маш хүчтэй, гүн цохилт давхар импульс болно", () => {
    expect(beatTimingPattern(0.95, 0.1, MID).length).toBe(3);
    expect(beatTimingPattern(0.5, 0.1, MID).length).toBe(1);
  });

  it("бүх импульс мэдрэгдэх ба хэтрэхгүй хязгаарт багтана", () => {
    for (const i of [0, 0.2, 0.5, 0.9, 1]) {
      for (const b of [0, 0.5, 1]) {
        for (const ms of beatTimingPattern(i, b, MID)) {
          expect(ms).toBeGreaterThanOrEqual(12);
          expect(ms).toBeLessThanOrEqual(130);
        }
      }
    }
  });
});
