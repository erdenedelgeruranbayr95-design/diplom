"use client";

import { useEffect, useMemo, useState } from "react";
import * as songsApi from "@/lib/api/client";
import { indexTracksById, resolveTracks } from "@/lib/player/track-index";
import type { PlayerTrack } from "@/types/player";
import type { Artist } from "@/types/song";

/* Нүүр хуудасны backend каталог: Онцлох · Хамгийн алдартай · Дуучид.

   Урьд нь HomeView.tsx дотор 2 useEffect + 5 useState + 3 useMemo болж, UI-тай
   хольцолдсон байв. Хоёр секц НЭГ дор ачаалагддаг тул нэг `loading` төлөвтэй
   (skeleton нэг л удаа харагдана — 2 хоосон гарчиг дараалахгүй).

   backend-ээс ирсэн id-үүдийг `allTracks` (songId/play/history-той бүрэн PlayerTrack)-аас
   олж тохируулна — ингэснээр play/like/save бүгд одоо байгаа урсгалаар яг адилхан
   ажиллана, шинэ playback логик үүсэхгүй. */

export interface HomeCatalog {
  featuredTracks: PlayerTrack[];
  popularTracks: PlayerTrack[];
  catalogLoading: boolean;
  artists: Artist[];
  artistsLoading: boolean;
}

export function useHomeCatalog(allTracks: PlayerTrack[]): HomeCatalog {
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [popularIds, setPopularIds] = useState<string[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void Promise.allSettled([songsApi.getPopularSongs(), songsApi.getFeaturedSongs()]).then(([popular, featured]) => {
      if (!alive) return;
      if (popular.status === "fulfilled") setPopularIds(popular.value.map((s) => s.id));
      if (featured.status === "fulfilled") setFeaturedIds(featured.value.map((s) => s.id));
      setCatalogLoading(false);
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
  const popularTracks = useMemo(() => resolveTracks(popularIds, trackIndex), [popularIds, trackIndex]);

  return { featuredTracks, popularTracks, catalogLoading, artists, artistsLoading };
}
