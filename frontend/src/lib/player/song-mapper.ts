import { TRACKS } from "@/lib/data/tracks";
import type { PlayerTrack } from "@/types/player";
import type { Song } from "@/types/song";
import type { Track } from "@/types/track";

/* Backend `Song` болон IndexedDB-ийн custom мета → тоглуулагчийн `PlayerTrack`.

   Урьд нь энэ хөрвүүлэлт хоёр газар, бага зэрэг өөр өөрөөр бичигдсэн байв:
     · Player.tsx  — backend каталогийг ачаалахдаа (fallback cover-той)
     · DetailView.tsx — `toTrack()` (fallback нь одоогийн track)
   Хоёулаа энд нэгдэв; fallback эх сурвалж нь параметр болов. */

/** Обложка байхгүй үед статик каталогоос тогтвортой (нэрнээс хамаарсан) зураг сонгоно. */
export function fallbackCover(title: string): string {
  return TRACKS[Math.abs(title.length) % TRACKS.length].cover as string;
}

/** Backend Song → PlayerTrack. `fallback` нь өмнөх мэдэгдэж байсан track (сонголттой). */
export function songToPlayerTrack(song: Song, fallback?: PlayerTrack | null, artistName?: string | null): PlayerTrack {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist || song.artistRef?.name || artistName || fallback?.artist || "Тодорхойгүй",
    artistId: song.artistId || fallback?.artistId || undefined,
    genre: song.genre || fallback?.genre || "Бусад",
    description: song.description || fallback?.description || undefined,
    releaseYear: song.releaseYear || fallback?.releaseYear || undefined,
    file: song.fileUrl,
    cover: song.coverUrl || fallback?.cover || fallbackCover(song.title),
    duration: song.duration ?? fallback?.duration ?? undefined,
    songId: song.id,
  };
}

/** IndexedDB-ийн админ-нэмсэн дууны мета → PlayerTrack (blob URL-ууд гаднаас ирнэ). */
export function customMetaToPlayerTrack(meta: Track, audioUrl: string, coverUrl: string | null): PlayerTrack {
  return {
    id: meta.id,
    title: meta.title,
    artist: meta.singer || meta.artist || "Тодорхойгүй",
    composer: meta.composer || "",
    genre: meta.genre,
    file: audioUrl,
    /* обложка: файл → линк → fallback дарааллаар */
    cover: coverUrl || meta.coverUrl || fallbackCover(meta.title),
    custom: true,
  };
}
