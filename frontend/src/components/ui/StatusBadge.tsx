/* Нэгдсэн status/role badge — Admin/Therapist/Parent/Player дашбоардуудад тус тусдаа
   давхардаж бичигдсэн badge className-үүдийг (ROLE_BADGE_CLS, STATUS_CLS, inline ternary-ууд)
   нэг дор нэгтгэв. Өнгөний толь бичиг (aqua/warm/purple/rose/faint) хэвээр.

   Дүр төрхийн шинэчлэл: emoji-н оронд (жишээ нь "💎 PRO") нэмэлт `dot` prop-оор өнгөт
   статус-цэг зурна — шрифтээс хамааралгүй, дэлгэц/OS хооронд ижил харагдана. `dot` нь
   optional тул одоо байгаа бүх дуудагч өөрчлөлтгүй ажиллана. faint tone-ийн текстийг
   --faint → --dim болгож контрастыг AA хүртэл өсгөв (9.5px үсэгт --faint хэт бүдэг байв). */
export type StatusTone = "aqua" | "warm" | "purple" | "rose" | "faint";

const TONE_CLS: Record<StatusTone, string> = {
  aqua: "text-aqua border-aqua/30 bg-aqua/[.09]",
  warm: "text-warm border-warm/30 bg-warm/[.09]",
  purple: "text-purple border-purple/30 bg-purple/[.09]",
  rose: "text-rose border-rose/30 bg-rose/[.09]",
  faint: "text-dim border-white/[.11] bg-white/[.04]",
};

const DOT_CLS: Record<StatusTone, string> = {
  aqua: "bg-aqua shadow-[0_0_6px_rgba(56,232,206,.7)]",
  warm: "bg-warm shadow-[0_0_6px_rgba(217,165,76,.7)]",
  purple: "bg-purple shadow-[0_0_6px_rgba(180,156,255,.7)]",
  rose: "bg-rose shadow-[0_0_6px_rgba(240,140,165,.7)]",
  faint: "bg-faint",
};

export default function StatusBadge({
  label,
  tone,
  dot = false,
  className = "",
}: {
  label: string;
  tone: StatusTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 w-fit font-mono text-micro uppercase tracking-[.09em] leading-none rounded-full py-1.5 px-2.5 border whitespace-nowrap " +
        TONE_CLS[tone] +
        " " +
        className
      }
    >
      {dot && <span className={"w-[5px] h-[5px] rounded-full flex-none " + DOT_CLS[tone]} aria-hidden="true"></span>}
      {label}
    </span>
  );
}
