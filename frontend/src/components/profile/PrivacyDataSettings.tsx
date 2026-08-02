"use client";

/* GDPR: "Миний мэдээлэл татах" + "Бүртгэл устгах" — Нууцлалын бодлого §5-д амласан
   эрхийг бодитоор хэрэгжүүлнэ (backend: GET /users/me/export, DELETE /users/me).
   SecuritySettings.tsx-тэй ижил card-загвар ашиглав. */
import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";

const fieldLabelCls = "block text-note font-medium text-dim mb-1.5";
const inputCls =
  "w-full p-[12px_14px] rounded-lg bg-white/[.04] border border-white/[.08] text-ink text-copy font-[inherit] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function PrivacyDataSettings({
  onExport,
  onDeleteAccount,
}: {
  onExport: () => Promise<void>;
  onDeleteAccount: (password: string) => Promise<void>;
}) {
  const [exporting, setExporting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deletePass, setDeletePass] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      await onExport();
    } finally {
      setExporting(false);
    }
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);
    try {
      await onDeleteAccount(deletePass);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white/[.03] border border-white/[.07] rounded-2xl p-6 mb-5 transition-[border-color,box-shadow] duration-250 hover:border-white/[.14]">
      <h3 className="font-display font-semibold text-title tracking-[-.02em] text-ink mb-1">Миний мэдээлэл</h3>
      <p className="text-dim text-body leading-[1.5] mb-5">
        Таны хувийн мэдээллийг хянах эрх (см. Нууцлалын бодлого) — бүх мэдээллээ татах эсвэл бүртгэлээ бүрэн устгах.
      </p>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-5 pb-5 border-b border-white/[.06]">
        <div className="min-w-0">
          <b className="block text-copy font-semibold text-ink">Бүх мэдээллээ татах</b>
          <span className="block text-note text-dim">Профайл, захиалга, сонссон түүх зэрэг бүх өгөгдлийг JSON файлаар татна.</span>
        </div>
        <ActionButton type="button" variant="secondary" onClick={handleExport} disabled={exporting} className="flex-none">
          {exporting ? "Бэлдэж байна…" : "Татах"}
        </ActionButton>
      </div>

      {!confirming ? (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <b className="block text-copy font-semibold text-ink">Бүртгэл устгах</b>
            <span className="block text-note text-dim">Энэ үйлдлийг буцаах боломжгүй — бүх мэдээлэл бүрмөсөн устана.</span>
          </div>
          <ActionButton type="button" variant="danger" onClick={() => setConfirming(true)} className="flex-none">
            Бүртгэл устгах
          </ActionButton>
        </div>
      ) : (
        <form onSubmit={handleDelete}>
          <b className="block text-copy font-semibold text-ink mb-1">Устгахыг баталгаажуулна уу</b>
          <p className="text-note text-dim mb-3">Энэ үйлдэл БУЦААГДАХГҮЙ. Баталгаажуулахын тулд нууц үгээ оруулна уу.</p>
          <label className="block mb-4">
            <span className={fieldLabelCls}>Нууц үг</span>
            <input
              className={inputCls}
              type="password"
              value={deletePass}
              onChange={(e) => setDeletePass(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <div className="flex items-center gap-2.5">
            <ActionButton type="submit" variant="danger" disabled={deleting || deletePass.length === 0}>
              {deleting ? "Устгаж байна…" : "Бүрмөсөн устгах"}
            </ActionButton>
            <ActionButton type="button" variant="ghost" onClick={() => { setConfirming(false); setDeletePass(""); }} disabled={deleting}>
              Цуцлах
            </ActionButton>
          </div>
        </form>
      )}
    </div>
  );
}
