"use client";

/* ProfileView.tsx-ийн "Нууц үг солих" форм — премиум security card (Apple ID/Google Account
   pattern) руу шинэчлэв. Validation логик ProfileView.tsx-ийн changePass()-д хэвээр үлдэнэ —
   энд зөвхөн UI, ямар ч state/callback шинэчлэгдээгүй. */
import { ActionButton } from "@/components/ui/ActionGroup";

const fieldLabelCls = "block text-note font-medium text-dim mb-1.5";
const inputCls =
  "w-full p-[12px_14px] rounded-lg bg-white/[.04] border border-white/[.08] text-ink text-copy font-[inherit] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function SecuritySettings({
  oldPass,
  setOldPass,
  newPass,
  setNewPass,
  newPass2,
  setNewPass2,
  saving,
  onSubmit,
}: {
  oldPass: string;
  setOldPass: (v: string) => void;
  newPass: string;
  setNewPass: (v: string) => void;
  newPass2: string;
  setNewPass2: (v: string) => void;
  saving?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      className="bg-white/[.03] border border-white/[.07] rounded-2xl p-6 mb-5 transition-[border-color,box-shadow] duration-250 hover:border-white/[.14]"
      onSubmit={onSubmit}
    >
      <h3 className="font-display font-semibold text-title tracking-[-.02em] text-ink mb-1">Аюулгүй байдал</h3>
      <p className="text-dim text-body leading-[1.5] mb-5">Нууц үгээ тогтмол шинэчилж бүртгэлээ хамгаалаарай</p>

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
      <ActionButton type="submit" variant="secondary" className="w-fit" disabled={saving}>
        {saving ? "Солиж байна…" : "Нууц үг солих"}
      </ActionButton>
    </form>
  );
}
