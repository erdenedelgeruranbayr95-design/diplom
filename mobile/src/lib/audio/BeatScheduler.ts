/* Вэбийн `frontend/src/lib/audio/beat-scheduler.ts`-ээс хуулагдсан — DOM/browser
   API огт ашигладаггүй цэвэр TypeScript.

   Дууны `beatTimestamps` (секундээр, backend-ийн шинжилгээнээс) дээр тулгуурлан
   тоглуулагчийн одоогийн байрлал шинэ цохилт давсан эсэхийг хэлнэ.

   ⚠️ ВЭБЭЭС ЦОРЫН ГАНЦ ЯЛГАА: `pollDetailed` нь цохилтын ИНДЕКСийг ч буцаана.
   Гар утсан дээр цохилт бүрийн эрчим/өнгийг Haptic Score-оос индексээр хайдаг
   (`BeatDynamics`) тул шаардлагатай. Нэмэлт талбар тул хуучин дуудагчид
   өөрчлөгдөхгүй. */
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

  /** Сүүлд шатсан ground-truth timestamp (`crossedAt`) болон түүний индексийг
   *  (`index`) ч буцаана — тус тус хоцролт хэмжих, цохилтын параметр хайхад. */
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
