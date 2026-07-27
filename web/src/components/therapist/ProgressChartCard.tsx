"use client";

/* TherapistView.tsx-ийн ахицын график (.ab-card, Recharts LineChart) — тусад нь гаргасан.
   Recharts chart-ийг өөрчлөлгүй, зөвхөн layout-ийг тусгаарласан. Trend indicator UI эх кодод
   байхгүй тул энд шинээр нэмээгүй. CSS/behavior бүгд өөрчлөгдөөгүй. */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export interface ProgressChartPoint {
  date: string;
  completionPct: number | null;
  engagementScore: number | null;
}

export default function ProgressChartCard({ data }: { data: ProgressChartPoint[] }) {
  if (data.length === 0) return null;
  return (
    <div className="border border-line rounded-md bg-[rgba(20,28,27,.4)] p-[22px_24px] mt-[26px] flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:shadow-sm hover:border-white/[.16] [animation:chart-in_.4s_cubic-bezier(.2,.8,.2,1)_backwards]">
      <div className="flex gap-4 items-start">
        <div>
          <b className="text-base font-semibold block mb-1">Ахицын график</b>
          <p className="text-dim text-[13px] leading-[1.5] max-w-[60ch]">Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
        </div>
      </div>
      <div style={{ width: "100%", height: 240, marginTop: 16 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
            <XAxis dataKey="date" stroke="var(--faint)" fontSize={12} />
            <YAxis stroke="var(--faint)" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "#101615", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }} />
            <Legend />
            <Line type="monotone" dataKey="completionPct" name="Гүйцэтгэл %" stroke="var(--aqua, #38e8ce)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="engagementScore" name="Оролцоо" stroke="#c58cff" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
