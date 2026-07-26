"use client";

/* Хувийн ахиц — TherapistView.tsx-ийн chart хэсгийн яг ижил хэв маягийг дагана,
   зөвхөн listProgress()-г параметргүй дуудаж өөрийн бичлэгээ авна (backend аль хэдийн scope хийдэг). */
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import BackBar from "./BackBar";
import StatCard from "./StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import { ICONS } from "@/lib/player/constants";
import { listProgress } from "@/lib/api/client";
import type { Progress } from "@/types/therapy";

export default function ProgressView({ onBack }: { onBack: () => void }) {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    listProgress()
      .then(setProgress)
      .catch((e) => setErr(e.message || "Ахиц ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const chartData = useMemo(
    () =>
      [...progress]
        .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime())
        .map((p) => ({
          date: new Date(p.recordedAt).toLocaleDateString("mn-MN", { month: "short", day: "numeric" }),
          completionPct: p.completionPct ?? null,
          engagementScore: p.engagementScore ?? null,
        })),
    [progress],
  );

  const avgCompletion = progress.length
    ? Math.round(progress.reduce((s, p) => s + (p.completionPct ?? 0), 0) / progress.length)
    : 0;
  const avgEngagement = progress.length
    ? Math.round(progress.reduce((s, p) => s + (p.engagementScore ?? 0), 0) / progress.length)
    : 0;

  return (
    <>
      <BackBar title="Миний ахиц" onBack={onBack} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && progress.length === 0 && (
        <Empty icon="📈" title="Ахицын бичлэг алга" hint="Эмчилгээний эмч танд ахиц бичихэд энд харагдана" />
      )}

      {!loading && !err && progress.length > 0 && (
        <>
          <div className="st-cards">
            <StatCard icon={ICONS.star} color="c-gold" value={avgCompletion + "%"} label="Дундаж гүйцэтгэл" />
            <StatCard icon={ICONS.vibrate} color="c-rose" value={avgEngagement} label="Дундаж оролцоо" />
            <StatCard icon={ICONS.music} color="c-aqua" value={progress.length} label="Нийт бичлэг" />
          </div>

          <div className="ab-card chart-fade-in" style={{ marginTop: 16 }}>
            <div className="ab-card-h">
              <div>
                <b>Ахицын график</b>
                <p>Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
              </div>
            </div>
            <div style={{ width: "100%", height: 260, marginTop: 16 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
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
        </>
      )}
    </>
  );
}
