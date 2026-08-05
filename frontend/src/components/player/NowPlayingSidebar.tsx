"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/ui/Icon";
import SignalBars from "./shared/SignalBars";
import LyricsPanel from "./LyricsPanel";

type TrackLike = {
  id?: number | string;
  title: string;
  artist?: string | null;
  cover?: string | null;
  genre?: string | null;
  description?: string | null;
  lyrics?: string | null;
  releaseYear?: number | null;
};

type Credit = {
  name: string;
  role: string;
};

function buildCredits(track: TrackLike | null): Credit[] {
  if (!track?.artist) return [];

  const names = track.artist
    .split(/(?:,|&|\/|\bx\b|\bfeat\.?\b|\bft\.?\b|\bfeaturing\b)/i)
    .map((name) => name.trim())
    .filter(Boolean);

  const unique = Array.from(new Set(names));
  if (unique.length === 0) return [];

  return unique.map((name, index) => ({
    name,
    role: index === 0 ? "Үндсэн дуучин" : "Онцлох уран бүтээлч",
  }));
}

export default function NowPlayingSidebar({
  track,
  playing,
  currentTime = 0,
  onTogglePlay,
  sidebarBarsRef,
}: {
  track: TrackLike | null;
  playing: boolean;
  currentTime?: number;
  /** Cover дээрх тоглуулах/зогсоох товч. Дамжуулаагүй бол товч харагдахгүй. */
  onTogglePlay?: () => void;
  /* RAF loop-оос тэжээгддэг амьд багануудын ref — Дэлгэрэнгүй хуудасны
     `signalBarsRef`-ЭЭС ТУСДАА массив (хоёул зэрэг харагддаг). */
  sidebarBarsRef?: MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const credits = buildCredits(track);
  const asideRef = useRef<HTMLElement | null>(null);

  /* Lyrics/credits хэсэг рүү доош scroll хийсэн байхад дараагийн дуу автоматаар
     (эсвэл гараар) солигдвол хуучин scroll offset хэвээр үлдэж, шинэ дууны cover
     карт дэлгэцээс дээш "тасарч" харагдаж байсныг эндээс засав. */
  useEffect(() => {
    asideRef.current?.scrollTo({ top: 0 });
  }, [track?.id, track?.title]);

  return (
    <aside
      ref={asideRef}
      className="hidden xl:flex w-[340px] 2xl:w-[380px] flex-none overflow-y-auto border-l border-white/[.06] bg-[rgba(8,11,11,.62)] backdrop-blur-3xl"
    >
      <div className="w-full min-h-0 px-5 py-6 pb-[120px] flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="mono !text-meta block mb-1">Одоо тоглож байна</span>
            <h3 className="font-display font-semibold text-heading tracking-[-.03em] leading-tight text-ink whitespace-nowrap overflow-hidden text-ellipsis">
              {track ? track.title : "Дуу сонгогдоогүй"}
            </h3>
          </div>
          <span
            className={
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium " +
              (track
                ? playing
                  ? "border-aqua/30 bg-aqua/[.09] text-aqua"
                  : "border-white/[.1] bg-white/[.04] text-dim"
                : "border-white/[.08] bg-white/[.03] text-faint")
            }
          >
            <span className={"w-2 h-2 rounded-full " + (track && playing ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.45)]" : "bg-faint")} />
            {track ? (playing ? "Тоглож байна" : "Түр зогссон") : "Хүлээж байна"}
          </span>
        </div>

        {track ? (
          <>
            {/* aspect-square тул aside-ийн бүтэн өргөнөөр (340-380px) квадрат болж,
                харьцангуй хэт том харагдаж байсныг aspect-video (16:9) болгож жижигсгэв —
                Тоглох/зогссон төлөв дээд header-т (badge) аль хэдийн харагддаг тул энд
                ДАХИН давхардуулахгүй. */}
            {/* Cover + түүн дээр амьд долгион ба тоглуулах/зогсоох товч —
                Дэлгэрэнгүй хуудасны cover-той ижил хэв маяг. */}
            <div className="group relative overflow-hidden rounded-card border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] shadow-[0_18px_54px_rgba(0,0,0,.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,232,206,.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(217,165,76,.12),transparent_34%)]" />
              {track.cover ? (
                <img src={track.cover} alt={track.title} className="relative z-[1] w-full aspect-video object-cover" loading="lazy" decoding="async" />
              ) : (
                <div className="relative z-[1] grid place-items-center w-full aspect-video bg-[linear-gradient(135deg,rgba(56,232,206,.12),rgba(255,255,255,.03))]">
                  <Icon name="music" size={36} className="text-aqua/70" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]">
                <div className="h-[64px] bg-[linear-gradient(180deg,transparent,rgba(4,8,8,.55)_42%,rgba(4,8,8,.88))]" />
                <SignalBars
                  signalBarsRef={sidebarBarsRef}
                  count={26}
                  className="absolute inset-x-0 bottom-0 h-[52px] px-2.5 pb-2.5"
                  barClassName="shadow-[0_0_12px_rgba(56,232,206,.35)]"
                />
              </div>

              {/* Товч ҮРГЭЛЖ харагдана (hover дээр гарч ирдэг байсныг больсон): зогссон
                  үед багана хавтгайрч, товч нь ▶ болдог тул тоглож байгаа эсэхийг нэг
                  харцаар мэдэх ганц найдвартай тэмдэг нь энэ. */}
              {onTogglePlay && (
                <button
                  type="button"
                  onClick={onTogglePlay}
                  aria-label={playing ? `Түр зогсоох: ${track.title}` : `Тоглуулах: ${track.title}`}
                  className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-[19px] shadow-[0_10px_30px_rgba(0,0,0,.55)] transition-[transform,box-shadow] duration-300 hover:scale-[1.06] hover:shadow-[0_12px_36px_rgba(56,232,206,.45)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                >
                  <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                </button>
              )}
            </div>

            {/* Гарчиг (track.title) дээд header-т (h3) аль хэдийн байгаа тул энд
                ДАХИН том фонтоор давтахгүй — зөвхөн уран бүтээлч/он мэдээлэл. */}
            <p className="text-copy text-dim leading-[1.45] -mt-1">
              {track.artist}
              {track.releaseYear ? ` · ${track.releaseYear}` : ""}
            </p>

            <div className="flex flex-wrap gap-2">
              {track.genre && (
                <span className="inline-flex items-center rounded-full border border-aqua/20 bg-aqua/[.08] px-3 py-1 text-caption font-medium text-aqua">
                  {track.genre}
                </span>
              )}
              {track.description && (
                <span className="inline-flex items-center rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1 text-caption text-dim">
                  Тайлбар бүхий
                </span>
              )}
            </div>

            <section className="flex flex-col gap-3 rounded-panel border border-white/[.08] bg-white/[.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h5 className="font-display font-semibold text-title tracking-[-.03em] text-ink">Уран бүтээлчийн тухай</h5>
                  <p className="text-note text-dim mt-0.5">Одоогийн дууны гол уран бүтээгч</p>
                </div>
                <span className="mono !text-micro flex-none">{playing ? "Амьд" : "Идэвхгүй"}</span>
              </div>

              <div className="flex flex-col gap-2">
                {(credits.length > 0 ? credits : [{ name: track.artist || "Тодорхойгүй", role: "Үндсэн дуучин" }]).map((credit) => (
                  <div
                    key={credit.name + credit.role}
                    className="flex items-center gap-3 rounded-lg border border-white/[.07] bg-[rgba(10,15,15,.65)] px-3 py-3"
                  >
                    <span className="w-10 h-10 flex-none rounded-full bg-[linear-gradient(135deg,rgba(56,232,206,.22),rgba(255,255,255,.04))] border border-aqua/20 flex items-center justify-center text-aqua">
                      <Icon name="user" size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <b className="block font-semibold text-body whitespace-nowrap overflow-hidden text-ellipsis text-ink">{credit.name}</b>
                      <span className="block text-caption text-dim">{credit.role}</span>
                    </div>
                    <span className="flex-none rounded-full border border-white/[.12] bg-white/[.03] px-3.5 py-2 text-note font-medium text-ink">
                      Profile
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <LyricsPanel lyrics={track.lyrics} currentTime={currentTime} />
          </>
        ) : (
          <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-card border border-white/[.08] bg-black/40 shadow-[0_18px_54px_rgba(0,0,0,.45)]">
            <img src="/gallery/zurgggg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,6,.18)_0%,rgba(4,6,6,.55)_56%,rgba(4,6,6,.92)_100%)]" />
            <div className="relative z-[1] flex h-full items-end p-6">
              <div className="max-w-[250px]">
                <b className="block font-display text-heading tracking-[-.03em] text-ink">Дуу сонгогдоогүй байна</b>
                <p className="mt-2 text-body leading-[1.6] text-dim">
                  Зүүн талын жагсаалтаас дуу сонгоход cover, нэр, жанр, одоогийн тоглолт энд гарч ирнэ.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
