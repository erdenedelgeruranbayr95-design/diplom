"use client";

import { useEffect, useState } from "react";
import BackBar from "./BackBar";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import { getHistory, deleteHistoryEntry } from "@/lib/api/client";
import type { ListenHistoryRow } from "@/types/song";

const PAGE_SIZE = 20;

/* Сонссон түүх — pagination + хайлт + устгах. */
export default function HistoryView({ onBack, onOpenAnalysis }: { onBack: () => void; onOpenAnalysis?: (songId: string) => void }) {
  const [rows, setRows] = useState<ListenHistoryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    getHistory(page, PAGE_SIZE, q.trim() || undefined)
      .then((res) => {
        setRows(res.items);
        setTotal(res.total);
      })
      .catch((e) => setErr(e.message || "Түүх ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Энэ бичлэгийг устгах уу?")) return;
    try {
      await deleteHistoryEntry(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
      setTotal((t) => t - 1);
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <BackBar title="Сонссон түүх" onBack={onBack} />

      <form className="plv-create" onSubmit={submitSearch} style={{ marginBottom: 20 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Дуу эсвэл дуучнаар хайх…" />
        <button type="submit" className="bt bt-a">
          Хайх
        </button>
      </form>

      {loading && <Loading label="Түүх ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Түүх ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && rows.length === 0 && <Empty icon="🕐" title="Түүх хоосон байна" hint="Дуу сонсоход энд бичлэг нэмэгдэнэ" />}

      {!loading && !err && rows.length > 0 && (
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
                <button className="sp-lmeta plv-play" onClick={() => onOpenAnalysis?.(r.songId)} style={{ textAlign: "left" }}>
                  <b>{r.song.title}</b> <i className="adm-artist">— {r.song.artist || "Тодорхойгүй"}</i>
                </button>
                <span>{new Date(r.playedAt).toLocaleString("mn-MN")}</span>
                <span>{r.durationMs ? `${Math.round(r.durationMs / 1000)}с` : "—"}</span>
                <span>{r.bpm ?? "—"}</span>
                <button className="adm-del" onClick={() => remove(r.id)}>
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
      )}
    </>
  );
}
