"use client";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import QuickAction from "@/components/player/shared/QuickAction";
import PlaylistCover from "@/components/player/shared/PlaylistCover";
import { useTrackActions } from "@/components/player/PlayerContext";
import { indexTracksById, resolveTracks } from "@/lib/player/track-index";
import type { PlayerTrack } from "@/types/player";
import type { Playlist } from "@/types/track";

/** Нүүр дэх "Миний жагсаалт" — эхний 4 жагсаалтын товч харагдац.
 *
 *  `tracks` нь ковер зураг гаргахад хэрэгтэй: жагсаалт нь зөвхөн дууны id хадгалдаг
 *  тул бодит track-аас нь зургийг хайж олно (`PlaylistsView`-тэй ижил зарчим). */
export default function PlaylistGrid({ playlists, tracks }: { playlists: Playlist[]; tracks: PlayerTrack[] }) {
  const { setView } = useTrackActions();
  const trackIndex = useMemo(() => indexTracksById(tracks), [tracks]);
  if (playlists.length === 0) return null;

  return (
    <div className="mb-9">
      <SectionTitle
        title="Миний жагсаалт"
        actions={<QuickAction icon={<FontAwesomeIcon icon={faHeadphones} />} label="Бүгдийг харах" onClick={() => setView("playlists")} />}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,1fr))] gap-4">
        {playlists.slice(0, 4).map((playlist) => (
          <button
            key={playlist.id}
            className="flex flex-col gap-3 text-left p-[18px] rounded-lg border border-white/[.06] bg-white/[.03] transition-colors duration-150 hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={() => setView("playlists")}
          >
            <PlaylistCover
              covers={resolveTracks(playlist.tracks, trackIndex).map((t) => t.cover)}
              className="w-full aspect-square rounded-2xl"
            />
            <span className="min-w-0">
              <b className="block font-semibold text-lead whitespace-nowrap overflow-hidden text-ellipsis">{playlist.name}</b>
              <i className="not-italic text-note text-dim">{playlist.tracks.length} дуу</i>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
