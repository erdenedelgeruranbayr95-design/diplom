"use client";

/* ProfileView.tsx-ийн "Үндсэн мэдээлэл" форм (нэр/имэйл/өнгө/сонсголын байдал) — премиум
   settings-card (Notion/Linear preferences pattern) руу шинэчлэв, .sp-seg legacy CSS-ийг
   Tailwind segmented control болгов. Validation логик ProfileView.tsx-ийн saveProfile()-д
   хэвээр үлдэнэ — энд зөвхөн UI, ямар ч state/callback шинэчлэгдээгүй. */
const COLORS = ["#38E8CE", "#D9A54C", "#D98FA8", "#9FB6E8", "#7FD8E8", "#B5E88F"];
const HEARING = [
  { v: "deaf", label: "Сонсголгүй" },
  { v: "hoh", label: "Сул сонсголтой" },
  { v: "hearing", label: "Сонсголтой" },
  { v: "", label: "Хэлэхгүй" },
];

const fieldLabelCls = "block text-[12px] font-medium text-dim mb-1.5";
const inputCls =
  "w-full p-[12px_14px] rounded-lg bg-white/[.04] border border-white/[.08] text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-faint";

export default function ProfileSettings({
  name,
  setName,
  email,
  color,
  setColor,
  hearing,
  setHearing,
  onSubmit,
}: {
  name: string;
  setName: (v: string) => void;
  email: string;
  color: string;
  setColor: (v: string) => void;
  hearing: string;
  setHearing: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      className="bg-white/[.03] border border-white/[.07] rounded-2xl p-6 mb-5 transition-[border-color,box-shadow] duration-250 hover:border-white/[.14]"
      onSubmit={onSubmit}
    >
      <h3 className="font-display font-semibold text-[17px] tracking-[-.02em] text-ink mb-1">Үндсэн мэдээлэл</h3>
      <p className="text-dim text-[13px] leading-[1.5] mb-5">Нэр болон профайлын үзэмжийг тохируулна</p>

      <label className="block mb-4">
        <span className={fieldLabelCls}>Нэр</span>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Таны нэр" />
      </label>

      <label className="block mb-4">
        <span className={fieldLabelCls}>Имэйл (өөрчлөх боломжгүй)</span>
        <input className={inputCls} value={email || ""} disabled />
      </label>

      <div className="block mb-4">
        <span className={fieldLabelCls}>Аватар өнгө</span>
        <div className="flex gap-2.5" role="group" aria-label="Аватар өнгө сонгох">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              className={
                "w-8 h-8 rounded-full border-2 cursor-pointer transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50 " +
                (color === c ? "border-white scale-[1.12]" : "border-transparent hover:scale-105")
              }
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={"Өнгө " + c}
              aria-pressed={color === c}
            />
          ))}
        </div>
      </div>

      <div className="block mb-5">
        <span className={fieldLabelCls}>Сонсголын байдал (нууц — тохиргоог сайжруулахад)</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Сонсголын байдал">
          {HEARING.map((h) => (
            <button
              type="button"
              key={h.v}
              className={
                "py-2 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (hearing === h.v ? "bg-aqua text-[#04100E] border-aqua font-semibold" : "text-dim border-white/[.08] hover:border-white/20 hover:text-ink")
              }
              onClick={() => setHearing(h.v)}
              aria-pressed={hearing === h.v}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-2.5 px-6 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      >
        Хадгалах
      </button>
    </form>
  );
}

export { COLORS };
