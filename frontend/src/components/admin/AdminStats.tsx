"use client";

/* AdminPanel.tsx-ийн KPI блок — премиум dashboard KPI card (Stripe/Vercel Dashboard pattern)
   руу шинэчлэв: тод value, icon, тайлбар мөр. total/proCount props хэвээр, freeCount нэмэв
   (proCount-оос гарган авах боломжтой ч, UsersTable-ийн Grant/Remove PRO хийсний дараа
   шууд шинэчлэгдэж харагдахын тулд Total/PRO/Free гурвуулаа тодорхой харуулна). */
export default function AdminStats({ total, proCount }: { total: number; proCount: number }) {
  const freeCount = Math.max(0, total - proCount);
  return (
    <div className="grid grid-cols-3 max-[560px]:grid-cols-1 gap-3 my-5 mb-6">
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[.08] bg-white/[.03] transition-colors duration-200 hover:bg-white/[.05]">
        <span className="w-10 h-10 flex-none rounded-xl bg-aqua/[.1] text-aqua flex items-center justify-center" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <div className="min-w-0">
          <b className="block font-display text-[24px] leading-tight">{total}</b>
          <span className="mono !text-[9px]">Нийт бүртгэл</span>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[.08] bg-white/[.03] transition-colors duration-200 hover:bg-white/[.05]">
        <span className="w-10 h-10 flex-none rounded-xl bg-warm/[.1] text-warm flex items-center justify-center" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 2 3 6.6 7 .9-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9z" />
          </svg>
        </span>
        <div className="min-w-0">
          <b className="block font-display text-[24px] leading-tight">{proCount}</b>
          <span className="mono !text-[9px]">PRO захиалагч</span>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[.08] bg-white/[.03] transition-colors duration-200 hover:bg-white/[.05]">
        <span className="w-10 h-10 flex-none rounded-xl bg-white/[.06] text-faint flex items-center justify-center" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <div className="min-w-0">
          <b className="block font-display text-[24px] leading-tight">{freeCount}</b>
          <span className="mono !text-[9px]">Free хэрэглэгч</span>
        </div>
      </div>
    </div>
  );
}
