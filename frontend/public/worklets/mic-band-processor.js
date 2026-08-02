/* AudioWorkletProcessor — микрофоны live дуу чимээнээс 8 давтамжийн бүсийн энергийг
   тооцоолж, гол thread рүү (postMessage) секунд тутам ~30 удаа (128 sample block-ийн
   3-4 удаа) илгээнэ. Node.js/backend-гүй, зөвхөн browser-ийн Web Audio API.

   Yagsaж дэлгэрэнгүй FFT (worker/worker/analysis.py-ийн STFT) биш — realtime микрофон
   горимд зориулсан хямд Goertzel-төстэй energy estimation (blockSize=128 sample тутамд
   8 бүсийн зурвасын шүүлт хийхэд хангалттай нарийвчлалтай, CPU хямд). */

const BAND_EDGES_HZ = [20, 60, 150, 400, 1000, 2500, 6000, 12000, 20000];

class MicBandProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.frameCount = 0;
    this.emitEvery = 4; // ~128*4/48000 ≈ 10.7мс тутамд message (гол thread throttle хийнэ)
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;
    const channel = input[0]; // Float32Array, 128 sample

    this.frameCount++;
    if (this.frameCount % this.emitEvery !== 0) return true;

    const bands = this.computeBandEnergy(channel, sampleRate);
    this.port.postMessage({ bands });
    return true;
  }

  /** Энгийн Goertzel-style энерги тооцоолол — 8 бүс тус бүрийн төлөөлөх давтамж
   *  дээр Goertzel алгоритм ажиллуулж, магнитудыг 0..1 normalize хийнэ. */
  computeBandEnergy(channel, sr) {
    const n = channel.length;
    const bands = new Array(BAND_EDGES_HZ.length - 1).fill(0);
    for (let b = 0; b < bands.length; b++) {
      const freq = Math.sqrt(BAND_EDGES_HZ[b] * BAND_EDGES_HZ[b + 1]); // геометр дундаж
      const k = Math.round((n * freq) / sr);
      const omega = (2 * Math.PI * k) / n;
      const cosine = Math.cos(omega);
      const coeff = 2 * cosine;
      let q0 = 0,
        q1 = 0,
        q2 = 0;
      for (let i = 0; i < n; i++) {
        q0 = coeff * q1 - q2 + channel[i];
        q2 = q1;
        q1 = q0;
      }
      const magnitude = Math.sqrt(q1 * q1 + q2 * q2 - q1 * q2 * coeff);
      bands[b] = magnitude;
    }
    const max = Math.max(...bands) || 1;
    return bands.map((v) => Math.min(1, v / max));
  }
}

registerProcessor("mic-band-processor", MicBandProcessor);
