"use client";

/* Эцэг эхийн (PARENT) самбар — TherapistView.tsx-ийн list→detail хэв маягийг дагана,
   гэхдээ бүрэн зөвхөн унших: session/progress бичих ямар ч форм байхгүй.
   "Эмчийн зөвлөмж" гэдэг нь дууссан сессүүдийн therapist-ийн бичсэн notes талбарыг харуулна
   (тусдаа recommendation загвар backend-д байхгүй тул шинээр нэмэхгүй). */
import { useEffect, useMemo, useState } from "react";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import { listMyChildren, listTherapySessions, listProgress } from "@/lib/api/client";
import ParentHeader from "@/components/parent/ParentHeader";
import ChildOverviewCard from "@/components/parent/ChildOverviewCard";
import StatisticsCards from "@/components/parent/StatisticsCards";
import ProgressChartCard from "@/components/parent/ProgressChartCard";
import RecommendationPanel from "@/components/parent/RecommendationPanel";
import SessionHistoryTable from "@/components/parent/SessionHistoryTable";
import type { LinkedChild, TherapySession, Progress } from "@/types/therapy";

export default function ParentView({ onGoHome }: { onGoHome: () => void }) {
  const [children, setChildren] = useState<LinkedChild[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState<LinkedChild | null>(null);

  function load() {
    setLoading(true);
    setErr("");
    listMyChildren()
      .then((rows) => {
        setChildren(rows);
        if (rows.length === 1) setSelected(rows[0]);
      })
      .catch((e) => setErr(e.message || "Жагсаалт ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  if (selected) {
    return <ChildDetail child={selected} onBack={children.length > 1 ? () => setSelected(null) : undefined} onGoHome={onGoHome} />;
  }

  return (
    <>
      <ParentHeader childCount={children.length} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}
      {!loading && !err && children.length === 0 && (
        <Empty icon="👨‍👩‍👧" title="Холбогдсон хүүхэд алга" hint="Админ таныг хүүхэдтэй холбохыг хүлээнэ үү" />
      )}

      {!loading && !err && children.length > 0 && (
        <div className="bil-table">
          <div className="bil-row bil-head !grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]">
            <span className="mono">Хүүхэд</span>
            <span className="mono">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {children.map((c) => (
            <div className="bil-row !grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]" key={c.id}>
              <span className="ab-uname">
                <i className="ab-uav" aria-hidden="true">
                  {(c.child.name || "?").charAt(0).toUpperCase()}
                </i>
                {c.child.name}
              </span>
              <span className="bil-mth">{c.child.email}</span>
              <span>{new Date(c.createdAt).toLocaleDateString("mn-MN")}</span>
              <button className="bt bt-a" onClick={() => setSelected(c)}>
                Нээх →
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="sp-banner" style={{ marginTop: 30 }}>
        <div>
          <b>Тоглуулагч руу шилжих</b>
          <p>Аппын бусад боломжуудыг үзээрэй.</p>
        </div>
        <button className="bt" onClick={onGoHome}>
          🎧 Тоглуулагч нээх
        </button>
      </div>
    </>
  );
}

function ChildDetail({ child, onBack, onGoHome }: { child: LinkedChild; onBack?: () => void; onGoHome: () => void }) {
  const userId = child.childUserId;
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    Promise.all([listTherapySessions(userId), listProgress(userId)])
      .then(([s, p]) => {
        setSessions(s);
        setProgress(p);
      })
      .catch((e) => setErr(e.message || "Мэдээлэл ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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

  const completedSessions = sessions.filter((s) => s.status === "COMPLETED");
  const recommendations = completedSessions.filter((s) => s.notes && s.notes.trim().length > 0);

  return (
    <>
      <ChildOverviewCard child={child} onBack={onBack} onGoHome={onGoHome} />

      <StatisticsCards totalSessions={sessions.length} completedSessions={completedSessions.length} progressEntries={progress.length} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          <ProgressChartCard data={chartData} />

          <RecommendationPanel recommendations={recommendations} />

          <SessionHistoryTable sessions={sessions} />
        </>
      )}
    </>
  );
}
