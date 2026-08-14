"use client";

/* AdminPanel.tsx-ийн ажилтан (уран бүтээлч/админ) бүртгэх форм — премиум form card (Stripe Dashboard
   pattern) руу шинэчлэв, .adm-form/.adm-form-row legacy CSS-ийг Tailwind болгож, input/select-
   ийг AdminPanel.tsx-ийн эцэг wrapper-ийн descendant selector-оос үл хамааран өөрөө бүрэн
   загварчилсан (parent-ийн [&_input] дүрмүүд мөн адил тохирсон хэвээр байгаа тул давхар
   зөрчилдөөн үүсэхгүй). Validation логик AdminPanel.tsx-д (submit handler) хэвээр — энд
   зөвхөн UI, ямар ч name attribute/талбарын бүтэц өөрчлөгдөөгүй. */
import { ActionButton } from "@/components/ui/ActionGroup";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-micro";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-copy p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function StaffCreationForm({
  newRole,
  setNewRole,
  createMsg,
  creating,
  onSubmit,
}: {
  newRole: "ARTIST" | "ADMIN";
  setNewRole: (r: "ARTIST" | "ADMIN") => void;
  createMsg: string;
  creating: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="flex flex-col gap-3.5 border border-white/[.08] rounded-2xl p-5 my-5 bg-white/[.02]" onSubmit={onSubmit}>
      <div>
        <b className="block font-display font-semibold text-lead text-ink">Ажилтан бүртгэх</b>
        <p className="text-dim text-note mt-0.5">Шинэ админ эсвэл уран бүтээлчийн эрх үүсгэнэ</p>
      </div>
      <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
        <label className={labelCls}>
          <span className={captionCls}>Нэр *</span>
          <input className={inputCls} name="name" type="text" placeholder="ж: Б.Оюунаа" />
        </label>
        <label className={labelCls}>
          <span className={captionCls}>Имэйл *</span>
          <input className={inputCls} name="email" type="email" placeholder="name@example.com" />
        </label>
      </div>
      <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
        <label className={labelCls}>
          <span className={captionCls}>Нууц үг *</span>
          <input className={inputCls} name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
        </label>
        <label className={labelCls}>
          <span className={captionCls}>Эрх</span>
          <select
            className={inputCls}
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as "ARTIST" | "ADMIN")}
          >
            <option className="bg-surface text-ink" value="ARTIST">Уран бүтээлч</option>
            <option className="bg-surface text-ink" value="ADMIN">Админ</option>
          </select>
        </label>
      </div>
      {createMsg && (
        <p className={"text-body " + (createMsg.startsWith("✅") ? "text-aqua" : "text-danger")} role="status">
          {createMsg}
        </p>
      )}
      <ActionButton type="submit" variant="primary" className="w-fit" disabled={creating}>
        {creating ? "Бүртгэж байна…" : "+ Ажилтан бүртгэх"}
      </ActionButton>
    </form>
  );
}
