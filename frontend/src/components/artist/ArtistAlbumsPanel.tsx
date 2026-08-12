"use client";

/* Уран бүтээлчийн цомгууд — үүсгэх, ковер тавих, дуу нэмэх, дараалал өөрчлөх.

   Урсгал:
     1. Цомог үүсгэнэ (нэр, он, ковер зураг)
     2. Цомгоо нээгээд дуугаа МАСС-аар оруулна — олон файлыг нэг дор сонгоно
     3. Орж ирсэн дуунуудаа чирж дараалалд оруулаад «Дараалал хадгалах»

   ⚠️ Дараалал нь ШУУД хадгалагдахгүй: чирэх бүрд сервер рүү бичвэл 10 удаагийн
   чирэлт 10 бичилт болж, сүүлчийн хариу нь эхнийхийг дарж дараалал үсэрнэ.
   Тиймээс локал төлөвт хуримтлуулаад НЭГ товчоор бичнэ (`dirty`). */
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import { useToast } from "@/components/providers/ToastProvider";
import AlbumTrackList from "./AlbumTrackList";
import { createAlbum, deleteAlbum, fetchMyAlbums, setAlbumSongs, updateAlbum } from "@/lib/api/client";
import { uploadCoverImage, uploadSongsBatch, type BatchUploadProgress } from "@/lib/songs/upload";
import type { Album, AlbumTrack, Song, SongLicense } from "@/types/song";

/** Уран бүтээлч өөрийн бүтээлээ тавьдаг тул анхдагч нь «Өөрийн бүтээл». */
const DEFAULT_LICENSE: SongLicense = "ORIGINAL";

function toTrack(s: Song): AlbumTrack {
  return {
    id: s.id,
    title: s.title,
    trackNumber: s.trackNumber ?? null,
    duration: s.duration,
    coverUrl: s.coverUrl,
    analysisStatus: s.analysisStatus,
  };
}

