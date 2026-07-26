"use client";

/* Эцэг эхийн (PARENT) самбар — TherapistView.tsx-ийн list→detail хэв маягийг дагана,
   гэхдээ бүрэн зөвхөн унших: session/progress бичих ямар ч форм байхгүй.
   "Эмчийн зөвлөмж" гэдэг нь дууссан сессүүдийн therapist-ийн бичсэн notes талбарыг харуулна
   (тусдаа recommendation загвар backend-д байхгүй тул шинээр нэмэхгүй). */
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "./StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import { ICONS } from "@/lib/player/constants";
import { listMyChildren, listTherapySessions, listProgress } from "@/lib/api/client";
import type { LinkedChild, SessionStatus, TherapySession, Progress } from "@/types/therapy";

const STATUS_LABEL: Record<SessionStatus, string> = {
  SCHEDULED: "Товлогдсон",
  IN_PROGRESS: "Явагдаж буй",
  COMPLETED: "Дууссан",
  CANCELLED: "Цуцлагдсан",
};

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
      <div className="ab-head">
        <div>
          <span className="mono">Эцэг эхийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            Танд холбогдсон хүүхдүүд
          </h2>
        </div>
      </div>

      <div className="st-cards">
        <StatCard icon={ICONS.users} color="c-aqua" value={children.length} label="Холбогдсон хүүхэд" />
      </div>

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}
      {!loading && !err && children.length === 0 && (
        <Empty icon="👨‍👩‍👧" title="Холбогдсон хүүхэд алга" hint="Админ таныг хүүхэдтэй холбохыг хүлээнэ үү" />
      )}

      {!loading && !err && children.length > 0 && (
        <div className="bil-table">
          <div className="bil-row th-prow bil-head">
            <span className="mono">Хүүхэд</span>
            <span className="mono">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {children.map((c) => (
            <div className="bil-row th-prow" key={c.id}>
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
      <div className="ab-head">
        <div>
          <span className="mono">Эцэг эхийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            {child.child.name}
          </h2>
          <p className="dv-lead" style={{ marginTop: 4 }}>
            {child.child.email}
          </p>
        </div>
        <button className="bt" onClick={onBack || onGoHome}>
          {onBack ? "← Жагсаалт руу" : "🎧 Тоглуулагч руу"}
        </button>
      </div>

      <div className="st-cards">
        <StatCard icon={ICONS.music} color="c-aqua" value={sessions.length} label="Нийт сесс" />
        <StatCard icon={ICONS.star} color="c-gold" value={completedSessions.length} label="Дууссан сесс" />
        <StatCard icon={ICONS.vibrate} color="c-rose" value={progress.length} label="Ахицын бичлэг" />
      </div>

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          {chartData.length > 0 && (
            <div className="ab-card chart-fade-in">
              <div className="ab-card-h">
                <div>
                  <b>Ахицын график</b>
                  <p>Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
                </div>
              </div>
              <div style={{ width: "100%", height: 240, marginTop: 16 }}>
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
          )}

          <h3 className="st-h">Эмчийн зөвлөмж</h3>
          {recommendations.length === 0 ? (
            <Empty icon="💬" title="Одоогоор зөвлөмж алга" hint="Эмч дууссан сесст тэмдэглэл бичихэд энд харагдана" />
          ) : (
            <div className="ab-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {recommendations.map((s) => (
                <div key={s.id}>
                  <span className="mono" style={{ color: "var(--faint)", fontSize: 11.5 }}>
                    {s.completedAt ? new Date(s.completedAt).toLocaleDateString("mn-MN") : ""}
                  </span>
                  <p style={{ marginTop: 4 }}>{s.notes}</p>
                </div>
              ))}
            </div>
          )}

          <h3 className="st-h">Дууссан сессүүд</h3>
          {sessions.length === 0 ? (
            <Empty icon="📋" title="Одоогоор сесс алга" hint="Эмч эмчилгээний сесс товлоход энд харагдана" />
          ) : (
            <div className="bil-table">
              <div className="bil-row th-srow bil-head">
                <span className="mono">Тэмдэглэл</span>
                <span className="mono">Товлосон</span>
                <span className="mono">Статус</span>
                <span></span>
              </div>
              {sessions.map((s) => (
                <div className="bil-row th-srow" key={s.id}>
                  <span>{s.notes || "—"}</span>
                  <span>{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString("mn-MN") : "—"}</span>
                  <span className={s.status === "COMPLETED" ? "bil-ok" : "ab-free"}>{STATUS_LABEL[s.status]}</span>
                  <span></span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
