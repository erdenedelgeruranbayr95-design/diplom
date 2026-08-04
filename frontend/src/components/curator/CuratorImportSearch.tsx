"use client";

/* Каталог импортын хайлт — GET /songs/{jamendo,fma}/search + POST /songs/{jamendo,fma}/import.
   JAMENDO_CLIENT_ID / FMA_API_KEY тохируулаагүй бол backend 400 буцаана — энэ алдааг нуухгүй,
   шууд харуулна (куратор backend .env засах хэрэгтэйг ойлгоно). */
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Empty, ErrorState } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/providers/ToastProvider";
import * as api from "@/lib/api/client";
import type { FmaSearchResult, JamendoSearchResult } from "@/types/song";

type Source = "jamendo" | "fma";
/** Хоёр эх сурвалжийн (Jamendo/FMA) хайлтын үр дүнг нэг хэлбэрт зохицуулна — `id` талбар
   эх сурвалж бүрт өөр нэртэй (jamendoId/fmaId) байдгийг энд л ялгаж авна. */
type SearchRow = { id: string; title: string; artist: string; coverUrl: string | null; license: string | null };

const inputCls =
  "flex-1 min-w-[200px] px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

const SOURCE_LABEL: Record<Source, string> = { jamendo: "Jamendo", fma: "Free Music Archive" };

function toRow(source: Source, track: JamendoSearchResult | FmaSearchResult): SearchRow {
  return {
    id: source === "jamendo" ? (track as JamendoSearchResult).jamendoId : (track as FmaSearchResult).fmaId,
    title: track.title,
    artist: track.artist,
    coverUrl: track.coverUrl,
    license: track.license,
  };
}

export default function CuratorImportSearch() {
  const toast = useToast();
  const [source, setSource] = useState<Source>("jamendo");
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchRow[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [importingId, setImportingId] = useState<string | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  function switchSource(next: Source) {
    if (next === source) return;
    setSource(next);
    setResults(null);
    setError("");
    setImportedIds(new Set());
  }

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setSearching(true);
    setError("");
    try {
      const rows = source === "jamendo" ? await api.searchJamendo(term, 24) : await api.searchFma(term, 24);
      setResults(rows.map((track) => toRow(source, track)));
    } catch (err) {
      setError((err as Error).message || "Хайлт амжилтгүй боллоо");
      setResults(null);
    } finally {
      setSearching(false);
    }
  }

  async function runImport(row: SearchRow) {
    setImportingId(row.id);
    try {
      const song = source === "jamendo" ? await api.importJamendoTrack(row.id) : await api.importFmaTrack(row.id);
      setImportedIds((prev) => new Set(prev).add(row.id));
      toast.success(`«${song.title}» импортлогдлоо`);
    } catch (err) {
      toast.error((err as Error).message || "Импортлоход алдаа гарлаа");
    } finally {
      setImportingId(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Каталог импортын хайлт"
        eyebrow="КУРАТОР"
        description={`GET /songs/${source}/search — ${SOURCE_LABEL[source]}-ийн нээлттэй лицензтэй дууны сангаас хайж импортлоно.`}
      />

      <div className="flex gap-2 mb-4" role="tablist" aria-label="Импортын эх сурвалж">
        {(["jamendo", "fma"] as const).map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={source === s}
            onClick={() => switchSource(s)}
            className={
              "px-4 py-1.5 rounded-full text-caption transition-colors duration-150 border " +
              (source === s ? "bg-aqua text-on-aqua border-transparent" : "bg-white/[.03] border-white/[.08] text-dim hover:text-ink")
            }
          >
            {SOURCE_LABEL[s]}
          </button>
        ))}
      </div>

      <form className="flex gap-2.5 flex-wrap mb-6" onSubmit={runSearch}>
        <input
          className={inputCls}
          placeholder="Дуу/дуучин хайх (жишээ: piano ambient)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={`${SOURCE_LABEL[source]} хайх`}
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
        <Empty icon="disc" title="Илэрц олдсонгүй" hint={`«${q}» хайлтад тохирох дуу ${SOURCE_LABEL[source]}-с олдсонгүй`} />
      )}

      {!error && results && results.length > 0 && (
        <div className="grid grid-cols-2 max-viz:grid-cols-1 gap-3">
          {results.map((track) => {
            const imported = importedIds.has(track.id);
            return (
              <div key={track.id} className="flex items-center gap-3.5 rounded-2xl border border-white/[.08] bg-white/[.03] p-3.5">
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
                  disabled={imported || importingId === track.id}
                >
                  {imported ? "Импортлогдсон" : importingId === track.id ? "…" : "Импорт"}
                </ActionButton>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
