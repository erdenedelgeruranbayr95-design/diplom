"use client";

/* Playlist удирдах — үүсгэх / жагсаах / нээх / дуу нэмэх-хасах / тоглуулах.

   Урьд нь энэ файл 228 мөр байсан бөгөөд "жагсаалтуудын жагсаалт" ба "нээсэн жагсаалт"
   хоёр бүрэн өөр дэлгэц нэг компонент дотор `if (open) return (...)`-оор салгагдсан байв.
   Одоо: жагсаалтын өгөгдөл `usePlaylistLibrary`-д, нээсэн харагдац `playlists/PlaylistDetail`-д. */
import { useMemo, useState } from "react";
import BackBar from "../BackBar";
import { useToast } from "@/components/providers/ToastProvider";
import { Empty } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import PlaylistDetail from "./playlists/PlaylistDetail";
import { useTrackActions } from "../PlayerContext";
import { usePlaylistLibrary } from "@/lib/player/hooks/usePlaylistLibrary";
import { indexTracksById, resolveTracks } from "@/lib/player/track-index";
import type { PlayerTrack } from "@/types/player";

export default function PlaylistsView({ email, tracks, onBack }: { email: string; tracks: PlayerTrack[]; onBack: () => void }) {
  const toast = useToast();
  const { play } = useTrackActions();
  const { playlists, createPlaylist, deletePlaylist, addTrack, removeTrack } = usePlaylistLibrary(email);
  const [name, setName] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const trackIndex = useMemo(() => indexTracksById(tracks), [tracks]);
  const openPlaylist = playlists.find((p) => p.id === openId);

  function create(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Жагсаалтын нэрээ оруулна уу");
      return;
    }
    createPlaylist(name.trim()).catch(() => toast.error("Жагсаалт үүсгэхэд алдаа гарлаа"));
    setName("");
    toast.success("«" + name.trim() + "» жагсаалт үүслээ");
  }

  function remove(playlist: { id: string; name: string }) {
    deletePlaylist(playlist.id).catch(() => toast.error("Устгахад алдаа гарлаа"));
    if (openId === playlist.id) setOpenId(null);
    toast.info("«" + playlist.name + "» устгагдлаа");
  }

  function playAll(playlist: { tracks: (number | string)[] }) {
    const first = resolveTracks(playlist.tracks, trackIndex)[0];
    if (first) play(first);
    else toast.error("Жагсаалт хоосон байна");
  }

  if (openPlaylist) {
    return (
      <PlaylistDetail
        playlist={openPlaylist}
        trackIndex={trackIndex}
        allTracks={tracks}
        onAddTrack={(songId) => addTrack(openPlaylist.id, songId)}
        onRemoveTrack={(songId) => removeTrack(openPlaylist.id, songId)}
        onClose={() => setOpenId(null)}
      />
    );
  }

  return (
    <>
      <BackBar title="Миний жагсаалтууд" onBack={onBack} />

      <form className="flex max-nav:flex-col gap-2.5 mb-7" onSubmit={create}>
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <input
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[.05] border border-white/[.06] text-ink text-copy font-[inherit] transition-[border-color,box-shadow,background] duration-300 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Шинэ жагсаалтын нэр…"
            aria-label="Шинэ жагсаалтын нэр"
          />
        </div>
        <ActionButton type="submit" variant="primary" size="lg" className="flex-none max-nav:w-full">
          ＋ Үүсгэх
        </ActionButton>
      </form>

      {playlists.length === 0 ? (
        <Empty icon="music" title="Жагсаалт алга" hint="Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай" />
      ) : (
        <>
          <SectionTitle title="Миний жагсаалтууд" description={`${playlists.length} жагсаалт`} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
            {playlists.map((playlist) => {
              const cover = resolveTracks(playlist.tracks, trackIndex)[0]?.cover;
              return (
                <div
                  className="group relative bg-white/[.03] border border-white/[.06] rounded-xl overflow-hidden transition-[border-color,box-shadow,transform] duration-[280ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:border-white/[.14] hover:shadow-lg hover:-translate-y-1"
                  key={playlist.id}
                >
                  <button
                    className="block w-full text-left bg-none border-none cursor-pointer p-3.5 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    onClick={() => setOpenId(playlist.id)}
                  >
                    <span className="grid place-items-center aspect-square rounded-lg overflow-hidden bg-white/5 mb-3 [&>img]:w-full [&>img]:h-full [&>img]:object-cover shadow-[0_8px_22px_rgba(0,0,0,.35)]">
                      {cover ? (
                        <img src={cover} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className="text-dim" aria-hidden="true">
                          <Icon name="music" size={36} strokeWidth={1.4} />
                        </span>
                      )}
                    </span>
                    <b className="block text-copy font-semibold text-ink whitespace-nowrap overflow-hidden text-ellipsis">{playlist.name}</b>
                    <i className="block not-italic text-xs text-dim mt-0.5">{playlist.tracks.length} дуу</i>
                  </button>
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      className="w-9 h-9 rounded-full border-none bg-[rgba(4,16,14,.8)] text-aqua cursor-pointer backdrop-blur-sm flex items-center justify-center transition-transform duration-150 hover:scale-110 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua"
                      onClick={() => playAll(playlist)}
                      disabled={!playlist.tracks.length}
                      aria-label="Тоглуулах"
                    >
                      <span className="pl-0.5 flex" aria-hidden="true">
                        <Icon name="chevronRight" size={15} strokeWidth={2.4} />
                      </span>
                    </button>
                    <button
                      className="w-9 h-9 rounded-full border-none bg-[rgba(4,16,14,.8)] text-[#ff8a8a] cursor-pointer backdrop-blur-sm flex items-center justify-center transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                      onClick={() => remove(playlist)}
                      aria-label="Устгах"
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
