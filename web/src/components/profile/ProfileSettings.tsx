"use client";

/* ProfileView.tsx-ийн "Үндсэн мэдээлэл" форм (нэр/имэйл/өнгө/сонсголын байдал) — тусад нь
   гаргасан. Validation логик ProfileView.tsx-ийн saveProfile()-д хэвээр үлдэнэ — энд зөвхөн UI.
   CSS/behavior бүгд өөрчлөгдөөгүй. */
const COLORS = ["#38E8CE", "#D9A54C", "#D98FA8", "#9FB6E8", "#7FD8E8", "#B5E88F"];
const HEARING = [
  { v: "deaf", label: "Сонсголгүй" },
  { v: "hoh", label: "Сул сонсголтой" },
  { v: "hearing", label: "Сонсголтой" },
  { v: "", label: "Хэлэхгүй" },
];

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
      className="bg-white/[.03] border border-line rounded-lg p-5 mb-[18px] transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm"
      onSubmit={onSubmit}
    >
      <h3 className="st-h" style={{ marginTop: 0 }}>
        Үндсэн мэдээлэл
      </h3>

      <label className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Нэр</span>
        <input
          className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:cursor-not-allowed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Таны нэр"
        />
      </label>

      <label className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Имэйл (өөрчлөх боломжгүй)</span>
        <input
          className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-50 disabled:cursor-not-allowed"
          value={email || ""}
          disabled
        />
      </label>

      <div className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Аватар өнгө</span>
        <div className="flex gap-2.5">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              className={"w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform duration-150 " + (color === c ? "border-white scale-[1.12]" : "border-transparent")}
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={"Өнгө " + c}
              aria-pressed={color === c}
            />
          ))}
        </div>
      </div>

      <div className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Сонсголын байдал (нууц — тохиргоог сайжруулахад)</span>
        <div className="sp-seg flex-wrap">
          {HEARING.map((h) => (
            <button type="button" key={h.v} className={hearing === h.v ? "on" : ""} onClick={() => setHearing(h.v)}>
              {h.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="bt bt-a">
        Хадгалах
      </button>
    </form>
  );
}

export { COLORS };
