"use client";

/* AdminPanel.tsx-ийн "Дууны сан" таб (upload форм + жагсаалт) — премиум upload card
   (Vercel Dashboard pattern) руу шинэчлэв, .adm-form/.adm-file legacy CSS-ийг Tailwind
   болгож, мөр бүрт анализын статус chip нэмэв (analyzedBpm байгаа эсэхээс шууд гарган
   авсан — шинэ backend талбар нэмээгүй). msg/busy/onSubmit/loading/songs props бүгд хэвээр,
   upload/analyze урсгал огт өөрчлөгдөөгүй. */
import { useState } from "react";
import { Loading, Empty } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Song, SongLicense } from "@/types/song";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";
import { LICENSE_OPTIONS } from "@/lib/songs/license-options";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-micro";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-copy p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function SongLibraryPanel({
  msg,
  busy,
  onSubmit,
  loading,
  songs,
}: {
  msg: string;
  busy: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  songs: Song[];
}) {
  const [license, setLicense] = useState<SongLicense>("ORIGINAL");
  return (
    <>
      <form className="flex flex-col gap-3.5 border border-white/[.08] rounded-2xl p-5 my-5 bg-white/[.02]" onSubmit={onSubmit}>
        <div>
          <b className="block font-display font-semibold text-lead text-ink">Шинэ дуу нэмэх</b>
          <p className="text-dim text-note mt-0.5">Upload хиймэгц автоматаар анализ хийгдэнэ</p>
        </div>
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
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Зохиолч (заавал биш)</span>
            <input className={inputCls} name="composer" type="text" placeholder="ж: Д.Дорж" />
          </label>
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
        </div>

        <label className={labelCls}>
          <span className={captionCls + " inline-flex items-center gap-2"}><Icon name="music" size={13} />Дууны файл (mp3) *</span>
          <div className="border border-dashed border-white/[.14] rounded-xl p-4 bg-white/[.015] transition-colors duration-200 hover:border-aqua/40 [&_input]:text-note [&_input]:text-dim [&_input::file-selector-button]:bg-aqua/[.12] [&_input::file-selector-button]:text-aqua [&_input::file-selector-button]:border [&_input::file-selector-button]:border-aqua/35 [&_input::file-selector-button]:rounded-full [&_input::file-selector-button]:py-1.5 [&_input::file-selector-button]:px-3.5 [&_input::file-selector-button]:mr-2.5 [&_input::file-selector-button]:font-body [&_input::file-selector-button]:text-note [&_input::file-selector-button]:cursor-pointer">
            <input name="audio" type="file" accept="audio/*" />
          </div>
        </label>

        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Лиценз *</span>
            <select className={inputCls} name="license" value={license} onChange={(e) => setLicense(e.target.value as SongLicense)}>
              {LICENSE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          {license === "LICENSED" && (
            <label className={labelCls}>
              <span className={captionCls}>Гэрээ/эх сурвалж *</span>
              <input className={inputCls} name="licenseSrc" type="text" placeholder="ж: Гэрээний холбоос эсвэл дугаар" />
            </label>
          )}
        </div>

        {msg && (
          <p className={"text-body " + (msg.startsWith("✅") ? "text-aqua" : msg.startsWith("⚠️") ? "text-warm" : "text-danger")} role="status">
            {msg}
          </p>
        )}
        <ActionButton type="submit" variant="primary" className="w-fit" disabled={busy}>
          {busy ? "Хадгалж, анализ хийж байна…" : "+ Дуу нэмэх"}
        </ActionButton>
      </form>

      {loading && <Loading label="Дуунууд ачааллаж байна…" />}
      {!loading && songs.length === 0 && <Empty icon="music" title="Backend-д нэмсэн дуу алга" hint="Дээрх формоор шинэ дуу нэмээрэй" />}
      {!loading && songs.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1.6fr_.8fr_.8fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-note bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Нэр</span>
            <span className="mono max-[600px]:hidden">Төрөл</span>
            <span className="mono max-[600px]:hidden">BPM</span>
            <span></span>
          </div>
          {songs.map((s, i) => {
            const analyzed = s.analyzedBpm !== null && s.analyzedBpm !== undefined;
            return (
              <div
                className="grid grid-cols-[1.6fr_.8fr_.8fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-body transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
                style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
                key={s.id}
              >
                <span className="flex flex-col min-w-0">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{s.title}</span>
                  <i className="not-italic text-dim text-caption whitespace-nowrap overflow-hidden text-ellipsis">{s.artist}</i>
                </span>
                <span className="font-mono text-caption text-faint max-[600px]:hidden">{s.genre || "—"}</span>
                <span className="font-mono text-caption text-faint max-[600px]:hidden">{s.analyzedBpm ?? s.bpm ?? "—"}</span>
                <StatusBadge
                  label={analyzed ? "Анализ хийгдсэн" : "Хүлээгдэж буй"}
                  tone={analyzed ? "aqua" : "faint"}
                  className="justify-self-end"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
