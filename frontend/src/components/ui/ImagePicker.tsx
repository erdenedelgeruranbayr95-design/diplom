"use client";

/* Зураг сонгогч — цомгийн ковер, дууны зураг, уран бүтээлчийн хөрөг гурвуулаа.

   ⚠️ Файлыг ЭНД байршуулахгүй: зөвхөн сонгож урьдчилан харуулна. Сонголт бүрд
   S3 руу PUT хийвэл хэрэглэгч зургаа 3 удаа солиход 2 өнчин объект үлдэнэ.
   Тиймээс `uploadCoverImage()` нь форм ИЛГЭЭГДЭХ мөчид дуудагдана.

   Хэрэглэгч холбоос бичихгүй — өөрийн зургаа шууд сонгоно. */
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { FIELD_CAPTION_CLS } from "@/components/ui/form-styles";

/** Backend-ийн зөвшөөрдөг растр форматууд (SVG ЗОРИУД БАЙХГҮЙ — script суулгаж
 *  болдог тул ижил домэйноос үйлчилвэл XSS. См. request-upload-url.dto.ts). */
export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/avif";

/** Хэт том зураг presigned PUT дээр удаан — сонгох мөчид нь шууд татгалзана. */
const MAX_BYTES = 5 * 1024 * 1024;

export default function ImagePicker({
  file,
  onPick,
  currentUrl,
  caption,
  hint,
  round = false,
  size = 88,
  disabled = false,
}: {
  /** Одоо сонгогдсон файл (эцэг форм эзэмшинэ — илгээхдээ байршуулна). */
  file: File | null;
  /** `null` = зургийг хассан. */
  onPick: (file: File | null) => void;
  /** Аль хэдийн хадгалагдсан зураг — шинийг сонгох хүртэл энэ харагдана. */
  currentUrl?: string | null;
  caption: string;
  hint?: string;
  /** Хөрөг зурагт дугуй (уран бүтээлчийн профайл). */
  round?: boolean;
  size?: number;
  disabled?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  /* Сонгосон файлын урьдчилсан харагдац — objectURL-ыг ЗААВАЛ буцааж чөлөөлнө,
     эс бөгөөс зураг солих бүрд blob санах ойд хуримтлагдана. */
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const shown = preview ?? currentUrl ?? null;

  function choose(picked: File | null) {
    if (!picked) return;
    if (!IMAGE_ACCEPT.split(",").includes(picked.type)) {
      setError("Зураг нь JPEG, PNG, WebP эсвэл AVIF байх ёстой");
      return;
    }
    if (picked.size > MAX_BYTES) {
      setError("Зураг 5MB-аас хөнгөн байх ёстой");
      return;
    }
    setError("");
    onPick(picked);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className={FIELD_CAPTION_CLS}>{caption}</span>
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={disabled}
          aria-label={shown ? `${caption} — солих` : `${caption} — сонгох`}
          style={{ width: size, height: size }}
          className={
            "flex-none overflow-hidden border border-white/[.1] bg-white/[.04] flex items-center justify-center text-faint transition-colors duration-200 hover:border-aqua/50 hover:text-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:pointer-events-none " +
            (round ? "rounded-full" : "rounded-xl")
          }
        >
          {shown ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={shown} alt="" className="w-full h-full object-cover" />
          ) : (
            <Icon name="plus" size={18} />
          )}
        </button>

        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 border border-white/[.1] rounded-full px-3 py-1.5 text-note text-dim transition-colors duration-150 hover:border-aqua/50 hover:text-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:pointer-events-none"
            >
              <Icon name="upload" size={12} />
              {shown ? "Зураг солих" : "Зураг сонгох"}
            </button>
            {shown && (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  onPick(null);
                }}
                disabled={disabled}
                className="p-1.5 rounded-md text-dim transition-colors duration-150 hover:text-danger hover:bg-danger/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:pointer-events-none"
                aria-label={`${caption} — хасах`}
              >
                <Icon name="trash" size={13} />
              </button>
            )}
          </span>
          {file ? (
            <span className="text-faint text-note truncate max-w-[240px]">{file.name}</span>
          ) : (
            hint && <span className="text-faint text-note">{hint}</span>
          )}
          {error && (
            <span className="text-danger text-note" role="status">
              {error}
            </span>
          )}
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept={IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => {
          const picked = e.target.files?.[0] ?? null;
          /* Утгыг цэвэрлэнэ — ижил файлыг дахин сонгоход `change` ажиллахын тулд. */
          e.target.value = "";
          choose(picked);
        }}
      />
    </div>
  );
}
