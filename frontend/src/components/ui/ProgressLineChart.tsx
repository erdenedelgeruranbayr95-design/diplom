"use client";

/* Recharts-ийн бодит зурагдах хэсэг — ProgressChartCard-аас `dynamic()`-ээр
   тусад нь татагддаг. Энэ файлд ЗӨВХӨН график байх ёстой: recharts-ийн import
   энэ модульд хоригдож, өөр газраас орж ирэхгүй байх нь код хуваалтын гол зорилго. */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { ProgressChartPoint } from "./ProgressChartCard";

export default function ProgressLineChart({ data, height }: { data: ProgressChartPoint[]; height: number }) {
  return (
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
  );
}
