"use client";

/* Сонссон түүх — pagination + хайлт + устгах. Дашбоард маягийн header (нийт бичлэгийн тоо)
   нэмж, дэд компонентуудыг (HistoryToolbar/HistoryTable/HistoryEmptyState) премиум дизайн
   руу шинэчлэв. load()/submitSearch()/remove() логик бүхэлдээ хэвээр — зөвхөн энэ файл болон
   HistoryToolbar.tsx/HistoryTable.tsx-ийн визуал давхарга шинэчлэгдсэн. */
import { useEffect, useState } from "react";
import BackBar from "./BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { getHistory, deleteHistoryEntry } from "@/lib/api/client";
import HistoryToolbar from "@/components/history/HistoryToolbar";
import HistoryTable from "@/components/history/HistoryTable";
import HistoryEmptyState from "@/components/history/HistoryEmptyState";
import type { ListenHistoryRow } from "@/types/song";

const PAGE_SIZE = 20;

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
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <BackBar title="Сонссон түүх" onBack={onBack} />
        {!loading && !err && total > 0 && (
          <span className="mono !text-[10px] py-2 px-3.5 rounded-full border border-white/[.08] bg-white/[.03] whitespace-nowrap">
            {total.toLocaleString()} нийт бичлэг
          </span>
        )}
      </div>

      <HistoryToolbar q={q} setQ={setQ} onSubmit={submitSearch} />

      {loading && <Loading label="Түүх ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Түүх ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && rows.length === 0 && <HistoryEmptyState />}

      {!loading && !err && rows.length > 0 && (
        <HistoryTable rows={rows} page={page} totalPages={totalPages} setPage={setPage} onOpenAnalysis={onOpenAnalysis} onRemove={remove} />
      )}
    </>
  );
}
