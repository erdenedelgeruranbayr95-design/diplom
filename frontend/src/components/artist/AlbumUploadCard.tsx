"use client";

/* Цомгийг НЭГ формоор оруулах — нэр, он, ковер зураг, бүх дууны файл нэг дор.

   `ArtistAlbumsPanel`-ээс ялгаатай: тэр нь БАЙГАА цомгуудыг удирдана (дараалал
   чирэх, дуу нэмэх/хасах). Энэ нь «шинэ цомгоо тавих» ганц урсгал — уран
   бүтээлч «Дуу нэмэх» цэс рүү ороод ганц дуугаар хязгаарлагдахгүй.

   Дараалал:
     1. Ковер (сонгосон бол) → presigned PUT → coverKey
     2. POST цомог (coverKey-тэй)
     3. Дууны файлууд дараалан upload + анализ (uploadSongsBatch)
     4. PUT цомгийн дуунууд — ФАЙЛЫН дараалал = трекийн дугаар

   ⚠️ Цомог үүссэн ч дуу нь хагас орж болзошгүй. Тэр тохиолдолд цомгийг УСТГАХГҮЙ:
   орсон дуунууд нь үлдэх ёстой, үлдсэнийг нь «Уран бүтээлч» дэлгэцээс нөхөж
   нэмнэ гэдгийг мессежээр хэлнэ. */
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import ImagePicker from "@/components/ui/ImagePicker";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import { useToast } from "@/components/providers/ToastProvider";
import { createAlbum, setAlbumSongs } from "@/lib/api/client";
import { uploadCoverImage, uploadSongsBatch, type BatchUploadProgress } from "@/lib/songs/upload";
import { LICENSE_OPTIONS } from "@/lib/songs/license-options";
import type { SongLicense } from "@/types/song";

