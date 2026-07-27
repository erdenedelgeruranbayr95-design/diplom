"use client";

/* ProfileView.tsx-ийн "Харагдац" + "Мэдрэх горим — үндсэн тохиргоо" + "Мэдэгдэл ба хандалт"
   гурван карт — тусад нь гаргасан. CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary
   шилжсэн. */
import { VIB_LEVELS, LIGHT_LEVELS } from "@/lib/player/constants";
import type { VizMode } from "@/lib/player/visualizer-modes";

const VIZ_MODES: { v: VizMode; label: string }[] = [
  { v: "bars", label: "Спектр" },
  { v: "waveform", label: "Долгион" },
  { v: "circular", label: "Тойрог" },
  { v: "beat-pulse", label: "Цохилт" },
  { v: "bass-explosion", label: "Бас дэлбэрэлт" },
  { v: "ambient", label: "Ая тохиролт" },
];

interface SettingsPrefs {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  viz?: { mode: VizMode; particles: boolean; glow: number };
  theme?: "dark" | "light";
  language?: "mn" | "en";
  notifyFeed?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
}

export default function PreferenceSettings({
  prefs,
  viz,
  onUpdatePrefs,
}: {
  prefs: SettingsPrefs;
  viz: { mode: VizMode; particles: boolean; glow: number };
  onUpdatePrefs: (patch: Partial<SettingsPrefs>) => void;
}) {
  return (
    <>
      <div className="bg-white/[.03] border border-line rounded-lg p-5 mb-[18px] transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm">
        <h3 className="st-h" style={{ marginTop: 0 }}>
          Харагдац
        </h3>

        <div className="block mb-3.5">
          <span className="mono !block !mb-1.5 !text-dim">Загвар (Theme)</span>
          <div className="sp-seg">
            <button type="button" className={(prefs.theme || "dark") === "dark" ? "on" : ""} onClick={() => onUpdatePrefs({ theme: "dark" })}>
              Харанхуй
            </button>
            <button type="button" className={prefs.theme === "light" ? "on" : ""} onClick={() => onUpdatePrefs({ theme: "light" })}>
              Цайвар
            </button>
          </div>
        </div>

        <div className="block mb-3.5">
          <span className="mono !block !mb-1.5 !text-dim">Хэл (Language)</span>
          <div className="sp-seg">
            <button type="button" className={(prefs.language || "mn") === "mn" ? "on" : ""} onClick={() => onUpdatePrefs({ language: "mn" })}>
              Монгол
            </button>
            <button type="button" className={prefs.language === "en" ? "on" : ""} onClick={() => onUpdatePrefs({ language: "en" })}>
              English
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/[.03] border border-line rounded-lg p-5 mb-[18px] transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm">
        <h3 className="st-h" style={{ marginTop: 0 }}>
          Мэдрэх горим — үндсэн тохиргоо
        </h3>

        <div className="block mb-3.5">
          <span className="mono !block !mb-1.5 !text-dim">Чичиргээний хүч</span>
          <div className="sp-seg">
            {VIB_LEVELS.map((v, i) => (
              <button type="button" key={v.label} className={prefs.vib === i ? "on" : ""} onClick={() => onUpdatePrefs({ vib: i })}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="block mb-3.5">
          <span className="mono !block !mb-1.5 !text-dim">Гэрлийн эрч</span>
          <div className="sp-seg">
            {LIGHT_LEVELS.map((v, i) => (
              <button type="button" key={v.label} className={prefs.light === i ? "on" : ""} onClick={() => onUpdatePrefs({ light: i })}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="block mb-3.5">
          <span className="mono !block !mb-1.5 !text-dim">Визуалайзерийн үндсэн горим</span>
          <div className="sp-seg flex-wrap">
            {VIZ_MODES.map((m) => (
              <button type="button" key={m.v} className={viz.mode === m.v ? "on" : ""} onClick={() => onUpdatePrefs({ viz: { ...viz, mode: m.v } })}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2.5 mb-3 cursor-pointer text-[13.5px] last:mb-0 [&>input]:w-[17px] [&>input]:h-[17px] [&>input]:accent-aqua [&>input]:cursor-pointer">
          <input type="checkbox" checked={viz.particles} onChange={(e) => onUpdatePrefs({ viz: { ...viz, particles: e.target.checked } })} />
          <span>Тоосонцор эффект идэвхжүүлэх</span>
        </label>
      </div>

      <div className="bg-white/[.03] border border-line rounded-lg p-5 mb-[18px] transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm">
        <h3 className="st-h" style={{ marginTop: 0 }}>
          Мэдэгдэл ба хандалт
        </h3>

        <label className="flex items-center gap-2.5 mb-3 cursor-pointer text-[13.5px] last:mb-0 [&>input]:w-[17px] [&>input]:h-[17px] [&>input]:accent-aqua [&>input]:cursor-pointer">
          <input type="checkbox" checked={prefs.notifyFeed ?? true} onChange={(e) => onUpdatePrefs({ notifyFeed: e.target.checked })} />
          <span>Зарлал/мэдэгдэл хүлээн авах</span>
        </label>

        <label className="flex items-center gap-2.5 mb-3 cursor-pointer text-[13.5px] last:mb-0 [&>input]:w-[17px] [&>input]:h-[17px] [&>input]:accent-aqua [&>input]:cursor-pointer">
          <input type="checkbox" checked={prefs.reducedMotion ?? false} onChange={(e) => onUpdatePrefs({ reducedMotion: e.target.checked })} />
          <span>Хөдөлгөөн багасгах (визуалайзер/анимаци эрчмийг бууруулна)</span>
        </label>

        <label className="flex items-center gap-2.5 mb-3 cursor-pointer text-[13.5px] last:mb-0 [&>input]:w-[17px] [&>input]:h-[17px] [&>input]:accent-aqua [&>input]:cursor-pointer">
          <input type="checkbox" checked={prefs.largeText ?? false} onChange={(e) => onUpdatePrefs({ largeText: e.target.checked })} />
          <span>Том фонт ашиглах</span>
        </label>
      </div>
    </>
  );
}
