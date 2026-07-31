"use client";

import { useCallback, useEffect, useState } from "react";
import { loadPlaylists } from "@/lib/data/library";
import { APP_EVENTS } from "@/lib/data/events";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import type { Playlist } from "@/types/track";

/* Хэрэглэгчийн жагсаалтууд (playlist) — localStorage дээр суурилсан.

   ЯГ ижил "ачаал + `medreh:playlists-changed` сонс" блок Player.tsx болон
   PlaylistsView.tsx хоёуланд бичигдсэн байсныг нэгтгэв. */

export function usePlaylistLibrary(email: string, enabled = true): { playlists: Playlist[]; refresh: () => void } {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const refresh = useCallback(() => {
    if (!email) return;
    setPlaylists(loadPlaylists(email));
  }, [email]);

  useEffect(() => {
    if (!enabled) return;
    refresh();
  }, [enabled, refresh]);

  useWindowEvent(APP_EVENTS.playlistsChanged, refresh, { enabled: enabled && !!email });

  return { playlists, refresh };
}
