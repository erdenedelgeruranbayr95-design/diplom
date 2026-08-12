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
  /** Дууны ковер зураг — `uploadCoverImage()`-аас гарсан key. */
  coverKey?: string;
  /** Лиценз ЗААВАЛ (backend DoD: лицензгүй дуу upload хийгдэхгүй). */
  license: SongLicense;
  /** LICENSED сонговол заавал (гэрээ/эх сурвалжийн тайлбар). */
  licenseSrc?: string;
}

/** Файлыг presigned URL-аар шууд S3 руу тавина. `kind` нь угтвар/MIME-г шийднэ. */
async function putToStorage(file: File, kind: "song" | "cover", fallbackType: string): Promise<string> {
  const contentType = file.type || fallbackType;
  const { uploadUrl, key } = await api.getUploadUrl(file.name, contentType, kind);
  const res = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: file });
  if (!res.ok) throw new Error(`Файл байршуулахад алдаа гарлаа (HTTP ${res.status})`);
  return key;
}

/** Ковер зураг байршуулаад key буцаана (цомгийн болон дууны зурагт хоёуланд нь). */
export function uploadCoverImage(file: File): Promise<string> {
  return putToStorage(file, "cover", "image/jpeg");
}

export interface SongUploadResult {
  song: Song;
  /** Анализ амжилттай хадгалагдсан эсэх. */
  analyzed: boolean;
  /** Анализ бүтэлгүйтсэн бол шалтгаан (upload өөрөө амжилттай хэвээр). */
  analyzeError?: Error;
}

/** Дууг байршуулаад анализыг нь хийнэ. Upload амжилтгүй бол шидэлт өгнө.
 *
 *  `onPhase` нь урт үйлдлийн явцыг мэдээлнэ — масс байршуулалтад «3 / 12
 *  анализ хийж байна» гэж харуулахад хэрэгтэй. */
export async function uploadSongWithAnalysis(
  fields: SongUploadFields,
  onPhase?: (phase: "uploading" | "analyzing") => void,
): Promise<SongUploadResult> {
  let storageKey: string | undefined;
  if (fields.file) {
    onPhase?.("uploading");
    storageKey = await putToStorage(fields.file, "song", "audio/mpeg");
  }

  const song = await api.createSong({
    title: fields.title,
    artist: fields.artist,
    genre: fields.genre,
    storageKey,
    sourceUrl: fields.file ? undefined : fields.sourceUrl,
    coverKey: fields.coverKey,
    license: fields.license,
    licenseSrc: fields.licenseSrc,
  });

  /* Upload дуусмагц шууд, автоматаар client-side (browser) анализ эхэлнэ.
     Анализ унасан ч дуу аль хэдийн санд орсон тул шидэлт өгөхгүй — дуудагч
     "нэмэгдсэн ч анализ амжилтгүй" гэсэн зөөлөн мессеж харуулна. */
  try {
    onPhase?.("analyzing");
    const result = await analyzeAudioFile(song.fileUrl);
    await api.submitAnalysis(song.id, result);
    return { song, analyzed: true };
  } catch (analyzeError) {
    return { song, analyzed: false, analyzeError: analyzeError as Error };
  }
}

/* ---------- Масс байршуулалт (нэг цомгийн бүх дууг нэг дор) ---------- */

/** Файлын нэрнээс дууны гарчиг гаргана: өргөтгөл ба урд талын трек дугаарыг хасна.
 *  «03 - Салхи.mp3», «03. Салхи.mp3», «03_Салхи.mp3» → «Салхи». */
export function titleFromFilename(filename: string): string {
  const noExt = filename.replace(/\.[a-z0-9]{1,5}$/i, "");
  const noTrackNo = noExt.replace(/^\s*\d{1,3}\s*[-._)]\s*/, "");
  return (noTrackNo.trim() || noExt.trim() || filename).slice(0, 120);
}

export interface BatchUploadProgress {
  /** 0-ээс эхэлсэн индекс — «3 / 12» гэж харуулахад `index + 1`. */
  index: number;
  total: number;
  filename: string;
  phase: "uploading" | "analyzing" | "done" | "failed";
  error?: string;
}

export interface BatchUploadResult {
  /** ФАЙЛЫН ДАРААЛЛААР — цомгийн трек дугаар үүнээс шууд гарна. */
  songs: Song[];
  failures: { filename: string; error: string }[];
}

/** Олон дууг дараалан байршуулна.
 *
 *  ⚠️ ЗЭРЭГ биш дараалан: дуу бүр browser талд бүтнээрээ декодлогдож анализ
 *  хийгддэг тул 10+ файлыг зэрэг ачаалбал таб санах ойгүй болж унана.
 *
 *  Нэг файл унасан ч ҮЛДСЭНИЙГ үргэлжлүүлнэ — 12 дууны 11 нь орсон байхад
 *  бүгдийг нь хаях нь хэрэглэгчийн хөдөлмөрийг үрэн таран хийнэ. Унасан нь
 *  `failures`-т нэрээрээ буцна. */
export async function uploadSongsBatch(
  files: File[],
  common: { artist: string; genre: string; license: SongLicense; licenseSrc?: string; coverKey?: string },
  onProgress?: (p: BatchUploadProgress) => void,
): Promise<BatchUploadResult> {
  const songs: Song[] = [];
  const failures: BatchUploadResult["failures"] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const base = { index: i, total: files.length, filename: file.name };
    try {
      const res = await uploadSongWithAnalysis(
        {
          title: titleFromFilename(file.name),
          artist: common.artist,
          genre: common.genre,
          file,
          coverKey: common.coverKey,
          license: common.license,
          licenseSrc: common.licenseSrc,
        },
        (phase) => onProgress?.({ ...base, phase }),
      );
      songs.push(res.song);
      onProgress?.({ ...base, phase: "done" });
    } catch (err) {
      const error = err instanceof Error ? err.message : "Тодорхойгүй алдаа";
      failures.push({ filename: file.name, error });
      onProgress?.({ ...base, phase: "failed", error });
    }
  }

  return { songs, failures };
}
