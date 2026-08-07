/* Вэбийн `frontend/src/lib/audio/beat-scheduler.ts`-ээс ЯГ ХЭВЭЭР хуулагдсан —
   DOM/browser API огт ашигладаггүй цэвэр TypeScript тул нэг ч мөр өөрчлөгдөөгүй.

   Дууны `beatTimestamps` (секундээр, backend-ийн шинжилгээнээс) дээр тулгуурлан
   тоглуулагчийн одоогийн байрлал шинэ цохилт давсан эсэхийг хэлнэ. */
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

  poll(currentTime: number): boolean {
    return this.pollDetailed(currentTime).fired;
  }

  /** Сүүлд шатсан ground-truth timestamp-ыг ч буцаана (`crossedAt`) — хоцролт хэмжихэд. */
  pollDetailed(currentTime: number): { fired: boolean; crossedAt?: number } {
    if (!this.timestamps.length) return { fired: false };
    if (this.cursor < this.timestamps.length && currentTime < this.timestamps[this.cursor] - 1) {
      // цаг ухарсан (seek) — cursor-ийг дахин тохируулна
      this.cursor = this.timestamps.findIndex((t) => t > currentTime);
      if (this.cursor === -1) this.cursor = this.timestamps.length;
    }
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
