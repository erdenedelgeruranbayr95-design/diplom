"use client";

/* TherapistView.tsx-ийн ахиц бичих форм — нэгдсэн SectionCard primitive ашиглав (Vercel
   Dashboard pattern), range slider-уудыг accent-aqua болгов. completionPct/engagementScore/
   saving/formMsg/onSubmit state/callback хэвээр. */
import SectionCard from "@/components/ui/SectionCard";

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
    <SectionCard title="Ахиц бичих" description="Гүйцэтгэл болон оролцооны оноог 0–100 хооронд оруулна" className="mt-6">
      <form className="flex gap-6 flex-wrap items-end" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <span className="mono !text-[9px]">Гүйцэтгэл % ({completionPct})</span>
          <input
            type="range"
            min={0}
            max={100}
            value={completionPct}
            onChange={(e) => setCompletionPct(Number(e.target.value))}
            className="w-full accent-aqua cursor-pointer"
            aria-label="Гүйцэтгэлийн хувь"
          />
        </label>
        <label className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <span className="mono !text-[9px]">Оролцоо ({engagementScore})</span>
          <input
            type="range"
            min={0}
            max={100}
            value={engagementScore}
            onChange={(e) => setEngagementScore(Number(e.target.value))}
            className="w-full accent-aqua cursor-pointer"
            aria-label="Оролцооны оноо"
          />
        </label>
        <button
          type="submit"
          className="rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-3 px-6 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
          disabled={saving}
        >
          {saving ? "Бичиж байна…" : "Хадгалах"}
        </button>
      </form>
      {formMsg && (
        <p className={"text-[13px] mt-4 " + (formMsg.startsWith("✅") ? "text-aqua" : "text-[#E88A9B]")} role="status">
          {formMsg}
        </p>
      )}
    </SectionCard>
  );
}
