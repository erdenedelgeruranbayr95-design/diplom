"use client";

import { useCallback, useEffect, useState } from "react";
import * as api from "@/lib/api/client";
import type { PlaylistRow } from "@/types/song";
import type { Playlist } from "@/types/track";

/* Хэрэглэгчийн жагсаалтууд (playlist) — backend API-д суурилсан (Үе шат 1).

   Backend PlaylistRow (`tracks: PlaylistTrackRow[]`) хэлбэрийг frontend-ийн
   хялбаршуулсан `Playlist` (`tracks: songId[]`) хэлбэрт энд нэг газар хөрвүүлнэ —
   дуудагч тал (PlaylistsView/PlaylistDetail) өмнөх шиг зөвхөн ID-ийн жагсаалттай
   ажиллана, backend бүтцийг мэдэх шаардлагагүй.

   Зөвхөн backend Song (cuid) дэмждэг тул `songId` энд үргэлж `string`. */

function toPlaylist(row: PlaylistRow): Playlist {
  return {
    id: row.id,
    name: row.name,
    tracks: row.tracks.sort((a, b) => a.position - b.position).map((t) => t.songId),
    created: new Date(row.createdAt).getTime(),
  };
}

export function usePlaylistLibrary(email: string, enabled = true): {
  playlists: Playlist[];
  refresh: () => void;
  createPlaylist: (name: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addTrack: (id: string, songId: string) => Promise<void>;
  removeTrack: (id: string, songId: string) => Promise<void>;
} {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const refresh = useCallback(() => {
    if (!email) return;
    api
      .listPlaylists()
      .then((rows) => setPlaylists(rows.map(toPlaylist)))
      .catch(() => setPlaylists([]));
  }, [email]);

  useEffect(() => {
    if (!enabled) return;
    refresh();
  }, [enabled, refresh]);

  const createPlaylist = useCallback(
    async (name: string) => {
      await api.createPlaylistApi(name);
      refresh();
    },
    [refresh],
  );

  const deletePlaylist = useCallback(
    async (id: string) => {
      await api.deletePlaylistApi(id);
      refresh();
    },
    [refresh],
  );

  const addTrack = useCallback(
    async (id: string, songId: string) => {
      await api.addPlaylistTrackApi(id, songId);
      refresh();
    },
    [refresh],
  );

  const removeTrack = useCallback(
    async (id: string, songId: string) => {
      await api.removePlaylistTrackApi(id, songId);
      refresh();
    },
    [refresh],
  );

  return { playlists, refresh, createPlaylist, deletePlaylist, addTrack, removeTrack };
}
