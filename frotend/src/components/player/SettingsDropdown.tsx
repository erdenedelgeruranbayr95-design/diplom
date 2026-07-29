"use client";

/* TopBar-ийн мэдрэхүйн тохиргооны dropdown — премиум dropdown каркас (DropdownPanel) руу
   шинэчлэв. State/props/updatePrefs логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { VIB_LEVELS, LIGHT_LEVELS } from "@/lib/player/constants";
import type { Prefs } from "@/components/providers/PlayerProvider";
import DropdownPanel from "@/components/ui/DropdownPanel";

const segBtnCls =
  "py-2.5 px-1 text-[12.5px] font-medium text-dim bg-[#101817] transition-colors duration-150 first:rounded-l-[9px] last:rounded-r-[9px] focus-visible:outline-none focus-visible:relative focus-visible:z-[1] focus-visible:shadow-glow-aqua";
const segBtnOnCls = "bg-aqua text-[#04100E] font-semibold";

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
    <div className="relative">
      <button
        className={
          "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (open ? "text-aqua bg-aqua/[.12]" : "text-dim bg-white/[.05] hover:text-ink hover:bg-white/[.1]")
        }
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
        <DropdownPanel label="Мэдрэхүйн тохиргоо" width={300}>
          <span className="mono !text-[10px] px-2 pt-1 pb-2">Мэдрэхүйн тохиргоо</span>

          <label className="text-[13px] text-ink font-medium mt-1 px-2">📳 Чичиргээний хүч</label>
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-[9px] overflow-hidden mx-2 mb-1" role="group" aria-label="Чичиргээний хүч">
            {VIB_LEVELS.map((v, i) => (
              <button
                key={v.label}
                className={segBtnCls + (prefs.vib === i ? " " + segBtnOnCls : "")}
                onClick={() => updatePrefs({ vib: i })}
                aria-pressed={prefs.vib === i}
              >
                {v.label}
              </button>
            ))}
          </div>

          <label className="text-[13px] text-ink font-medium mt-1 px-2">💡 Гэрлийн эрчим</label>
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-[9px] overflow-hidden mx-2 mb-1" role="group" aria-label="Гэрлийн эрчим">
            {LIGHT_LEVELS.map((v, i) => (
              <button
                key={v.label}
                className={segBtnCls + (prefs.light === i ? " " + segBtnOnCls : "")}
                onClick={() => updatePrefs({ light: i })}
                aria-pressed={prefs.light === i}
              >
                {v.label}
              </button>
            ))}
          </div>

          <label className="text-[13px] text-ink font-medium mt-1 px-2">🎚 Мэдрэх давтамжийн бүс</label>
          <div className="grid grid-cols-3 gap-1.5 mx-2 mb-1" role="group" aria-label="Мэдрэх давтамжийн бүс">
            {(
              [
                ["bass", "Бас"],
                ["mid", "Дунд"],
                ["high", "Өндөр"],
              ] as [string, string][]
            ).map(([k, lbl]) => (
              <button
                key={k}
                className={
                  "py-2.5 px-1 text-[12.5px] text-dim border border-line rounded-lg transition-colors duration-150 " +
                  (prefs.bands[k] ? "text-aqua border-aqua/50 bg-aqua/[.07]" : "hover:border-white/20 hover:text-ink")
                }
                onClick={() => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
                aria-pressed={prefs.bands[k]}
              >
                {prefs.bands[k] ? "✓ " : ""}
                {lbl}
              </button>
            ))}
          </div>

          <button
            className="w-full text-center py-2.5 rounded-lg text-[13.5px] font-medium border border-line text-ink transition-colors duration-150 hover:bg-white/[.06] mt-1"
            onClick={onCalibrate}
          >
            🎛 Калибровк дахин хийх
          </button>
          <p className="text-[11.5px] text-faint leading-[1.5] px-2 pt-1 pb-0.5">Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана.</p>
        </DropdownPanel>
      )}
    </div>
  );
}