export default function ArtistAlbumsPanel({
  artistName,
  songs,
  onSongsChanged,
}: {
  artistName: string;
  /** Уран бүтээлчийн БҮХ дуу — цомогт нэмэх сонголтод хэрэгтэй. */
  songs: Song[];
  /** Шинэ дуу орсон/цомог өөрчлөгдсөн үед эцэг дэлгэцээ шинэчлүүлнэ. */
  onSongsChanged: () => void;
}) {
  const toast = useToast();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openId, setOpenId] = useState<string | null>(null);
  /* Нээлттэй цомгийн ажлын дараалал — хадгалагдтал зөвхөн энд байна. */
  const [tracks, setTracks] = useState<AlbumTrack[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const [creating, setCreating] = useState(false);
  /* Ковер сонгож буй цомог — `openId`-ээс ТУСДАА: зураг солихын тулд цомгийг
     нээх шаардлагагүй, мөн нээлттэй цомгийн ажлын дарааллыг хөндөхгүй. */
  const [coverTargetId, setCoverTargetId] = useState<string | null>(null);
  const [busyCover, setBusyCover] = useState(false);
  const [progress, setProgress] = useState<BatchUploadProgress | null>(null);

  const coverInput = useRef<HTMLInputElement>(null);
  const massInput = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchMyAlbums()
      .then(setAlbums)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  function openAlbum(album: Album) {
    if (openId === album.id) {
      setOpenId(null);
      return;
    }
    setOpenId(album.id);
    setTracks(album.songs ?? []);
    setDirty(false);
  }

  /* ---- Цомог үүсгэх / засах / устгах ---- */

  async function submitNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = ((f.get("title") as string) || "").trim();
    if (!title) {
      toast.error("Цомгийн нэрээ оруулна уу");
      return;
    }
    const yearRaw = ((f.get("year") as string) || "").trim();
    setCreating(true);
    try {
      const album = await createAlbum({
        title,
        year: yearRaw ? Number(yearRaw) : undefined,
      });
      setAlbums((prev) => [{ ...album, songs: [] }, ...prev]);
      form.reset();
      toast.success(`«${album.title}» цомог үүслээ`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Үүсгэхэд алдаа гарлаа");
    } finally {
      setCreating(false);
    }
  }

  async function pickCover(album: Album, file: File) {
    setBusyCover(true);
    try {
      const coverKey = await uploadCoverImage(file);
      const saved = await updateAlbum(album.id, {
        title: album.title,
        year: album.year ?? undefined,
        coverKey,
      });
      setAlbums((prev) => prev.map((a) => (a.id === album.id ? { ...a, coverUrl: saved.coverUrl } : a)));
      toast.success("Ковер зураг солигдлоо");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Зураг байршуулахад алдаа гарлаа");
    } finally {
      setBusyCover(false);
    }
  }

  async function removeAlbum(album: Album) {
    /* Дуунууд нь үлддэг гэдгийг ХЭЛНЭ — эс бөгөөс хэрэглэгч бүтээлээ алдана
       гэж айж, цомгоо цэгцлэхээс татгалзана. */
    if (!confirm(`«${album.title}» цомгийг устгах уу?\n\nДуунууд тань үлдэнэ — зөвхөн цомгийн бүлэглэл арилна.`)) return;
    try {
      await deleteAlbum(album.id);
      setAlbums((prev) => prev.filter((a) => a.id !== album.id));
      if (openId === album.id) setOpenId(null);
      onSongsChanged();
      toast.success("Цомог устгагдлаа");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Устгахад алдаа гарлаа");
    }
  }

  /* ---- Дуу нэмэх, дараалал ---- */

  function addExisting(song: Song) {
    setTracks((prev) => (prev.some((t) => t.id === song.id) ? prev : [...prev, toTrack(song)]));
    setDirty(true);
  }

  function addAllLoose(loose: Song[]) {
    setTracks((prev) => {
      const have = new Set(prev.map((t) => t.id));
      return [...prev, ...loose.filter((s) => !have.has(s.id)).map(toTrack)];
    });
    setDirty(true);
  }

  function removeTrack(id: string) {
    setTracks((prev) => prev.filter((t) => t.id !== id));
    setDirty(true);
  }

  async function saveOrder(album: Album) {
    setSaving(true);
    try {
      const saved = await setAlbumSongs(
        album.id,
        tracks.map((t) => t.id),
      );
      setAlbums((prev) => prev.map((a) => (a.id === album.id ? { ...a, songs: saved.songs ?? [] } : a)));
      setTracks(saved.songs ?? []);
      setDirty(false);
      onSongsChanged();
      toast.success("Дараалал хадгалагдлаа");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  }

  /** Масс байршуулалт — сонгосон бүх файлыг дараалан оруулаад цомгийн ард залгана. */
  async function massUpload(album: Album, files: File[]) {
    if (!files.length) return;
    setProgress({ index: 0, total: files.length, filename: files[0].name, phase: "uploading" });
    try {
      const { songs: added, failures } = await uploadSongsBatch(
        files,
        { artist: artistName, genre: "", license: DEFAULT_LICENSE },
        setProgress,
      );

      if (added.length) {
        /* Файлын дараалал = трекийн дараалал. Байгаа трекүүдийн АРД залгана —
           хэрэглэгч дараа нь чирж өөрчилнө. */
        const nextIds = [...tracks.map((t) => t.id), ...added.map((s) => s.id)];
        const saved = await setAlbumSongs(album.id, nextIds);
        setAlbums((prev) => prev.map((a) => (a.id === album.id ? { ...a, songs: saved.songs ?? [] } : a)));
        setTracks(saved.songs ?? []);
        setDirty(false);
        onSongsChanged();
      }

      if (failures.length === 0) {
        toast.success(`${added.length} дуу цомогт нэмэгдлээ`);
      } else if (added.length) {
        toast.error(`${added.length} дуу орлоо, ${failures.length} нь амжилтгүй: ${failures[0].filename}`);
      } else {
        toast.error(`Байршуулж чадсангүй: ${failures[0].error}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Байршуулахад алдаа гарлаа");
    } finally {
      setProgress(null);
    }
  }

  /* ---- Рендер ---- */

  if (loading) return <p className="text-dim text-body py-6">Цомгууд ачаалж байна…</p>;
  if (error) return <ErrorState title="Цомог ачаалагдсангүй" hint={error} onRetry={load} />;

  return (
    <div className="flex flex-col gap-5">
      <form className="flex gap-3 items-end max-[560px]:flex-col max-[560px]:items-stretch" onSubmit={submitNew}>
        <label className={FIELD_LABEL_CLS + " flex-1"}>
          <span className={FIELD_CAPTION_CLS}>Шинэ цомгийн нэр</span>
          <input className={FIELD_INPUT_CLS} name="title" placeholder="Жишээ: Анхны алхам" maxLength={120} />
        </label>
        <label className={FIELD_LABEL_CLS + " w-[130px] max-[560px]:w-full"}>
          <span className={FIELD_CAPTION_CLS}>Он</span>
          <input className={FIELD_INPUT_CLS} name="year" type="number" min={1900} max={2100} placeholder="2026" />
        </label>
        <ActionButton variant="primary" type="submit" disabled={creating} className="flex-none">
          <Icon name="plus" size={14} />
          {creating ? "Үүсгэж байна…" : "Цомог үүсгэх"}
        </ActionButton>
      </form>

      {albums.length === 0 ? (
        <Empty icon="disc" title="Цомог алга" hint="Дээрх талбараар анхны цомгоо үүсгээрэй" />
      ) : (
        <ul className="flex flex-col gap-3">
          {albums.map((album) => {
            const isOpen = openId === album.id;
            /* Цомогт хараахан ороогүй дуунууд — «бүгдийг нэмэх» сонголт эндээс.
               `tracks` нь ЗӨВХӨН нээлттэй цомгийнх тул хаалттай мөрд тооцохгүй. */
            const loose = isOpen ? songs.filter((s) => !tracks.some((t) => t.id === s.id)) : [];

            return (
              <li key={album.id} className="border border-white/[.08] rounded-panel bg-white/[.02] overflow-hidden">
                <div className="flex items-center gap-3.5 p-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCoverTargetId(album.id);
                      coverInput.current?.click();
                    }}
                    disabled={busyCover}
                    aria-label={`«${album.title}» цомгийн ковер зураг солих`}
                    className="w-14 h-14 rounded-lg overflow-hidden flex-none border border-white/[.1] bg-white/[.04] flex items-center justify-center text-faint transition-colors duration-200 hover:border-aqua/50 hover:text-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  >
                    {album.coverUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={album.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="plus" size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openAlbum(album)}
                    aria-expanded={isOpen}
                    className="flex-1 min-w-0 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua rounded-lg px-1 py-1"
                  >
                    <b className="block text-copy truncate font-medium">{album.title}</b>
                    <i className="not-italic text-dim text-note">
                      {album.year ? `${album.year} · ` : ""}
                      {(isOpen ? tracks.length : (album.songs?.length ?? 0))} дуу
                    </i>
                  </button>

                  {isOpen && dirty && <StatusBadge label="Хадгалаагүй" tone="warm" dot className="flex-none" />}

                  <span className="flex items-center gap-1 flex-none">
                    <button
                      type="button"
                      onClick={() => removeAlbum(album)}
                      aria-label={`«${album.title}» цомгийг устгах`}
                      className="p-2 rounded-md text-dim transition-colors duration-150 hover:text-danger hover:bg-danger/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    >
                      <Icon name="trash" size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openAlbum(album)}
                      aria-label={isOpen ? "Хаах" : "Нээх"}
                      className="p-2 rounded-md text-dim transition-transform duration-200 hover:text-ink focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    >
                      <Icon name="chevronRight" size={15} className={isOpen ? "rotate-90" : ""} />
                    </button>
                  </span>
                </div>

                {isOpen && (
                  <div className="border-t border-white/[.07] p-3.5 flex flex-col gap-4">
                    {/* --- Масс байршуулалт --- */}
                    <div className="rounded-xl border border-aqua/20 bg-aqua/[.05] p-3.5 flex flex-col gap-2.5">
                      <b className="font-display text-note">Бүх дууг нэг дор оруулах</b>
                      <p className="text-dim text-note leading-5">
                        Цомгийн бүх дууны файлыг нэг дор сонгоно уу. Файлын нэрээр гарчиг тавигдаж,
                        сонгосон дарааллаар цомогт орно — дараа нь чирж өөрчилж болно.
                      </p>
                      <input
                        ref={massInput}
                        type="file"
                        multiple
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files ?? []);
                          /* Утгыг цэвэрлэнэ — ижил файлыг дахин сонгоход `change`
                             дахин ажиллуулахын тулд. */
                          e.target.value = "";
                          void massUpload(album, files);
                        }}
                      />
                      {progress ? (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-body text-aqua">
                            {progress.index + 1} / {progress.total} ·{" "}
                            {progress.phase === "uploading"
                              ? "байршуулж байна"
                              : progress.phase === "analyzing"
                                ? "анализ хийж байна"
                                : progress.phase === "failed"
                                  ? "амжилтгүй"
                                  : "боллоо"}
                          </span>
                          <span className="text-faint text-note truncate">{progress.filename}</span>
                          <span className="h-1 rounded-full bg-white/[.08] overflow-hidden">
                            <span
                              className="block h-full bg-aqua transition-[width] duration-300"
                              style={{ width: `${((progress.index + 1) / progress.total) * 100}%` }}
                            />
                          </span>
                        </div>
                      ) : (
                        <ActionButton
                          variant="primary"
                          size="sm"
                          className="self-start"
                          onClick={() => massInput.current?.click()}
                        >
                          <Icon name="upload" size={14} />
                          Дууны файлууд сонгох
                        </ActionButton>
                      )}
                    </div>

                    {/* --- Трекийн дараалал --- */}
                    {tracks.length === 0 ? (
                      <Empty icon="music" title="Энэ цомогт дуу алга" hint="Дээрээс файлаа оруулах, эсвэл доороос байгаа дуугаа нэмнэ үү" />
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <b className="font-display text-note">Дараалал ({tracks.length})</b>
                          <ActionButton
                            variant="primary"
                            size="sm"
                            disabled={!dirty || saving}
                            onClick={() => saveOrder(album)}
                          >
                            {saving ? "Хадгалж байна…" : "Дараалал хадгалах"}
                          </ActionButton>
                        </div>
                        <AlbumTrackList songs={tracks} onChange={(next) => { setTracks(next); setDirty(true); }} onRemove={removeTrack} />
                      </>
                    )}

                    {/* --- Байгаа дуунаас нэмэх --- */}
                    {loose.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <b className="font-display text-note">Цомогт ороогүй дуунууд ({loose.length})</b>
                          <ActionButton variant="ghost" size="sm" onClick={() => addAllLoose(loose)}>
                            Бүгдийг нэмэх
                          </ActionButton>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {loose.map((s) => (
                            <li key={s.id}>
                              <button
                                type="button"
                                onClick={() => addExisting(s)}
                                className="flex items-center gap-1.5 border border-white/[.1] rounded-full px-3 py-1.5 text-note text-dim transition-colors duration-150 hover:border-aqua/50 hover:text-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
                              >
                                <Icon name="plus" size={12} />
                                <span className="max-w-[200px] truncate">{s.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Ковер сонгогч нь жагсаалтаас ГАДНА — нээлттэй цомог солигдоход input
          дахин үүсэж, файлын харилцах цонх хаагдахаас сэргийлнэ. */}
      <input
        ref={coverInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          const target = albums.find((a) => a.id === coverTargetId);
          if (file && target) void pickCover(target, file);
        }}
      />
    </div>
  );
}
