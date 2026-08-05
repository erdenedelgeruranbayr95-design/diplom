"use client";

/* Дууны дэлгэрэнгүй.

   Урьд нь 437 мөр: backend fetch, 3 карт, хүснэгт, спектр, чичиргээний хэв маяг,
   14 prop бүгд нэг файлд байв. Одоо энэ файл ЗӨВХӨН өгөгдлийг бүрдүүлж (heroTrack,
   trackList, мета) дэд блокуудыг байрлуулна:
     · fetch          → `useSongDetail`
     · хөрвүүлэлт     → `songToPlayerTrack`
     · дууны үйлдлүүд → `TrackActionsProvider` контекст */
import type { MutableRefObject } from "react";
import BackBar from "../BackBar";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import ArtistBioCard from "./detail/ArtistBioCard";
import DetailArtwork from "./detail/DetailArtwork";
import DetailTrackTable from "./detail/DetailTrackTable";
import SignalCard from "./detail/SignalCard";
import WhyRecommended from "./detail/WhyRecommended";
import SignalBars from "../shared/SignalBars";
import TrackPlayButton from "../shared/TrackPlayButton";
import { useIsPlayingTrack, useTrackActions } from "../PlayerContext";
import { feelProfileFor } from "@/lib/player/constants";
import { songToPlayerTrack } from "@/lib/player/song-mapper";
import { useSongDetail } from "@/lib/player/hooks/useSongDetail";
/* fmtDur() — цуглуулгын нийт урт (34 мин). */
import { fmtDur } from "@/lib/player/format";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { PlayerTrack } from "@/types/player";

