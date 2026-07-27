"use client";

/* TherapistView.tsx-ийн шинэ эмчилгээний сесс үүсгэх форм (.ab-card) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
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
    <div className="border border-line rounded-md bg-[rgba(20,28,27,.4)] p-[22px_24px] mt-4 flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:shadow-sm hover:border-white/[.16]">
      <div className="flex gap-4 items-start">
        <div>
          <b className="text-base font-semibold block mb-1">Шинэ эмчилгээний сесс</b>
          <p className="text-dim text-[13px] leading-[1.5] max-w-[60ch]">Тэмдэглэл, товлосон огноогоор шинэ сесс үүсгэнэ.</p>
        </div>
      </div>
      <form className="ab-bcast" onSubmit={onSubmit} style={{ flexWrap: "wrap" }}>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Тэмдэглэл…" style={{ flex: 2, minWidth: 200 }} />
        <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} style={{ flex: 1, minWidth: 180 }} />
        <button type="submit" className="bt bt-a" disabled={saving}>
          {saving ? "Үүсгэж байна…" : "Үүсгэх"}
        </button>
      </form>
    </div>
  );
}
