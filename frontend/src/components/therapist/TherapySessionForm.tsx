"use client";

/* TherapistView.tsx-ийн шинэ эмчилгээний сесс үүсгэх форм — нэгдсэн SectionCard primitive
   ашиглав (Vercel Dashboard pattern). Эх кодод input-ууд ямар ч classname-гүй (browser
   default загвартай) байсан тул энд бодит Tailwind загвар анх удаа нэмэв — энэ бол зөвхөн
   визуал сайжруулалт, notes/scheduledAt/saving/onSubmit state/callback огт өөрчлөгдөөгүй. */
import SectionCard from "@/components/ui/SectionCard";
import { ActionButton } from "@/components/ui/ActionGroup";

const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-copy p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

export default function TherapySessionForm({
  notes,
  setNotes,
  scheduledAt,
  setScheduledAt,
  saving,
  onSubmit,
}: {
  notes: string;
  setNotes: (v: string) => void;
  scheduledAt: string;
  setScheduledAt: (v: string) => void;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <SectionCard title="Шинэ эмчилгээний сесс" description="Тэмдэглэл, товлосон огноогоор шинэ сесс үүсгэнэ" className="mt-6">
      <form className="flex gap-3 flex-wrap items-start" onSubmit={onSubmit}>
        <input
          className={inputCls + " flex-[2] min-w-[200px]"}
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Тэмдэглэл…"
          aria-label="Сессийн тэмдэглэл"
        />
        <input
          className={inputCls + " flex-1 min-w-[180px]"}
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          aria-label="Товлосон огноо"
        />
        <ActionButton type="submit" variant="primary" size="lg" className="flex-none" disabled={saving}>
          {saving ? "Үүсгэж байна…" : "Үүсгэх"}
        </ActionButton>
      </form>
    </SectionCard>
  );
}
