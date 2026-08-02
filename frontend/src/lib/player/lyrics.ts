/* Уг үг (lyrics) — Song.lyrics талбарыг LRC-төстэй `[mm:ss.xx] мөр` эсвэл цаг
   тэмдэглэгээгүй чөлөөт текст гэж уншина (см. backend/prisma/schema.prisma-ийн
   тайлбар). Хугацаа-синхрон болон статик хоёр горим хоёуланг дэмжинэ:
     - Цаг тэмдэглэгээтэй бол `activeLyricIndex()`-аар одоогийн мөрийг тодруулна.
     - Цаг тэмдэглэгээгүй бол бүх мөрийг статик жагсаалтаар харуулна. */

export interface LyricLine {
  /** Секундээр, эсвэл `null` бол цаг тэмдэглэгээгүй мөр. */
  time: number | null;
  text: string;
}

const LRC_LINE = /^\[(\d{1,2}):(\d{2})(?:\.(\d{1,2}))?\]\s*(.*)$/;

/** Song.lyrics түүхий текстийг мөр бүрээр задална. */
export function parseLyrics(raw: string): LyricLine[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = LRC_LINE.exec(line);
      if (!match) return { time: null, text: line };
      const [, mm, ss, cs, text] = match;
      const time = Number(mm) * 60 + Number(ss) + (cs ? Number(cs.padEnd(2, "0")) / 100 : 0);
      return { time, text };
    });
}

/** Уг үгэнд цаг тэмдэглэгээ байгаа эсэх (тоглуулж буй үед идэвхтэй мөрийг тодруулах боломжтой эсэх). */
export function hasTimestamps(lines: LyricLine[]): boolean {
  return lines.some((l) => l.time !== null);
}

/** currentTime (секундээр) дээр үндэслэн одоогийн идэвхтэй мөрийн индексийг олно.
 *  Цаг тэмдэглэгээгүй бол -1 буцаана (дуудагч тал бүх мөрийг тэгш харуулна). */
export function activeLyricIndex(lines: LyricLine[], currentTime: number): number {
  let active = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].time;
    if (t === null) continue;
    if (t <= currentTime) active = i;
    else break;
  }
  return active;
}
