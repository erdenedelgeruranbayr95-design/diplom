import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

/* Дахин ашиглагдах KPI карт — Admin/Therapist/Parent/Progress/Achievements бүх дашбоардад
   нийтлэг ашиглагддаг. Премиум KPI card (Stripe/Vercel Dashboard pattern) руу шинэчлэв:
   .st-ico legacy classname-ийг Tailwind болгож, өнгөний mapping-ийг өөрийн компонент дотор
   бүрэн шийдэв (өмнө нь "st-ico " + color гэсэн 2 CSS класс зэрэг тавигдаж, source order-ийн
   улмаас зарим өнгө (жишээ нь gold) харагдахгүй байсан bug-ийг үүгээр шийдвэрлэв — энэ бол
   зөвхөн визуал засвар, prop signature (icon/color/value/label) огт өөрчлөгдөөгүй тул бүх
   дуудагч файл өөрчлөлтгүйгээр ажиллана).

   Дүр төрхийн шинэчлэл (зөвхөн CSS-класс, ямар ч prop/логик хөндөөгүй):
     · бүдгэрсэн outer glow → тод, цэвэрхэн inset hairline ring (icon tile-ийн хүрээ)
     · нэрийн (label) truncate → 2 мөр хүртэл эвлүүлж бүтнээр харуулна ("PRO ЗАХИАЛ…"
       гэж тасарч байсныг зассан), картуудын өндөр min-h-ээр тэгшилнэ
     · тоон утга tabular-nums — багана хооронд цифр яг нэг шугамд эгнэнэ
     · дээд талын нимгэн highlight + илүү зөөлөн hover (transform/shadow) */
const COLOR_CLS: Record<string, string> = {
  "c-aqua": "text-aqua bg-aqua/[.10] shadow-[inset_0_0_0_1px_rgba(56,232,206,.22)]",
  "c-gold": "text-warm bg-warm/[.10] shadow-[inset_0_0_0_1px_rgba(217,165,76,.24)]",
  "c-purple": "text-purple bg-purple/[.11] shadow-[inset_0_0_0_1px_rgba(180,156,255,.24)]",
  "c-rose": "text-rose bg-rose/[.10] shadow-[inset_0_0_0_1px_rgba(240,140,165,.24)]",
};

export default function StatCard({
  icon,
  color,
  value,
  label,
}: {
  /* Хоёр хэлбэр дэмжинэ:
       · ICONS.*-ийн SVG path fragment (ReactNode) — dashboard-ууд ингэж дууддаг
       · Icon.tsx-ийн icon нэр (string)          — админ самбар ингэж дууддаг
     Ингэснээр ProManagementPanel-д давхардаж бичигдсэн локал StatCard хэрэггүй болов. */
  icon: ReactNode | string;
  color: string;
  value: ReactNode;
  label: string;
}) {
  const colorCls = COLOR_CLS[color] || "text-[#9FB0AC] bg-white/[.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]";
  return (
    <div className="group flex flex-row items-center gap-4 min-h-[88px] py-4 px-5 rounded-2xl border border-white/[.07] [background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[3px] hover:border-white/[.14] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.07),0_10px_28px_-8px_rgba(0,0,0,.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span
        className={"w-[42px] h-[42px] flex-none rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100 " + colorCls}
        aria-hidden="true"
      >
        {typeof icon === "string" ? (
          <Icon name={icon} size={21} />
        ) : (
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        )}
      </span>
      <span className="flex flex-col gap-1 min-w-0">
        <b className="font-display font-bold text-[clamp(19px,2vw,25px)] leading-[1.1] tracking-[-.03em] tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </b>
        <span className="font-mono text-meta uppercase tracking-[.18em] leading-[1.4] text-dim">{label}</span>
      </span>
    </div>
  );
}
