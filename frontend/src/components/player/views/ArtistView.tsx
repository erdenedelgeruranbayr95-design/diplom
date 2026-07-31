"use client";

/* Дуучны хуудас — GET /artists/:id (artists.controller.ts). Танилцуулга, карьерын
   мэдээлэл, бүх дуунуудын жагсаалт. Тоглуулах/дуртай/хадгалах нь контекстээс —
   шинэ playback логик энд байхгүй. `artistId` нь backend Song.artistId-тэй тохирсон
   `allTracks` дотроос бодит PlayerTrack-уудыг олж тоглуулна. */
import * as songsApi from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { indexTracksById } from "@/lib/player/track-index";
import BackBar from "../BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty, Loading } from "@/components/ui/States";
import { LikeBtn, SaveBtn } from "../TrackButtons";
import { NowPlayingEqualizer } from "../shared/TrackPlayButton";
import { useIsPlayingTrack, useTrackActions } from "../PlayerContext";
import Icon from "@/components/ui/Icon";
import type { ArtistWithSongs } from "@/types/song";
import type { PlayerTrack } from "@/types/player";

function ArtistSongRow({ track, index }: { track: PlayerTrack; index: number }) {
  const { play, likedIds, savedIds, toggleLike, toggleSave } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  return (
    <div
      className={
        "grid grid-cols-[34px_44px_minmax(0,1fr)_auto_34px_34px] gap-3 items-center py-2.5 px-3 rounded-lg text-ink text-left transition-[background,border-color,transform,box-shadow] duration-250 border border-white/[.06] bg-[rgba(11,16,16,.56)] hover:bg-[rgba(17,24,23,.84)] hover:border-aqua/15 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (isCurrent ? "bg-aqua/[.08] border-aqua/25" : "")
      }
      onClick={() => play(track)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          play(track);
        }
      }}
    >
      <span className="mono !text-meta">{String(index + 1).padStart(2, "0")}</span>
      <img
        className="w-11 h-11 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]"
        src={track.cover}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="flex flex-col min-w-0">
        <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
        <i className="not-italic text-xs text-dim">
          {track.genre}
          {track.releaseYear ? ` · ${track.releaseYear}` : ""}
        </i>
      </span>
      <span className="text-dim text-xs flex justify-center" aria-hidden="true">
        {isPlaying ? <NowPlayingEqualizer height={14} /> : "▶"}
      </span>
      <LikeBtn id={track.id} row active={likedIds.includes(track.id)} onToggle={() => toggleLike(track.id)} />
      <SaveBtn id={track.id} row active={savedIds.includes(track.id)} onToggle={() => toggleSave(track.id)} />
    </div>
  );
}

export default function ArtistView({
  artistId,
  allTracks,
  onBack,
}: {
  artistId: string;
  allTracks: PlayerTrack[];
  onBack: () => void;
}) {
  const {
    data: artist,
    loading,
    error,
  } = useAsyncResource<ArtistWithSongs | null>(() => songsApi.getArtist(artistId), [artistId], {
    initialData: null,
    errorMessage: "Дуучны мэдээлэл ачаалахад алдаа гарлаа",
  });

  if (loading) return <Loading label="Дуучны мэдээлэл ачааллаж байна…" />;
  if (error || !artist) return <Empty icon="mic" title="Дуучин олдсонгүй" hint={error} />;

  /* Backend Song id-ээр `allTracks` (songId/beat-scheduler/history бүрэн бэлэн)-аас
     тохирох object-ыг олно — зөвхөн backend-ийн буцаасан мета дээр найдахгүй. */
  const index = indexTracksById(allTracks);
  const songs = artist.songs.map((s) => index.get(s.id)).filter((t): t is PlayerTrack => !!t);

  return (
    <>
      <BackBar title="Дуучин" onBack={onBack} />
      <div className="grid grid-cols-[220px_1fr] max-nav:grid-cols-1 gap-8 items-start mb-10">
        <div className="w-full aspect-square max-nav:max-w-[220px] rounded-2xl overflow-hidden bg-[linear-gradient(135deg,rgba(56,232,206,.18),rgba(56,232,206,.03))] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,.45)]">
          {artist.photoUrl ? (
            <img src={artist.photoUrl} alt={artist.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <span className="text-aqua/60" aria-hidden="true">
              <Icon name="mic" size={52} strokeWidth={1.4} />
            </span>
          )}
        </div>
        <div>
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold tracking-[-.04em] mb-2">{artist.name}</h2>
          <span className="mono !text-dim">{songs.length} дуу</span>
          {artist.bio && <p className="text-ink text-copy leading-[1.65] max-w-[62ch] mt-4">{artist.bio}</p>}
          {artist.careerInfo && (
            <div className="mt-5">
              <span className="mono !text-micro block mb-1.5">Карьерын мэдээлэл</span>
              <p className="text-dim text-body leading-[1.6] max-w-[62ch]">{artist.careerInfo}</p>
            </div>
          )}
        </div>
      </div>

      <SectionTitle title={`${artist.name} — бүх дуунууд`} />
      {songs.length === 0 ? (
        <Empty icon="music" title="Дуу алга" hint="Энэ дуучинд одоогоор дуу бүртгэгдээгүй байна" />
      ) : (
        <div className="flex flex-col gap-0.5 mt-3">
          {songs.map((track, i) => (
            <ArtistSongRow key={track.id} track={track} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
