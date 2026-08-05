"use client";

import { useEffect, useMemo, useState } from "react";
import * as songsApi from "@/lib/api/client";
import { indexTracksById, resolveTracks } from "@/lib/player/track-index";
import type { PlayerTrack } from "@/types/player";
import type { Artist } from "@/types/song";

/* Нүүр хуудасны backend каталог: Онцлох · Дуучид.

   Урьд нь HomeView.tsx дотор 2 useEffect + 5 useState + 3 useMemo болж, UI-тай
   хольцолдсон байв.

   «Хамгийн алдартай» секц 2026-08-05-нд устсан тул `/songs/popular` дуудлага ч
   хасагдсан — хэрэглэгдэхгүй өгөгдлийг нүүр хуудас болгонд татахгүй.

   backend-ээс ирсэн id-үүдийг `allTracks` (songId/play/history-той бүрэн PlayerTrack)-аас
   олж тохируулна — ингэснээр play/like/save бүгд одоо байгаа урсгалаар яг адилхан
   ажиллана, шинэ playback логик үүсэхгүй. */

export interface HomeCatalog {
  featuredTracks: PlayerTrack[];
  catalogLoading: boolean;
  artists: Artist[];
  artistsLoading: boolean;
}

export function useHomeCatalog(allTracks: PlayerTrack[]): HomeCatalog {
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    songsApi
      .getFeaturedSongs()
      .then((rows) => {
        if (alive) setFeaturedIds(rows.map((s) => s.id));
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setCatalogLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    songsApi
      .listArtists()
      .then((rows) => {
        if (alive) setArtists(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setArtistsLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const trackIndex = useMemo(() => indexTracksById(allTracks), [allTracks]);
  const featuredTracks = useMemo(() => resolveTracks(featuredIds, trackIndex), [featuredIds, trackIndex]);

  return { featuredTracks, catalogLoading, artists, artistsLoading };
}
