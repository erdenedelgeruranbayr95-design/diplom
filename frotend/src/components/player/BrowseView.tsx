"use client";

/* Судлах — бүх дууны каталог энд амьдарна (өмнө нь Нүүр дээр "Тренд дуунууд" grid ба
   "Бүх дуунууд" жагсаалт хоёулаа ИЖИЛ өгөгдлийг давхардуулж харуулдаг байсныг салгав).
   Нүүр = хувийн/санал болгосон, Судлах = бүрэн каталог + шүүлтүүр + хайлт. */
import { useMemo, useState } from "react";
import type { Track as BaseTrack } from "@/types/track";
import { PageHeader } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import TrackCard from "./TrackCard";
import TrackRow from "./TrackRow";

type Track = BaseTrack & { custom?: boolean };
type SortKey = "title" | "artist" | "genre";

export default function BrowseView({
  genres,
  genre,
  onGenre,
  list,
  query,
  curId,
  playing,
  onPlay,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  onInfo,
}: {
  genres: string[];
  genre: string;
  onGenre: (g: string) => void;
  list: Track[];
  query: string;
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
}) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("title");

  const sorted = useMemo(() => {
    const copy = [...list];
    copy.sort((a, b) => String(a[sort] ?? "").localeCompare(String(b[sort] ?? ""), "mn"));
    return copy;
  }, [list, sort]);

  const description = query
    ? `«${query}» хайлтаар ${list.length} дуу`
    : genre === "Бүгд"
      ? `Санд нийт ${list.length} дуу байна`
      : `${genre} — ${list.length} дуу`;

  return (
    <>
      <PageHeader
        eyebrow="Каталог"
        title="Судлах"
        description={description}
        actions={
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[.05] border border-white/[.07]" role="group" aria-label="Харагдац">
            {(["grid", "list"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setLayout(m)}
                aria-pressed={layout === m}
                title={m === "grid" ? "Хүснэгт харагдац" : "Жагсаалт харагдац"}
                className={
                  "w-9 h-8 rounded-full flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                  (layout === m ? "bg-aqua text-[#04100E]" : "text-dim hover:text-ink")
                }
              >
                {m === "grid" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        }
      />

      {/* Төрлийн шүүлтүүр */}
      <div className="flex gap-2 flex-wrap mb-5" role="group" aria-label="Төрлөөр шүүх">
        {genres.map((g) => (
          <button
            key={g}
            className={
              "text-[13px] rounded-full py-2 px-[17px] transition-[background,color,box-shadow] duration-250 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (genre === g
                ? "bg-aqua text-[#04100E] font-semibold shadow-[0_4px_18px_rgba(56,232,206,.3)]"
                : "bg-white/[.05] text-dim hover:bg-white/[.09] hover:text-ink")
            }
            onClick={() => onGenre(g)}
            aria-pressed={genre === g}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Эрэмбэлэх */}
      {list.length > 1 && (
        <div className="flex items-center gap-2 mb-6">
          <span className="mono !text-[9px]">Эрэмбэ</span>
          {([
            ["title", "Нэр"],
            ["artist", "Дуучин"],
            ["genre", "Төрөл"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              aria-pressed={sort === key}
              className={
                "text-[12px] rounded-full py-1 px-3 transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (sort === key ? "bg-white/[.12] text-ink" : "text-faint hover:text-dim")
              }
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <Empty
          icon="🔍"
          title={query ? `«${query}» — олдсонгүй` : "Энэ төрөлд дуу алга"}
          hint={query ? "Өөр түлхүүр үгээр хайж үзнэ үү" : "Өөр төрөл сонгож үзнэ үү"}
        />
      ) : layout === "grid" ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(178px,1fr))] gap-2 max-nav:grid-cols-[repeat(auto-fill,minmax(136px,1fr))]">
          {sorted.map((t) => (
            <TrackCard
              key={t.id}
              track={t}
              isCurrent={curId === t.id}
              playing={playing}
              liked={likes.includes(t.id)}
              saved={saves.includes(t.id)}
              onPlay={() => onPlay(t)}
              onToggleLike={() => onToggleLike(t.id)}
              onToggleSave={() => onToggleSave(t.id)}
              onInfo={() => onInfo(t)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {sorted.map((t, i) => (
            <TrackRow
              key={t.id}
              track={t}
              index={i}
              isCurrent={curId === t.id}
              playing={playing}
              liked={likes.includes(t.id)}
              saved={saves.includes(t.id)}
              onPlay={() => onPlay(t)}
              onToggleLike={() => onToggleLike(t.id)}
              onToggleSave={() => onToggleSave(t.id)}
              onInfo={() => onInfo(t)}
            />
          ))}
        </div>
      )}
    </>
  );
}
