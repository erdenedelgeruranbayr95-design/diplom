import type { Song } from "@/types";

/* Каталогийг нүүр хуудсанд бүлэглэх.

   ЯАГААД БҮЛЭГЛЭХ ХЭРЭГТЭЙ ВЭ
   51 дууг нэг босоо жагсаалтаар харуулахад дэлгэц хэт урт болж, хэрэглэгч
   төгсгөлд нь хүрэхийн тулд удаан гүйлгэнэ. Хэвтээ эгнээ болгосноор нэг
   дэлгэцэнд олон бүлэг багтана.

   ЯАГААД ЗӨВХӨН ТӨРЛӨӨР БУЛЭГЛЭДЭГГҮЙ ВЭ
   Хэмжсэн байдал (51 дуу): 30 нь төрөлгүй, үлдсэн нь 1-5 ширхэгээр тарсан.
   Зөвхөн төрлөөр хуваавал «(төрөлгүй) 30» гэсэн утгагүй бүлэг давамгайлж,
   бусад нь 1 дуутай эгнээ болно. Иймд ХАНГАЛТТАЙ дуутай төрлийг л тусад нь
   гаргаж, үлдсэнийг «Бусад» болгоно. */

/** Тусдаа эгнээ болоход шаардагдах хамгийн бага дууны тоо. Үүнээс цөөн бол
 *  эгнээ нь хоосон харагдаж, дэлгэцийг дэмий эзэлнэ. */
export const MIN_PER_RAIL = 3;

/* Өгөгдлийн сан дахь төрлийн нэрс ТОГТВОРГҮЙ: латин («Rock», «RnB») болон
   кирилл («Хип-хоп», «Балад») хольцолдсон байдаг. Гарчигт шууд харуулбал
   эгнээнүүд нэг нь англи, нөгөө нь монгол болж эмх замбараагүй харагдана.

   Энд ЗӨВХӨН харуулах нэрийг жигдрүүлнэ — өгөгдлийн санг өөрчлөхгүй. Танихгүй
   төрөл ирвэл байгаагаар нь үлдээнэ (шинэ төрөл нэмэгдэхэд код унахгүй). */
const GENRE_LABEL: Record<string, string> = {
  Rock: "Рок",
  RnB: "R&B",
  Балад: "Уянгын",
  Данс: "Бүжгийн",
};

/** Төрлийн харуулах нэр. Танихгүй бол эх утгыг нь буцаана. */
export function genreLabel(genre: string): string {
  return GENRE_LABEL[genre] ?? genre;
}

export interface SongGroup {
  title: string;
  songs: Song[];
}

/** Дуунуудыг төрлөөр нь эгнээ болгоно.
 *
 *  · Хангалттай дуутай төрөл бүр өөрийн эгнээтэй, олноос цөөн рүү эрэмбэлэгдэнэ
 *  · Төрөлгүй болон цөөн дуутай төрлүүд «Бусад» эгнээнд нийлнэ
 *  · Хоосон эгнээ буцаахгүй — дуудагч тал шүүх шаардлагагүй */
export function groupByGenre(songs: readonly Song[]): SongGroup[] {
  const byGenre = new Map<string, Song[]>();
  const rest: Song[] = [];

  for (const song of songs) {
    const genre = song.genre?.trim();
    if (!genre) {
      rest.push(song);
      continue;
    }
    const list = byGenre.get(genre);
    if (list) list.push(song);
    else byGenre.set(genre, [song]);
  }

  const groups: SongGroup[] = [];
  for (const [genre, list] of byGenre) {
    if (list.length >= MIN_PER_RAIL) groups.push({ title: genreLabel(genre), songs: list });
    else rest.push(...list);
  }

  groups.sort((a, b) => b.songs.length - a.songs.length);
  if (rest.length > 0) groups.push({ title: "Бусад", songs: rest });

  return groups;
}
