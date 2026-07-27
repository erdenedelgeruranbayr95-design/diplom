"use client";

/* TherapistView.tsx-ийн ахиц бичих форм (.ab-card) — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
export default function ProgressEntryForm({
  completionPct,
  setCompletionPct,
  engagementScore,
  setEngagementScore,
  saving,
  formMsg,
  onSubmit,
}: {
  completionPct: number;
  setCompletionPct: (v: number) => void;
  engagementScore: number;
  setEngagementScore: (v: number) => void;
  saving: boolean;
  formMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="border border-line rounded-md bg-[rgba(20,28,27,.4)] p-[22px_24px] mt-4 flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:shadow-sm hover:border-white/[.16]">
      <div className="flex gap-4 items-start">
        <div>
          <b className="text-base font-semibold block mb-1">Ахиц бичих</b>
          <p className="text-dim text-[13px] leading-[1.5] max-w-[60ch]">Гүйцэтгэл болон оролцооны оноог 0–100 хооронд оруулна.</p>
        </div>
      </div>
      <form className="ab-bcast" onSubmit={onSubmit} style={{ flexWrap: "wrap", alignItems: "center" }}>
        <label className="mono" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          Гүйцэтгэл % ({completionPct})
          <input type="range" min={0} max={100} value={completionPct} onChange={(e) => setCompletionPct(Number(e.target.value))} />
        </label>
        <label className="mono" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          Оролцоо ({engagementScore})
          <input type="range" min={0} max={100} value={engagementScore} onChange={(e) => setEngagementScore(Number(e.target.value))} />
        </label>
        <button type="submit" className="bt bt-a" disabled={saving}>
          {saving ? "Бичиж байна…" : "Хадгалах"}
        </button>
      </form>
      {formMsg && (
        <p className={formMsg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13, marginTop: 8 }}>
          {formMsg}
        </p>
      )}
    </div>
  );
}
