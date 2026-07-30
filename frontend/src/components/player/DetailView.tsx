"use client";

import { useEffect, useState } from "react";
import type { MutableRefObject } from "react";
import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import { useDeviceSync } from "@/lib/socket/useDeviceSync";
import * as songsApi from "@/lib/api/client";
import type { PlayerTrack } from "./Player";
import Icon from "@/components/ui/Icon";
import { fmtDur } from "@/lib/player/format";
import type { ArtistWithSongs, Song } from "@/types/song";

function toTrack(song: Song, fallback: PlayerTrack | null, artistName?: string | null): PlayerTrack {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist || artistName || fallback?.artist || "Тодорхойгүй",
    artistId: song.artistId || fallback?.artistId,
    genre: song.genre || fallback?.genre || "Бусад",
    file: song.fileUrl,
    cover: song.coverUrl || fallback?.cover || "",
    releaseYear: song.releaseYear || fallback?.releaseYear,
    songId: song.id,
    description: song.description || fallback?.description,
    duration: song.duration || fallback?.duration,
  };
}

export default function DetailView({
  track,
  songId,
  isCurrent,
  playing,
  onPlay,
  onPlayTrack,
  onFeelTest,
  onBack,
  liked,
  saved,
  onToggleLike,
  onToggleSave,
  recommendReasons,
  deviceSync,
  onOpenArtist,
  signalBarsRef,
}: {
  track: PlayerTrack | null | undefined;
  songId?: string;
  isCurrent: boolean;
  playing: boolean;
  onPlay: () => void;
  onPlayTrack: (t: PlayerTrack) => void;
  onFeelTest: () => void;
  onBack: () => void;
  liked: boolean;
  saved: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
  recommendReasons?: string[];
  deviceSync: ReturnType<typeof useDeviceSync>;
  onOpenArtist: (artistId: string) => void;
  /* Player.tsx-ийн RAF loop-оос тэжээгддэг амьд багануудын ref (Мэдрэх самбарын
     barsRef-тэй ижил хэв маяг). Дамжуулаагүй ч Signal карт статик хэлбэрээр ажиллана. */
  signalBarsRef?: MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const [whyOpen, setWhyOpen] = useState(false);
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);
  const [sourceSong, setSourceSong] = useState<Song | null>(null);
  const t = track;

  useEffect(() => {
    let alive = true;
    const id = songId || t?.songId;
    if (!id) {
      setSourceSong(null);
      setArtist(null);
      return () => {
        alive = false;
      };
    }

    songsApi
      .getSong(id)
      .then((song) => {
        if (!alive) return;
        setSourceSong(song);
        const artistId = song.artistId || t?.artistId;
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
          setSourceSong(null);
          setArtist(null);
        }
      });

    return () => {
      alive = false;
    };
  }, [songId, t?.songId, t?.artistId]);

  if (!t) return null;

  const f = FEEL[t.genre] || FEEL_DEFAULT;
  const heroSong = sourceSong ? toTrack(sourceSong, t, artist?.name) : t;
  const albumSongs = artist?.songs?.length ? artist.songs : sourceSong ? [sourceSong] : [];
  const trackList = albumSongs.map((song) => toTrack(song, t, artist?.name));
  const currentSongId = songId || t.songId || null;
  const totalDuration = albumSongs.reduce((sum, song) => sum + (song.duration || 0), 0);
  const releaseYear = sourceSong?.releaseYear || t.releaseYear || undefined;
  /* Signal карт — "амьд" эсэх нь зөвхөн харагдах төлөв (одоо тоглож байгаа дуу энэ
     эсэх). Ямар ч тоглуулах логикт хүрэхгүй, зөвхөн present/idle хэлбэрийг сольдог. */
  const live = isCurrent && playing;
  const patternTotal = f.pattern.reduce((a, b) => a + b, 0);
  const bandMix = [
    { key: "bass", label: "Бас", value: f.bass, tone: "var(--aqua)" },
    { key: "mid", label: "Дунд", value: f.mid, tone: "#B49CFF" },
    { key: "high", label: "Өндөр", value: f.high, tone: "var(--warm)" },
  ];

  function playFirst() {
    const first = trackList[0] || heroSong;
    if (isCurrent) {
      onPlay();
      return;
    }
    onPlayTrack(first);
  }

  function shufflePlay() {
    const source = trackList.length > 0 ? trackList : [heroSong];
    const pick = source[Math.floor(Math.random() * source.length)];
    onPlayTrack(pick);
  }

  return (
    <>
      <BackBar title="Дууны дэлгэрэнгүй" onBack={onBack} />
      <div className="grid grid-cols-[minmax(300px,360px)_1fr] max-nav:grid-cols-1 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] shadow-[0_20px_60px_rgba(0,0,0,.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,232,206,.16),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(217,165,76,.12),transparent_34%)]" />
            <img className="relative z-[1] w-full aspect-square object-cover" src={heroSong.cover || ""} alt={heroSong.title} />
          </div>

          <div className="flex flex-col gap-2.5">
            <ActionButton variant="primary" size="lg" className="w-full justify-center" onClick={playFirst}>
              <Icon name={isCurrent && playing ? "pause" : "play"} size={15} variant="fill" />
              {isCurrent && playing ? "Зогсоох" : "Тоглуулах"}
            </ActionButton>
            <div className="grid grid-cols-2 gap-2.5">
              <ActionButton variant="secondary" className="justify-center" onClick={shufflePlay}>
                <Icon name="shuffle" size={15} />
                Санамсаргүй
              </ActionButton>
              <ActionButton variant="secondary" className="justify-center" onClick={onFeelTest}>
                <Icon name="vibrate" size={15} />
                Мэдрэх
              </ActionButton>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                className={
                  "flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-[12.5px] font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
                  (liked
                    ? "text-aqua border-[rgba(56,232,206,.4)] bg-[rgba(56,232,206,.08)]"
                    : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
                }
                onClick={onToggleLike}
                aria-pressed={liked}
              >
                <Icon name="heart" size={15} variant={liked ? "fill" : "stroke"} />
                Дуртай
              </button>
              <button
                className={
                  "flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-[12.5px] font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
                  (saved
                    ? "text-warm border-[rgba(217,165,76,.4)] bg-[rgba(217,165,76,.08)]"
                    : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
                }
                onClick={onToggleSave}
                aria-pressed={saved}
              >
                <Icon name="bookmark" size={15} variant={saved ? "fill" : "stroke"} />
                Хадгалах
              </button>
            </div>
          </div>

          <section className="rounded-[28px] border border-white/[.08] bg-white/[.03] p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h5 className="font-display font-semibold text-[16px] tracking-[-.03em] text-ink">About the artist</h5>
                <p className="text-[12px] text-dim mt-0.5">
                  {artist?.name || heroSong.artist || "Artist profile"}
                </p>
              </div>
              <span className="mono !text-[9px]">{artist?.songs?.length ? `${artist.songs.length} SONGS` : "LIVE"}</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-none border border-white/[.08] bg-white/[.04]">
                {artist?.photoUrl ? (
                  <img src={artist.photoUrl} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-aqua">
                    <Icon name="user" size={22} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <b className="block font-semibold text-[13.5px] text-ink">{artist?.name || heroSong.artist || "Тодорхойгүй"}</b>
                <p className="mt-1 text-[12.5px] text-dim leading-[1.6]">
                  {artist?.bio || artist?.careerInfo || "Энэ хэсэгт уран бүтээлчийн товч танилцуулга гарна."}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="min-w-0">
          <span className="w-fit inline-block text-[13px] font-semibold rounded-full py-2 px-4 bg-aqua text-[#04100E]">{heroSong.genre}</span>
          <h2 className="text-[clamp(30px,4.2vw,48px)] font-extrabold tracking-[-.05em] mt-3 leading-[1.02]">
            {artist?.name || heroSong.title}
          </h2>
          <p className="text-dim text-[14.5px] mt-2 leading-[1.6] max-w-[70ch]">
            {heroSong.artist}
            {releaseYear ? ` · ${releaseYear}` : ""}
            {trackList.length > 0 ? ` · ${trackList.length} songs` : ""}
            {totalDuration > 0 ? ` · ${fmtDur(totalDuration)}` : ""}
          </p>
          {heroSong.description && <p className="text-ink/90 text-[14.5px] leading-[1.7] max-w-[68ch] mt-3">{heroSong.description}</p>}

          <div className="mt-6 flex flex-wrap gap-2.5">
            <ActionButton variant="primary" size="lg" onClick={playFirst}>
              <Icon name={isCurrent && playing ? "pause" : "play"} size={15} variant="fill" />
              Play all
            </ActionButton>
            <ActionButton variant="secondary" size="lg" onClick={shufflePlay}>
              <Icon name="shuffle" size={15} />
              Shuffle
            </ActionButton>
              {heroSong.artistId && (
                <ActionButton variant="secondary" size="lg" onClick={() => onOpenArtist(heroSong.artistId!)}>
                  <Icon name="user" size={15} />
                  Artist page
                </ActionButton>
              )}
            </div>

            <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.03] px-3.5 py-2 text-[11.5px] text-dim">
              <span className={"w-2 h-2 rounded-full " + (deviceSync.isConnected ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.45)]" : "bg-faint")} />
              {deviceSync.isConnected ? "Device sync connected" : "Device sync idle"}
            </div>

          {recommendReasons && recommendReasons.length > 0 && (
            <div className="mt-6 rounded-2xl border border-aqua/[.22] bg-aqua/[.05] overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-3 py-3 px-4 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={() => setWhyOpen((o) => !o)}
                aria-expanded={whyOpen}
                aria-controls="why-recommended-panel"
              >
                <span className="flex items-center gap-2 text-[13.5px] font-semibold text-aqua">
                  <Icon name="sparkle" size={15} />
                  Яагаад санал болгосон бэ?
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"text-aqua transition-transform duration-250 " + (whyOpen ? "rotate-180" : "")} aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {whyOpen && (
                <ul className="flex flex-col gap-1.5 px-4 pb-4 list-none">
                  {recommendReasons.map((r) => (
                    <li key={r} className="text-[12.5px] text-ink flex items-center gap-2">
                      <span className="text-aqua flex flex-none" aria-hidden="true">
                        <Icon name="check" size={13} strokeWidth={2.4} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mt-8">
            <SectionTitle title="Tracks" description="Мөр дээр дарж яг тухайн дууг тоглуулна." />
          </div>
          <div className="overflow-hidden rounded-[28px] border border-white/[.08] bg-white/[.03]">
            <div className="grid grid-cols-[64px_1fr_90px] max-nav:grid-cols-[52px_1fr_70px] gap-3 px-5 py-3 border-b border-white/[.06] text-[11px] uppercase tracking-[.2em] text-faint font-mono">
              <span>#</span>
              <span>Title</span>
              <span className="text-right">⏱</span>
            </div>
            <div className="flex flex-col">
              {trackList.map((song, index) => {
                const active = song.id === currentSongId || (isCurrent && song.title === t.title);
                return (
                  <button
                    key={song.id}
                    type="button"
                    className={
                      "grid grid-cols-[64px_1fr_90px] max-nav:grid-cols-[52px_1fr_70px] gap-3 items-center px-5 py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua border-t border-white/[.05] " +
                      (active ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
                    }
                    onClick={() => onPlayTrack(song)}
                  >
                    <span className="mono text-[11px] text-dim">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <b className="block font-semibold text-[14.5px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {song.title}
                      </b>
                      <i className="not-italic text-[12.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis block">
                        {song.artist || artist?.name || heroSong.artist}
                      </i>
                    </span>
                    <span className="mono text-[11px] text-right text-dim">{song.duration ? fmtDur(song.duration) : "—"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <SectionTitle
              title="Signal"
              description="Тоглуулах үед давтамжийн хэмнэл шууд харагдана — доорх чичиргээний хэв маягтай хамт мэдрэгдэнэ."
              actions={
                <span
                  className={
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[.06em] uppercase transition-colors duration-200 " +
                    (live ? "border-aqua/40 bg-aqua/[.1] text-aqua" : "border-line bg-white/[.03] text-faint")
                  }
                >
                  <span
                    className={
                      "w-1.5 h-1.5 rounded-full " +
                      (live ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.7)] motion-safe:animate-pulse" : "bg-faint")
                    }
                    aria-hidden="true"
                  />
                  {live ? "Live" : "Idle"}
                </span>
              }
            />
          </div>

          <section className="rounded-[28px] border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.014))] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] p-5 max-nav:p-4">
            {/* ---- амьд спектр: Player.tsx-ийн RAF loop багана бүрийн height-ийг шууд бичнэ ---- */}
            <div
              className="relative flex items-end gap-[3px] h-[148px] max-nav:h-[112px] rounded-[20px] border border-line bg-[radial-gradient(120%_100%_at_50%_120%,rgba(56,232,206,.09),transparent_62%),rgba(4,10,9,.5)] px-3.5 py-3 overflow-hidden"
              role="img"
              aria-label={live ? "Одоо тоглож буй дууны амьд давтамжийн спектр" : "Давтамжийн спектр — дуу тоглох үед амьд харагдана"}
            >
              {/* тайван суурь шугамууд — гүн мэдрэмж (зөвхөн гоёл) */}
              <span
                className="absolute inset-x-0 top-1/3 h-px bg-white/[.04] pointer-events-none"
                aria-hidden="true"
              />
              <span
                className="absolute inset-x-0 top-2/3 h-px bg-white/[.04] pointer-events-none"
                aria-hidden="true"
              />
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="relative flex-1 min-h-[6px] h-[6px] rounded-t-[3px] bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.06))] transition-[height] duration-[90ms] ease-linear motion-reduce:transition-none"
                  ref={(el) => {
                    if (signalBarsRef) signalBarsRef.current[i] = el;
                  }}
                />
              ))}
              {!live && (
                <span className="absolute inset-0 grid place-items-center bg-[rgba(4,10,9,.55)] backdrop-blur-[2px] pointer-events-none">
                  <span className="flex items-center gap-2 rounded-full border border-line bg-black/40 px-3.5 py-2 text-[12px] text-dim">
                    <Icon name="play" size={13} variant="fill" className="text-aqua" />
                    Тоглуулахад хэмнэл энд амьдарна
                  </span>
                </span>
              )}
            </div>

            {/* ---- бүсийн хуваарилалт (төрлийн мэдрэмжийн профайл) ---- */}
            <dl className="mt-5 grid grid-cols-3 max-nav:grid-cols-1 gap-3">
              {bandMix.map((b) => (
                <div key={b.key} className="rounded-2xl border border-white/[.07] bg-white/[.025] px-3.5 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-[12px] font-semibold text-dim">{b.label}</dt>
                    <dd className="mono !text-[10px] !tracking-[.14em] text-ink">{b.value}%</dd>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/[.07] overflow-hidden">
                    <span
                      className="block h-full rounded-full transition-[width] duration-500"
                      style={{ width: Math.min(100, b.value) + "%", background: b.tone }}
                    />
                  </div>
                </div>
              ))}
            </dl>

            {/* ---- чичиргээний хэв маяг (статик, төрлөөс хамаарна) ---- */}
            {f.pattern && (
              <div className="mt-5 pt-5 border-t border-white/[.06]">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="mono !text-[10px]">Чичиргээний хэв маяг</span>
                  <span className="mono !text-[10px] text-faint">{f.pattern.join(" · ")} ms</span>
                </div>
                <div
                  className="flex items-center h-8 border border-line rounded-[11px] px-3 bg-[rgba(20,28,27,.45)] gap-px"
                  role="img"
                  aria-label={"Чичиргээний хэв маяг: " + f.pattern.join(", ") + " миллисекунд"}
                >
                  {f.pattern.map((ms, i) =>
                    i % 2 === 0 ? (
                      <i
                        key={i}
                        className="block h-3.5 rounded-[3px] bg-aqua shadow-[0_0_8px_rgba(56,232,206,.45)]"
                        style={{ flex: ms / patternTotal + " 0 0" }}
                        title={ms + " ms"}
                      />
                    ) : (
                      <u
                        key={i}
                        className="block h-0.5 bg-[rgba(242,245,244,.18)]"
                        style={{ flex: ms / patternTotal + " 0 0" }}
                        title={ms + " ms"}
                      />
                    ),
                  )}
                </div>
                {f.text && <p className="mt-3.5 text-[13px] text-dim leading-[1.65] max-w-[64ch] text-pretty">{f.text}</p>}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
