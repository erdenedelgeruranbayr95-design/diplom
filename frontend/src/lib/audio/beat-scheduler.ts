"use client";

/* Beat scheduler — songId-тэй (backend Song, analyze хийгдсэн) дуунд beatTimestamps-аар
   (аудио анализын client-side тооцоолсон, секундээр) тодорхой мөчид beat илрүүлнэ.
   beatTimestamps байхгүй үед (static demo track) дуудагч тал (Player.tsx) одоогийн
   level-threshold (lo/mi/hi spectrum) логикоороо fallback хийнэ — энэ файл зөвхөн
   timestamp-driven хэсгийг хариуцна. */

export class BeatScheduler {
  private timestamps: number[] = [];
  private cursor = 0;

  setTrack(beatTimestamps: number[] | null | undefined) {
    this.timestamps = beatTimestamps && beatTimestamps.length ? [...beatTimestamps].sort((a, b) => a - b) : [];
    this.cursor = 0;
  }

  reset() {
    this.cursor = 0;
  }

  get hasTimestamps() {
    return this.timestamps.length > 0;
  }

  /* currentTime секундээр дамжуулахад, шинээр давсан timestamp байвал true буцаана
     (нэг удаагийн fire, index pointer урагшилна — seek/rewind үед reset() дуудна). */
  poll(currentTime: number): boolean {
    return this.pollDetailed(currentTime).fired;
  }

  /** `poll()`-той адил, гэхдээ нэмэлт мэдээлэлтэй:
   *   · `crossedAt` — latency хэмжилт/дебагт (ground-truth timestamp)
   *   · `index`     — шатсан үйлийн ИНДЕКС. Үүгээр дуудагч тал тухайн цохилтын
   *                   эрчим/өнгийг (`beatIntensity`/`beatBrightness`) хайна —
   *                   энэгүйгээр бүх цохилт ижил хүчээр өгөгдөнө. */
  pollDetailed(currentTime: number): { fired: boolean; crossedAt?: number; index?: number } {
    if (!this.timestamps.length) return { fired: false };
    if (this.cursor < this.timestamps.length && currentTime < this.timestamps[this.cursor] - 1) {
      // цаг ухарсан (seek) — cursor-ийг дахин тохируулна
      this.cursor = this.timestamps.findIndex((t) => t > currentTime);
      if (this.cursor === -1) this.cursor = this.timestamps.length;
    }
    let fired = false;
    let crossedAt: number | undefined;
    let index: number | undefined;
    while (this.cursor < this.timestamps.length && this.timestamps[this.cursor] <= currentTime) {
      crossedAt = this.timestamps[this.cursor];
      index = this.cursor;
      this.cursor++;
      fired = true;
    }
    return { fired, crossedAt, index };
  }
}
