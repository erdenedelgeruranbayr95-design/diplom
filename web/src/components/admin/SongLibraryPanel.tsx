"use client";

/* AdminPanel.tsx-ийн "Дууны сан" таб (upload форм + жагсаалт) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { Loading, Empty } from "@/components/ui/States";
import type { Song } from "@/types/song";

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
  return (
    <>
      <form className="adm-form" onSubmit={onSubmit}>
        <span className="mono" style={{ fontSize: 9.5 }}>
          Шинэ дуу нэмэх
        </span>
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
        <div className="adm-form-row">
          <label>
            <span className="mono">Зохиолч (заавал биш)</span>
            <input name="composer" type="text" placeholder="ж: Д.Дорж" />
          </label>
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
        </div>

        <label>
          <span className="mono">🎵 Дууны файл (mp3) *</span>
          <input name="audio" type="file" accept="audio/*" className="adm-file" />
        </label>

        {msg && (
          <p className={msg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
            {msg}
          </p>
        )}
        <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
          {busy ? "Хадгалж, анализ хийж байна…" : "+ Дуу нэмэх"}
        </button>
      </form>

      {loading && <Loading label="Дуунууд ачааллаж байна…" />}
      {!loading && songs.length === 0 && <Empty icon="🎵" title="Backend-д нэмсэн дуу алга" hint="Дээрх формоор шинэ дуу нэмээрэй" />}
      {!loading && songs.length > 0 && (
        <div className="border border-line rounded-sm max-h-[300px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1.6fr_.8fr_.8fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Нэр</span>
            <span className="mono max-[600px]:hidden">Төрөл</span>
            <span className="mono max-[600px]:hidden">BPM</span>
            <span></span>
          </div>
          {songs.map((s, i) => (
            <div
              className="grid grid-cols-[1.6fr_.8fr_.8fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.035] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={s.id}
            >
              <span>
                {s.title} <i className="adm-artist">— {s.artist}</i>
              </span>
              <span className="font-mono text-[11px] text-faint max-[600px]:hidden">{s.genre || "—"}</span>
              <span className="font-mono text-[11px] text-faint max-[600px]:hidden">{s.analyzedBpm ?? s.bpm ?? "—"}</span>
              <span></span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
