"use client";

/* ProfileView.tsx-ийн "Нууц үг солих" форм — премиум security card (Apple ID/Google Account
   pattern) руу шинэчлэв. Validation логик ProfileView.tsx-ийн changePass()-д хэвээр үлдэнэ —
   энд зөвхөн UI, ямар ч state/callback шинэчлэгдээгүй. */
const fieldLabelCls = "block text-[12px] font-medium text-dim mb-1.5";
const inputCls =
  "w-full p-[12px_14px] rounded-lg bg-white/[.04] border border-white/[.08] text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function SecuritySettings({
  oldPass,
  setOldPass,
  newPass,
  setNewPass,
  newPass2,
  setNewPass2,
  onSubmit,
}: {
  oldPass: string;
  setOldPass: (v: string) => void;
  newPass: string;
  setNewPass: (v: string) => void;
  newPass2: string;
  setNewPass2: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      className="bg-white/[.03] border border-white/[.07] rounded-2xl p-6 mb-5 transition-[border-color,box-shadow] duration-250 hover:border-white/[.14]"
      onSubmit={onSubmit}
    >
      <h3 className="font-display font-semibold text-[17px] tracking-[-.02em] text-ink mb-1">Аюулгүй байдал</h3>
      <p className="text-dim text-[13px] leading-[1.5] mb-5">Нууц үгээ тогтмол шинэчилж бүртгэлээ хамгаалаарай</p>

      <label className="block mb-4">
        <span className={fieldLabelCls}>Одоогийн нууц үг</span>
        <input
          className={inputCls}
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>
      <label className="block mb-4">
        <span className={fieldLabelCls}>Шинэ нууц үг</span>
        <input
          className={inputCls}
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>
      <label className="block mb-5">
        <span className={fieldLabelCls}>Шинэ нууц үг давтах</span>
        <input
          className={inputCls}
          type="password"
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>
      <button
        type="submit"
        className="rounded-full text-[13.5px] font-semibold border border-white/[.14] text-ink py-2.5 px-6 transition-colors duration-200 hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      >
        Нууц үг солих
      </button>
    </form>
  );
}
