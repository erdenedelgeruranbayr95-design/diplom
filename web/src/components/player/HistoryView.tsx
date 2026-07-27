"use client";

import { useEffect, useState } from "react";
import BackBar from "./BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { getHistory, deleteHistoryEntry } from "@/lib/api/client";
import HistoryToolbar from "@/components/history/HistoryToolbar";
import HistoryTable from "@/components/history/HistoryTable";
import HistoryEmptyState from "@/components/history/HistoryEmptyState";
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
