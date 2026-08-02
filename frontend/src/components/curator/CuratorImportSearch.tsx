"use client";

/* Каталог импортын хайлт — GET /songs/jamendo/search + POST /songs/jamendo/import.
   JAMENDO_CLIENT_ID тохируулаагүй бол backend 400 буцаана ("Invalid Client Id" гэх мэт) —
   энэ алдааг нуухгүй, шууд харуулна (куратор backend .env засах хэрэгтэйг ойлгоно). */
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Empty, ErrorState } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/providers/ToastProvider";
import * as api from "@/lib/api/client";
import type { JamendoSearchResult } from "@/types/song";

const inputCls =
  "flex-1 min-w-[200px] px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function CuratorImportSearch() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<JamendoSearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [importingId, setImportingId] = useState<string | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setSearching(true);
    setError("");
    try {
      const rows = await api.searchJamendo(term, 24);
      setResults(rows);
    } catch (err) {
      setError((err as Error).message || "Хайлт амжилтгүй боллоо");
      setResults(null);
    } finally {
      setSearching(false);
    }
  }

  async function runImport(track: JamendoSearchResult) {
    setImportingId(track.jamendoId);
    try {
      const song = await api.importJamendoTrack(track.jamendoId);
      setImportedIds((prev) => new Set(prev).add(track.jamendoId));
      toast.success(`«${song.title}» импортлогдлоо`);
    } catch (err) {
      toast.error((err as Error).message || "Импортлоход алдаа гарлаа");
    } finally {
      setImportingId(null);
    }
  }

  return (
    <>
      <PageHeader title="Каталог импортын хайлт" eyebrow="КУРАТОР" description="GET /songs/jamendo/search — Jamendo-ийн нээлттэй лицензтэй дууны сангаас хайж импортлоно." />

      <form className="flex gap-2.5 flex-wrap mb-6" onSubmit={runSearch}>
        <input
          className={inputCls}
          placeholder="Дуу/дуучин хайх (жишээ: piano ambient)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Jamendo хайх"
        />
        <ActionButton variant="primary" type="submit" disabled={searching || !q.trim()}>
          {searching ? "Хайж байна…" : "Хайх"}
        </ActionButton>
      </form>

      {error && (
        <ErrorState
          title="Хайлт амжилтгүй боллоо"
          hint={error}
          onRetry={() => {
            setError("");
          }}
        />
      )}

      {!error && results === null && (
        <Empty icon="search" title="Хайлт хийгээгүй байна" hint="Дээрх талбарт түлхүүр үг оруулаад хайна уу" />
      )}

      {!error && results !== null && results.length === 0 && (
        <Empty icon="disc" title="Илэрц олдсонгүй" hint={`«${q}» хайлтад тохирох дуу Jamendo-с олдсонгүй`} />
      )}

      {!error && results && results.length > 0 && (
        <div className="grid grid-cols-2 max-viz:grid-cols-1 gap-3">
          {results.map((track) => {
            const imported = importedIds.has(track.jamendoId);
            return (
              <div key={track.jamendoId} className="flex items-center gap-3.5 rounded-2xl border border-white/[.08] bg-white/[.03] p-3.5">
                {track.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={track.coverUrl} alt="" className="w-14 h-14 rounded-lg object-cover flex-none bg-white/[.06]" />
                ) : (
                  <div className="w-14 h-14 rounded-lg flex-none bg-white/[.06]" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-body text-ink truncate">{track.title}</p>
                  <p className="text-caption text-dim truncate">{track.artist}</p>
                  <div className="mt-1.5">
                    <StatusBadge label={track.license || "Тодорхойгүй"} tone="purple" />
                  </div>
                </div>
                <ActionButton
                  variant={imported ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => runImport(track)}
                  disabled={imported || importingId === track.jamendoId}
                >
                  {imported ? "Импортлогдсон" : importingId === track.jamendoId ? "…" : "Импорт"}
                </ActionButton>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