export default function DetailView({
  track,
  songId,
  onFeelTest,
  onBack,
  recommendReasons,
  deviceSync,
  signalBarsRef,
}: {
  track: PlayerTrack | null | undefined;
  songId?: string;
  onFeelTest: () => void;
  onBack: () => void;
  recommendReasons?: string[];
  deviceSync: ReturnType<typeof useDeviceSync>;
  /* RAF loop-оос тэжээгддэг амьд багануудын ref. Дамжуулаагүй ч Signal карт
     статик хэлбэрээр ажиллана. */
  signalBarsRef?: MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const { openArtist } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track?.id ?? "");
  const { song: sourceSong, artist } = useSongDetail(songId || track?.songId, track?.artistId);

  if (!track) return null;

  const feel = feelProfileFor(track.genre);
  const heroTrack = sourceSong ? songToPlayerTrack(sourceSong, track, artist?.name) : track;
  const albumSongs = artist?.songs?.length ? artist.songs : sourceSong ? [sourceSong] : [];
  const trackList = albumSongs.map((song) => songToPlayerTrack(song, track, artist?.name));
  const currentSongId = songId || track.songId || null;
  const totalDuration = albumSongs.reduce((sum, song) => sum + (song.duration || 0), 0);
  const releaseYear = sourceSong?.releaseYear || track.releaseYear || undefined;

  return (
    <>
      <BackBar title="Дууны дэлгэрэнгүй" onBack={onBack} />
      <div className="grid grid-cols-[minmax(300px,360px)_1fr] max-nav:grid-cols-1 gap-8 items-start">
        <div className="flex flex-col gap-4">
          {/* Cover зураг + түүн дээр амьд спектр ба тоглуулах/зогсоох товч.
              Спектр нь урьд нь баруун баганын Signal картад тусдаа хайрцагт байсныг
              энд НҮҮЛГЭВ — `signalBarsRef` ганц массив тул хоёр газар зэрэг зурж
              болохгүй (сүүлд mount болсон нь өмнөхийг дарна). */}
          <div className="group relative overflow-hidden rounded-card border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] shadow-[0_20px_60px_rgba(0,0,0,.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,232,206,.16),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(217,165,76,.12),transparent_34%)]" />
            <img
              className="relative z-[1] w-full aspect-square object-cover"
              src={heroTrack.cover || ""}
              alt={heroTrack.title}
              loading="lazy"
              decoding="async"
            />

            {/* Долгион зургийн доод хэсэгт. Гүн бараан налуу нь багануудыг ямар ч
                өнгөтэй cover дээр уншигдахуйц болгоно. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]">
              <div className="h-[92px] bg-[linear-gradient(180deg,transparent,rgba(4,8,8,.55)_42%,rgba(4,8,8,.88))]" />
              <SignalBars
                signalBarsRef={signalBarsRef}
                count={32}
                className="absolute inset-x-0 bottom-0 h-[76px] px-3 pb-3"
                barClassName="shadow-[0_0_12px_rgba(56,232,206,.35)]"
              />
            </div>

            {/* Тоглуулах/зогсоох — тоглож байх үед үргэлж, эс бөгөөс hover/focus дээр. */}
            <TrackPlayButton
              track={heroTrack}
              className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-[22px] shadow-[0_10px_30px_rgba(0,0,0,.55)] transition-[opacity,transform,box-shadow] duration-300 hover:scale-[1.06] hover:shadow-[0_12px_36px_rgba(56,232,206,.45)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
              restingClassName="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            />
          </div>

          <DetailArtwork
            track={track}
            heroTrack={heroTrack}
            firstInAlbum={trackList[0] || heroTrack}
            shuffleCandidates={trackList}
            onFeelTest={onFeelTest}
          />

          <ArtistBioCard artist={artist} fallbackName={heroTrack.artist} />
        </div>

        <div className="min-w-0">
          {/* Мэдээллийн шатлал: төрөл → ДУУНЫ НЭР → уран бүтээлч ба мета.
              Өмнө нь h2 нь уран бүтээлчийн нэрийг харуулж, доор нь дахин ижил нэр
              давтагдаж, дууны нэр хаана ч байхгүй байв. */}
          <span className="w-fit inline-block text-body font-semibold rounded-full py-2 px-4 bg-aqua text-on-aqua">{heroTrack.genre}</span>
          <h2 className="text-[clamp(26px,4.2vw,48px)] font-extrabold tracking-[-.05em] mt-3 leading-[1.02] text-balance">{heroTrack.title}</h2>
          <p className="text-dim text-copy mt-2 leading-[1.6] max-w-[70ch]">
            {artist?.name || heroTrack.artist}
            {releaseYear ? ` · ${releaseYear}` : ""}
            {trackList.length > 0 ? ` · ${trackList.length} дуу` : ""}
            {totalDuration > 0 ? ` · ${fmtDur(totalDuration)}` : ""}
          </p>
          {heroTrack.description && <p className="text-ink/90 text-copy leading-[1.7] max-w-[68ch] mt-3">{heroTrack.description}</p>}

          {/* Тоглуулах / Санамсаргүй нь зүүн баганад аль хэдийн байгаа тул энд ДАХИН
              бичихгүй. Энд зөвхөн энэ баганад л байдаг цор ганц үйлдэл үлдэнэ. */}
          {heroTrack.artistId && (
            <div className="mt-6">
              <ActionButton variant="secondary" size="lg" onClick={() => openArtist(heroTrack.artistId!)}>
                <Icon name="user" size={15} />
                Уран бүтээлчийн хуудас
              </ActionButton>
            </div>
          )}

          <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.03] px-3.5 py-2 text-caption text-dim">
            <span className={"w-2 h-2 flex-none rounded-full " + (deviceSync.isConnected ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.45)]" : "bg-faint")} />
            {deviceSync.isConnected ? "Утас холбогдсон" : "Утас холбогдоогүй"}
          </div>

          <WhyRecommended reasons={recommendReasons} />

          <DetailTrackTable
            tracks={trackList}
            activeSongId={currentSongId}
            activeTitle={track.title}
            isCurrentAlbum={isCurrent}
            fallbackArtistName={artist?.name || heroTrack.artist}
          />

          {/* Signal карт — "амьд" эсэх нь зөвхөн харагдах төлөв (одоо тоглож байгаа дуу
              энэ эсэх). Ямар ч тоглуулах логикт хүрэхгүй. Спектр нь зүүн баганын
              cover зураг дээр (`SignalBars`) — энд давхардуулахгүй. */}
          <SignalCard feel={feel} live={isPlaying} />
        </div>
      </div>
    </>
  );
}
