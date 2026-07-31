"use client";

import { useEffect, useState } from "react";
import * as songsApi from "@/lib/api/client";
import type { ArtistWithSongs, Song } from "@/types/song";

/* Дэлгэрэнгүй хуудасны өгөгдөл: тухайн дуу (GET /songs/:id) ба түүний уран бүтээлч
   (GET /artists/:id). Хоёр дуудлага нь дараалсан (artistId нь эхний хариунаас гардаг)
   тул `useAsyncResource`-ийн нэг-дуудлагатай загварт багтахгүй — өөрийн hook-той. */

export interface SongDetail {
  song: Song | null;
  artist: ArtistWithSongs | null;
}

export function useSongDetail(songId: string | null | undefined, fallbackArtistId?: string): SongDetail {
  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);

  useEffect(() => {
    let alive = true;
    if (!songId) {
      setSong(null);
      setArtist(null);
      return () => {
        alive = false;
      };
    }

    songsApi
      .getSong(songId)
      .then((loaded) => {
        if (!alive) return;
        setSong(loaded);
        const artistId = loaded.artistId || fallbackArtistId;
        if (!artistId) {
          setArtist(null);
          return;
        }
        return songsApi.getArtist(artistId).then((data) => {
          if (alive) setArtist(data);
        });
      })
      .catch(() => {
        if (alive) {
          setSong(null);
          setArtist(null);
        }
      });

    return () => {
      alive = false;
    };
  }, [songId, fallbackArtistId]);

  return { song, artist };
}
