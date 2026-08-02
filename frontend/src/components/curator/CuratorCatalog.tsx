"use client";

/* Дууны каталог хүснэгт — GET /songs/catalog (CURATOR/MODERATOR/ADMIN/ROOT-д зөвшөөрөгдсөн,
   нийтлэгдээгүй drafts-ыг ч оруулна). Мөр дарахад доор нь CuratorSongEditor inline expand. */
import { useMemo, useState } from "react";
import { TableCard } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Empty, ErrorState, Skeleton } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import Icon from "@/components/ui/Icon";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { getSongCatalog } from "@/lib/api/client";
import CuratorSongEditor from "./CuratorSongEditor";
import type { Song, SongLicense } from "@/types/song";

const LICENSE_SHORT: Record<SongLicense, string> = {
  CC_BY: "CC BY",
  CC_BY_SA: "CC BY-SA",
  CC_BY_NC: "CC BY-NC",
  CC0: "CC0",
  ORIGINAL: "Оригинал",
  LICENSED: "Лицензтэй",
};

const ANALYSIS_TONE: Record<Song["analysisStatus"], "aqua" | "warm" | "rose" | "faint"> = {
  PENDING: "faint",
  PROCESSING: "warm",
  READY: "aqua",
  FAILED: "rose",
};

type PublishFilter = "ALL" | "PUBLISHED" | "DRAFT";

export default function CuratorCatalog() {
  const [filter, setFilter] = useState<PublishFilter>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data: songs, setData: setSongs, loading, error, reload } = useAsyncResource(() => getSongCatalog(), [], {
    initialData: [] as Song[],
    errorMessage: "Каталог ачаалахад алдаа гарлаа",
  });

  const rows = useMemo(() => {
    if (filter === "PUBLISHED") return songs.filter((s) => s.published);
    if (filter === "DRAFT") return songs.filter((s) => !s.published);
    return songs;
  }, [songs, filter]);

  function handleSongChanged(updated: Song) {
    setSongs((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  if (loading) return <Skeleton variant="row" rows={5} />;
  if (error) return <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={reload} />;

  return (
    <>
      <PageHeader
        title="Дууны каталог"
        eyebrow="КУРАТОР"
        description={`GET /songs/catalog — нийт ${songs.length} дуу, нийтлэгдээгүй drafts-ийг оролцуулна.`}
        actions={
          <div className="flex gap-1.5" role="group" aria-label="Нийтлэлийн төлвөөр шүүх">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
              <button
                key={f}
                className={
                  "text-caption font-mono rounded-full py-2 px-3.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                  (filter === f ? "bg-aqua border-aqua text-on-aqua font-semibold" : "border-white/[.1] text-dim hover:text-ink hover:bg-white/[.05]")
                }
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f === "ALL" ? "Бүгд" : f === "PUBLISHED" ? "Нийтлэгдсэн" : "Ноорог"}
              </button>
            ))}
          </div>
        }
      />

      {rows.length === 0 ? (
        <Empty icon="disc" title="Дуу олдсонгүй" hint={filter === "ALL" ? "Каталогт одоогоор дуу алга" : "Энэ шүүлтэд тохирох дуу алга"} />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1.4fr_1fr_.7fr_.7fr_.8fr_auto] max-viz:grid-cols-[1.4fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Нэр</span>
            <span className="mono max-viz:hidden">Дуучин</span>
            <span className="mono max-viz:hidden">Лиценз</span>
            <span className="mono max-viz:hidden">Төлөв</span>
            <span className="mono">Анализ</span>
            <span></span>
          </div>
          {rows.map((song) => {
            const isOpen = expanded === song.id;
            return (
              <div key={song.id}>
                <button
                  className="w-full grid grid-cols-[1.4fr_1fr_.7fr_.7fr_.8fr_auto] max-viz:grid-cols-[1.4fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] text-body transition-colors duration-150 hover:bg-white/[.03] text-left"
                  onClick={() => setExpanded(isOpen ? null : song.id)}
                  aria-expanded={isOpen}
                >
                  <span className="truncate">{song.title}</span>
                  <span className="text-dim truncate max-viz:hidden">{song.artist || "—"}</span>
                  <span className="max-viz:hidden">
                    {song.license ? (
                      <StatusBadge label={LICENSE_SHORT[song.license]} tone="purple" />
                    ) : (
                      <StatusBadge label="Тодорхойгүй" tone="faint" />
                    )}
                  </span>
                  <span className="max-viz:hidden">
                    <StatusBadge label={song.published ? "Нийтлэгдсэн" : "Ноорог"} tone={song.published ? "aqua" : "faint"} dot />
                  </span>
                  <span>
                    <StatusBadge label={song.analysisStatus} tone={ANALYSIS_TONE[song.analysisStatus]} dot />
                  </span>
                  <span className="text-faint flex justify-end">
                    <Icon name={isOpen ? "arrowDown" : "chevronRight"} size={15} />
                  </span>
                </button>
                {isOpen && <CuratorSongEditor song={song} onChanged={handleSongChanged} />}
              </div>
            );
          })}
        </TableCard>
      )}
    </>
  );
}
