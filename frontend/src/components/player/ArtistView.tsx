"use client";

/* Дуучны хуудас — GET /artists/:id (бодит backend, artists.controller.ts). Танилцуулга,
   карьерын мэдээлэл, бүх дуунуудын жагсаалт. Тоглуулах/дуртай/хадгалах handler-ууд
   Player.tsx-ийн одоо байгаа playTrack/onToggleLike/onToggleSave-ийг шууд ашиглана —
   ямар ч шинэ playback логик энд байхгүй. artistId нь backend Song.artistId-тэй тохирсон
   ALL (Player.tsx-ийн PlayerTrack[]) дотроос тохирох track-уудыг олж тоглуулна. */
import { useEffect, useState } from "react";
import * as songsApi from "@/lib/api/client";
import type { ArtistWithSongs } from "@/types/song";
import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty, Loading } from "@/components/ui/States";
import { LikeBtn, SaveBtn } from "./TrackButtons";
import type { PlayerTrack } from "./Player";

export default function ArtistView({
  artistId,
  allTracks,
  curId,
  playing,
  onPlay,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  onBack,
}: {
  artistId: string;
  allTracks: PlayerTrack[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: PlayerTrack) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onBack: () => void;
}) {
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    songsApi
      .getArtist(artistId)
      .then((a) => {
        if (alive) setArtist(a);
      })
      .catch((e) => {
        if (alive) setError((e as Error).message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [artistId]);

  if (loading) return <Loading label="Дуучны мэдээлэл ачааллаж байна…" />;
  if (error || !artist) return <Empty icon="🎤" title="Дуучин олдсонгүй" hint={error} />;

  /* Backend Song id-ээр allTracks (songId/beat-scheduler/history бүрэн бэлэн PlayerTrack)-аас
     тохирох object-ыг олно — зөвхөн backend-ийн буцаасан мета (title/genre) дээр найдахгүй,
     жинхэнэ playback-д бэлэн track ашиглана. */
  const byId = new Map(allTracks.map((t) => [String(t.id), t]));
  const songs = artist.songs.map((s) => byId.get(s.id)).filter((t): t is PlayerTrack => !!t);

  return (
    <>
      <BackBar title="Дуучин" onBack={onBack} />
      <div className="grid grid-cols-[220px_1fr] max-nav:grid-cols-1 gap-8 items-start mb-10">
        <div className="w-full aspect-square max-nav:max-w-[220px] rounded-2xl overflow-hidden bg-[linear-gradient(135deg,rgba(56,232,206,.18),rgba(56,232,206,.03))] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,.45)]">
          {artist.photoUrl ? (
            <img src={artist.photoUrl} alt={artist.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl" aria-hidden="true">🎤</span>
          )}
        </div>
        <div>
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold tracking-[-.04em] mb-2">{artist.name}</h2>
          <span className="mono text-dim">{songs.length} дуу</span>
          {artist.bio && <p className="text-ink text-[14.5px] leading-[1.65] max-w-[62ch] mt-4">{artist.bio}</p>}
          {artist.careerInfo && (
            <div className="mt-5">
              <span className="mono !text-[9px] block mb-1.5">Карьерын мэдээлэл</span>
              <p className="text-dim text-[13.5px] leading-[1.6] max-w-[62ch]">{artist.careerInfo}</p>
            </div>
          )}
        </div>
      </div>

      <SectionTitle title={`${artist.name} — бүх дуунууд`} />
      {songs.length === 0 ? (
        <Empty icon="🎵" title="Дуу алга" hint="Энэ дуучинд одоогоор дуу бүртгэгдээгүй байна" />
      ) : (
        <div className="flex flex-col gap-0.5 mt-3">
          {songs.map((t, i) => {
            const isCur = curId === t.id;
            return (
              <button
                key={t.id}
                className={
                  "grid grid-cols-[34px_44px_1fr_auto_34px_34px] gap-3 items-center py-2.5 px-3 rounded-lg text-ink text-left transition-colors duration-250 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                  (isCur ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
                }
                onClick={() => onPlay(t)}
              >
                <span className="mono !text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                <img className="w-11 h-11 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" loading="lazy" />
                <span className="flex flex-col min-w-0">
                  <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                  <i className="not-italic text-xs text-dim">
                    {t.genre}
                    {t.releaseYear ? ` · ${t.releaseYear}` : ""}
                  </i>
                </span>
                <span className="text-dim text-xs flex justify-center" aria-hidden="true">
                  {isCur && playing ? (
                    <span className="pl-eq" style={{ height: 14 }}>
                      <u></u>
                      <u></u>
                      <u></u>
                    </span>
                  ) : (
                    "▶"
                  )}
                </span>
                <LikeBtn id={t.id} row active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                <SaveBtn id={t.id} row active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
