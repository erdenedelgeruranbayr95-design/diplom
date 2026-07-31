"use client";

/* ProfileView.tsx-ийн "Харагдац" + "Мэдрэх горим — үндсэн тохиргоо" + "Мэдэгдэл ба хандалт"
   гурван карт — премиум preferences dashboard (Linear/Notion settings pattern) руу шинэчлэв:
   .sp-seg legacy CSS-ийг Tailwind segmented control, plain checkbox-уудыг modern toggle
   switch болгов. onUpdatePrefs дуудлага бүхэлдээ хэвээр (аль ч patch shape өөрчлөгдөөгүй) —
   зөвхөн визуал давхарга шинэчлэгдсэн. */
import SectionCard from "@/components/ui/SectionCard";
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

const fieldLabelCls = "block text-note font-medium text-dim mb-1.5";

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap,
}: {
  options: { v: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
  wrap?: boolean;
}) {
  return (
    <div className={"flex gap-1.5 " + (wrap ? "flex-wrap" : "")} role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          type="button"
          key={o.v}
          className={
            "py-2 px-3.5 rounded-full text-note font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
            (value === o.v ? "bg-aqua text-on-aqua border-aqua font-semibold" : "text-dim border-white/[.08] hover:border-white/20 hover:text-ink")
          }
          onClick={() => onChange(o.v)}
          aria-pressed={value === o.v}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    /* min-h-11: хүрэлцэх төхөөрөмж дээрх 44px hit-target (WCAG 2.5.8) */
    <label className="flex items-center justify-between gap-4 py-2.5 min-h-11 cursor-pointer">
      <span>
        <span className="block text-body text-ink">{label}</span>
        {hint && <span className="block text-caption text-faint mt-0.5">{hint}</span>}
      </span>
      <span className="relative flex-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className="block w-11 h-6 rounded-full bg-white/[.12] transition-colors duration-200 peer-checked:bg-aqua peer-focus-visible:outline-none peer-focus-visible:shadow-glow-aqua"
          aria-hidden="true"
        ></span>
        <span
          className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.3)] transition-transform duration-200 peer-checked:translate-x-5"
          aria-hidden="true"
        ></span>
      </span>
    </label>
  );
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
      {/* ⛔ «Загвар (Theme)» ба «Хэл (Language)» шилжүүлэгчийг ЗОРИУДААР ХАССАН.
             Хоёулаа утгаа localStorage-д хадгалдаг ч апп-д ямар ч нөлөө үзүүлдэггүй
             байсан — хэрэглэгч дарж, "хадгалагдлаа" гэж ойлгоод, юу ч болдоггүй.

             · Theme: бүх өнгө (300+ `bg-white/[.0x]`, gradient, rgba) харанхуй суурьт
               зориулж бичигдсэн. Цайвар хувилбар нь дизайныг дахин зохиох ажил.
             · Language: 1000 орчим мөр текст компонент дотор шууд бичигдсэн; i18n
               сан/каталог байхгүй.

             Prefs дэх `theme`/`language` талбарууд болон хадгалагдсан утгууд ХЭВЭЭР —
             зөвхөн UI-аас нуугдсан тул buttons буцаах үед өгөгдөл алдагдахгүй.
             Хэрэгжүүлсний дараа энэ блокийг эргүүлэн нээнэ. */}

      <SectionCard title="Мэдрэх горим — үндсэн тохиргоо" description="Чичиргээ, гэрэл, визуалайзерын үндсэн тохиргоо" className="mb-5">
        <div className="block mb-4">
          <span className={fieldLabelCls}>Чичиргээний хүч</span>
          <Segmented
            ariaLabel="Чичиргээний хүч"
            value={prefs.vib}
            onChange={(v) => onUpdatePrefs({ vib: v })}
            options={VIB_LEVELS.map((v, i) => ({ v: i, label: v.label }))}
          />
        </div>

        <div className="block mb-4">
          <span className={fieldLabelCls}>Гэрлийн эрч</span>
          <Segmented
            ariaLabel="Гэрлийн эрч"
            value={prefs.light}
            onChange={(v) => onUpdatePrefs({ light: v })}
            options={LIGHT_LEVELS.map((v, i) => ({ v: i, label: v.label }))}
          />
        </div>

        <div className="block mb-5">
          <span className={fieldLabelCls}>Визуалайзерийн үндсэн горим</span>
          <Segmented ariaLabel="Визуалайзерийн үндсэн горим" wrap value={viz.mode} onChange={(v) => onUpdatePrefs({ viz: { ...viz, mode: v } })} options={VIZ_MODES} />
        </div>

        <ToggleRow checked={viz.particles} onChange={(v) => onUpdatePrefs({ viz: { ...viz, particles: v } })} label="Тоосонцор эффект идэвхжүүлэх" />
      </SectionCard>

      <SectionCard title="Мэдэгдэл ба хандалт" description="Мэдэгдэл болон хандалтын тохиргоо">
        <div className="flex flex-col divide-y divide-white/[.06]">
          <ToggleRow
            checked={prefs.notifyFeed ?? true}
            onChange={(v) => onUpdatePrefs({ notifyFeed: v })}
            label="Зарлал/мэдэгдэл хүлээн авах"
            hint="Унтраавал хонхны мэдэгдэл харагдахгүй (хуучин мэдэгдэл устахгүй)"
          />
          <ToggleRow
            checked={prefs.reducedMotion ?? false}
            onChange={(v) => onUpdatePrefs({ reducedMotion: v })}
            label="Хөдөлгөөн багасгах"
            hint="Визуалайзерын гэрэлтэлт/тоосонцор, интерфейсийн анимацийг зогсооно"
          />
          <ToggleRow
            checked={prefs.largeText ?? false}
            onChange={(v) => onUpdatePrefs({ largeText: v })}
            label="Том фонт ашиглах"
            hint="Бүх бичвэрийг 15%-иар томруулна"
          />
        </div>
      </SectionCard>
    </>
  );
}
