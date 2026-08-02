"use client";

/* PRO эрхтэй USER өөрөө дуу нэмэх — AdminPanel.tsx-ийн addTrack логикийг дагана,
   гэхдээ файл эсвэл URL хоёрын аль нэгийг сонгож болно (backend аль хэдийн Role.USER зөвшөөрдөг).
   Премиум form card (SongLibraryPanel.tsx-тэй ижил дизайн хэл) руу шинэчлэв: .dv-lead/
   .adm-form/.sp-seg/.adm-file legacy CSS-ийг Tailwind болгов. addTrack() validation/upload/
   analyze логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useState } from "react";
import BackBar from "../BackBar";
import { uploadSongWithAnalysis } from "@/lib/songs/upload";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import { LICENSE_OPTIONS } from "@/lib/songs/license-options";
import type { SongLicense } from "@/types/song";

const labelCls = FIELD_LABEL_CLS;
const captionCls = FIELD_CAPTION_CLS;
const inputCls = FIELD_INPUT_CLS;

export default function UploadSongView({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [license, setLicense] = useState<SongLicense>("ORIGINAL");

  async function addTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = ((f.get("title") as string) || "").trim();
    const singer = ((f.get("singer") as string) || "").trim();
    const genre = ((f.get("genre") as string) || "").trim() || "Бусад";
    const audio = f.get("audio") as File | null;
    const url = ((f.get("url") as string) || "").trim();
    const license = (f.get("license") as SongLicense) || "ORIGINAL";
    const licenseSrc = ((f.get("licenseSrc") as string) || "").trim();

    if (title.length < 2) {
      setMsg("❌ Дууны нэрээ оруулна уу");
      return;
    }
    if (singer.length < 2) {
      setMsg("❌ Дуучны нэрээ оруулна уу");
      return;
    }
    if (mode === "file" && (!audio || !audio.size)) {
      setMsg("❌ Дууны mp3 файлаа сонгоно уу");
      return;
    }
    if (mode === "file" && audio && !/audio\//.test(audio.type)) {
      setMsg("❌ Зөвхөн дууны файл (mp3) оруулна");
      return;
    }
    if (mode === "url" && !url) {
      setMsg("❌ Дууны холбоос (URL) оруулна уу");
      return;
    }
    if (license === "LICENSED" && licenseSrc.length < 1) {
      setMsg("❌ Гэрээт лиценз сонгосон бол эх сурвалж/гэрээний тайлбар заавал бичнэ үү");
      return;
    }

    setBusy(true);
    try {
      const { analyzed, analyzeError } = await uploadSongWithAnalysis({
        title,
        artist: singer,
        genre,
        file: mode === "file" ? audio : undefined,
        sourceUrl: mode === "url" ? url : undefined,
        license,
        licenseSrc: license === "LICENSED" ? licenseSrc : undefined,
      });
      form.reset();
      if (analyzed) setMsg("✅ «" + title + "» нэмэгдэж, анализ дууслаа.");
      else setMsg("⚠️ «" + title + "» нэмэгдсэн ч анализ амжилтгүй боллоо: " + analyzeError?.message);
    } catch (err) {
      setMsg("❌ Хадгалахад алдаа гарлаа: " + (err as Error).message);
    }
    setBusy(false);
  }

  return (
    <>
      <BackBar title="Дуу нэмэх" onBack={onBack} />
      <p className="text-dim text-sm leading-[1.55] mb-5 max-w-[640px]">PRO эрхтэй хэрэглэгчээр хүссэн дуугаа нэмж, номын санд оруулах боломжтой.</p>

      <form className="flex flex-col gap-4 border border-white/[.08] rounded-2xl p-6 bg-white/[.02]" onSubmit={addTrack}>
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Дууны нэр *</span>
            <input className={inputCls} name="title" type="text" placeholder="ж: Хөх тэнгэр" />
          </label>
          <label className={labelCls}>
            <span className={captionCls}>Дуучин *</span>
            <input className={inputCls} name="singer" type="text" placeholder="ж: Батаа" />
          </label>
        </div>
        <label className={labelCls}>
          <span className={captionCls}>Төрөл (заавал биш)</span>
          <input className={inputCls} name="genre" type="text" placeholder="ж: Поп" list="genres" />
          <datalist id="genres">
            <option value="Поп" />
            <option value="Рок" />
            <option value="Хип хоп" />
            <option value="Электрон" />
            <option value="Ардын" />
            <option value="Чилл" />
          </datalist>
        </label>

        <div className="flex gap-1.5" role="tablist" aria-label="Эх сурвалж сонгох">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "file"}
            className={
              "py-2 px-3.5 rounded-full text-note font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "file" ? "bg-aqua text-on-aqua border-aqua font-semibold" : "text-dim border-white/[.08] hover:border-white/20 hover:text-ink")
            }
            onClick={() => setMode("file")}
          >
            Файл байршуулах
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "url"}
            className={
              "py-2 px-3.5 rounded-full text-note font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "url" ? "bg-aqua text-on-aqua border-aqua font-semibold" : "text-dim border-white/[.08] hover:border-white/20 hover:text-ink")
            }
            onClick={() => setMode("url")}
          >
            Холбоосоор (URL)
          </button>
        </div>

        {mode === "file" ? (
          <label className={labelCls}>
            <span className={captionCls + " inline-flex items-center gap-2"}>
              <Icon name="music" size={13} />
              Дууны файл (mp3) *
            </span>
            <div className="border border-dashed border-white/[.14] rounded-xl p-4 bg-white/[.015] transition-colors duration-200 hover:border-aqua/40 [&_input]:text-note [&_input]:text-dim [&_input::file-selector-button]:bg-aqua/[.12] [&_input::file-selector-button]:text-aqua [&_input::file-selector-button]:border [&_input::file-selector-button]:border-aqua/35 [&_input::file-selector-button]:rounded-full [&_input::file-selector-button]:py-1.5 [&_input::file-selector-button]:px-3.5 [&_input::file-selector-button]:mr-2.5 [&_input::file-selector-button]:font-body [&_input::file-selector-button]:text-note [&_input::file-selector-button]:cursor-pointer">
              <input name="audio" type="file" accept="audio/*" />
            </div>
          </label>
        ) : (
          <label className={labelCls}>
            <span className={captionCls + " inline-flex items-center gap-2"}>
              <Icon name="link" size={13} />
              Дууны холбоос (URL) *
            </span>
            <input className={inputCls} name="url" type="url" placeholder="https://example.com/song.mp3" />
          </label>
        )}

        <label className={labelCls}>
          <span className={captionCls}>Лиценз *</span>
          <select
            className={inputCls}
            name="license"
            value={license}
            onChange={(e) => setLicense(e.target.value as SongLicense)}
          >
            {LICENSE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {license === "LICENSED" && (
          <label className={labelCls}>
            <span className={captionCls}>Гэрээ/эх сурвалжийн тайлбар *</span>
            <input className={inputCls} name="licenseSrc" type="text" placeholder="ж: Гэрээний холбоос эсвэл дугаар" />
          </label>
        )}

        {msg && (
          <p className={"text-body " + (msg.startsWith("❌") ? "text-danger" : "text-aqua")} role="status">
            {msg}
          </p>
        )}
        <ActionButton type="submit" variant="primary" className="w-fit" disabled={busy}>
          {busy ? "Хадгалж байна…" : "+ Дуу нэмэх"}
        </ActionButton>
      </form>
    </>
  );
}
