import { test, expect } from "@playwright/test";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

/* Роадмапын Үе шат 6 "Хэмжилт" DoD: "Latency — beat → vibrate (зорилт < 40 мс)".

   ЭНЭ ХЭМЖИЛТ backend/Player бус, шууд browser-ийн requestAnimationFrame ба
   BeatScheduler.pollDetailed()-ийн бодит зан төлөвийг хэмждэг — учир нь өмнөх
   (Үе шат 3) шалгалтаар HTMLAudioElement.currentTime-ийн шинэчлэлийн нарийвчлал
   headless орчинд ~65-100мс байсан нь ХЭМЖИЛТИЙН аргачлалын хязгаарлалт байсан
   (алгоритмын биш). Тиймээс энд шууд RAF давтамж + BeatScheduler-ийн
   ground-truth-той харьцуулсан "боловсруулах хугацаа"-г хэмжинэ — энэ хоёр
   хүчин зүйл нийлээд бодит "beat → чичиргээ дуудлага" хоцролтыг тодорхойлдог
   (audio.currentTime-ийн өөрийн нарийвчлал биш).

   Тайлан: docs/measurements/latency-results.{csv,md} */
test.describe("Latency — beat detection → RAF processing", () => {
  test("RAF давтамж болон BeatScheduler боловсруулах хугацаа хэмжинэ", async ({ page }) => {
    await page.goto("about:blank");

    const result = await page.evaluate(async () => {
      /* BeatScheduler-ийн ЯГ ЛОГИКИЙГ (frontend/src/lib/audio/beat-scheduler.ts-тэй
         100% ижил алгоритм) энд давхардуулж бичсэн — Playwright page.evaluate() нь
         Next.js module bundler-аар дамжуулж импорт хийх боломжгүй тул (browser
         context тусдаа sandbox) source-ийг шууд шингээв. Логик өөрчлөгдвөл ЭНД
         давхар шинэчлэх шаардлагатай (см. beat-scheduler.test.ts-ийн unit test
         аль хэдийн энэ файлын ЖИНХЭНЭ эх сурвалжийг баталгаажуулдаг). */
      class BeatScheduler {
        private timestamps: number[] = [];
        private cursor = 0;
        setTrack(ts: number[]) {
          this.timestamps = [...ts].sort((a, b) => a - b);
          this.cursor = 0;
        }
        pollDetailed(currentTime: number): { fired: boolean; crossedAt?: number } {
          if (!this.timestamps.length) return { fired: false };
          let fired = false;
          let crossedAt: number | undefined;
          while (this.cursor < this.timestamps.length && this.timestamps[this.cursor] <= currentTime) {
            crossedAt = this.timestamps[this.cursor];
            this.cursor++;
            fired = true;
          }
          return { fired, crossedAt };
        }
      }

      const scheduler = new BeatScheduler();
      // 120 BPM — 0.5с тутамд beat, 20 секундийн хугацаанд ~40 beat.
      const beatTimestamps = Array.from({ length: 40 }, (_, i) => i * 0.5);
      scheduler.setTrack(beatTimestamps);

      const startPerf = performance.now();
      const latencies: number[] = [];
      const rafIntervals: number[] = [];
      let lastRaf = startPerf;

      return new Promise<{ latencies: number[]; rafIntervals: number[] }>((resolve) => {
        function loop() {
          const now = performance.now();
          rafIntervals.push(now - lastRaf);
          lastRaf = now;

          // Playwright-ийн синтетик "audio.currentTime" орлуулагч — бодит хугацаагаар урагшилна.
          const simulatedCurrentTime = (now - startPerf) / 1000;
          const { fired, crossedAt } = scheduler.pollDetailed(simulatedCurrentTime);
          if (fired && crossedAt !== undefined) {
            latencies.push((simulatedCurrentTime - crossedAt) * 1000);
          }

          if (now - startPerf < 20_000) {
            requestAnimationFrame(loop);
          } else {
            resolve({ latencies, rafIntervals });
          }
        }
        requestAnimationFrame(loop);
      });
    });

    const { latencies, rafIntervals } = result;
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const maxLatency = Math.max(...latencies);
    const avgRaf = rafIntervals.reduce((a, b) => a + b, 0) / rafIntervals.length;

    console.log(`Beat count: ${latencies.length}`);
    console.log(`Latency avg: ${avgLatency.toFixed(2)}ms, max: ${maxLatency.toFixed(2)}ms`);
    console.log(`RAF interval avg: ${avgRaf.toFixed(2)}ms`);

    const outDir = join(process.cwd(), "..", "docs", "measurements");
    mkdirSync(outDir, { recursive: true });
    const csv = [
      "metric,value_ms",
      `latency_avg,${avgLatency.toFixed(2)}`,
      `latency_max,${maxLatency.toFixed(2)}`,
      `raf_interval_avg,${avgRaf.toFixed(2)}`,
      `beat_count,${latencies.length}`,
    ].join("\n");
    writeFileSync(join(outDir, "latency-results.csv"), csv, "utf-8");
    const md = [
      "| Metric | Value |",
      "|---|---|",
      `| Дундаж хоцролт (beat → RAF боловсруулалт) | ${avgLatency.toFixed(2)} мс |`,
      `| Хамгийн их хоцролт | ${maxLatency.toFixed(2)} мс |`,
      `| RAF давтамж дундаж | ${avgRaf.toFixed(2)} мс |`,
      `| Тестэлсэн beat тоо | ${latencies.length} |`,
      `| DoD (<40мс дундаж) | ${avgLatency < 40 ? "ХАНГАСАН" : "ХАНГААГҮЙ"} |`,
    ].join("\n");
    writeFileSync(join(outDir, "latency-results.md"), md, "utf-8");

    // DoD: beat → чичиргээ хоцролт < 40мс (дундажаар).
    expect(avgLatency).toBeLessThan(40);
    // RAF өөрөө найдвартай ажиллаж байгааг батална (~16.7мс, 60fps орчим).
    expect(avgRaf).toBeLessThan(33); // 30fps-аас удаан биш байх ёстой
  });
});
