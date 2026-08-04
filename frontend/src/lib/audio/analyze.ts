"use client";

/* Клиент талд (browser) ажилладаг аудио анализ — backend Node.js орчинд Web Audio API байхгүй тул
   энд тооцоолж, үр дүнг зөвхөн хадгалуулахаар backend рүү илгээнэ (POST /songs/:id/analyze).
   Давтамжийн бүс хуваалт нь Python worker-ийн Haptic Score-той (8 логарифм бүс,
   `BAND_EDGES_HZ = [20,60,150,400,1000,2500,6000,12000,20000]`, см. worker/worker/analysis.py)
   ЗАХ ТОХИРУУЛСАН — upload-ийн энгийн урьдчилсан preview (bandEnergies) болон Score-ийн
   playback-ийн 8-бүс ижил давтамжийн заагтай байх тул хэрэглэгчид нийцтэй мэдрэгдэнэ.
   (bassEnergy/midEnergy/trebleEnergy 3-бүс талбарууд Song.bandEnergies-тэй зэрэгцэн
   ХЭВЭЭР үлдэнэ — хуучин upload хийсэн дуунуудын өгөгдлийг гээхгүйн тулд, см. schema.prisma.) */
import type { AnalyzeSongPayload } from "@/types/song";

const FFT_SIZE = 256;
const WAVEFORM_POINTS = 200;
const BAND_EDGES_HZ = [20, 60, 150, 400, 1000, 2500, 6000, 12000, 20000];

export async function analyzeAudioFile(fileUrl: string): Promise<AnalyzeSongPayload> {
  const res = await fetch(fileUrl);
  const arrayBuffer = await res.arrayBuffer();

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  let buffer: AudioBuffer;
  try {
    buffer = await ctx.decodeAudioData(arrayBuffer);
  } finally {
    ctx.close().catch(() => {});
  }

  const channel = buffer.getChannelData(0);
  const sampleRate = buffer.sampleRate;

  const { rms, peak, waveformPeaks } = computeWaveform(channel);
  const { beatCount, beatTimestamps, bpm } = detectBeats(channel, sampleRate);
  const { bassEnergy, midEnergy, trebleEnergy } = computeBandEnergy(channel, sampleRate);
  const bandEnergies = computeBandEnergies8(channel, sampleRate);

  return {
    /* Дууны урт — decodeAudioData()-ийн буцаасан бодит утга. Дуу бүрийн duration-ийг
       backend-д бичих ганц эх сурвалж энэ (upload формд гараар оруулдаггүй). */
    duration: Math.round(buffer.duration),
    bpm: bpm ?? undefined,
    beatCount,
    beatTimestamps,
    rms,
    peak,
    bassEnergy,
    midEnergy,
    trebleEnergy,
    bandEnergies,
    waveformPeaks,
  };
}

function computeWaveform(channel: Float32Array) {
  const blockSize = Math.max(1, Math.floor(channel.length / WAVEFORM_POINTS));
  const waveformPeaks: number[] = [];
  let sumSquares = 0;
  let peak = 0;

  for (let i = 0; i < channel.length; i += blockSize) {
    let blockPeak = 0;
    const end = Math.min(i + blockSize, channel.length);
    for (let j = i; j < end; j++) {
      const abs = Math.abs(channel[j]);
      if (abs > blockPeak) blockPeak = abs;
      if (abs > peak) peak = abs;
      sumSquares += channel[j] * channel[j];
    }
    waveformPeaks.push(Number(Math.min(1, blockPeak).toFixed(4)));
  }

  const rms = Math.min(1, Math.sqrt(sumSquares / channel.length));
  return { rms: Number(rms.toFixed(4)), peak: Number(Math.min(1, peak).toFixed(4)), waveformPeaks };
}

/* Energy-based beat detection: RMS-ийг цонхоор (жишээ нь 50мс) тооцоолж,
   локал дундажаас мэдэгдэхүйц давсан цэгүүдийг цохилт гэж үзнэ. */
function detectBeats(channel: Float32Array, sampleRate: number) {
  const windowSize = Math.floor(sampleRate * 0.05); // 50мс
  const windowCount = Math.floor(channel.length / windowSize);
  const energies: number[] = new Array(windowCount);

  for (let w = 0; w < windowCount; w++) {
    let sum = 0;
    const start = w * windowSize;
    const end = start + windowSize;
    for (let i = start; i < end; i++) sum += channel[i] * channel[i];
    energies[w] = sum / windowSize;
  }

  const localSpan = 20; // ойролцоогоор 1 секундын цонх
  const beatTimestamps: number[] = [];
  for (let w = 0; w < windowCount; w++) {
    const lo = Math.max(0, w - localSpan);
    const hi = Math.min(windowCount, w + localSpan);
    let localAvg = 0;
    for (let k = lo; k < hi; k++) localAvg += energies[k];
    localAvg /= hi - lo;

    if (energies[w] > localAvg * 1.5 && energies[w] > 0.0001) {
      const t = (w * windowSize) / sampleRate;
      const last = beatTimestamps[beatTimestamps.length - 1];
      if (last === undefined || t - last > 0.25) beatTimestamps.push(Number(t.toFixed(3)));
    }
  }

  let bpm: number | null = null;
  if (beatTimestamps.length > 1) {
    const intervals: number[] = [];
    for (let i = 1; i < beatTimestamps.length; i++) intervals.push(beatTimestamps[i] - beatTimestamps[i - 1]);
    intervals.sort((a, b) => a - b);
    const median = intervals[Math.floor(intervals.length / 2)];
    if (median > 0) bpm = Math.round(60 / median);
  }

  return { beatCount: beatTimestamps.length, beatTimestamps, bpm };
}

