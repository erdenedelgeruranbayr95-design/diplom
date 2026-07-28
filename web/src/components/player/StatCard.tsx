import type { ReactNode } from "react";

/* Дахин ашиглагдах KPI карт — Admin/Therapist/Parent/Progress/Achievements бүх дашбоардад
   нийтлэг ашиглагддаг. Премиум KPI card (Stripe/Vercel Dashboard pattern) руу шинэчлэв:
   .st-ico legacy classname-ийг Tailwind болгож, өнгөний mapping-ийг өөрийн компонент дотор
   бүрэн шийдэв (өмнө нь "st-ico " + color гэсэн 2 CSS класс зэрэг тавигдаж, source order-ийн
   улмаас зарим өнгө (жишээ нь gold) харагдахгүй байсан bug-ийг үүгээр шийдвэрлэв — энэ бол
   зөвхөн визуал засвар, prop signature (icon/color/value/label) огт өөрчлөгдөөгүй тул бүх
   дуудагч файл өөрчлөлтгүйгээр ажиллана). */
const COLOR_CLS: Record<string, string> = {
  "c-aqua": "text-aqua bg-aqua/[.12] shadow-[0_0_24px_rgba(56,232,206,.1)]",
  "c-gold": "text-warm bg-warm/[.13] shadow-[0_0_24px_rgba(217,165,76,.1)]",
  "c-purple": "text-purple bg-purple/[.14] shadow-[0_0_24px_rgba(140,110,255,.12)]",
  "c-rose": "text-rose bg-rose/[.13] shadow-[0_0_24px_rgba(232,90,120,.1)]",
};

export default function StatCard({
  icon,
  color,
  value,
  label,
}: {
  icon: ReactNode;
  color: string;
  value: ReactNode;
  label: string;
}) {
  const colorCls = COLOR_CLS[color] || "text-[#9FB0AC] bg-white/5";
  return (
    <div className="flex flex-row items-center gap-4 p-5 rounded-2xl bg-white/[.03] border border-white/[.08] transition-[transform,border-color,box-shadow] duration-[350ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[3px] hover:border-white/[.16] hover:shadow-sm hover:bg-white/[.05]">
      <span className={"w-11 h-11 flex-none rounded-xl flex items-center justify-center " + colorCls} aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <b className="text-[clamp(17px,1.8vw,22px)] leading-[1.15] whitespace-nowrap overflow-hidden text-ellipsis">{value}</b>
        <span className="mono !text-[9px] !tracking-[.18em]">{label}</span>
      </span>
    </div>
  );
}
