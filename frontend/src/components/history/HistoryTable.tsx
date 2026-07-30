"use client";

/* HistoryView.tsx-ийн сонссон түүхийн хүснэгт + хуудаслалт — премиум elevated-card table
   (sticky header, hover states, status chip) руу шинэчлэв, .bil-table/.bil-row/.dv-maprow
   legacy CSS-ээс Tailwind руу хөрвүүлсэн. rows/page/totalPages/setPage/onOpenAnalysis/
   onRemove бүх prop/callback хэвээр, зөвхөн визуал давхарга шинэчлэгдсэн. */
import type { ListenHistoryRow } from "@/types/song";
import Icon from "@/components/ui/Icon";

export default function HistoryTable({
  rows,
  page,
  totalPages,
  setPage,
  onOpenAnalysis,
  onRemove,
}: {
  rows: ListenHistoryRow[];
  page: number;
  totalPages: number;
  setPage: (updater: (p: number) => number) => void;
  onOpenAnalysis?: (songId: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <div className="border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
        <div className="grid grid-cols-[1fr_1.1fr_.8fr_.6fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02] sticky top-0 z-[1] max-nav:grid-cols-[1fr_.8fr_auto]">
          <span className="mono">Дуу</span>
          <span className="mono">Огноо</span>
          <span className="mono max-nav:hidden">Хугацаа</span>
          <span className="mono max-nav:hidden">BPM</span>
          <span></span>
        </div>
        {rows.map((r) => (
          <div
            className="grid grid-cols-[1fr_1.1fr_.8fr_.6fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13.5px] transition-colors duration-150 hover:bg-white/[.03] max-nav:grid-cols-[1fr_.8fr_auto]"
            key={r.id}
          >
            <button
              className="flex flex-col min-w-0 text-left bg-none border-none cursor-pointer focus-visible:outline-none focus-visible:shadow-glow-aqua rounded-sm"
              onClick={() => onOpenAnalysis?.(r.songId)}
            >
              <b className="font-semibold text-ink whitespace-nowrap overflow-hidden text-ellipsis">{r.song.title}</b>
              <i className="not-italic text-dim text-xs whitespace-nowrap overflow-hidden text-ellipsis">{r.song.artist || "Тодорхойгүй"}</i>
            </button>
            <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis">{new Date(r.playedAt).toLocaleString("mn-MN")}</span>
            <span className="text-dim max-nav:hidden">{r.durationMs ? `${Math.round(r.durationMs / 1000)}с` : "—"}</span>
            <span className="text-dim max-nav:hidden">{r.bpm ?? "—"}</span>
            <button
              className="text-[11.5px] text-[#E88A9B] border border-[rgba(232,138,155,.3)] rounded-full py-1.5 px-3.5 whitespace-nowrap transition-colors duration-250 hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
              onClick={() => onRemove(r.id)}
            >
              Устгах
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5 py-2.5 px-3.5 rounded-full border border-white/[.08] bg-white/[.03] w-fit mx-auto">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink transition-colors duration-150 hover:bg-white/[.08] disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Өмнөх хуудас"
          >
            <Icon name="arrowLeft" size={15} />
          </button>
          <span className="mono !text-[10px]">
            {page} / {totalPages}
          </span>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink transition-colors duration-150 hover:bg-white/[.08] disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Дараах хуудас"
          >
            <Icon name="arrowRight" size={15} />
          </button>
        </div>
      )}
    </>
  );
}
