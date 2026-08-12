"use client";

/* Цомгийн трекийн дараалал — чирч зөөнө.

   framer-motion-ий `Reorder` ашиглав (@dnd-kit биш): framer-motion аль хэдийн
   багцад байгаа тул шинэ хамаарал нэмэхгүй, мөн pointer event дээр суурилдаг
   учир хуруугаар ЧИРЭХ нь ажиллана. HTML5 drag-and-drop бол хөдөлгөөнт
   төхөөрөмж дээр ОГТ ажилладаггүй — энэ апп гар утсанд чиглэсэн тул тэр зам
   тохирохгүй.

   ⚠️ Чирэх нь ГАРЫН ҮСГЭЭР хийгдэхгүй тул «↑ ↓» товч ЗААВАЛ байна. Энэ апп
   сонсголын бэрхшээлтэй хүнд зориулагдсан — хандалтын түвшинг чирэх дээр
   тулгуурлан унагаах нь зөвшөөрөгдөхгүй. Дараалал өөрчлөгдөхөд `aria-live`
   мэдэгдэнэ, эс бөгөөс дэлгэц уншигч чимээгүй үлдэнэ. */
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import type { AlbumTrack } from "@/types/song";

function fmtDuration(sec: number | null | undefined): string {
  if (!sec || sec < 0) return "—";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function TrackRow({
  song,
  index,
  total,
  onMove,
  onRemove,
}: {
  song: AlbumTrack;
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: (id: string) => void;
}) {
  /* Чирэлтийг ЗӨВХӨН бариулаас эхлүүлнэ — мөр бүхэлдээ чирэгддэг бол «Хасах»
     товч руу хүрэхэд л жагсаалт хөдөлж, дарж чадахгүй болно. */
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={song}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 border border-white/[.08] rounded-xl px-3 py-2.5 bg-surface select-none"
      whileDrag={{ scale: 1.015, boxShadow: "0 10px 30px rgba(0,0,0,.45)", zIndex: 2 }}
    >
      <span
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab active:cursor-grabbing text-faint hover:text-ink transition-colors duration-150 touch-none flex-none px-1"
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.6" />
          <circle cx="15" cy="6" r="1.6" />
          <circle cx="9" cy="12" r="1.6" />
          <circle cx="15" cy="12" r="1.6" />
          <circle cx="9" cy="18" r="1.6" />
          <circle cx="15" cy="18" r="1.6" />
        </svg>
      </span>

      <span className="font-mono text-caption text-faint tabular-nums w-6 flex-none text-right">{index + 1}</span>

      <span className="min-w-0 flex-1">
        <b className="block text-copy truncate font-medium">{song.title}</b>
        <i className="not-italic text-faint text-note">{fmtDuration(song.duration)}</i>
      </span>

      <span className="flex items-center gap-1 flex-none">
        <button
          type="button"
          onClick={() => onMove(index, index - 1)}
          disabled={index === 0}
          aria-label={`«${song.title}» дууг дээш зөөх`}
          className="p-1.5 rounded-md text-dim transition-colors duration-150 hover:text-ink hover:bg-white/[.06] disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:shadow-glow-aqua"
        >
          <Icon name="arrowDown" size={14} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => onMove(index, index + 1)}
          disabled={index === total - 1}
          aria-label={`«${song.title}» дууг доош зөөх`}
          className="p-1.5 rounded-md text-dim transition-colors duration-150 hover:text-ink hover:bg-white/[.06] disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:shadow-glow-aqua"
        >
          <Icon name="arrowDown" size={14} />
        </button>
        <button
          type="button"
          onClick={() => onRemove(song.id)}
          aria-label={`«${song.title}» дууг цомгоос хасах`}
          className="p-1.5 rounded-md text-dim transition-colors duration-150 hover:text-danger hover:bg-danger/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua"
        >
          <Icon name="close" size={14} />
        </button>
      </span>
    </Reorder.Item>
  );
}

export default function AlbumTrackList({
  songs,
  onChange,
  onRemove,
}: {
  songs: AlbumTrack[];
  /** Шинэ дараалал. Хадгалалтыг дуудагч тал хариуцна. */
  onChange: (next: AlbumTrack[]) => void;
  onRemove: (id: string) => void;
}) {
  /* Дэлгэц уншигчид зориулсан мэдэгдэл — чирэлт визуал төдий тул үүнгүй бол
     дараалал өөрчлөгдсөнийг сонсголын БУС бэрхшээлтэй хэрэглэгч мэдэхгүй. */
  const [announce, setAnnounce] = useState("");

  function move(from: number, to: number) {
    if (to < 0 || to >= songs.length || from === to) return;
    const next = [...songs];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    setAnnounce(`«${moved.title}» ${to + 1}-р байрт шилжлээ`);
  }

  return (
    <>
      <Reorder.Group
        axis="y"
        values={songs}
        onReorder={onChange}
        className="flex flex-col gap-2"
        /* `layoutScroll` байхгүй бол гүйлгэх контейнер дотор чирэхэд байрлал
           тооцоо алдагдаж, мөр хулганаас хазайна. */
        layoutScroll
      >
        {songs.map((s, i) => (
          <TrackRow
            key={s.id}
            song={s}
            index={i}
            total={songs.length}
            onMove={move}
            onRemove={onRemove}
          />
        ))}
      </Reorder.Group>
      <span className="sr-only" role="status" aria-live="polite">
        {announce}
      </span>
    </>
  );
}
