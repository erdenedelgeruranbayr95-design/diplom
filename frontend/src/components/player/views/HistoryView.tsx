"use client";

/* Сонссон түүх — pagination + хайлт + устгах. Ачаалалт нь `useAsyncResource`-т —
   `load()/loading/err/finally` гэсэн давтагдсан блок энэ файлаас алга болов. */
import { useState } from "react";
import BackBar from "../BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { getHistory, deleteHistoryEntry } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import HistoryToolbar from "@/components/history/HistoryToolbar";
import HistoryTable from "@/components/history/HistoryTable";
import HistoryEmptyState from "@/components/history/HistoryEmptyState";
import type { HistoryPage } from "@/types/song";

const PAGE_SIZE = 20;
const EMPTY_PAGE: HistoryPage = { items: [], total: 0 };

export default function HistoryView({ onBack, onOpenAnalysis }: { onBack: () => void; onOpenAnalysis?: (songId: string) => void }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const {
    data: history,
    setData: setHistory,
    loading,
    error,
    setError,
    reload,
  } = useAsyncResource<HistoryPage>(() => getHistory(page, PAGE_SIZE, query.trim() || undefined), [page], {
    initialData: EMPTY_PAGE,
    errorMessage: "Түүх ачаалахад алдаа гарлаа",
  });

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    reload();
  }

  async function remove(id: string) {
    if (!confirm("Энэ бичлэгийг устгах уу?")) return;
    try {
      await deleteHistoryEntry(id);
      setHistory((prev) => ({ items: prev.items.filter((r) => r.id !== id), total: prev.total - 1 }));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const totalPages = Math.max(1, Math.ceil(history.total / PAGE_SIZE));

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <BackBar title="Сонссон түүх" onBack={onBack} />
        {!loading && !error && history.total > 0 && (
          <span className="mono !text-meta py-2 px-3.5 rounded-full border border-white/[.08] bg-white/[.03] whitespace-nowrap">
            {history.total.toLocaleString()} нийт бичлэг
          </span>
        )}
      </div>

      <HistoryToolbar q={query} setQ={setQuery} onSubmit={submitSearch} />

      {loading && <Loading label="Түүх ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Түүх ачаалагдсангүй" hint={error} onRetry={reload} />}

      {!loading && !error && history.items.length === 0 && <HistoryEmptyState />}

      {!loading && !error && history.items.length > 0 && (
        <HistoryTable
          rows={history.items}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onOpenAnalysis={onOpenAnalysis}
          onRemove={remove}
        />
      )}
    </>
  );
}
