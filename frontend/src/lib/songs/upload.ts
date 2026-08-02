"use client";

import * as api from "@/lib/api/client";
import { analyzeAudioFile } from "@/lib/audio/analyze";
import type { Song, SongLicense } from "@/types/song";

/* Дуу байршуулаад тэр дор нь browser талд анализ хийх урсгал.

   AdminPanel.addTrack() болон UploadSongView.addTrack() хоёр нь ЯГ ижил дарааллыг
   тус тусдаа бичсэн байв. Мессежийн бичвэрүүд нь хоорондоо ялгаатай тул энд ЗӨВХӨН
   урсгалыг нэгтгэж, харагдах текстийг дуудагч тал өөрөө хэвээр эзэмшинэ.

   Үе шат 5: файл уплоад ОДОО ШУУД MinIO руу (presigned PUT) явна — backend дундуур
   том аудио байт дамжихгүй, "Файл S3-д, DB-д зөвхөн URL" DoD-ийг хангана. Урсгал:
     1. POST /songs/upload-url → { uploadUrl, key }
     2. PUT uploadUrl (клиент → MinIO шууд)
     3. POST /songs { storageKey: key, license, ... } → Song үүснэ */

export interface SongUploadFields {
  title: string;
  artist: string;
  genre: string;
  composer?: string;
  /** Файлаар байршуулах бол. */
  file?: File | null;
  /** Гадаад холбоосоор нэмэх бол. */
  sourceUrl?: string;
  /** Лиценз ЗААВАЛ (backend DoD: лицензгүй дуу upload хийгдэхгүй). */
  license: SongLicense;
  /** LICENSED сонговол заавал (гэрээ/эх сурвалжийн тайлбар). */
  licenseSrc?: string;
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
  let storageKey: string | undefined;
  if (fields.file) {
    const { uploadUrl, key } = await api.getUploadUrl(fields.file.name, fields.file.type || "audio/mpeg");
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": fields.file.type || "audio/mpeg" },
      body: fields.file,
    });
    if (!putRes.ok) throw new Error(`Файл MinIO руу байршуулахад алдаа гарлаа (HTTP ${putRes.status})`);
    storageKey = key;
  }

  const song = await api.createSong({
    title: fields.title,
    artist: fields.artist,
    genre: fields.genre,
    storageKey,
    sourceUrl: fields.file ? undefined : fields.sourceUrl,
    license: fields.license,
    licenseSrc: fields.licenseSrc,
  });

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
