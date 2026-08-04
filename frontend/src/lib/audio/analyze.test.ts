import { describe, it, expect } from "vitest";
import { computeBandEnergies8 } from "./analyze";

/* worker/worker/analysis.py-ийн BAND_EDGES_HZ-тэй зах тохирсныг баталгаажуулна —
   энэ бол Score-ийн playback-ийн 8-бүс (useHapticEngine.ts) болон upload-ийн
   урьдчилсан preview (energy [0..1] массив) хооронд давтамжийн заагийн зөрүү
   гарахгүй байхыг шалгах цорын ганц unit тест. */
describe("computeBandEnergies8", () => {
  const sampleRate = 44100;

  function silentChannel(seconds = 1) {
    return new Float32Array(Math.floor(sampleRate * seconds));
  }

  function sineChannel(freqHz: number, seconds = 1) {
    const channel = new Float32Array(Math.floor(sampleRate * seconds));
    for (let i = 0; i < channel.length; i++) {
      channel[i] = Math.sin((2 * Math.PI * freqHz * i) / sampleRate);
    }
    return channel;
  }

  it("returns exactly 8 bands", () => {
    const result = computeBandEnergies8(silentChannel(), sampleRate);
    expect(result).toHaveLength(8);
  });

  it("returns all-zero energy for silence", () => {
    const result = computeBandEnergies8(silentChannel(), sampleRate);
    expect(result.every((v) => v === 0)).toBe(true);
  });

  it("all band values are normalized to [0, 1]", () => {
    const result = computeBandEnergies8(sineChannel(1000), sampleRate);
    for (const v of result) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("concentrates energy in the band containing a pure low-frequency tone (bass, index 1: 60-150Hz)", () => {
    const result = computeBandEnergies8(sineChannel(100), sampleRate);
    const bassIdx = 1; // BAND_EDGES_HZ[1..2] = 60-150Hz
    const maxIdx = result.indexOf(Math.max(...result));
    expect(maxIdx).toBe(bassIdx);
  });

  it("concentrates energy in the band containing a pure high-frequency tone (brilliance, index 6: 6000-12000Hz)", () => {
    const result = computeBandEnergies8(sineChannel(8000), sampleRate);
    const highIdx = 6; // BAND_EDGES_HZ[6..7] = 6000-12000Hz
    const maxIdx = result.indexOf(Math.max(...result));
    expect(maxIdx).toBe(highIdx);
  });
});
