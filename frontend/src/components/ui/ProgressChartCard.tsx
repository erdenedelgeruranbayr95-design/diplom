"use client";

/* Ахицын график (.ab-card, Recharts LineChart) — parent/progress/therapist гурван View-д
   давхардаж байсан ижил компонентуудыг нэгтгэв (эх код бүгд ижил байсан тул
   CSS/behavior өөрчлөгдөөгүй, зөвхөн ялгаатай байсан хэсгүүдийг (өндөр, margin,
   хоосон үеийн зан төлөв) props болгосон). */
/* Recharts бол ~7 MB-ийн сан (bundle-д ~100 KB+). Энэ график нь ЗӨВХӨН
   Ахиц/Эцэг эх/Эмчийн дэлгэцэнд харагддаг тул үндсэн bundle-д байх шаардлагагүй.
   `dynamic({ ssr: false })` — тухайн дэлгэц нээгдэх үед л татагдана.
   Түр байрыг ижил өндрөөр эзэлдэг тул CLS үүсгэхгүй. */
import dynamic from "next/dynamic";

const ProgressLineChart = dynamic(() => import("./ProgressLineChart"), {
  ssr: false,
  loading: () => <div className="skel w-full !rounded-lg" style={{ height: 240 }} role="status" aria-label="График ачааллаж байна" />,
});

export interface ProgressChartPoint {
  date: string;
  completionPct: number | null;
  engagementScore: number | null;
}

export default function ProgressChartCard({
  data,
  height = 240,
  marginTopClass = "mt-[26px]",
  hideWhenEmpty = false,
}: {
  data: ProgressChartPoint[];
  height?: number;
  marginTopClass?: string;
  hideWhenEmpty?: boolean;
}) {
  if (hideWhenEmpty && data.length === 0) return null;
  return (
    <div
      className={`border border-white/[.08] rounded-2xl bg-white/[.02] p-6 ${marginTopClass} flex flex-col gap-4 transition-[border-color,box-shadow] duration-250 hover:border-white/[.14] [animation:chart-in_.4s_cubic-bezier(.2,.8,.2,1)_backwards]`}
    >
      <div className="flex gap-4 items-start">
        <div>
          <b className="text-base font-semibold block mb-1">Ахицын график</b>
          <p className="text-dim text-body leading-[1.5] max-w-[60ch]">Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
        </div>
      </div>
      <ProgressLineChart data={data} height={height} />
    </div>
  );
}
