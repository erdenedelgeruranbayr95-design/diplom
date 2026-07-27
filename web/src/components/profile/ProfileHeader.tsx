"use client";

/* ProfileView.tsx-ийн аватар/нэр/эрхийн блок (.pv-top) — тусад нь гаргасан. Энэ файлын цорын
   ганц "header" шинжтэй бодит агуулга (BackBar-аас гадна) тул тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй. */
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
    <div className="flex items-center gap-4 my-1.5 mb-[22px]">
      <span
        className="w-[50px] h-[50px] flex-none rounded-full flex items-center justify-center font-display font-bold text-lg transition-[box-shadow,transform] duration-250"
        style={{ background: color, color: "#04100E" }}
        aria-hidden="true"
      >
        {initial}
      </span>
      <div>
        <b className="block font-display font-normal text-[19px] text-ink">{name || "—"}</b>
        <i className="block not-italic text-dim text-[13px] mt-0.5">{email}</i>
        <span className="inline-block mt-[7px] py-[3px] px-2.5 rounded-full font-mono text-[10px] tracking-[.1em] uppercase text-aqua border border-[rgba(56,232,206,.3)]">
          {roleLabel}
        </span>
      </div>
    </div>
  );
}
