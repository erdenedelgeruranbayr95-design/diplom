"use client";

/* Тухайн дууны дэлгэрэнгүй засварлагч — CuratorCatalog.tsx-ийн мөр дарахад доор нь
   inline expand хийж харагдана. Метадата + лиценз засах (PUT /songs/:id), Publish/
   Unpublish (POST /songs/:id/publish|unpublish), Haptic Score урьдчилан харах. */
import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Panel } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/providers/ToastProvider";
import * as api from "@/lib/api/client";
import CuratorScorePreview from "./CuratorScorePreview";
import type { Song, SongLicense } from "@/types/song";

const LICENSE_LABEL: Record<SongLicense, string> = {
  CC_BY: "CC BY — эх сурвалж дурдах",
  CC_BY_SA: "CC BY-SA — адилаар хуваалцах",
  CC_BY_NC: "CC BY-NC — ашгийн бус",
  CC0: "CC0 — нээлттэй домэйн",
  ORIGINAL: "Оригинал — эх бүтээл",
  LICENSED: "Лицензтэй — эх сурвалж/зөвшөөрөл шаардана",
};

const ANALYSIS_LABEL: Record<Song["analysisStatus"], { label: string; tone: "aqua" | "warm" | "rose" | "faint" }> = {
  PENDING: { label: "Хүлээгдэж буй", tone: "faint" },
  PROCESSING: { label: "Боловсруулж буй", tone: "warm" },
  READY: { label: "Бэлэн", tone: "aqua" },
  FAILED: { label: "Амжилтгүй", tone: "rose" },
};

const inputCls =
  "w-full px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";
const selectCls =
  "w-full px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua";

export default function CuratorSongEditor({ song, onChanged }: { song: Song; onChanged: (updated: Song) => void }) {
  const toast = useToast();
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist || "");
  const [genre, setGenre] = useState(song.genre || "");
  const [description, setDescription] = useState(song.description || "");
  const [lyrics, setLyrics] = useState(song.lyrics || "");
  const [license, setLicense] = useState<SongLicense | "">(song.license || "");
  const [licenseSrc, setLicenseSrc] = useState(song.licenseSrc || "");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const needsLicenseSrc = license === "LICENSED";
  const canPublish = !!song.license || !!license;

  async function save() {
    setSaving(true);
    try {
      const updated = await api.updateSong(song.id, {
        title: title.trim() || undefined,
        artist: artist.trim() || undefined,
        genre: genre.trim() || undefined,
        description: description.trim() || undefined,
        lyrics: lyrics.trim() || undefined,
        license: license || undefined,
        licenseSrc: needsLicenseSrc ? licenseSrc.trim() || undefined : undefined,
      });
      toast.success(`«${updated.title}» хадгалагдлаа`);
      onChanged(updated);
    } catch (err) {
      toast.error((err as Error).message || "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish() {
    setPublishing(true);
    try {
      const updated = song.published ? await api.unpublishSong(song.id) : await api.publishSong(song.id);
      toast.success(updated.published ? "Нийтлэгдлээ" : "Нийтлэлээс хасагдлаа");
      onChanged(updated);
    } catch (err) {
      toast.error((err as Error).message || "Нийтлэх төлөв солиход алдаа гарлаа");
    } finally {
      setPublishing(false);
    }
  }

  const analysis = ANALYSIS_LABEL[song.analysisStatus];

  return (
    <div className="border-t border-white/[.07] bg-white/[.015] p-5 flex flex-col gap-5">
      <div className="grid grid-cols-2 max-viz:grid-cols-1 gap-3.5">
        <label className="flex flex-col gap-1.5">
          <span className="mono !text-micro">Нэр</span>
          <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mono !text-micro">Дуучин</span>
          <input className={inputCls} value={artist} onChange={(e) => setArtist(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mono !text-micro">Төрөл</span>
          <input className={inputCls} value={genre} onChange={(e) => setGenre(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mono !text-micro">Лиценз</span>
          <select className={selectCls} value={license} onChange={(e) => setLicense(e.target.value as SongLicense)}>
            <option value="" disabled>
              Сонгоно уу…
            </option>
            {(Object.keys(LICENSE_LABEL) as SongLicense[]).map((key) => (
              <option key={key} value={key}>
                {LICENSE_LABEL[key]}
              </option>
            ))}
          </select>
        </label>
        {needsLicenseSrc && (
          <label className="flex flex-col gap-1.5 col-span-2 max-viz:col-span-1">
            <span className="mono !text-micro">Лицензийн эх сурвалж (заавал)</span>
            <input
              className={inputCls}
              value={licenseSrc}
              onChange={(e) => setLicenseSrc(e.target.value)}
              placeholder="Жишээ: https://jamendo.com/track/... эсвэл зөвшөөрлийн URL"
            />
          </label>
        )}
        <label className="flex flex-col gap-1.5 col-span-2 max-viz:col-span-1">
          <span className="mono !text-micro">Тайлбар</span>
          <textarea
            className="w-full px-4 py-2.5 rounded-2xl bg-white/[.04] border border-white/[.08] text-ink text-body min-h-[70px] resize-none transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5 col-span-2 max-viz:col-span-1">
          <span className="mono !text-micro">Уг үг (lyrics) — хүртээмжийн шаардлага</span>
          <textarea
            className="w-full px-4 py-2.5 rounded-2xl bg-white/[.04] border border-white/[.08] text-ink text-body min-h-[120px] font-mono text-note resize-y transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder={"[00:12.50] Эхний мөр\n[00:15.80] Хоёр дахь мөр\n\nЭсвэл цаг тэмдэглэгээгүй чөлөөт текст."}
          />
        </label>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        <ActionButton variant="primary" size="sm" onClick={save} disabled={saving}>
          {saving ? "Хадгалж байна…" : "Хадгалах"}
        </ActionButton>
        <ActionButton
          variant={song.published ? "danger" : "secondary"}
          size="sm"
          onClick={togglePublish}
          disabled={publishing || (!song.published && !canPublish)}
          title={!song.published && !canPublish ? "Эхлээд лиценз сонгож хадгална уу" : undefined}
        >
          {publishing ? "…" : song.published ? "Нийтлэлээс хасах" : "Нийтлэх"}
        </ActionButton>
        {!song.published && !canPublish && <span className="text-caption text-warm">Лиценз сонгож хадгалах хүртэл нийтлэх боломжгүй</span>}
      </div>

      <Panel as="section">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4 className="font-display font-semibold text-body text-ink">Haptic Score урьдчилан харах</h4>
          <StatusBadge label={analysis.label} tone={analysis.tone} dot />
        </div>
        {song.analysisStatus === "READY" && song.scoreUrl ? (
          <CuratorScorePreview scoreUrl={song.scoreUrl} />
        ) : song.analysisStatus === "FAILED" ? (
          <p className="text-body text-rose">{song.analysisError || "Анализ амжилтгүй болсон"}</p>
        ) : (
          <p className="text-body text-dim">Анализ {analysis.label.toLowerCase()} — Score бэлэн болмогц энд урьдчилан харагдана.</p>
        )}
      </Panel>
    </div>
  );
}
