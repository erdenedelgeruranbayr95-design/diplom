"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";
import Icon from "@/components/ui/Icon";
import type { Playlist } from "@/types/track";

/** Нүүр дэх "Миний жагсаалт" — эхний 4 жагсаалтын товч харагдац. */
export default function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
  const { setView } = useTrackActions();
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
            <span
              className="w-full aspect-square rounded-2xl bg-[linear-gradient(135deg,rgba(56,232,206,.18),rgba(56,232,206,.03))] flex items-center justify-center text-aqua/80"
              aria-hidden="true"
            >
              <Icon name="playlist" size={34} strokeWidth={1.5} />
            </span>
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
