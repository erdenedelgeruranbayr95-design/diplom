"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getArtist, getSong } from "@/lib/api/client";
import type { ArtistWithSongs, Song } from "@/types/song";
import Icon from "@/components/ui/Icon";
import { fmtDur } from "@/lib/player/format";
import { SectionTitle } from "@/components/ui/PageHeader";

type PageState = "loading" | "ready" | "error";

function toRow(song: Song, artistName?: string | null) {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist || artistName || "Тодорхойгүй",
    genre: song.genre || "Бусад",
    cover: song.coverUrl || "",
    file: song.fileUrl,
    duration: song.duration,
    releaseYear: song.releaseYear,
    artistId: song.artistId,
  };
}

export default function SongPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<PageState>("loading");
  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let alive = true;
    setState("loading");
    setSong(null);
    setArtist(null);

    getSong(id)
      .then((s) => {
        if (!alive) return;
        setSong(s);
        if (!s.artistId) {
          setState("ready");
          return;
        }
        return getArtist(s.artistId)
          .then((a) => {
            if (!alive) return;
            setArtist(a);
            setState("ready");
          })
          .catch(() => {
            if (alive) setState("ready");
          });
      })
      .catch(() => {
        if (alive) setState("error");
      });

    return () => {
      alive = false;
    };
  }, [id]);

  const rows = useMemo(() => {
    if (artist?.songs?.length) return artist.songs.map((s) => toRow(s, artist.name));
    if (song) return [toRow(song, song.artist)];
    return [];
  }, [artist, song]);

  const totalDuration = useMemo(() => rows.reduce((sum, row) => sum + (row.duration || 0), 0), [rows]);
  const hero = song ? toRow(song, artist?.name) : null;

  function playRow(row = rows[0]) {
    if (!row || !audioRef.current) return;
    const el = audioRef.current;
    if (currentId === row.id && playing) {
      el.pause();
      return;
    }
    if (currentId === row.id && !playing) {
      el.play().catch(() => {});
      return;
    }
    el.src = row.file;
    el.play().catch(() => {});
    setCurrentId(row.id);
  }

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="min-h-[100svh] bg-bg text-ink px-4 py-5 md:px-6 md:py-6">
      <audio ref={audioRef} />
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/[.1] bg-white/[.04] px-4 py-2 text-[13px] font-semibold text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua">
            <Icon name="arrowLeft" size={15} />
            Буцах
          </Link>
          <span className="mono">MEDREH</span>
        </div>

        {state === "loading" && (
          <div className="flex min-h-[65svh] flex-col items-center justify-center gap-2.5 py-10 text-center">
            <span className="state-spinner" aria-hidden="true" />
            <p className="text-dim text-sm">Ачааллаж байна…</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex min-h-[65svh] flex-col items-center justify-center gap-2.5 py-10 text-center">
            <span className="w-16 h-16 rounded-full flex items-center justify-center text-[#FF8A8A] bg-[rgba(233,111,111,.12)] shadow-[inset_0_0_0_1px_rgba(233,111,111,.28)]" aria-hidden="true">
              <Icon name="alert" size={28} />
            </span>
            <b className="text-ink font-display font-normal text-lg">Дуу олдсонгүй</b>
            <p className="text-dim text-sm">Линк буруу эсвэл дуу устсан байж болзошгүй.</p>
          </div>
        )}

        {state === "ready" && hero && (
          <div className="grid grid-cols-[minmax(300px,360px)_1fr] max-nav:grid-cols-1 gap-8 items-start">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-[30px] border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] shadow-[0_20px_60px_rgba(0,0,0,.55)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,232,206,.16),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(217,165,76,.12),transparent_34%)]" />
                <img className="relative z-[1] w-full aspect-square object-cover" src={hero.cover} alt={hero.title} />
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-full bg-aqua text-[#04100E] px-5 py-3 text-[13px] font-semibold transition-transform duration-200 hover:scale-[1.01] active:scale-[.98] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={() => playRow(rows[0])}
              >
                <span aria-hidden="true">{currentId === rows[0]?.id && playing ? "⏸" : "▶"}</span>
                {currentId === rows[0]?.id && playing ? "Зогсоох" : "Тоглуулах"}
              </button>

              {artist?.bio || artist?.careerInfo ? (
                <section className="rounded-[28px] border border-white/[.08] bg-white/[.03] p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-none border border-white/[.08] bg-white/[.04]">
                      {artist.photoUrl ? (
                        <img src={artist.photoUrl} alt={artist.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-aqua">
                          <Icon name="user" size={22} />
                        </div>
                      )}
                    </div>
                    <div>
                      <b className="block font-semibold text-[13.5px] text-ink">{artist.name}</b>
                      <span className="block text-[12px] text-dim">{artist._count?.songs || rows.length} songs</span>
                    </div>
                  </div>
                  <p className="text-[12.5px] leading-[1.7] text-dim">{artist.bio || artist.careerInfo}</p>
                </section>
              ) : null}
            </div>

            <div className="min-w-0">
              <span className="w-fit inline-block text-[13px] font-semibold rounded-full py-2 px-4 bg-aqua text-[#04100E]">
                {hero.genre}
              </span>
              <h1 className="text-[clamp(30px,4.2vw,52px)] font-extrabold tracking-[-.05em] mt-3 leading-[1.02]">
                {artist?.name || hero.title}
              </h1>
              <p className="text-dim text-[14.5px] mt-2 leading-[1.6] max-w-[70ch]">
                {hero.artist}
                {hero.releaseYear ? ` · ${hero.releaseYear}` : ""}
                {rows.length > 0 ? ` · ${rows.length} songs` : ""}
                {totalDuration > 0 ? ` · ${fmtDur(totalDuration)}` : ""}
              </p>
              {song?.description && <p className="text-ink/90 text-[14.5px] leading-[1.7] max-w-[68ch] mt-3">{song.description}</p>}

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-aqua text-[#04100E] px-5 py-2.5 text-[13px] font-semibold transition-transform duration-200 hover:scale-[1.01] active:scale-[.98] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  onClick={() => playRow(rows[0])}
                >
                  <span aria-hidden="true">▶</span>
                  Play all
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-white/[.1] bg-white/[.04] px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  onClick={() => {
                    const pick = rows[Math.floor(Math.random() * rows.length)];
                    if (pick) playRow(pick);
                  }}
                >
                  <span aria-hidden="true">↻</span>
                  Shuffle
                </button>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <SectionTitle title="Tracks" description="Мөр дээр дарж тухайн дууг шууд тоглуулна." />
                  <span className="mono">{rows.length} дуунууд</span>
                </div>
                <div className="overflow-hidden rounded-[28px] border border-white/[.08] bg-white/[.03]">
                  <div className="grid grid-cols-[64px_1fr_90px] max-nav:grid-cols-[52px_1fr_70px] gap-3 px-5 py-3 border-b border-white/[.06] text-[11px] uppercase tracking-[.2em] text-faint font-mono">
                    <span>#</span>
                    <span>Title</span>
                    <span className="text-right">⏱</span>
                  </div>
                  <div className="flex flex-col">
                    {rows.map((row, index) => {
                      const active = currentId === row.id;
                      return (
                        <button
                          key={row.id}
                          type="button"
                          className={
                            "grid grid-cols-[64px_1fr_90px] max-nav:grid-cols-[52px_1fr_70px] gap-3 items-center px-5 py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua border-t border-white/[.05] " +
                            (active ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
                          }
                          onClick={() => {
                            if (active && playing) {
                              audioRef.current?.pause();
                              return;
                            }
                            if (active && !playing) {
                              audioRef.current?.play().catch(() => {});
                              return;
                            }
                            const el = audioRef.current;
                            if (!el) return;
                            el.src = row.file;
                            el.play().catch(() => {});
                            setCurrentId(row.id);
                          }}
                        >
                          <span className="mono text-[11px] text-dim">{String(index + 1).padStart(2, "0")}</span>
                          <span className="min-w-0">
                            <b className="block font-semibold text-[14.5px] whitespace-nowrap overflow-hidden text-ellipsis">{row.title}</b>
                            <i className="not-italic text-[12.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis block">
                              {row.artist}
                            </i>
                          </span>
                          <span className="mono text-[11px] text-right text-dim">{row.duration ? fmtDur(row.duration) : "—"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
