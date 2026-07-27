"use client";

/* TopBar.tsx-ийн мэдрэхүйн тохиргооны dropdown (.sp-dd.sp-settings) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { VIB_LEVELS, LIGHT_LEVELS } from "@/lib/player/constants";
import type { Prefs } from "@/components/player/Player";

export default function SettingsDropdown({
  open,
  prefs,
  updatePrefs,
  onToggle,
  onCalibrate,
}: {
  open: boolean;
  prefs: Prefs;
  updatePrefs: (patch: Partial<Prefs>) => void;
  onToggle: () => void;
  onCalibrate: () => void;
}) {
  return (
    <div className="sp-dd-wrap">
      <button
        className={"sp-icbtn" + (open ? " on" : "")}
        onClick={onToggle}
        aria-label="Мэдрэхүйн тохиргоо"
        aria-expanded={open}
        title="Мэдрэхүйн тохиргоо"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
        </svg>
      </button>
      {open && (
        <div className="sp-dd" role="dialog" aria-label="Мэдрэхүйн тохиргоо">
          <span className="mono">Мэдрэхүйн тохиргоо</span>

          <label className="sp-set-l">📳 Чичиргээний хүч</label>
          <div className="sp-seg">
            {VIB_LEVELS.map((v, i) => (
              <button key={v.label} className={prefs.vib === i ? "on" : ""} onClick={() => updatePrefs({ vib: i })}>
                {v.label}
              </button>
            ))}
          </div>

          <label className="sp-set-l">💡 Гэрлийн эрчим</label>
          <div className="sp-seg">
            {LIGHT_LEVELS.map((v, i) => (
              <button key={v.label} className={prefs.light === i ? "on" : ""} onClick={() => updatePrefs({ light: i })}>
                {v.label}
              </button>
            ))}
          </div>

          <label className="sp-set-l">🎚 Мэдрэх давтамжийн бүс</label>
          <div className="sp-bands">
            {(
              [
                ["bass", "Бас"],
                ["mid", "Дунд"],
                ["high", "Өндөр"],
              ] as [string, string][]
            ).map(([k, lbl]) => (
              <button
                key={k}
                className={prefs.bands[k] ? "on" : ""}
                onClick={() => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
                aria-pressed={prefs.bands[k]}
              >
                {prefs.bands[k] ? "✓ " : ""}
                {lbl}
              </button>
            ))}
          </div>

          <button className="sp-prof-btn" onClick={onCalibrate}>
            🎛 Калибровк дахин хийх
          </button>
          <p className="sp-set-note">Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана.</p>
        </div>
      )}
    </div>
  );
}