export default function AlbumUploadCard({
  artistName,
  onDone,
}: {
  artistName: string;
  /** Цомог амжилттай орсны дараа эцэг дэлгэцээ шинэчлүүлнэ. */
  onDone?: () => void;
}) {
  const toast = useToast();
  const [cover, setCover] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [license, setLicense] = useState<SongLicense>("ORIGINAL");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<BatchUploadProgress | null>(null);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = ((f.get("title") as string) || "").trim();
    const yearRaw = ((f.get("year") as string) || "").trim();
    const genre = ((f.get("genre") as string) || "").trim() || "Бусад";
    const licenseSrc = ((f.get("licenseSrc") as string) || "").trim();

    if (title.length < 1) {
      toast.error("Цомгийн нэрээ оруулна уу");
      return;
    }
    if (!files.length) {
      toast.error("Цомгийн дууны файлуудаа сонгоно уу");
      return;
    }
    if (license === "LICENSED" && !licenseSrc) {
      toast.error("Гэрээт лиценз сонгосон бол эх сурвалжаа бичнэ үү");
      return;
    }

    setBusy(true);
    try {
      const coverKey = cover ? await uploadCoverImage(cover) : undefined;
      const album = await createAlbum({ title, year: yearRaw ? Number(yearRaw) : undefined, coverKey });

      setProgress({ index: 0, total: files.length, filename: files[0].name, phase: "uploading" });
      const { songs: added, failures } = await uploadSongsBatch(
        files,
        /* Цомгийн ковер нь дуу бүрийн зураг ч болно — тусад нь оруулах шаардлагагүй. */
        { artist: artistName, genre, license, licenseSrc: licenseSrc || undefined, coverKey },
        setProgress,
      );

      if (added.length) {
        await setAlbumSongs(album.id, added.map((s) => s.id));
      }

      if (!failures.length) {
        toast.success(`«${title}» цомог ${added.length} дуутай орлоо`);
      } else if (added.length) {
        toast.error(`${added.length} дуу орлоо, ${failures.length} нь амжилтгүй: ${failures[0].filename}`);
      } else {
        toast.error(`Цомог үүссэн ч дуу орсонгүй: ${failures[0].error}`);
      }

      form.reset();
      setCover(null);
      setFiles([]);
      setLicense("ORIGINAL");
      onDone?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Цомог оруулахад алдаа гарлаа");
    } finally {
      setProgress(null);
      setBusy(false);
    }
  }

  return (
    <form className="flex flex-col gap-4 border border-white/[.08] rounded-2xl p-6 bg-white/[.02]" onSubmit={submit}>
      <div className="grid grid-cols-[1fr_130px] max-[560px]:grid-cols-1 gap-3">
        <label className={FIELD_LABEL_CLS}>
          <span className={FIELD_CAPTION_CLS}>Цомгийн нэр *</span>
          <input className={FIELD_INPUT_CLS} name="title" placeholder="ж: Анхны алхам" maxLength={120} />
        </label>
        <label className={FIELD_LABEL_CLS}>
          <span className={FIELD_CAPTION_CLS}>Он</span>
          <input className={FIELD_INPUT_CLS} name="year" type="number" min={1900} max={2100} placeholder="2026" />
        </label>
      </div>

      <label className={FIELD_LABEL_CLS}>
        <span className={FIELD_CAPTION_CLS}>Төрөл (заавал биш)</span>
        <input className={FIELD_INPUT_CLS} name="genre" placeholder="ж: Поп" list="album-genres" />
        <datalist id="album-genres">
          <option value="Поп" />
          <option value="Рок" />
          <option value="Хип хоп" />
          <option value="Электрон" />
          <option value="Ардын" />
          <option value="Чилл" />
        </datalist>
      </label>

      <ImagePicker
        caption="Цомгийн ковер зураг"
        hint="Компьютерээсээ зургаа сонгоно — дуунууд ч энэ зурагтай болно"
        file={cover}
        onPick={setCover}
        disabled={busy}
      />

      <div className={FIELD_LABEL_CLS}>
        <span className={FIELD_CAPTION_CLS + " inline-flex items-center gap-2"}>
          <Icon name="music" size={13} />
          Цомгийн дуунууд (mp3) *
        </span>
        <div className="border border-dashed border-white/[.14] rounded-xl p-4 bg-white/[.015] flex flex-col gap-3 transition-colors duration-200 hover:border-aqua/40">
          <label className="inline-flex items-center gap-1.5 self-start border border-white/[.1] rounded-full px-3 py-1.5 text-note text-dim cursor-pointer transition-colors duration-150 hover:border-aqua/50 hover:text-aqua focus-within:border-aqua/50">
            <Icon name="upload" size={12} />
            {files.length ? "Өөр файл нэмэх" : "Дууны файлууд сонгох"}
            <input
              type="file"
              multiple
              accept="audio/*"
              className="sr-only"
              disabled={busy}
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []);
                e.target.value = "";
                setFiles((prev) => [...prev, ...picked]);
              }}
            />
          </label>

          {files.length === 0 ? (
            <span className="text-faint text-note">
              Олон файлыг нэг дор сонгож болно. Сонгосон дараалал нь трекийн дугаар болно.
            </span>
          ) : (
            <ol className="flex flex-col gap-1.5">
              {files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center gap-2.5 text-note">
                  <span className="mono !text-micro text-faint w-6 flex-none">{i + 1}.</span>
                  <span className="text-dim truncate min-w-0 flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    disabled={busy}
                    aria-label={`${file.name} — хасах`}
                    className="p-1.5 rounded-md text-dim flex-none transition-colors duration-150 hover:text-danger hover:bg-danger/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50"
                  >
                    <Icon name="close" size={13} />
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <label className={FIELD_LABEL_CLS}>
        <span className={FIELD_CAPTION_CLS}>Лиценз *</span>
        <select
          className={FIELD_INPUT_CLS}
          name="license"
          value={license}
          onChange={(e) => setLicense(e.target.value as SongLicense)}
        >
          {LICENSE_OPTIONS.map((o) => (
            <option className="bg-surface text-ink" key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      {license === "LICENSED" && (
        <label className={FIELD_LABEL_CLS}>
          <span className={FIELD_CAPTION_CLS}>Гэрээ/эх сурвалжийн тайлбар *</span>
          <input className={FIELD_INPUT_CLS} name="licenseSrc" placeholder="ж: Гэрээний холбоос эсвэл дугаар" />
        </label>
      )}

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
        <ActionButton type="submit" variant="primary" className="w-fit" disabled={busy}>
          {busy ? "Оруулж байна…" : `+ Цомог оруулах${files.length ? ` (${files.length} дуу)` : ""}`}
        </ActionButton>
      )}
    </form>
  );
}
