"use client";

/* HistoryView.tsx-ийн сонссон түүхийн хүснэгт + хуудаслалт (.bil-table + .dv-maprow) — тусад нь
   гаргасан. Хуудаслалт тусдаа "HistoryFilters" бүрэлдэхүүн хэсэг биш (шүүлтүүр UI эх кодод
   огт байхгүй), харин хүснэгттэй нягт холбоотой тул энд хамт байна — доод тайланг үзнэ үү.
   CSS/behavior бүгд өөрчлөгдөөгүй. */
import type { ListenHistoryRow } from "@/types/song";

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
      <div className="bil-table">
        <div className="bil-row bil-head">
          <span className="mono">Дуу</span>
          <span className="mono">Огноо</span>
          <span className="mono">Үргэлжлэх хугацаа</span>
          <span className="mono">BPM</span>
          <span></span>
        </div>
        {rows.map((r) => (
          <div className="bil-row" key={r.id}>
            <button className="sp-lmeta bg-none border-none cursor-pointer" onClick={() => onOpenAnalysis?.(r.songId)} style={{ textAlign: "left" }}>
              <b>{r.song.title}</b> <i className="adm-artist">— {r.song.artist || "Тодорхойгүй"}</i>
            </button>
            <span>{new Date(r.playedAt).toLocaleString("mn-MN")}</span>
            <span>{r.durationMs ? `${Math.round(r.durationMs / 1000)}с` : "—"}</span>
            <span>{r.bpm ?? "—"}</span>
            <button className="adm-del" onClick={() => onRemove(r.id)}>
              Устгах
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="dv-maprow" style={{ marginTop: 16, justifyContent: "center" }}>
          <button className="bt" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            ← Өмнөх
          </button>
          <span className="mono" style={{ margin: "0 12px" }}>
            {page} / {totalPages}
          </span>
          <button className="bt" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Дараах →
          </button>
        </div>
      )}
    </>
  );
}
