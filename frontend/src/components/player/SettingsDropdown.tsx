"use client";

/* TopBar-ийн мэдрэхүйн тохиргооны dropdown — премиум dropdown каркас (DropdownPanel) руу
   шинэчлэв. State/props/updatePrefs логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { VIB_LEVELS, LIGHT_LEVELS } from "@/lib/player/constants";
import type { Prefs } from "@/types/player";
import DropdownPanel from "@/components/ui/DropdownPanel";
import Icon from "@/components/ui/Icon";

/* Хэсгийн гарчиг — emoji-ийн оронд нэгдсэн icon, бүгд ижил зузаан/өнгөтэй */
function FieldLabel({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-body text-ink font-medium mt-2 px-2">
      <span className="text-aqua flex" aria-hidden="true">
        <Icon name={icon} size={14} />
      </span>
      {children}
    </label>
  );
}

const segBtnCls =
  "py-2.5 px-1 text-note font-medium text-dim bg-surface-2 transition-colors duration-150 first:rounded-l-chip last:rounded-r-chip focus-visible:outline-none focus-visible:relative focus-visible:z-[1] focus-visible:shadow-glow-aqua";
const segBtnOnCls = "bg-aqua text-on-aqua font-semibold";

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
        <Icon name="settings" size={19} />
      </button>
      {open && (
        <DropdownPanel label="Мэдрэхүйн тохиргоо" width={300} onClose={onToggle}>
          <span className="mono !text-meta px-2 pt-1 pb-2">Мэдрэхүйн тохиргоо</span>

          <FieldLabel icon="vibrate">Чичиргээний хүч</FieldLabel>
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-chip overflow-hidden mx-2 mb-1" role="group" aria-label="Чичиргээний хүч">
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

          <FieldLabel icon="bulb">Гэрлийн эрчим</FieldLabel>
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-chip overflow-hidden mx-2 mb-1" role="group" aria-label="Гэрлийн эрчим">
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

          <FieldLabel icon="sliders">Мэдрэх давтамжийн бүс</FieldLabel>
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
                  "inline-flex items-center justify-center gap-1.5 py-2.5 px-1 text-note text-dim border border-line rounded-lg transition-colors duration-150 " +
                  (prefs.bands[k] ? "text-aqua border-aqua/50 bg-aqua/[.07]" : "hover:border-white/20 hover:text-ink")
                }
                onClick={() => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
                aria-pressed={prefs.bands[k]}
              >
                {prefs.bands[k] && <Icon name="check" size={12} strokeWidth={2.4} />}
                {lbl}
              </button>
            ))}
          </div>

          <button
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-body font-medium border border-line text-ink transition-colors duration-150 hover:bg-white/[.06] hover:border-white/[.2] focus-visible:outline-none focus-visible:shadow-glow-aqua mt-2"
            onClick={onCalibrate}
          >
            <Icon name="sliders" size={15} />
            Калибровк дахин хийх
          </button>
          <p className="text-caption text-faint leading-[1.5] px-2 pt-1 pb-0.5">Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана.</p>
        </DropdownPanel>
      )}
    </div>
  );
}
