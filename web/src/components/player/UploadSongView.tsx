"use client";

/* PRO эрхтэй USER өөрөө дуу нэмэх — AdminPanel.tsx-ийн addTrack логикийг дагана,
   гэхдээ файл эсвэл URL хоёрын аль нэгийг сонгож болно (backend аль хэдийн Role.USER зөвшөөрдөг). */
import { useState } from "react";
import BackBar from "./BackBar";
import * as api from "@/lib/api/client";
import { analyzeAudioFile } from "@/lib/audio/analyze";

export default function UploadSongView({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

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

    setBusy(true);
    try {
      const uploadForm = new FormData();
      uploadForm.set("title", title);
      uploadForm.set("artist", singer);
      uploadForm.set("genre", genre);
      if (mode === "file" && audio) uploadForm.set("file", audio);
      if (mode === "url") uploadForm.set("sourceUrl", url);

      const song = await api.uploadSong(uploadForm);
      setMsg("✅ «" + title + "» амжилттай нэмэгдлээ. Анализ хийгдэж байна…");
      form.reset();

      try {
        const result = await analyzeAudioFile(song.fileUrl);
        await api.submitAnalysis(song.id, result);
        setMsg("✅ «" + title + "» нэмэгдэж, анализ дууслаа.");
      } catch (analyzeErr) {
        setMsg("⚠️ «" + title + "» нэмэгдсэн ч анализ амжилтгүй боллоо: " + (analyzeErr as Error).message);
      }
    } catch (err) {
      setMsg("❌ Хадгалахад алдаа гарлаа: " + (err as Error).message);
    }
    setBusy(false);
  }

  return (
    <>
      <BackBar title="Дуу нэмэх" onBack={onBack} />
      <p className="dv-lead">PRO эрхтэй хэрэглэгчээр хүссэн дуугаа нэмж, номын санд оруулах боломжтой.</p>

      <form className="adm-form" onSubmit={addTrack}>
        <div className="adm-form-row">
          <label>
            <span className="mono">Дууны нэр *</span>
            <input name="title" type="text" placeholder="ж: Хөх тэнгэр" />
          </label>
          <label>
            <span className="mono">Дуучин *</span>
            <input name="singer" type="text" placeholder="ж: Батаа" />
          </label>
        </div>
        <label>
          <span className="mono">Төрөл (заавал биш)</span>
          <input name="genre" type="text" placeholder="ж: Поп" list="genres" />
          <datalist id="genres">
            <option value="Поп" />
            <option value="Рок" />
            <option value="Хип хоп" />
            <option value="Электрон" />
            <option value="Ардын" />
            <option value="Чилл" />
          </datalist>
        </label>

        <div className="sp-seg" role="tablist" aria-label="Эх сурвалж сонгох">
          <button type="button" className={mode === "file" ? "on" : ""} onClick={() => setMode("file")}>
            Файл байршуулах
          </button>
          <button type="button" className={mode === "url" ? "on" : ""} onClick={() => setMode("url")}>
            Холбоосоор (URL)
          </button>
        </div>

        {mode === "file" ? (
          <label>
            <span className="mono">🎵 Дууны файл (mp3) *</span>
            <input name="audio" type="file" accept="audio/*" className="adm-file" />
          </label>
        ) : (
          <label>
            <span className="mono">🔗 Дууны холбоос (URL) *</span>
            <input name="url" type="url" placeholder="https://example.com/song.mp3" />
          </label>
        )}

        {msg && (
          <p className={msg.startsWith("✅") ? "auth-ok" : msg.startsWith("⚠️") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
            {msg}
          </p>
        )}
        <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
          {busy ? "Хадгалж байна…" : "+ Дуу нэмэх"}
        </button>
      </form>
    </>
  );
}
