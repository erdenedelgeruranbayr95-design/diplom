/* Нэгдсэн status/role badge — Admin/Therapist/Parent/Player дашбоардуудад тус тусдаа
   давхардаж бичигдсэн badge className-үүдийг (ROLE_BADGE_CLS, STATUS_CLS, inline ternary-ууд)
   нэг дор нэгтгэв. Өмнөх бүх дуудагч сайтын өнгөний толь бичгийг яг хэвээр нь (aqua/warm/
   purple/faint) ашигласан тул визуал өөрчлөлтгүй — зөвхөн давхардал хассан. */
export type StatusTone = "aqua" | "warm" | "purple" | "rose" | "faint";

const TONE_CLS: Record<StatusTone, string> = {
  aqua: "text-aqua border-aqua/30 bg-aqua/[.08]",
  warm: "text-warm border-warm/30 bg-warm/[.08]",
  purple: "text-purple border-purple/30 bg-purple/[.08]",
  rose: "text-rose border-rose/30 bg-rose/[.08]",
  faint: "text-faint border-white/[.1] bg-white/[.03]",
};

export default function StatusBadge({
  label,
  tone,
  className = "",
}: {
  label: string;
  tone: StatusTone;
  className?: string;
}) {
  return (
    <span className={"w-fit font-mono text-[9.5px] uppercase tracking-[.06em] rounded-full py-1 px-2.5 border whitespace-nowrap " + TONE_CLS[tone] + " " + className}>
      {label}
    </span>
  );
}
