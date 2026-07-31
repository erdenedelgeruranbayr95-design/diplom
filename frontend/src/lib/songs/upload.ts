"use client";

import * as api from "@/lib/api/client";
import { analyzeAudioFile } from "@/lib/audio/analyze";
import type { Song } from "@/types/song";

/* Дуу байршуулаад тэр дор нь browser талд анализ хийх урсгал.

   AdminPanel.addTrack() болон UploadSongView.addTrack() хоёр нь ЯГ ижил дарааллыг
   (FormData цуглуулах → POST /songs → analyzeAudioFile → POST /songs/:id/analyze)
   тус тусдаа бичсэн байв. Мессежийн бичвэрүүд нь хоорондоо ялгаатай тул энд ЗӨВХӨН
   урсгалыг нэгтгэж, харагдах текстийг дуудагч тал өөрөө хэвээр эзэмшинэ. */

export interface SongUploadFields {
  title: string;
  artist: string;
  genre: string;
  composer?: string;
  /** Файлаар байршуулах бол. */
  file?: File | null;
  /** Гадаад холбоосоор нэмэх бол. */
  sourceUrl?: string;
}

export interface SongUploadResult {
  song: Song;
  /** Анализ амжилттай хадгалагдсан эсэх. */
  analyzed: boolean;
  /** Анализ бүтэлгүйтсэн бол шалтгаан (upload өөрөө амжилттай хэвээр). */
  analyzeError?: Error;
}

/** Дууг байршуулаад анализыг нь хийнэ. Upload амжилтгүй бол шидэлт өгнө. */
export async function uploadSongWithAnalysis(fields: SongUploadFields): Promise<SongUploadResult> {
  const form = new FormData();
  form.set("title", fields.title);
  form.set("artist", fields.artist);
  if (fields.composer) form.set("composer", fields.composer);
  form.set("genre", fields.genre);
  if (fields.file) form.set("file", fields.file);
  if (fields.sourceUrl) form.set("sourceUrl", fields.sourceUrl);

  const song = await api.uploadSong(form);

  /* Upload дуусмагц шууд, автоматаар client-side (browser) анализ эхэлнэ.
     Анализ унасан ч дуу аль хэдийн санд орсон тул шидэлт өгөхгүй — дуудагч
     "нэмэгдсэн ч анализ амжилтгүй" гэсэн зөөлөн мессеж харуулна. */
  try {
    const result = await analyzeAudioFile(song.fileUrl);
    await api.submitAnalysis(song.id, result);
    return { song, analyzed: true };
  } catch (analyzeError) {
    return { song, analyzed: false, analyzeError: analyzeError as Error };
  }
}
