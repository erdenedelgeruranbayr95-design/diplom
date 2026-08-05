"use client";

import { useEffect, useMemo, useState } from "react";
import * as songsApi from "@/lib/api/client";
import { idbGet } from "@/lib/data/idb";
import { loadCustomMeta, loadSongsCache, saveSongsCache } from "@/lib/data/library";
import { APP_EVENTS } from "@/lib/data/events";
import { customMetaToPlayerTrack, songToPlayerTrack } from "@/lib/player/song-mapper";
import type { PlayerTrack } from "@/types/player";

/* Дууны каталогийн 2 эх сурвалжийг нэг жагсаалт болгож нийлүүлнэ:
     1. GET /songs    — backend Song каталог (Artist-тэй холбоотой, seed Монгол дуунууд)
     2. IndexedDB     — админы нэмсэн дуунууд (blob URL-ууд)

   (Гурав дахь эх сурвалж болох SoundHelix статик демо каталог 2026-08-05-нд устсан —
   каталогт зөвхөн бодит дуу үлдэнэ.)

   Урьд нь энэ гурав Player.tsx-ийн 2 том useEffect + 1 мөрийн `ALL` нийлбэрээр
   тархсан байсан. Blob URL-ийн амьдралын мөчлөг (revokeObjectURL) энд хаагдана —
   ажиллаж байх хугацаанд URL-ууд хүчинтэй хэвээр, тоглуулагч хаагдахад л чөлөөлөгдөнө
   (тоглож буй дууны src нь revoke хийгдсэн blob руу заахаас сэргийлнэ). */

export interface TrackCatalog {
  /** Гурван эх сурвалж нийлсэн бүрэн жагсаалт (энэ дараалал хэвээр). */
  allTracks: PlayerTrack[];
  backendSongs: PlayerTrack[];
  customTracks: PlayerTrack[];
}

export function useTrackCatalog(enabled: boolean): TrackCatalog {
  const [backendSongs, setBackendSongs] = useState<PlayerTrack[]>([]);
  const [customTracks, setCustomTracks] = useState<PlayerTrack[]>([]);

  /* ---------- backend Song каталог ---------- */
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    songsApi
      .listSongs()
      .then((songs) => {
        if (alive) setBackendSongs(songs.map((song) => songToPlayerTrack(song)));
        saveSongsCache(songs);
      })
      .catch(() => {
        // Сүлжээгүй/backend уначихсан үед сүүлд амжилттай татсан каталогийг харуулна.
        const cached = loadSongsCache();
        if (alive && cached.length > 0) setBackendSongs(cached.map((song) => songToPlayerTrack(song)));
      });
    return () => {
      alive = false;
    };
  }, [enabled]);

  /* ---------- админы нэмсэн дуунууд (IndexedDB blob) ---------- */
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const objectUrls: string[] = [];

    async function load() {
      const out: PlayerTrack[] = [];
      for (const meta of loadCustomMeta()) {
        const audio = await idbGet("audio-" + meta.id).catch(() => null);
        if (!audio) continue;
        const audioUrl = URL.createObjectURL(audio);
        objectUrls.push(audioUrl);

        let coverUrl: string | null = null;
        if (meta.hasCover) {
          const coverBlob = await idbGet("cover-" + meta.id).catch(() => null);
          if (coverBlob) {
            coverUrl = URL.createObjectURL(coverBlob);
            objectUrls.push(coverUrl);
          }
        }
        out.push(customMetaToPlayerTrack(meta, audioUrl, coverUrl));
      }
      if (alive) setCustomTracks(out);
    }

    void load();
    const onLibraryChanged = () => void load();
    addEventListener(APP_EVENTS.libraryChanged, onLibraryChanged);
    return () => {
      alive = false;
      removeEventListener(APP_EVENTS.libraryChanged, onLibraryChanged);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [enabled]);

  const allTracks = useMemo(() => [...backendSongs, ...customTracks] as PlayerTrack[], [backendSongs, customTracks]);
  return { allTracks, backendSongs, customTracks };
}