/* Давтамжийн 3 бүсийн (bass/mid/treble) дундаж энергийг цонх бүрд Goertzel-style DFT-ээр
   тооцоолно — Player.tsx-ийн RAF loop-той ИЖИЛ fftSize (256) болон bass/mid/high харьцаа
   (~8%/30%/62% of 128 bins) ашиглана, тул playback үеийн болон анализ үеийн тоо нийцтэй. */
function computeBandEnergy(channel: Float32Array, sampleRate: number) {
  const windowSamples = FFT_SIZE;
  const n = FFT_SIZE / 2; // AnalyserNode.frequencyBinCount эквивалент
  const ai = Math.floor(n * 0.08);
  const bi = Math.floor(n * 0.38);

  const windowCount = Math.max(1, Math.floor(channel.length / windowSamples));
  // Хурдны үүднээс дунджаас цонхыг дээж авна (max ~300) — бүтэн дуу бүрийн window шаардлагагүй.
  const step = Math.max(1, Math.floor(windowCount / 300));

  let bassSum = 0;
  let midSum = 0;
  let trebleSum = 0;
  let sampled = 0;

  for (let w = 0; w < windowCount; w += step) {
    const start = w * windowSamples;
    const mags = dftMagnitudes(channel, start, windowSamples, n);
    let bass = 0,
      mid = 0,
      treble = 0;
    for (let i = 0; i < ai; i++) bass += mags[i];
    for (let i = ai; i < bi; i++) mid += mags[i];
    for (let i = bi; i < n; i++) treble += mags[i];
    bassSum += bass / ai;
    midSum += mid / (bi - ai);
    trebleSum += treble / (n - bi);
    sampled++;
  }

  void sampleRate;
  return {
    bassEnergy: Number((bassSum / sampled).toFixed(4)),
    midEnergy: Number((midSum / sampled).toFixed(4)),
    trebleEnergy: Number((trebleSum / sampled).toFixed(4)),
  };
}

/* Worker-ийн Haptic Score-той ЗАХ ТОХИРУУЛСАН 8 логарифм бүсийн дундаж энергийг
   тооцоолно (`BAND_EDGES_HZ`, см. файлын эхний тайлбар) — `computeBandEnergy()`-тэй
   ижил sampled-window арга, зөвхөн bin→Hz хөрвүүлж 8 бүсэд хуваарилдгаараа ялгаатай.
   FFT_SIZE (256) нь 3-бүсийн playback-той нийцүүлэхэд зориулагдсан бөгөөд эндхийн
   доод давтамжийн (20-150Hz) 2 бүсийг ялгахад хэт бага нарийвчлалтай (~172Hz/bin)
   тул энд ЗӨВХӨН энэ функцэд зориулж 8x том цонх (2048, ~21.5Hz/bin) ашиглана. */
const BAND8_WINDOW = FFT_SIZE * 8;

export function computeBandEnergies8(channel: Float32Array, sampleRate: number): number[] {
  const windowSamples = BAND8_WINDOW;
  const n = BAND8_WINDOW / 2;
  const nyquist = sampleRate / 2;
  const hzPerBin = nyquist / n;

  // Давтамжийн зах бүрийг bin индекс болгож урьдчилан тооцоол — цонх бүрд дахин
  // тооцохгүйн тулд (BAND_EDGES_HZ-ийн 9 зах → 8 бүс).
  const binEdges = BAND_EDGES_HZ.map((hz) => Math.min(n, Math.max(0, Math.round(hz / hzPerBin))));

  const windowCount = Math.max(1, Math.floor(channel.length / windowSamples));
  const step = Math.max(1, Math.floor(windowCount / 300));

  const sums = new Array(BAND_EDGES_HZ.length - 1).fill(0);
  let sampled = 0;

  for (let w = 0; w < windowCount; w += step) {
    const start = w * windowSamples;
    const mags = dftMagnitudes(channel, start, windowSamples, n);
    for (let b = 0; b < sums.length; b++) {
      const lo = binEdges[b];
      const hi = Math.max(lo + 1, binEdges[b + 1]); // хамгийн багадаа 1 bin (доод захын бүс хэт нарийхан байж болно)
      let sum = 0;
      for (let i = lo; i < hi; i++) sum += mags[i] ?? 0;
      sums[b] += sum / (hi - lo);
    }
    sampled++;
  }

  return sums.map((s) => Number((s / sampled).toFixed(4)));
}

/* Энгийн (Hann цонхтой) DFT magnitude тооцоолол — analyser.getByteFrequencyData(0-255)-тэй
   харьцуулах зорилгоор 0-1 хооронд normalize хийсэн утга буцаана. */
function dftMagnitudes(channel: Float32Array, start: number, windowSize: number, binCount: number): Float32Array {
  const mags = new Float32Array(binCount);
  const windowed = new Float32Array(windowSize);
  const len = channel.length;
  for (let i = 0; i < windowSize; i++) {
    const idx = start + i;
    const sample = idx < len ? channel[idx] : 0;
    const hann = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (windowSize - 1));
    windowed[i] = sample * hann;
  }
  let maxMag = 0;
  for (let k = 0; k < binCount; k++) {
    let re = 0;
    let im = 0;
    const w = (2 * Math.PI * k) / windowSize;
    for (let i = 0; i < windowSize; i++) {
      re += windowed[i] * Math.cos(w * i);
      im -= windowed[i] * Math.sin(w * i);
    }
    const mag = Math.sqrt(re * re + im * im) / windowSize;
    mags[k] = mag;
    if (mag > maxMag) maxMag = mag;
  }
  if (maxMag > 0) {
    for (let k = 0; k < binCount; k++) mags[k] = Math.min(1, mags[k] / maxMag);
  }
  return mags;
}
