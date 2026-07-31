"use client";

/* ProfileView.tsx-ийн аватар/нэр/эрхийн блок — премиум account-center header (Apple ID/
   Google Account pattern) руу шинэчлэв: илүү том avatar, тодорхой hierarchy, badge-styled
   эрхийн шошго. initial/color/name/email/roleLabel props бүгд хэвээр — зөвхөн визуал
   давхарга шинэчлэгдсэн. */
export default function ProfileHeader({
  initial,
  color,
  name,
  email,
  roleLabel,
}: {
  initial: string;
  color: string;
  name: string;
  email: string;
  roleLabel: string;
}) {
  return (
    <div className="flex items-center gap-5 mb-8 p-5 rounded-2xl border border-white/[.07] bg-white/[.02] max-nav:flex-col max-nav:items-start max-nav:text-center max-nav:[&>span]:mx-auto">
      <span
        className="w-16 h-16 flex-none rounded-full flex items-center justify-center font-display font-bold text-2xl shadow-[0_8px_22px_rgba(0,0,0,.35)]"
        style={{ background: color, color: "#04100E" }}
        aria-hidden="true"
      >
        {initial}
      </span>
      <div className="min-w-0">
        <b className="block font-display font-semibold text-[21px] text-ink tracking-[-.02em]">{name || "—"}</b>
        <i className="block not-italic text-dim text-body mt-1 break-all">{email}</i>
        <span className="inline-flex items-center mt-2.5 py-1 px-3 rounded-full font-mono text-meta tracking-[.1em] uppercase text-aqua border border-aqua/30 bg-aqua/[.06]">
          {roleLabel}
        </span>
      </div>
    </div>
  );
}
