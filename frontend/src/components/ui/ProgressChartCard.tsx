"use client";

/* Ахицын график (.ab-card, Recharts LineChart) — parent/progress/therapist гурван View-д
   давхардаж байсан ижил компонентуудыг нэгтгэв (эх код бүгд ижил байсан тул
   CSS/behavior өөрчлөгдөөгүй, зөвхөн ялгаатай байсан хэсгүүдийг (өндөр, margin,
   хоосон үеийн зан төлөв) props болгосон). */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
          <p className="text-dim text-[13px] leading-[1.5] max-w-[60ch]">Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
        </div>
      </div>
      <div style={{ width: "100%", height, marginTop: 16 }}>
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
