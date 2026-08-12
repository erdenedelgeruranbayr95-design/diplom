"use client";

/* PRO эрхтэй USER өөрөө дуу нэмэх — AdminPanel.tsx-ийн addTrack логикийг дагана,
   гэхдээ файл эсвэл URL хоёрын аль нэгийг сонгож болно (backend аль хэдийн Role.USER зөвшөөрдөг).
   Премиум form card (SongLibraryPanel.tsx-тэй ижил дизайн хэл) руу шинэчлэв: .dv-lead/
   .adm-form/.sp-seg/.adm-file legacy CSS-ийг Tailwind болгов. addTrack() validation/upload/
   analyze логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн.

   Дээд талын сонголтоор ГАНЦ ДУУ эсвэл БҮТЭН ЦОМОГ оруулна. Цомог нь
   баталгаажсан уран бүтээлчид л нээлттэй (backend ч ялгаагүй татгалздаг) тул
   эрхгүй тохиолдлыг 403 болгож харуулахын оронд ШАЛТГААНЫГ нь энд тайлбарлана. */
import { useEffect, useState } from "react";
import BackBar from "../BackBar";
import AlbumUploadCard from "@/components/artist/AlbumUploadCard";
import { uploadCoverImage, uploadSongWithAnalysis } from "@/lib/songs/upload";
import { fetchMyArtist } from "@/lib/api/client";
import Icon from "@/components/ui/Icon";
import ImagePicker from "@/components/ui/ImagePicker";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import { LICENSE_OPTIONS } from "@/lib/songs/license-options";
import type { Artist, SongLicense } from "@/types/song";

const labelCls = FIELD_LABEL_CLS;
const captionCls = FIELD_CAPTION_CLS;
const inputCls = FIELD_INPUT_CLS;

/** Дээд талын сонголт ба цомгийн доторх «Файл / URL» хоёрт ижил стиль. */
function segCls(active: boolean) {
  return (
    "py-2 px-3.5 rounded-full text-note font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
    (active ? "bg-aqua text-on-aqua border-aqua font-semibold" : "text-dim border-white/[.08] hover:border-white/20 hover:text-ink")
  );
}

export default function UploadSongView({
  onBack,
  onOpenArtistProfile,
}: {
  onBack: () => void;
  /** «Уран бүтээлч» дэлгэц рүү шилжүүлэх — профайлгүй хүнд цомог хаалттай. */
  onOpenArtistProfile?: () => void;
}) {
  const [kind, setKind] = useState<"song" | "album">("song");
  const [mode, setMode] = useState<"file" | "url">("file");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [license, setLicense] = useState<SongLicense>("ORIGINAL");
  const [cover, setCover] = useState<File | null>(null);

  /* Цомгийн эрхийг шалгахад профайл хэрэгтэй. `undefined` = хараахан ачаалагдаагүй. */
  const [artist, setArtist] = useState<Artist | null | undefined>(undefined);

  useEffect(() => {
    fetchMyArtist()
      .then(setArtist)
      .catch(() => setArtist(null));
  }, []);

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
      /* Зураг нь дууны ӨМНӨ орно — Song мөр үүсэхдээ шууд коверлогдоно.
         Зөвхөн энэ алхам унавал дуу нь ер нь орохгүй, тул тусад нь барихгүй. */
      const coverKey = cover ? await uploadCoverImage(cover) : undefined;
      const { analyzed, analyzeError } = await uploadSongWithAnalysis({
        title,
        artist: singer,
        genre,
        file: mode === "file" ? audio : undefined,
        sourceUrl: mode === "url" ? url : undefined,
        coverKey,
        license,
        licenseSrc: license === "LICENSED" ? licenseSrc : undefined,
      });
      form.reset();
      setCover(null);
      if (analyzed) setMsg("✅ «" + title + "» нэмэгдэж, анализ дууслаа.");
      else setMsg("⚠️ «" + title + "» нэмэгдсэн ч анализ амжилтгүй боллоо: " + analyzeError?.message);
    } catch (err) {
      setMsg("❌ Хадгалахад алдаа гарлаа: " + (err as Error).message);
    }
    setBusy(false);
  }

  return (
    <>
      <BackBar title="Дуу, цомог нэмэх" onBack={onBack} />
      <p className="text-dim text-sm leading-[1.55] mb-5 max-w-[640px]">
        PRO эрхтэй хэрэглэгчээр хүссэн дуугаа нэмж, номын санд оруулах боломжтой. Баталгаажсан
        уран бүтээлч бол бүтэн цомгоо зурагтай нь нэг дор оруулна.
      </p>

      <div className="flex gap-1.5 mb-5" role="tablist" aria-label="Юу нэмэх вэ">
        <button type="button" role="tab" aria-selected={kind === "song"} className={segCls(kind === "song")} onClick={() => setKind("song")}>
          Нэг дуу
        </button>
        <button type="button" role="tab" aria-selected={kind === "album"} className={segCls(kind === "album")} onClick={() => setKind("album")}>
          Цомог
        </button>
      </div>

      {kind === "album" ? (
        artist === undefined ? (
          <p className="text-dim text-body py-6">Ачаалж байна…</p>
        ) : !artist ? (
          <div className="rounded-panel border border-aqua/25 bg-aqua/[.06] p-5 flex flex-col gap-3 items-start">
            <b className="font-display text-note">Цомог оруулахад уран бүтээлчийн профайл хэрэгтэй</b>
            <p className="text-dim text-body leading-6 max-w-[560px]">
              Эхлээд «Уран бүтээлч» хэсгээс профайлаа үүсгэнэ үү. Админ баталгаажуулсны дараа
              цомгоо зураг, бүх дууных нь хамт нэг дор оруулна.
            </p>
            {onOpenArtistProfile && (
              <ActionButton variant="primary" size="sm" onClick={onOpenArtistProfile}>
                <Icon name="mic" size={14} />
                Профайл үүсгэх
              </ActionButton>
            )}
          </div>
        ) : !artist.approved ? (
          <div className="rounded-panel border border-warm/25 bg-warm/[.06] p-5 flex gap-3.5 items-start">
            <span className="text-warm flex-none mt-0.5">
              <Icon name="hourglass" size={18} />
            </span>
            <div>
              <b className="font-display text-note block mb-1.5">Админы баталгаажуулалт хүлээж байна</b>
              <p className="text-dim text-body leading-6">
                «{artist.name}» профайл хянагдаж байна. Баталгаажмагц цомгоо энд оруулах боломжтой болно.
                Түр зуур ганц дуугаа «Нэг дуу» хэсгээр нэмээрэй.
              </p>
            </div>
          </div>
        ) : (
          <AlbumUploadCard artistName={artist.name} />
        )
      ) : (
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
            <button type="button" role="tab" aria-selected={mode === "file"} className={segCls(mode === "file")} onClick={() => setMode("file")}>
              Файл байршуулах
            </button>
            <button type="button" role="tab" aria-selected={mode === "url"} className={segCls(mode === "url")} onClick={() => setMode("url")}>
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

          <ImagePicker
            caption="Дууны зураг (заавал биш)"
            hint="Компьютерээсээ өөрийн зургаа сонгоно — холбоос бичих шаардлагагүй"
            file={cover}
            onPick={setCover}
            disabled={busy}
          />

          <label className={labelCls}>
            <span className={captionCls}>Лиценз *</span>
            <select
              className={inputCls}
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
      )}
    </>
  );
}
